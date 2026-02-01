"use client"

import type React from "react"
import { useState } from "react"

interface ContactModalProps {
  onClose: () => void
}

export function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-auto cursor-none">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
      >
        Close
      </button>

      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          {!isSubmitted ? (
            <>
              <div className="mb-12">
                <h2 className="text-xl font-normal text-foreground mb-1 tracking-tight">Contact</h2>
                <p className="text-[11px] text-muted-foreground tracking-wide">Tell us about your project</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-wide block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-muted/50 focus:border-foreground text-foreground text-sm py-2 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground tracking-wide block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-muted/50 focus:border-foreground text-foreground text-sm py-2 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-muted-foreground tracking-wide block mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full bg-transparent border-b border-muted/50 focus:border-foreground text-foreground text-sm py-2 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-[11px] text-foreground hover:text-muted-foreground transition-colors tracking-wide ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-normal text-foreground mb-2">Message Sent</h2>
              <p className="text-[11px] text-muted-foreground mb-8">We'll get back to you soon.</p>
              <button
                onClick={onClose}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          )}

          <div className="mt-16 pt-6 border-t border-border/30">
            <div className="flex gap-8 text-[10px] text-muted-foreground">
              <a href="mailto:hello@portfolio.com" className="hover:text-foreground transition-colors">
                hello@portfolio.com
              </a>
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
