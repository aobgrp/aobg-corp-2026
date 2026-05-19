import { Separator } from '@/components/ui/separator'

const footerLinks = [
  {
    label: 'Privacy Policy',
    href: 'https://www.ajg.com/us/privacy-policy/',
  },
  {
    label: 'Terms of Use',
    href: 'https://www.ajg.com/us/terms-of-use/',
  },
  {
    label: 'Cookie Policy',
    href: 'https://policy.cookiereports.com/23cb6131-en-gb.html',
  },
]

export default function ClosingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8]">
      {/* Top gradient band */}
      <div className="relative bg-gradient-to-b from-[#022A4E] to-primary/80 pb-36 pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent)] pointer-events-none" />
        <div className="flex justify-center">
          <a href="/" aria-label="American Online Benefits Group — home">
            <img
              src="/brand/aobg-logo-white.png"
              alt="American Online Benefits Group"
              width={264}
              height={88}
              className="h-40 w-auto drop-shadow-lg"
            />
          </a>
        </div>
      </div>

      {/* Letter card — overlaps the gradient band */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-5 sm:px-8 -mt-20 pb-16">
        <article
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-border/40 overflow-hidden"
          aria-label="Wind-Down Notice"
        >
          {/* Color accent bar at top of card */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary to-[#022A4E]" />

          <div className="px-8 py-10 sm:px-14 sm:py-12 space-y-6 text-foreground">
            {/* Date */}
            <p className="text-sm text-muted-foreground text-right">
              [Date]
            </p>

            {/* Recipient */}
            <div className="space-y-0.5 text-sm">
              <p className="font-semibold text-foreground">To Our Valued Members and Agents</p>
              <p className="text-muted-foreground">American Online Benefits Group</p>
            </div>

            <Separator />

            {/* Subject line */}
            <p className="text-sm font-bold text-primary uppercase tracking-wide">
              Re: Important Notice Regarding American Online Benefits Group
            </p>

            {/* Salutation */}
            <p>Dear Valued Member or Agent,</p>

            {/* Body */}
            <div className="space-y-4 leading-7 text-foreground/90">
              <p>
                We are writing to inform you of an important development affecting American Online
                Benefits Group. After careful consideration and thoughtful deliberation, we have
                made the difficult decision to wind down our operations. This decision was not made
                lightly, and we want to take this opportunity to express our sincere gratitude for
                the trust and loyalty you have placed in us over the years.
              </p>
              <p>
                Your current plan coverage will remain active through <strong>[Coverage End Date]</strong>.
                We are committed to honoring all existing obligations and ensuring that this
                transition is as seamless as possible for you. Our member services team will
                remain available to assist you throughout this process.
              </p>
              <p>
                We strongly encourage you to explore alternative coverage options prior to the
                effective date noted above. Our team is available to answer any questions you may
                have and, where possible, to help guide you toward available alternatives in your
                area. Please do not hesitate to reach out to us.
              </p>
              <p>
                You may contact our Member Services team by phone at{' '}
                <a href="tel:18889182386" className="text-primary font-semibold hover:underline underline-offset-4">
                  888-918-2386
                </a>{' '}
                or by email at{' '}
                <a href="mailto:members@aobgrp.com" className="text-primary font-semibold hover:underline underline-offset-4">
                  members@aobgrp.com
                </a>
                . Our office hours are Monday through Thursday, 9:00&nbsp;a.m.–5:00&nbsp;p.m. ET,
                and Friday, 9:00&nbsp;a.m.–4:00&nbsp;p.m. ET.
              </p>
              <p>
                We are deeply grateful for the opportunity to have served you and your families.
                It has been a privilege to be a part of your healthcare journey, and we remain
                dedicated to supporting you through this transition.
              </p>
            </div>

            {/* Closing */}
            <div className="space-y-1 pt-2">
              <p>With sincere appreciation,</p>
            </div>

            {/* Signature block */}
            <div className="pt-4 space-y-1">
              <p className="font-bold text-primary text-lg font-heading">
                American Online Benefits Group
              </p>
              <p className="text-sm text-muted-foreground">Leadership Team</p>
              <p className="text-sm text-muted-foreground">
                A Gallagher Company &mdash; License Nos. IL 100310679 / CA 0783129
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f4f8]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-5 py-12 sm:px-8 text-center">
          <a href="https://gallagher-affinity.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/brand/gallagher-affinity.png"
              alt="Gallagher Affinity"
              className="h-10 w-auto"
            />
          </a>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
            American Online Benefits Group operates as an insurance agency that does business under
            the name Gallagher Affinity Insurance Services, Inc. License Nos. IL 100310679 / CA 0783129
          </p>
          <p className="text-sm text-foreground/70">
            &copy; {new Date().getFullYear()} American Online Benefits Group, a Gallagher Company
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm pt-2"
            aria-label="Legal links"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
