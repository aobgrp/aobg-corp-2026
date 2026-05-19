import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const inputClasses =
  'flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary/50'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(body?.message || 'We could not send your message. Please try again.')
      }

      setStatus('success')
      form.reset()

      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.')
    }
  }

  const disabled = status === 'loading' || status === 'success'

  return (
    <div className="w-full rounded-2xl border border-border bg-card/50 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-foreground">Send us a message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Honeypot — hidden from users, irresistible to naive bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">
              Name <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={100}
              disabled={disabled}
              className={inputClasses}
              placeholder="Jane Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              maxLength={254}
              disabled={disabled}
              className={inputClasses}
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-sm font-semibold text-foreground">
            Subject <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            autoComplete="off"
            maxLength={200}
            disabled={disabled}
            className={inputClasses}
            placeholder="How can we help you?"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">
            Message <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            maxLength={5000}
            disabled={disabled}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary/50 resize-y"
            placeholder="Tell us more about your inquiry..."
          />
        </div>

        <div role="status" aria-live="polite" className="min-h-0">
          {status === 'error' && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-2 rounded-md bg-emerald-500/10 p-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Your message has been sent successfully. We will be in touch soon.</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={disabled}
          aria-busy={status === 'loading'}
          className="mt-2 w-full sm:w-auto self-start"
        >
          {status === 'loading' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
