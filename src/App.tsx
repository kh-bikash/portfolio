import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import GitHubActivity from './components/GitHubActivity'
import { about, certifications, experience, featured, moreProjects, profile, toolkit, type Project } from './content'
import './site.css'

type Theme = 'light' | 'dark'

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="ext">
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  )
}

function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2 className="label">{label}</h2>
      {children}
    </section>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <span className="project-links">
      {project.live && <Ext href={project.live}>{project.live.includes('pypi') ? 'PyPI' : 'Live'}</Ext>}
      <Ext href={project.repo}>Code</Ext>
    </span>
  )
}

function WorkCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <a className="shot" href={project.live ?? project.repo} target="_blank" rel="noreferrer" tabIndex={-1}>
        <img src={project.image} alt={`${project.name} interface`} loading="lazy" width={1280} height={800} />
      </a>
      <div className="card-head">
        <h3>{project.name}</h3>
        <span className="muted">{project.kind}</span>
      </div>
      <p>{project.summary}</p>
      <div className="card-foot">
        <span className="muted small">{project.stack.join(' · ')}</span>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  return (
    <>
      <header className="topbar">
        <a href="#top" className="mark">Bikash Meitei</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </header>

      <main id="top" className="page">
        <section className="hero">
          <p className="eyebrow">{profile.name} — {profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="intro">{profile.intro}</p>
          <div className="hero-foot">
            <span className="status"><span className="dot" aria-hidden="true" />{profile.status}</span>
            <span className="links">
              <Ext href={profile.github}>GitHub</Ext>
              <Ext href={profile.linkedin}>LinkedIn</Ext>
              <Ext href={profile.resume}>Resume</Ext>
            </span>
          </div>
        </section>

        <Section id="work" label="Selected work">
          <div className="grid">
            {featured.map(p => <WorkCard key={p.name} project={p} />)}
          </div>
        </Section>

        <Section id="more" label="More projects">
          <ul className="list">
            {moreProjects.map(p => (
              <li key={p.name}>
                <div>
                  <h3>{p.name} <span className="muted">— {p.kind}</span></h3>
                  <p className="muted">{p.summary}</p>
                </div>
                <ProjectLinks project={p} />
              </li>
            ))}
          </ul>
        </Section>

        <Section id="github" label="Latest on GitHub">
          <GitHubActivity limit={4} />
          <p className="more"><Ext href={`${profile.github}?tab=repositories`}>All repositories</Ext></p>
        </Section>

        <Section id="about" label="About">
          <div className="about">
            <img src="/profile.jpg" alt={profile.name} className="portrait" loading="lazy" />
            <div className="prose">
              {about.map(text => <p key={text}>{text}</p>)}
              <dl className="facts">
                <div><dt>Experience</dt><dd>
                  <ul className="jobs">
                    {experience.map(job => (
                      <li key={job.company}>
                        <span className="row"><b>{job.company}</b><span className="muted small">{job.period}</span></span>
                        <span className="muted">{job.role} — {job.note}</span>
                      </li>
                    ))}
                  </ul>
                </dd></div>
                <div><dt>Toolkit</dt><dd className="muted">{toolkit}</dd></div>
                <div><dt>Certified</dt><dd className="muted">{certifications}</dd></div>
              </dl>
            </div>
          </div>
        </Section>

        <section id="contact" className="contact">
          <p className="label">Contact</p>
          <h2>Have an agent that needs to work in the real world?</h2>
          <a className="email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={20} aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
        <span className="links">
          <Ext href={profile.github}>GitHub</Ext>
          <Ext href={profile.linkedin}>LinkedIn</Ext>
        </span>
      </footer>
    </>
  )
}
