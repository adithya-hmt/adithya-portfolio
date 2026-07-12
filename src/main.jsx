import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness,
  Code2, GitBranch, GraduationCap,
  Mail, MapPin, Menu, Moon, PenTool, Send, Sparkles, Sun, X, Zap
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    name: 'Grama Arivu', category: 'Civic tech', tone: 'violet', icon: BriefcaseBusiness,
    description: 'A citizen-first digital governance platform for reporting local issues and making resolution visible.',
    tags: ['Next.js', 'Firebase', 'Digital governance'],
    detail: 'A mobile-first civic platform designed around the realities of Nandambakkam Panchayat: voice-first reporting, ward-aware routing, offline-friendly flows, and transparent issue timelines.'
  },
  {
    name: 'PennPathai', category: 'Social impact', tone: 'green', icon: GraduationCap,
    description: 'A scheme-to-enterprise companion that helps rural women discover support and act on it.',
    tags: ['Android', 'AI matching', 'Tamil-first'],
    detail: 'A guided experience for rural women, SHG members, returning mothers, and aspiring entrepreneurs to understand likely eligibility, missing documents, and next steps.'
  },
  {
    name: 'Cerelytic', category: 'Product studio', tone: 'amber', icon: Zap,
    description: 'A student-led build movement turning fundamentals and weekly experiments into useful products.',
    tags: ['React', 'AI', 'Product building'],
    detail: 'A product studio and learning movement co-founded to help builders ship real work, test ideas quickly, and turn the strongest experiments into products and community tools.'
  },
  {
    name: 'Enterprise systems', category: 'Automation', tone: 'blue', icon: Sparkles,
    description: 'Workflow products that make approvals, access, training, spend, and operations easier to run.',
    tags: ['Supabase', 'RBAC', 'Workflow design'],
    detail: 'A growing set of internal tools spanning SAP credit release, flight booking, application access, vendor communication, branding logistics, and training management.'
  }
]

const skills = [
  ['Next.js', Code2], ['React', Sparkles], ['Firebase / Supabase', Zap],
  ['AI products', Sparkles], ['UI/UX', PenTool], ['Digital governance', BriefcaseBusiness]
]

function App() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const categories = ['All', ...new Set(projects.map((project) => project.category))]
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Adithya S home">AS<span>.</span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={item === 'Home' ? 'active' : ''} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}<span className="toggle-dot" />
          </button>
          <a className="github-link" href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={19} /></a>
          <a className="connect-button" href="#contact">Let’s Connect</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><Code2 size={16} /> CSE Student & Builder</div>
            <h1>Adithya <span>S</span></h1>
            <p className="hero-role">CSE Student <b>•</b> Builder <b>•</b> Founder</p>
            <p className="hero-description">I build useful digital products that solve real problems. Passionate about technology, design, and creating impact through code and thoughtful execution.</p>
            <div className="hero-ctas">
              <a className="primary-button" href="#projects">View Projects <ArrowRight size={18} /></a>
              <a className="secondary-button" href="#contact">Contact Me <Send size={16} /></a>
            </div>
            <a className="scroll-cue" href="#projects"><ArrowDown size={18} /> Scroll to explore</a>
          </div>
          <div className="hero-visual">
            <div className="hero-dots" />
            <img src="/adithya-portrait.png" alt="Illustrated portrait of Adithya S" />
            <div className="code-float"><Code2 size={30} /></div>
            <div className="orbit-dot" />
          </div>
        </section>

        <section className="projects-band" id="projects">
          <div className="section-wrap projects-section">
            <div className="section-heading"><div><p className="section-kicker">Selected work</p><h2>Featured Projects</h2></div><a href="#contact" className="view-all">Let’s build something <ArrowRight size={16} /></a></div>
            <div className="filter-row" aria-label="Filter projects">
              {categories.map((category) => <button key={category} className={filter === category ? 'filter active' : 'filter'} onClick={() => setFilter(category)}>{category}</button>)}
            </div>
            <div className="project-grid">
              {visibleProjects.map((project) => {
                const Icon = project.icon
                return <button className="project-card" key={project.name} onClick={() => setSelected(project)}>
                  <div className={`project-icon ${project.tone}`}><Icon size={22} /></div>
                  <div className="project-body"><div className="project-title-row"><h3>{project.name}</h3><span>{project.category}</span></div><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div></div>
                  <ArrowUpRight className="card-arrow" size={18} />
                </button>
              })}
            </div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-mark">AS<span>.</span></div>
          <div><p className="section-kicker">A little about me</p><h2>Ideas are only useful<br /><span>when they move.</span></h2></div>
          <p className="about-copy">I’m a CSE student and founder who likes working at the intersection of technology, design, and real-world impact. I care about making complex systems feel simple, building with people, and shipping work that earns its place.</p>
        </section>

        <section className="skills-section" id="skills"><div className="section-wrap skills-inner"><div><p className="section-kicker">What I work with</p><h2>Skills</h2></div><div className="skill-list">{skills.map(([skill, Icon]) => <div className="skill-chip" key={skill}><Icon size={17} />{skill}</div>)}</div></div></section>
      </main>

      <footer className="footer" id="contact"><div className="section-wrap footer-inner"><div className="footer-intro"><div className="footer-avatar">AS</div><div><strong>Let’s build something impactful.</strong><p>I’m always open to new ideas and opportunities.</p></div></div><div className="footer-links"><a href="mailto:adithya@example.com"><Mail size={19} /> adithya@example.com</a><span><MapPin size={19} /> Chennai, India</span><a href="https://linkedin.com" target="_blank" rel="noreferrer"><BriefcaseBusiness size={19} /> LinkedIn</a><a href="https://github.com" target="_blank" rel="noreferrer"><GitBranch size={19} /> GitHub</a></div></div><div className="footer-bottom"><span>© 2026 Adithya S. Built with intention.</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a></div></footer>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const ModalIcon = project.icon
  return <div className="modal-backdrop" onClick={onClose}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button><div className={`project-icon ${project.tone}`}><ModalIcon size={24} /></div><p className="section-kicker">{project.category}</p><h2 id="modal-title">{project.name}</h2><p>{project.detail}</p><div className="tag-row">{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div><a className="primary-button" href="#contact" onClick={onClose}>Talk about this project <ArrowRight size={18} /></a></div></div>
}

export default App
