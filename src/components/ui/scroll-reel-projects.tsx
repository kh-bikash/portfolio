"use client";

import * as React from "react";
import { Github, ExternalLink, Activity } from "lucide-react";

export interface ScrollReelProject {
  id: string;
  title: string;
  description: string;
  image: string;
  alt?: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  onDeepDive?: () => void;
}

export interface ScrollReelProjectsProps {
  projects: ScrollReelProject[];
  charStaggerMs?: number;
  className?: string;
}

const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const TITLE_CLASSES = "m-0 text-xl md:text-[26px] font-heading font-bold leading-[1.2] tracking-tight text-white mb-3";
const DESC_CLASSES = "m-0 text-sm md:text-base font-sans leading-[1.5] text-white/70 line-clamp-4";

const FEATURED_SHADOW = "0 4px 24px rgba(0,0,0,0.6), 0 1px 2px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent blur-[1px] shadow-sm"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl bg-[var(--bg-elevated)] ring-1 ring-white/10"
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      {/* Light gradient sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay opacity-30"
        style={{
          background: "linear-gradient(220.99deg, rgba(255,255,255,0) 32%, rgba(255,255,255,0.8) 47%, rgba(255,255,255,0) 65%)",
        }}
      />
    </div>
  );
}

function Chars({ text, startIndex, staggerMs }: { text: string; startIndex: number; staggerMs: number }) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span key={ci} className="scroll-reel-char" style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelProjects({ projects, charStaggerMs = 5, className }: ScrollReelProjectsProps) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = projects.length;

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    projects.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [projects, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = projects[displayIndex] || projects[0];

  if (!current) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full flex-col items-stretch gap-6 overflow-hidden rounded-2xl border border-white/10 apple-glass p-1 md:p-3 outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:min-h-[420px] lg:flex-row",
        className
      )}
    >
      {/* Reel section */}
      <div
        aria-hidden="true"
        className="relative h-64 w-full shrink-0 self-stretch overflow-hidden lg:h-auto lg:w-[420px]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {/* Left column */}
          <div className="flex shrink-0 flex-col gap-3 will-change-transform motion-reduce:[transition:none!important]" style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => <Cell key={i} />)}
          </div>

          {/* Middle column */}
          <div className="flex shrink-0 flex-col gap-3 will-change-transform motion-reduce:[transition:none!important]" style={colStyle(middleY)}>
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured key={i} src={projects[item.i].image} alt={projects[item.i].alt} />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column */}
          <div className="flex shrink-0 flex-col gap-3 will-change-transform motion-reduce:[transition:none!important]" style={colStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, i) => <Cell key={i} />)}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-8 md:px-10 md:py-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-xs font-mono text-white/50 uppercase tracking-widest">
            <Activity className="w-4 h-4 text-white" />
            <span>Project {displayIndex + 1} of {count}</span>
          </div>

          {/* Text stage */}
          <div className="relative w-full max-w-[500px] overflow-hidden" aria-live="polite">
            <div aria-hidden="true" className="invisible flex min-h-[160px] flex-col gap-4">
              <h3 className={TITLE_CLASSES}>{current.title}</h3>
              <p className={DESC_CLASSES}>{current.description}</p>
            </div>
            
            <div
              key={displayIndex}
              className={cn("absolute inset-x-0 top-0 flex flex-col gap-4 will-change-[transform,opacity]", exiting && "scroll-reel-exit")}
            >
              <h3 className={TITLE_CLASSES}>
                <Chars text={current.title} startIndex={0} staggerMs={charStaggerMs} />
              </h3>
              <p className={DESC_CLASSES}>
                <Chars text={current.description} startIndex={current.title.length + 5} staggerMs={charStaggerMs} />
              </p>

              {/* Tags & Links (Fades in, no char stagger to avoid mess) */}
              <div className="mt-4 flex flex-col gap-5 animate-in fade-in duration-1000 delay-300 fill-mode-both">
                {current.tags && current.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {current.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[10px] font-sans font-medium text-white/70 bg-white/5 border border-white/10 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  {current.githubUrl && (
                    <a href={current.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-white/60 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {current.demoUrl && (
                    <a href={current.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-white/60 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {current.onDeepDive && (
                    <button onClick={current.onDeepDive} className="px-4 py-1.5 text-xs font-sans font-semibold bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20 cursor-pointer">
                      Deep Dive
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between md:mt-auto">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:enabled:bg-white/10 hover:enabled:scale-[1.05] active:enabled:scale-95 disabled:opacity-30"
            >
              <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={index === count - 1}
              aria-label="Next project"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:enabled:bg-white/10 hover:enabled:scale-[1.05] active:enabled:scale-95 disabled:opacity-30"
            >
              <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelProjects;
