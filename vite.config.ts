import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'

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
            const { name, email, subject, message } = JSON.parse(body)

            if (!name || !email || !subject || !message) {
              res.writeHead(400, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: 'Missing required fields' }))
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
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
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
