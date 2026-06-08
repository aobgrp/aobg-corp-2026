import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { checkBotId } from 'botid/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_SUBJECTS = ['Member Services', 'Agents & Partners'] as const
const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const MIN_MESSAGE = 10

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip = normalize(
    Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'],
  ) || 'unknown'

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' })
  }

  const botCheck = await checkBotId({ advancedOptions: { headers: req.headers } })
  if (botCheck.isBot) {
    return res.status(403).json({ message: 'Access denied' })
  }

  const body = (req.body ?? {}) as Record<string, unknown>

  // Honeypot — silently succeed for bots that fill the hidden field.
  if (normalize(body.website)) {
    return res.status(200).json({ ok: true })
  }

  const name = normalize(body.name)
  const email = normalize(body.email)
  const subject = normalize(body.subject)
  const message = normalize(body.message)

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return res.status(400).json({ message: 'One or more fields exceed the allowed length.' })
  }

  if (message.length < MIN_MESSAGE) {
    return res.status(400).json({ message: 'Message must be at least 10 characters.' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' })
  }

  if (!(VALID_SUBJECTS as readonly string[]).includes(subject)) {
    return res.status(400).json({ message: 'Invalid department selection.' })
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@aobgrp.com',
      to: process.env.RESEND_TO_EMAIL ?? 'info@aobgrp.com',
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Message from AOBG Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(200).json(data)
  } catch (error) {
    console.error('Resend Error:', error)
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
