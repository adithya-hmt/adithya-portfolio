import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Check,
  CheckCircle2, Code2, ExternalLink, GitBranch, GraduationCap, Layers3,
  Mail, MapPin, Menu, MessageCircle, Moon, PenTool, Send,
  Sparkles, Sun, Target, Users, Workflow, X, Zap
} from 'lucide-react'
import { supabase } from './lib/supabase'
import './styles.css'

const projects = [
  { name: 'Grama Arivu', category: 'Civic tech', tone: 'violet', icon: BriefcaseBusiness, featured: true, description: 'A citizen-first digital governance platform for reporting local issues and making resolution visible.', tags: ['Next.js', 'Firebase', 'Digital governance'], detail: 'A mobile-first civic platform for Nandambakkam Panchayat with voice-first reporting, ward-aware routing, offline-friendly flows, geo-tagged evidence, and transparent issue timelines.' },
  { name: 'PennPathai', category: 'Social impact', tone: 'green', icon: GraduationCap, featured: true, description: 'A scheme-to-enterprise companion that helps rural women discover support and act on it.', tags: ['Android', 'AI matching', 'Tamil-first'], detail: 'A guided experience for rural women, SHG members, returning mothers, and aspiring entrepreneurs to understand likely eligibility, missing documents, and practical next steps.' },
  { name: 'Cerelytic', category: 'Product studio', tone: 'amber', icon: Zap, featured: true, description: 'A student-led build movement turning fundamentals and weekly experiments into useful products.', tags: ['React', 'AI', 'Product building'], detail: 'A product studio and learning movement co-founded to help builders ship real work, test ideas quickly, and turn the strongest experiments into products and community tools.' },
  { name: 'SAP credit release', category: 'Enterprise', tone: 'blue', icon: Workflow, description: 'A role-based approval flow that modernises the manual VKM4 credit-release process.', tags: ['SAP S/4HANA', 'RBAC', 'Workflow'], detail: 'Billing Support submits a request, Sales Approver reviews it, SAP Release users complete the release, and every step is visible through status, notifications, and role-scoped dashboards.' },
  { name: 'HAP Training Management', category: 'Enterprise', tone: 'teal', icon: Layers3, description: 'A structured training lifecycle for courses, nominations, attendance, approvals, and certificates.', tags: ['SSO', 'Dashboards', 'Master data'], detail: 'A training operations product covering course masters, department segmentation, MD approval, training manager workflows, employee history, and completion certificate uploads.' },
  { name: 'Branding logistics', category: 'Operations', tone: 'rose', icon: Target, description: 'A multi-team system for sales branding requests, vendor execution, verification, and payment readiness.', tags: ['RBAC', 'Vendor flow', 'SAP GRN'], detail: 'A workflow from sales request and recce through design approvals, vendor execution, field verification, invoice, SAP GRN, and warranty logic for every branding element.' },
  { name: 'IT spend management', category: 'Operations', tone: 'slate', icon: Award, description: 'A visibility layer for budgets, expenses, vendors, imports, and department-wise spend.', tags: ['Analytics', 'Excel import', 'Reports'], detail: 'A spend-management concept for budget planning, vendor bill imports, future payment alerts, category reporting, and department-level analytics.' },
  { name: 'Application access portal', category: 'Platform', tone: 'indigo', icon: Users, description: 'A tile-based entry point for company applications with department-aware access.', tags: ['Google SSO', 'RBAC', 'Mobile-first'], detail: 'A central application launcher with SSO, local super-admin access, application and department masters, import/export, login reports, and mobile bottom navigation.' }
]

const skills = [
  ['Next.js / React', Code2], ['Firebase / Supabase', Zap], ['AI product thinking', Sparkles],
  ['UI/UX systems', PenTool], ['RBAC workflows', Workflow], ['Digital governance', BriefcaseBusiness]
]

