import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Local dev plugin: serves /api/contact without needing Vercel CLI
function localApiPlugin(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk: Buffer) => (body += chunk.toString()))
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}')
            const normalize = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
            const name = normalize(parsed.name)
            const email = normalize(parsed.email)
            const subject = normalize(parsed.subject)
            const message = normalize(parsed.message)
            const honeypot = normalize(parsed.website)

            if (honeypot) {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ ok: true }))
              return
            }

            if (!name || !email || !subject || !message) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: 'All fields are required.' }))
              return
            }

            if (message.length < 10) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: 'Message must be at least 10 characters.' }))
              return
            }

            const validSubjects = ['Member Services', 'Agents & Partners']
            if (!validSubjects.includes(subject)) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: 'Invalid department selection.' }))
              return
            }

            const apiKey = process.env.RESEND_API_KEY
            const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@aobgrp.com'
            const toEmail = process.env.RESEND_TO_EMAIL ?? 'info@aobgrp.com'

            if (!apiKey) {
              console.warn('[local-api] RESEND_API_KEY is not set — email not sent.')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: 'Dev mode: no API key, email skipped.' }))
              return
            }

            const { Resend } = await import('resend')
            const resend = new Resend(apiKey)

            const data = await resend.emails.send({
              from: fromEmail,
              to: toEmail,
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

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(data))
          } catch (err) {
            console.error('[local-api] Error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Failed to send email' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env.local so RESEND_* vars are available in the dev plugin
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
