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

const inputStyle = {
  width: '100%',
  background: 'rgba(10, 26, 10, 0.6)',
  border: '1px solid rgba(74, 222, 128, 0.1)',
  borderRadius: '12px',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  fontFamily: 'Space Grotesk, sans-serif',
}

export function ContactSection() {
  const { ref, isInView } = useScrollReveal()
  const [copied, setCopied] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
        method: 'POST', body: formData, headers: { Accept: 'application/json' },
      })
      setIsSubmitted(true)
    } catch {
      setIsSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  const getFocusStyle = (field: string) => focusedField === field
    ? { borderColor: 'rgba(74,222,128,0.5)', boxShadow: '0 0 0 3px rgba(74,222,128,0.08)' }
    : {}

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-36 px-6 md:px-12"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.03) 0%, transparent 70%)' }}
      />

      <div className="section-divider mb-20" />

      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0 }}
          className="section-label mb-4"
        >
          Get In Touch
        </motion.div>

        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-title mb-4"
        >
          Let's build something <span className="text-gradient-bio">together.</span>
        </motion.h2>

        <motion.p
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.15 }}
          className="text-base text-[var(--text-muted)] mb-12 max-w-xl"
        >
          I'm open to AI/ML engineering roles, research collaborations, and freelance projects.
          Let's connect and create impact together.
        </motion.p>

        {/* Quick info */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            khbikash17@gmail.com
            {copied
              ? <Check className="w-3.5 h-3.5" style={{ color: '#4ade80' }} />
              : <Copy className="w-3.5 h-3.5 opacity-40" />
            }
          </button>
          <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-full text-sm text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5" />
            India
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-[0.12em] uppercase text-[var(--text-muted)]">Name</label>
                  <input
                    type="text" required value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your name"
                    style={{ ...inputStyle, ...getFocusStyle('name') }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-[0.12em] uppercase text-[var(--text-muted)]">Email</label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    style={{ ...inputStyle, ...getFocusStyle('email') }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono tracking-[0.12em] uppercase text-[var(--text-muted)]">Message</label>
                <textarea
                  required rows={4} value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  data-lenis-prevent
                  placeholder="Tell me about your project or opportunity..."
                  style={{ ...inputStyle, ...getFocusStyle('message'), resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm disabled:opacity-40"
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
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}
              >
                <Check className="w-6 h-6" style={{ color: '#4ade80' }} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-2">Message Sent!</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'}
          variants={revealVariants.fadeUp} transition={{ ...defaultTransition, delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