const services = [
  { icon: Layers3, title: 'Product building', text: 'From a rough problem statement to a clear, usable product direction and a working first build.' },
  { icon: Workflow, title: 'Workflow systems', text: 'Role-aware approvals, master data, dashboards, notifications, and operational visibility.' },
  { icon: Target, title: 'Civic & social tech', text: 'Technology shaped around real people, local context, accessibility, and measurable impact.' }
]

function App() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])

  const categories = ['All', ...new Set(projects.map((project) => project.category))]
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  const closeMenu = () => setMenuOpen(false)
  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setSending(true)
    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get('name')?.toString().trim(),
      email: form.get('email')?.toString().trim(),
      message: form.get('message')?.toString().trim(),
      source: 'portfolio'
    }
    if (!supabase) {
      setFormError('The contact service is not configured yet. Please email me directly.')
    } else {
      const { error } = await supabase.from('portfolio_messages').insert(payload)
      if (error) setFormError('I could not send that right now. Please email me directly instead.')
      else setSubmitted(true)
    }
    setSending(false)
  }

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Adithya S home">AS<span>.</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
        {['Home', 'About', 'Work', 'Skills', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}<span className="toggle-dot" /></button>
        <a className="github-link" href="https://github.com/adithya-hmt" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={19} /></a>
        <a className="connect-button" href="#contact">Let’s Connect</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><Code2 size={16} /> CSE Student & Builder</div>
          <h1>Adithya <span>S</span></h1>
          <p className="hero-role">Student <b>•</b> Builder <b>•</b> Founder</p>
          <p className="hero-description">I turn real problems into thoughtful digital products — from civic-tech platforms and social-impact apps to workflow systems that make organisations easier to run.</p>
          <div className="hero-ctas"><a className="primary-button" href="#work">Explore my work <ArrowRight size={18} /></a><a className="secondary-button" href="#contact">Start a conversation <Send size={16} /></a></div>
          <div className="hero-proof"><span><CheckCircle2 size={15} /> Building from Chennai</span><span><CheckCircle2 size={15} /> CSE @ Sri Sairam</span></div>
          <a className="scroll-cue" href="#about"><ArrowDown size={18} /> Scroll to explore</a>
        </div>
        <div className="hero-visual"><div className="hero-dots" /><img src="/adithya-portrait.png" alt="Illustrated portrait of Adithya S" /><div className="code-float"><Code2 size={30} /></div><div className="orbit-dot" /></div>
      </section>

      <section className="stat-strip"><div className="section-wrap stats"><div><strong>04+</strong><span>Product directions</span></div><div><strong>08+</strong><span>Systems explored</span></div><div><strong>03</strong><span>Impact areas</span></div><div><strong>01</strong><span>Simple principle: ship</span></div></div></section>

      <section className="about-section section-wrap" id="about">
        <div className="about-mark">AS<span>.</span></div>
        <div className="about-heading"><p className="section-kicker">A little about me</p><h2>Ideas are only useful<br /><span>when they move.</span></h2></div>
        <div className="about-copy"><p>I’m a CSE student and founder working at the intersection of technology, design, and real-world impact. I like taking messy requirements, finding the real user problem, and shaping them into products people can actually use.</p><p>My work ranges from local governance and rural women’s access to enterprise systems for approvals, training, spend, and operations. I care about clarity, ownership, and shipping.</p></div>
      </section>

      <section className="services-section"><div className="section-wrap"><div className="section-heading"><div><p className="section-kicker">How I think</p><h2>Building with intent</h2></div><p className="heading-note">The best products make the next right action obvious.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }) => <article className="service-card" key={title}><div className="service-icon"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="projects-band" id="work"><div className="section-wrap projects-section"><div className="section-heading"><div><p className="section-kicker">Selected work</p><h2>Things I’m building</h2></div><a href="#contact" className="view-all">Have a project in mind <ArrowRight size={16} /></a></div><div className="filter-row" aria-label="Filter projects">{categories.map((category) => <button key={category} className={filter === category ? 'filter active' : 'filter'} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="project-grid">{visibleProjects.map((project) => { const Icon = project.icon; return <button className="project-card" key={project.name} onClick={() => setSelected(project)}><div className={`project-icon ${project.tone}`}><Icon size={22} /></div><div className="project-body"><div className="project-title-row"><h3>{project.name}</h3><span>{project.category}</span></div><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div></div><ArrowUpRight className="card-arrow" size={18} /></button> })}</div></div></section>

      <section className="timeline-section section-wrap"><div className="timeline-intro"><p className="section-kicker">The thread</p><h2>From observation<br /><span>to execution.</span></h2><p>I’m most useful where a product needs both empathy and momentum.</p></div><div className="timeline"><div className="timeline-item"><span>01</span><div><strong>Understand the context</strong><p>Listen to users, map the workflow, and define the problem without rushing into features.</p></div></div><div className="timeline-item"><span>02</span><div><strong>Shape the simplest path</strong><p>Turn requirements into clear journeys, roles, states, and interfaces people can trust.</p></div></div><div className="timeline-item"><span>03</span><div><strong>Build, test, improve</strong><p>Ship a working slice, validate the important moments, and keep tightening the loop.</p></div></div></div></section>

      <section className="skills-section" id="skills"><div className="section-wrap skills-inner"><div><p className="section-kicker">What I work with</p><h2>Skills</h2><p className="skills-note">Tools change. The ability to learn, simplify, and finish matters more.</p></div><div className="skill-list">{skills.map(([skill, Icon]) => <div className="skill-chip" key={skill}><Icon size={17} />{skill}</div>)}</div></div></section>

      <section className="contact-section section-wrap" id="contact"><div className="contact-copy"><p className="section-kicker">Contact</p><h2>Have a problem<br /><span>worth building?</span></h2><p>Tell me what you’re working on, what feels stuck, or what you want to make real. I’m open to collaborations, product conversations, and ambitious student-led work.</p><div className="contact-details"><a href="mailto:adithya.claude@gmail.com"><Mail size={18} /> adithya.claude@gmail.com</a><span><MapPin size={18} /> Chennai, India</span></div></div><form className="contact-form" onSubmit={handleContactSubmit}>{submitted ? <div className="success-state"><Check size={26} /><h3>Message received.</h3><p>Thanks for reaching out. I’ll get back to you soon.</p><a className="primary-button" href="mailto:adithya.claude@gmail.com">Open email <ArrowUpRight size={16} /></a></div> : <><label>Name<input name="name" placeholder="Your name" required /></label><label>Email<input type="email" name="email" placeholder="you@example.com" required /></label><label>What are you building?<textarea name="message" rows="4" placeholder="A short note about your idea or problem..." required /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="primary-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send a message'} {!sending && <Send size={16} />}</button></>}</form></section>
    </main>

    <footer className="footer"><div className="section-wrap footer-inner"><div className="footer-intro"><div className="footer-avatar">AS</div><div><strong>Let’s build something impactful.</strong><p>Good products start with a clear problem.</p></div></div><div className="footer-links"><a href="mailto:adithya.claude@gmail.com"><Mail size={19} /> Email</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><BriefcaseBusiness size={19} /> LinkedIn</a><a href="https://github.com/adithya-hmt" target="_blank" rel="noreferrer"><GitBranch size={19} /> GitHub</a></div></div><div className="footer-bottom"><span>© 2026 Adithya S. Built with intention.</span><a href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a></div></footer>
    {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
  </div>
}

function ProjectModal({ project, onClose }) {
  const ModalIcon = project.icon
  return <div className="modal-backdrop" onClick={onClose}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button><div className={`project-icon ${project.tone}`}><ModalIcon size={24} /></div><p className="section-kicker">{project.category}</p><h2 id="modal-title">{project.name}</h2><p>{project.detail}</p><div className="tag-row">{project.tags.map((tag) => <em key={tag}>{tag}</em>)}</div><a className="primary-button" href="#contact" onClick={onClose}>Talk about this project <ArrowRight size={18} /></a></div></div>
}

createRoot(document.getElementById('root')).render(<App />)
