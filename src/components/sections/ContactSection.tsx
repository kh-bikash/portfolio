"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Copy, Check, Mail, MapPin } from 'lucide-react'
import { useScrollReveal, revealVariants, defaultTransition } from '@/hooks/useScrollReveal'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/' },
  { label: 'GitHub', url: 'https://github.com/kh-bikash' },
  { label: 'CodeChef', url: 'https://www.codechef.com/users/kh_bikash22' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/bikashkh/' },
]

export function ContactSection() {
  const { ref, isInView } = useScrollReveal()
  const [copied, setCopied] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('khbikash17@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)
    formData.append('_subject', 'Portfolio Contact Message')
    formData.append('_captcha', 'false')

    try {
      await fetch('https://formsubmit.co/ajax/khbikash17@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      setIsSubmitted(true)
    } catch {
      setIsSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-36 px-6 md:px-12"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent-red)] opacity-[0.02] blur-[150px] pointer-events-none" />

      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Get In Touch
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-4"
        >
          Let's build something <span className="text-gradient-red">together.</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.15 }}
          className="text-base font-sans text-[var(--text-muted)] mb-12 max-w-xl"
        >
          I'm open to AI/ML engineering roles, research collaborations, and freelance projects.
          Let's connect and create impact together.
        </motion.p>

        {/* Quick info */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-sm font-sans font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            khbikash17@gmail.com
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 opacity-50" />}
          </button>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-sm font-sans text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5" />
            India
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-[var(--text-muted)]">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-red)]/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-[var(--text-muted)]">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-red)]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-sans font-medium tracking-[0.1em] uppercase text-[var(--text-muted)]">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  data-lenis-prevent
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-sm font-sans text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-red)]/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">Message Sent!</h3>
              <p className="text-sm font-sans text-[var(--text-muted)]">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp}
          transition={{ ...defaultTransition, delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-sans font-medium text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
