import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@aobgrp.com',
      to: process.env.RESEND_TO_EMAIL ?? 'info@aobgrp.com',
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Message from AOBG Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return res.status(200).json(data)
  } catch (error) {
    console.error('Resend Error:', error)
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
