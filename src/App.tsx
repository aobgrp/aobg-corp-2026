import { useEffect, useState } from 'react'
import {
  Building2,
  Clock3,
  Mail,
  Menu,
  Phone,
  UsersRound,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

import { ContactForm } from '@/components/ContactForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const memberPortalUrl = import.meta.env.VITE_MEMBER_PORTAL_URL ?? 'https://aobgmemberportal.com'

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
  {
    label: 'Do Not Sell or Share My Personal Information - US Residents',
    href: 'https://policy.cookiereports.com/23cb6131-en-gb.html',
  },
]

const supportCards = [
  {
    id: 'member-services',
    title: 'Member Services',
    description:
      'For current members who need help with policy questions, benefit details, or account support.',
    icon: UsersRound,
    phone: '888-918-2386',
    phoneHref: 'tel:18889182386',
    email: 'members@aobgrp.com',
    emailHref: 'mailto:members@aobgrp.com',
    action: 'Open Member Portal',
    actionHref: memberPortalUrl,
    actionExternal: true,
  },
  {
    id: 'agent-services',
    title: 'Agent Services',
    description:
      'For agents and strategic partners who need support from the AOBG Agent Services team.',
    icon: Building2,
    phone: '855-235-4011',
    phoneHref: 'tel:18552354011',
    email: 'agents@aobgrp.com',
    emailHref: 'mailto:agents@aobgrp.com',
    action: 'Email Agent Services',
    actionHref: 'mailto:agents@aobgrp.com',
    actionExternal: false,
  },
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <MemberServices />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Member Services', href: '#member-services' },
    { label: 'Contact Us', href: '#contact' },
  ]

  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-background/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="mx-auto flex h-28 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="American Online Benefits Group — home">
          <img
            src="/brand/aobg-logo.png"
            alt=""
            width={264}
            height={88}
            className="h-[88px] w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a key={link.href} className="transition-colors hover:text-primary" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button asChild size="lg" className="px-8 text-base font-bold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <a href={memberPortalUrl} target="_blank" rel="noopener noreferrer">
              Member Portal
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center p-2 text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col px-5 py-6 space-y-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-border/50">
                <Button asChild size="lg" className="w-full mt-4 h-14 text-lg font-bold">
                  <a href={memberPortalUrl} target="_blank" rel="noopener noreferrer">
                    Member Portal
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#022A4E]">
      {/* Background Image - Mobile */}
      <div 
        className="absolute inset-0 -z-30 h-full w-full bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: 'url("/brand/hero-mobile.jpg")' }}
      ></div>

      {/* Background Image - Desktop */}
      <div 
        className="absolute inset-0 -z-30 h-full w-full bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: 'url("/brand/hero-healthcare.jpg")' }}
      ></div>
      
      {/* Blue Gradient Overlay */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-gradient-to-br from-primary/95 via-primary/85 to-[#022A4E]/95"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1' d='M0 20 Q 25 10, 50 20 T 100 20' /%3E%3C/svg%3E&quot;)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-100"></div>
      
      {/* Insurtech/Glassmorphism specific gradients */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[1000px] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.08),rgba(255,255,255,0))] pointer-events-none"></div>
      
      <div className="mx-auto flex min-h-[calc(88vh-5rem)] w-full max-w-5xl flex-col items-center justify-center text-center px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="font-heading text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Welcome to American Online Benefits Group
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            We provide quality, affordable healthcare benefit support for the
            members, agents, and partners we serve.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
            <Button asChild size="lg" className="h-14 px-10 text-lg font-bold w-full sm:w-auto bg-white text-primary shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl hover:shadow-black/20">
              <a href={memberPortalUrl} target="_blank" rel="noopener noreferrer">
                Member Portal
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold w-full sm:w-auto border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20 hover:text-white">
              <a href="#contact">
                Contact Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative isolate py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-muted/30" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
        {/* Image card shows on lg+; on mobile the About copy stands alone. */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group hidden lg:block"
        >
          <img
            src="/brand/about-image.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022A4E]/95 via-primary/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
            <h3 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl drop-shadow-md">
              Practical benefit support with a service-first standard.
            </h3>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col gap-6 text-lg leading-8 text-muted-foreground lg:pl-8"
        >
          <h2 className="font-heading text-4xl font-extrabold text-primary sm:text-5xl mb-2">
            About Us
          </h2>
          <p>
            American Online Benefits Group is dedicated to providing our customers
            with quality and affordable health insurance products to protect them
            and their families. We continue to grow and partner with leaders in
            the industry, keeping us at the forefront of creating products to meet
            the needs of those we cover.
          </p>
          <p>
            Our member services department is trained to provide our customers
            with an excellent experience. They are available to answer policy
            questions and offer product education to members on understanding
            how to fully utilize the benefits included in their plan. Customer
            service is their top priority.
          </p>
          <p>
            We are a team dedicated to providing our customers with honest and
            ethical services. We are your trusted company when it comes to
            providing you with all the information required to make the best
            decision to fulfill the health insurance needs for you and your family.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function MemberServices() {
  const card = supportCards.find(c => c.id === 'member-services')!
  
  return (
    <section id="member-services" className="relative isolate py-20 sm:py-32 bg-gradient-to-br from-primary to-[#022A4E]">
      <div className="absolute inset-0 -z-10 bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1' d='M0 20 Q 25 10, 50 20 T 100 20' /%3E%3C/svg%3E&quot;)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-100"></div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[1000px] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.08),rgba(255,255,255,0))] pointer-events-none"></div>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-6">
              <UsersRound aria-hidden="true" />
              Member Support
            </div>
            <h2 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
              Member Services
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80">
              {card.description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <SupportCard card={card} hideHeader />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="relative isolate py-20 sm:py-32 bg-card">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">Contact Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">Send our team a direct message and we'll get back to you shortly.</p>
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}


