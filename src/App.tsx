import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import GitHubActivity from './components/GitHubActivity'
import { experience, profile, projects, recognition, skills } from './content'
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

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
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
        <a href="#top" className="mark">Bikash</a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
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
          <img src="/profile.jpg" alt="" className="avatar" width={72} height={72} />
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="intro">{profile.intro}</p>
          <p className="status"><span className="dot" aria-hidden="true" />{profile.status} · {profile.location}</p>
          <div className="links">
            <Ext href={profile.github}>GitHub</Ext>
            <Ext href={profile.linkedin}>LinkedIn</Ext>
            <Ext href={profile.resume}>Resume</Ext>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </section>

        <Section id="experience" title="Experience">
          <ol className="timeline">
            {experience.map(job => (
              <li key={job.company}>
                <div className="row">
                  <h3>{job.company}</h3>
                  <span className="muted">{job.period}</span>
                </div>
                <p className="sub">{job.role}</p>
                <ul>
                  {job.points.map(point => <li key={point}>{point}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="work" title="Selected work">
          <ul className="projects">
            {projects.map(p => (
              <li key={p.name}>
                <div className="row">
                  <h3>{p.name}</h3>
                  <span className="project-links">
                    <Ext href={p.repo}>Code</Ext>
                    {p.live && <Ext href={p.live}>{p.live.includes('pypi') ? 'PyPI' : 'Live'}</Ext>}
                  </span>
                </div>
                <p>{p.summary}</p>
                <p className="tags">{p.stack.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="github" title="Recently on GitHub">
          <GitHubActivity />
          <p className="more"><Ext href={`${profile.github}?tab=repositories`}>All repositories</Ext></p>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="defs">
            {skills.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </Section>

        <Section id="recognition" title="Recognition">
          <dl className="defs">
            {recognition.map(r => (
              <div key={r.label}><dt>{r.label}</dt><dd>{r.text}</dd></div>
            ))}
            <div><dt>Education</dt><dd>{profile.education}</dd></div>
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <p className="contact-line">
            Building something with LLM agents? I'd like to hear about it.
          </p>
          <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </Section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="links">
          <Ext href={profile.github}>GitHub</Ext>
          <Ext href={profile.linkedin}>LinkedIn</Ext>
        </span>
      </footer>
    </>
  )
}
