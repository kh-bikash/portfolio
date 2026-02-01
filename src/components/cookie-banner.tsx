"use client"

interface CookieBannerProps {
  onAccept: () => void
  onReject: () => void
}

export function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  return (
    <div className="fixed bottom-20 left-6 z-50 max-w-sm bg-background/95 backdrop-blur-sm border border-border p-4">
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Our site uses essential cookies and, with your consent, analytics cookies. Details in{" "}
        <a href="#" className="underline underline-offset-2 hover:text-foreground">
          Privacy Notice.
        </a>
      </p>

      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="text-xs text-foreground border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors cursor-none"
        >
          Accept Cookies
        </button>
        <button
          onClick={onReject}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-none"
        >
          Reject Cookies
        </button>
      </div>
    </div>
  )
}