function SupportCard({
  card,
  hideHeader
}: {
  card: (typeof supportCards)[number]
  hideHeader?: boolean
}) {
  const Icon = card.icon

  return (
    <div className="group w-full">
      <Card className="h-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-black/30 ring-1 ring-white/10 text-white">
        {!hideHeader && (
          <CardHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md">
              <Icon aria-hidden="true" />
            </div>
            <CardTitle className="text-white">{card.title}</CardTitle>
            <CardDescription className="max-w-xl text-base leading-7 text-white/70">
              {card.description}
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className={`flex flex-col gap-5 relative z-10 ${hideHeader ? 'p-8 sm:p-10' : ''}`}>
          {!hideHeader && <Separator className="bg-white/20" />}
          <div className="grid gap-4">
            <ContactRow icon={Phone} label="Phone" href={card.phoneHref}>
              {card.phone}
            </ContactRow>
            <ContactRow icon={Mail} label="Email" href={card.emailHref}>
              {card.email}
            </ContactRow>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <Clock3 className="mt-0.5 text-white/80" aria-hidden="true" />
              <div>
                <div className="text-sm font-bold text-white">Hours</div>
                <div className="text-lg font-semibold text-white/90 mt-0.5">M-Th 9-5, Fri 9-4</div>
              </div>
            </div>
          </div>
          <Button asChild size="lg" className="mt-4 mx-auto w-full max-w-sm h-14 text-lg bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-bold shadow-md">
            <a
              href={card.actionHref}
              target={card.actionExternal ? '_blank' : undefined}
              rel={card.actionExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center"
            >
              {card.action}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof Phone
  label: string
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:shadow-md group-hover:border-white/20 text-white"
    >
      <Icon className="mt-0.5 text-white/80 transition-colors group-hover:text-white" aria-hidden="true" />
      <span>
        <span className="block text-sm font-bold text-white">{label}</span>
        <span className="block text-lg font-semibold text-white/90 mt-0.5">{children}</span>
      </span>
    </a>
  )
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-5 py-12 sm:px-8 text-center">
        <p className="text-xs text-primary-foreground/60 leading-relaxed max-w-3xl">
          American Online Benefits Group operates as an insurance agency that does business under the name Gallagher Affinity Insurance Services, Inc. License Nos. IL 100310679 / CA 0783129
        </p>
        <p className="text-sm text-primary-foreground/80">
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
              className="text-primary-foreground/80 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default App
