import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Clock,
  Code2,
  Database,
  ExternalLink,
  FileText,
  FlaskConical,
  GitBranch,
  Globe2,
  GraduationCap,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  PenTool,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

const SITE = {
  name: 'Adithya S',
  domain: 'https://adhithya.com',
  email: 'adithya.claude@gmail.com',
  github: 'https://github.com/adithya-hmt',
  location: 'Chennai, India',
}

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

const NAV_ITEMS = [
  ['Home', '/'],
  ['About', '/about'],
  ['Projects', '/projects'],
  ['Research', '/research'],
  ['Writing', '/writing'],
  ['Now', '/now'],
  ['Contact', '/contact'],
]

const PROJECTS = [
  {
    slug: 'pennpathai',
    name: 'PennPathai',
    category: 'Social impact',
    eyebrow: 'Tamil-first scheme-to-enterprise platform',
    summary: 'Helping rural women understand support schemes, prepare documents, and move towards work or entrepreneurship.',
    problem: 'Government support is difficult to navigate when eligibility rules, documents, language, and the next action are unclear.',
    solution: 'A guided Tamil-first journey for profile capture, scheme discovery, eligibility triage, missing-document checklists, action planning, and human support.',
    role: 'Product direction, user flows, AI-assisted matching concept, interface design, and prototype development.',
    status: 'Prototype in active development',
    technologies: ['React', 'Android', 'AI matching', 'Tamil UX', 'Product research'],
    principles: ['Explain recommendations instead of hiding them', 'Keep a human verification path', 'Design for low digital confidence', 'Avoid promising eligibility before official verification'],
    next: ['Validate the questionnaire with target users', 'Connect verified scheme sources', 'Test low-bandwidth and assisted-use flows'],
    icon: Users,
  },
  {
    slug: 'grama-arivu',
    name: 'Grama Arivu',
    category: 'Civic technology',
    eyebrow: 'Rural governance and complaint transparency',
    summary: 'A civic platform for reporting local issues, following progress, and improving communication with panchayat officials.',
    problem: 'Residents often lack a simple record of what they reported, who owns the issue, and whether meaningful progress was made.',
    solution: 'A mobile-first complaint flow with ward context, evidence, status timelines, official work queues, scheme information, and transparency views.',
    role: 'Field discovery, product architecture, role design, frontend development, Firebase integration, and offline-first planning.',
    status: 'Working prototype being refined',
    technologies: ['React', 'Firebase', 'PWA', 'Offline queue', 'Tamil and English'],
    principles: ['Make status visible', 'Collect only useful evidence', 'Support citizens without requiring an account', 'Keep official actions auditable'],
    next: ['Improve field validation', 'Strengthen offline synchronisation', 'Measure complaint completion and response quality'],
    icon: Globe2,
  },
  {
    slug: 'learnflow',
    name: 'LearnFlow',
    category: 'Education technology',
    eyebrow: 'A practical operating system for student work',
    summary: 'Combining attendance, assignments, study planning, projects, and social accountability into one student-focused system.',
    problem: 'Academic work is fragmented across portals, chats, notes, calendars, and memory, making small misses compound quickly.',
    solution: 'A responsive workspace that turns attendance, deadlines, study goals, and project progress into visible next actions.',
    role: 'Product strategy, student workflows, UI/UX direction, system design, and early implementation.',
    status: 'MVP exploration',
    technologies: ['React', 'Supabase', 'Product design', 'Student analytics', 'Responsive web'],
    principles: ['Show the next useful action', 'Avoid shame-based productivity', 'Make missed days recoverable', 'Keep the core useful without AI'],
    next: ['Ship the attendance and assignment core', 'Test weekly planning with students', 'Add sync only after the local workflow is stable'],
    icon: GraduationCap,
  },
  {
    slug: 'personal-ai-infrastructure',
    name: 'Personal AI Infrastructure',
    category: 'AI systems',
    eyebrow: 'Private tools, memory, and automation',
    summary: 'A personal assistant ecosystem connecting Obsidian, MCP servers, tasks, cloud infrastructure, and private networking.',
    problem: 'AI assistants lose context and become unreliable when notes, tasks, files, and tools are disconnected or exposed insecurely.',
    solution: 'A self-hosted environment using structured notes, tool servers, private network access, synchronisation, and explicit automation boundaries.',
    role: 'Infrastructure design, Linux administration, MCP integration, automation experiments, security hardening, and documentation.',
    status: 'Ongoing systems experiment',
    technologies: ['MCP', 'Obsidian', 'Linux', 'Oracle Cloud', 'Tailscale', 'Syncthing'],
    principles: ['Private access before public exposure', 'Least privilege for tools', 'Human approval for high-impact actions', 'Simple systems over fragile agent chains'],
    next: ['Improve tool reliability and observability', 'Reduce duplicate context and broken links', 'Document safe recovery and rollback paths'],
    icon: Network,
  },
]

const SKILLS = [
  { title: 'Frontend', icon: Braces, items: ['React', 'TypeScript', 'Next.js', 'Vite', 'HTML', 'CSS'] },
  { title: 'Backend', icon: Database, items: ['Node.js', 'Python', 'REST APIs', 'Firebase', 'Supabase'] },
  { title: 'Infrastructure', icon: Server, items: ['Docker', 'Linux', 'Oracle Cloud', 'GitHub', 'Tailscale', 'Syncthing'] },
  { title: 'AI systems', icon: BrainCircuit, items: ['LLMs', 'Prompt engineering', 'AI agents', 'MCP', 'Retrieval systems', 'Automation'] },
  { title: 'Other', icon: Layers3, items: ['Java', 'Data structures', 'Robotics', 'UI/UX', 'Product research'] },
]

const RESEARCH = [
  {
    title: 'AI for rural governance',
    question: 'How can AI reduce administrative friction without making public decisions opaque or excluding low-connectivity users?',
    method: 'Field observations, workflow mapping, assisted interfaces, transparent triage, and measurable service outcomes.',
    outputs: ['Literature survey', 'Prototype', 'Field validation', 'Evaluation metrics'],
  },
  {
    title: 'AI-assisted scheme discovery',
    question: 'How can a recommendation system explain likely matches while clearly separating guidance from official eligibility?',
    method: 'Verified source retrieval, profile-based filtering, reason codes, uncertainty labels, and human verification.',
    outputs: ['Source catalogue', 'Matching experiment', 'Error analysis', 'User study'],
  },
  {
    title: 'Human-centred lending decisions',
    question: 'What does “better” mean in lending when speed, accuracy, approvals, fairness, consistency, and compliance conflict?',
    method: 'Requirements discovery, decision decomposition, fairness checks, auditability, and human override design.',
    outputs: ['Problem framing', 'Risk matrix', 'Model evaluation plan', 'Governance notes'],
  },
  {
    title: 'Personal AI assistants using MCP',
    question: 'What architecture gives an assistant useful memory and tools without creating unsafe access or brittle automation?',
    method: 'Tool contracts, scoped permissions, private networking, failure testing, logs, and reversible actions.',
    outputs: ['Architecture notes', 'Tool evaluations', 'Failure catalogue', 'Open-source components'],
  },
  {
    title: 'AI-supported student productivity',
    question: 'Can AI improve follow-through for students without increasing dependence, surveillance, or cognitive overload?',
    method: 'Next-action design, non-AI fallbacks, privacy constraints, recovery workflows, and longitudinal testing.',
    outputs: ['Product experiment', 'Behaviour metrics', 'Student interviews', 'Ethics review'],
  },
  {
    title: 'Offline-first civic applications',
    question: 'Which data and interaction patterns remain dependable when connectivity is intermittent and devices are modest?',
    method: 'Local-first state, queued writes, conflict handling, compressed evidence, and low-end device testing.',
    outputs: ['Sync prototype', 'Performance benchmark', 'Conflict tests', 'Deployment guide'],
  },
]

const ARTICLES = [
  {
    title: 'I Spent a Week Building an MCP Server for Obsidian and Super Productivity',
    category: 'Build log',
    readTime: '8 min read',
    date: 'Draft · not published',
    description: 'What worked, what broke, and what personal AI tooling still gets wrong about context and reliable actions.',
    featured: true,
  },
  {
    title: 'What Building for Rural Communities Taught Me About Product Design',
    category: 'Product design',
    readTime: '6 min read',
    date: 'Draft · not published',
    description: 'Why field context, language, trust, and assisted use matter more than adding another feature.',
  },
  {
    title: 'Why Personal AI Assistants Need Better Memory and Tooling',
    category: 'AI systems',
    readTime: '7 min read',
    date: 'Draft · not published',
    description: 'A practical look at memory boundaries, tool permissions, prompt injection, failure recovery, and observability.',
  },
  {
    title: 'Building Offline-First Applications for India',
    category: 'Engineering',
    readTime: '9 min read',
    date: 'Draft · not published',
    description: 'Designing dependable workflows for intermittent connectivity, modest hardware, and multilingual interfaces.',
  },
  {
    title: 'What I Learned from Building PennPathai',
    category: 'Social impact',
    readTime: '6 min read',
    date: 'Draft · not published',
    description: 'Lessons from turning scheme discovery into explainable, human-centred action rather than a black-box recommendation.',
  },
]

const PAGE_META = {
  '/': ['Adithya S — AI Developer & Product Builder', 'Portfolio of Adithya S, a CSE student in Chennai building AI, civic technology, education products, and private automation systems.'],
  '/about': ['About — Adithya S', 'About Adithya S: a CSE student, AI developer, product builder, and researcher based in Chennai, India.'],
  '/projects': ['Projects — Adithya S', 'Case studies covering PennPathai, Grama Arivu, LearnFlow, and personal AI infrastructure.'],
  '/research': ['Research — Adithya S', 'Applied research interests in rural governance, explainable AI, education, personal assistants, and offline-first systems.'],
  '/writing': ['Writing — Adithya S', 'Drafts and essays on AI systems, product design, civic technology, and building useful software.'],
  '/now': ['Now — Adithya S', 'What Adithya is learning, building, and focusing on now.'],
  '/contact': ['Contact — Adithya S', 'Contact Adithya S for student collaborations, product discussions, open source, and research.'],
}

function normalisePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

function toAppPath(pathname) {
  const withoutBase = BASE_PATH && pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length) || '/'
    : pathname
  return normalisePath(withoutBase)
}

function toBrowserPath(pathname) {
  const appPath = normalisePath(pathname)
  return `${BASE_PATH}${appPath === '/' ? '/' : appPath}` || '/'
}

function usePath() {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setPath(toAppPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return path
}

function navigate(href) {
  const next = normalisePath(href)
  if (toAppPath(window.location.pathname) !== next) {
    window.history.pushState({}, '', toBrowserPath(next))
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function Link({ href, children, className = '', onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!href.startsWith('/')) return
    event.preventDefault()
    navigate(href)
  }

  const browserHref = href.startsWith('/') ? toBrowserPath(href) : href
  return <a href={browserHref} className={className} onClick={handleClick} {...props}>{children}</a>
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('adithya-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('adithya-theme', theme)
  }, [theme])

  return [theme, setTheme]
}

function useMetadata(path) {
  useEffect(() => {
    const project = path.startsWith('/projects/') ? PROJECTS.find((item) => `/projects/${item.slug}` === path) : null
    const [title, description] = project
      ? [`${project.name} — Adithya S`, project.summary]
      : PAGE_META[path] || ['Page not found — Adithya S', 'The requested page could not be found.']

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE.domain}${path === '/' ? '' : path}`)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${SITE.domain}${path === '/' ? '' : path}`
  }, [path])
}

function setMeta(attribute, key, value) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

function App() {
  const path = usePath()
  const [theme, setTheme] = useTheme()
  useMetadata(path)

  let page
  if (path === '/') page = <HomePage />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/projects') page = <ProjectsPage />
  else if (path.startsWith('/projects/')) page = <ProjectPage slug={path.split('/').pop()} />
  else if (path === '/research') page = <ResearchPage />
  else if (path === '/writing') page = <WritingPage />
  else if (path === '/now') page = <NowPage />
  else if (path === '/contact') page = <ContactPage />
  else page = <NotFoundPage />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header path={path} theme={theme} setTheme={setTheme} />
      <main id="main-content">{page}</main>
      <Footer />
    </div>
  )
}

function Header({ path, theme, setTheme }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="wordmark" aria-label="Adithya S home">
          <span className="wordmark-mark">A</span>
          <span>ADITHYA</span>
          <small>/01</small>
        </Link>

        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          {NAV_ITEMS.map(([label, href]) => {
            const active = href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`)
            return <Link key={href} href={href} className={active ? 'nav-link active' : 'nav-link'}>{label}</Link>
          })}
        </nav>

        <div className="nav-actions">
          <button className="icon-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="nav-cta" href="/contact">Let’s talk <ArrowUpRight size={16} /></Link>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-wordmark">ADITHYA<span>.</span></div>
          <p>Building useful technology for real-world problems.</p>
        </div>
        <div className="footer-links">
          <a href={SITE.github} target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
          <a href={`mailto:${SITE.email}`}><Mail size={17} /> Email</a>
          <span className="placeholder-link">LinkedIn · add URL</span>
          <span className="placeholder-link">Medium · add URL</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Adithya S</span>
        <span>{SITE.location}</span>
        <span>Built for speed, clarity, and easy updates.</span>
      </div>
    </footer>
  )
}

function PageHeader({ label, title, intro, children }) {
  return (
    <section className="page-header container">
      <p className="section-label"><span />{label}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
      {children}
    </section>
  )
}

function SectionHeading({ label, title, note, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-label"><span />{label}</p>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
      {action}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy reveal">
          <div className="status-pill"><CircleDot size={15} /> Building from Chennai, India</div>
          <p className="hero-kicker">CSE student · AI developer · product builder</p>
          <h1>Hi, I’m Adithya.<br /><span>I build useful systems.</span></h1>
          <p className="hero-intro">I build AI-powered and human-centred products for practical problems—from rural governance and student work to private automation infrastructure.</p>
          <div className="button-row">
            <Link className="button primary" href="/projects">View my work <ArrowRight size={18} /></Link>
            <Link className="button secondary" href="/about">Read about me <ChevronRight size={18} /></Link>
          </div>
          <div className="social-row" aria-label="Profile links">
            <a href={SITE.github} target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
            <a href={`mailto:${SITE.email}`}><Mail size={17} /> Email</a>
            <span>LinkedIn · add URL</span>
            <span>Medium · add URL</span>
          </div>
        </div>

        <div className="hero-system reveal delay-1" aria-label="A visual map of Adithya's work">
          <div className="system-topline"><span>ADITHYA / BUILD SYSTEM</span><span>2026.08</span></div>
          <div className="system-core">
            <div className="core-ring ring-one" />
            <div className="core-ring ring-two" />
            <div className="core-node"><Code2 size={34} /><span>PROBLEM</span><strong>→ PRODUCT</strong></div>
            <div className="orbit-label label-one">AI SYSTEMS</div>
            <div className="orbit-label label-two">CIVIC TECH</div>
            <div className="orbit-label label-three">EDTECH</div>
            <div className="orbit-label label-four">RESEARCH</div>
          </div>
          <div className="system-console">
            <span><b>01</b> Understand the real context</span>
            <span><b>02</b> Build the simplest dependable path</span>
            <span><b>03</b> Test, document, and improve</span>
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="container signal-grid">
          <div><Sparkles size={17} /><span>AI with clear boundaries</span></div>
          <div><ShieldCheck size={17} /><span>Privacy-conscious systems</span></div>
          <div><Zap size={17} /><span>Lightweight, maintainable builds</span></div>
          <div><Users size={17} /><span>Human-centred product decisions</span></div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          label="Selected projects"
          title="Work shaped around real constraints"
          note="Four evolving projects across social impact, civic systems, education, and personal AI infrastructure."
          action={<Link href="/projects" className="text-link">All projects <ArrowRight size={16} /></Link>}
        />
        <div className="project-grid compact-grid">
          {PROJECTS.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} compact />)}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container focus-layout">
          <div>
            <p className="section-label"><span />Current focus</p>
            <h2>Learning deeply.<br />Shipping steadily.</h2>
            <p className="section-copy">I’m strengthening fundamentals while building products that force me to understand users, systems, and trade-offs—not just frameworks.</p>
            <Link href="/now" className="text-link">See what I’m doing now <ArrowRight size={16} /></Link>
          </div>
          <div className="focus-list">
            {[
              ['01', 'Java and data structures', 'Strengthening the foundations required for problem solving and GATE CSE.'],
              ['02', 'PennPathai and Grama Arivu', 'Turning social-impact ideas into testable, field-aware products.'],
              ['03', 'AI agents and MCP', 'Exploring useful memory, tool reliability, permissions, and failure recovery.'],
              ['04', 'Research and technical writing', 'Learning to separate evidence, claims, novelty, and limitations.'],
            ].map(([number, title, text]) => <article key={number} className="focus-item"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading label="Recent writing" title="Notes from building and learning" note="These are working drafts. Publication links will be added only when each article is ready." />
        <div className="article-grid home-articles">
          {ARTICLES.slice(0, 3).map((article) => <ArticleCard key={article.title} article={article} />)}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container skill-preview">
          <div>
            <p className="section-label light"><span />Technologies</p>
            <h2>Tools I use to move from idea to working system.</h2>
          </div>
          <div className="skill-cloud">
            {SKILLS.flatMap((group) => group.items).map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

function ProjectCard({ project, index, compact = false }) {
  const Icon = project.icon
  return (
    <article className={`project-card project-tone-${(index % 4) + 1}`}>
      <div className="project-card-top">
        <div className="project-icon"><Icon size={22} /></div>
        <span className="project-index">0{index + 1}</span>
      </div>
      <p className="project-category">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="project-summary">{project.summary}</p>
      {!compact && (
        <div className="project-facts">
          <Fact label="Problem" value={project.problem} />
          <Fact label="Solution" value={project.solution} />
          <Fact label="Role" value={project.role} />
          <Fact label="Status" value={project.status} />
        </div>
      )}
      <div className="tag-list">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-actions">
        <Link href={`/projects/${project.slug}`} className="text-link">Case study <ArrowRight size={16} /></Link>
        <span className="placeholder-action">GitHub / demo link pending</span>
      </div>
    </article>
  )
}

function Fact({ label, value }) {
  return <div className="fact"><span>{label}</span><p>{value}</p></div>
}

function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={<>I like turning unclear problems into <span>useful software.</span></>}
        intro="I’m Adithya, a Computer Science Engineering student from Chennai. I work across AI, full-stack development, automation, cloud systems, Linux, robotics, product design, open source, hackathons, and applied research."
      />

      <section className="section container story-grid">
        <div className="story-number">01</div>
        <div><p className="section-label"><span />My direction</p><h2>Technology should make the next step clearer.</h2></div>
        <div className="prose">
          <p>I care about building technology that is affordable, maintainable, privacy-conscious, and genuinely useful—especially for students and underserved communities.</p>
          <p>That means questioning whether AI is necessary, designing for modest devices and imperfect connectivity, keeping important decisions explainable, and leaving a dependable non-AI path when automation fails.</p>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container split-cards">
          <InfoCard icon={BookOpen} title="What I’m learning" items={['Java and data structures', 'GATE CSE foundations', 'AI agent architecture and MCP', 'Research methods and technical writing', 'Robotics and cloud systems']} />
          <InfoCard icon={Lightbulb} title="What I build" items={['Social-impact applications', 'Civic and education products', 'Full-stack prototypes', 'Private automation systems', 'Developer tools and infrastructure']} />
          <InfoCard icon={ShieldCheck} title="My principles" items={['Solve the real problem first', 'Keep systems simple and reversible', 'Protect privacy and user trust', 'Explain uncertainty and limitations', 'Measure usefulness, not feature count']} />
        </div>
      </section>

      <section className="section container">
        <SectionHeading label="Education and participation" title="Learning through coursework, field problems, and building" />
        <div className="timeline-grid">
          <article className="timeline-card">
            <GraduationCap size={22} />
            <span>Education</span>
            <h3>B.E. Computer Science Engineering</h3>
            <p>Sri Sairam Engineering College, Chennai · Currently studying</p>
          </article>
          <article className="timeline-card">
            <Users size={22} />
            <span>Leadership</span>
            <h3>Student-led product and social-impact work</h3>
            <p>Contributing to rural development, digital governance, project coordination, and collaborative builds.</p>
          </article>
          <article className="timeline-card">
            <FlaskConical size={22} />
            <span>Hackathons</span>
            <h3>Building under real constraints</h3>
            <p>Using hackathons to practise discovery, rapid prototyping, validation, communication, and technical trade-offs.</p>
          </article>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading label="Technologies I use" title="A practical toolkit, not a scorecard" note="No percentage bars. I use different tools depending on the problem, constraints, and maintenance cost." />
          <div className="skill-groups">{SKILLS.map((group) => <SkillGroup key={group.title} group={group} />)}</div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

function InfoCard({ icon: Icon, title, items }) {
  return <article className="info-card"><div className="info-icon"><Icon size={21} /></div><h3>{title}</h3><ul>{items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></article>
}

function SkillGroup({ group }) {
  const Icon = group.icon
  return <article className="skill-group"><div className="skill-group-title"><Icon size={20} /><h3>{group.title}</h3></div><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>
}

function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title={<>Products built around <span>real users and constraints.</span></>}
        intro="These are evolving case studies, not inflated success stories. Each project starts with a problem, documents the current stage, and makes the next validation step visible."
      />
      <section className="section container">
        <div className="project-grid full-grid">
          {PROJECTS.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>
      <ContactCTA />
    </>
  )
}

function ProjectPage({ slug }) {
  const project = PROJECTS.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage />
  const Icon = project.icon

  return (
    <>
      <section className="case-hero container">
        <Link href="/projects" className="back-link">← All projects</Link>
        <div className="case-hero-grid">
          <div>
            <p className="section-label"><span />{project.category}</p>
            <h1>{project.name}</h1>
            <p className="case-eyebrow">{project.eyebrow}</p>
            <p className="page-intro">{project.summary}</p>
          </div>
          <div className="case-badge"><Icon size={42} /><span>Current status</span><strong>{project.status}</strong></div>
        </div>
      </section>

      <section className="section container case-facts-grid">
        <Fact label="Problem" value={project.problem} />
        <Fact label="Solution" value={project.solution} />
        <Fact label="My role" value={project.role} />
        <div className="fact"><span>Technology</span><div className="tag-list large">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></div>
      </section>

      <section className="section section-muted">
        <div className="container case-columns">
          <div><p className="section-label"><span />Design principles</p><h2>Rules guiding the build</h2></div>
          <ol className="principle-list">{project.principles.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
        </div>
      </section>

      <section className="section container case-columns">
        <div><p className="section-label"><span />Next validation</p><h2>What needs to happen next</h2><p className="section-copy">The project remains a work in progress. These steps matter more than adding another surface-level feature.</p></div>
        <div className="next-list">{project.next.map((item) => <div key={item}><CircleDot size={18} /><p>{item}</p></div>)}</div>
      </section>

      <section className="section container project-link-panel">
        <div><p className="section-label"><span />Links</p><h2>Repository and live demo</h2><p>Public links are intentionally marked as pending until the correct repository and stable demo are selected.</p></div>
        <div><span className="placeholder-button">GitHub link pending</span><span className="placeholder-button">Live demo pending</span></div>
      </section>
      <ContactCTA />
    </>
  )
}

function ResearchPage() {
  return (
    <>
      <PageHeader
        label="Research"
        title={<>Applied questions at the edge of <span>AI, people, and systems.</span></>}
        intro="My research interests begin with practical problems. Each topic is structured to grow into a literature survey, experiment, dataset, prototype, presentation, or paper without pretending that the evidence already exists."
      />
      <section className="section container research-grid">
        {RESEARCH.map((item, index) => <article className="research-card" key={item.title}>
          <div className="research-card-top"><span>R-{String(index + 1).padStart(2, '0')}</span><FlaskConical size={21} /></div>
          <p className="research-status">Exploration</p>
          <h2>{item.title}</h2>
          <div className="research-block"><span>Research question</span><p>{item.question}</p></div>
          <div className="research-block"><span>Possible methodology</span><p>{item.method}</p></div>
          <div className="tag-list">{item.outputs.map((output) => <span key={output}>{output}</span>)}</div>
        </article>)}
      </section>
      <section className="section section-dark">
        <div className="container research-note">
          <FileText size={34} />
          <div><p className="section-label light"><span />Research standard</p><h2>Evidence before claims.</h2><p>I want every future study here to state the research gap, method, metrics, limitations, ethics, feasibility, and what would falsify the idea.</p></div>
        </div>
      </section>
      <ContactCTA />
    </>
  )
}

function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing"
        title={<>Build notes, research questions, and <span>lessons worth keeping.</span></>}
        intro="The articles below are honest placeholders for work in progress. No publication links or dates are invented; each card clearly shows its current draft status."
      />
      <section className="section container">
        <div className="featured-article">
          <div>
            <p className="section-label"><span />Featured draft</p>
            <h2>{ARTICLES[0].title}</h2>
            <p>{ARTICLES[0].description}</p>
            <div className="article-meta"><span>{ARTICLES[0].category}</span><span><Clock size={14} />{ARTICLES[0].readTime}</span><span>{ARTICLES[0].date}</span></div>
          </div>
          <div className="featured-code" aria-hidden="true"><span>tool.connect()</span><span>context.retrieve()</span><span className="code-warn">// reliability still matters</span><span>action.confirm()</span></div>
        </div>
        <div className="article-grid writing-grid">{ARTICLES.slice(1).map((article) => <ArticleCard key={article.title} article={article} />)}</div>
      </section>
      <ContactCTA />
    </>
  )
}

function ArticleCard({ article }) {
  return <article className="article-card"><div className="article-card-top"><BookOpen size={20} /><span>{article.category}</span></div><h3>{article.title}</h3><p>{article.description}</p><div className="article-meta"><span><Clock size={14} />{article.readTime}</span><span>{article.date}</span></div><span className="draft-link">Draft in progress</span></article>
}

function NowPage() {
  const focuses = [
    ['Strengthening Java and data structures', 'Building stronger problem-solving fundamentals through small, consistent practice.'],
    ['Preparing for GATE CSE', 'Creating a serious foundation in core computer science subjects rather than relying on last-minute revision.'],
    ['Building PennPathai and Grama Arivu', 'Improving product clarity, validation, field fit, multilingual UX, and technical reliability.'],
    ['Learning AI agent architecture and MCP', 'Studying memory, tool contracts, prompt injection, permission boundaries, and failure recovery.'],
    ['Improving research and technical writing', 'Practising evidence-based claims, literature comparison, methodology, metrics, and limitations.'],
    ['Participating in hackathons and open source', 'Using constrained builds to improve execution, collaboration, documentation, and portfolio quality.'],
  ]

  return (
    <>
      <PageHeader
        label="Now"
        title={<>What I’m doing <span>right now.</span></>}
        intro="A simple public snapshot of my current priorities. This page is intentionally editable and should change when the work changes."
      >
        <div className="updated-pill"><Clock size={15} /> Last updated: 1 August 2026</div>
      </PageHeader>
      <section className="section container now-list">
        {focuses.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}
      </section>
      <section className="section section-muted">
        <div className="container now-rule"><Terminal size={30} /><div><p className="section-label"><span />Operating rule</p><h2>Keep the plan smaller than the work.</h2><p>Fundamentals, one useful product slice, honest documentation, and a recoverable routine matter more than pretending everything is a priority.</p></div></div>
      </section>
      <ContactCTA />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title={<>Let’s build something <span>useful.</span></>}
        intro="Reach out for student collaborations, open-source work, research discussions, hackathons, or a practical product problem worth exploring."
      />
      <section className="section container contact-grid">
        <div className="contact-details-panel">
          <h2>Start with the problem.</h2>
          <p>A short note about who the user is, what is currently difficult, and what outcome matters is more useful than a long feature list.</p>
          <div className="contact-links">
            <a href={`mailto:${SITE.email}`}><Mail size={19} /><div><span>Email</span><strong>{SITE.email}</strong></div></a>
            <a href={SITE.github} target="_blank" rel="noreferrer"><GitBranch size={19} /><div><span>GitHub</span><strong>github.com/adithya-hmt</strong></div></a>
            <div className="contact-placeholder"><ExternalLink size={19} /><div><span>LinkedIn</span><strong>Add profile URL</strong></div></div>
            <div className="contact-placeholder"><BookOpen size={19} /><div><span>Medium</span><strong>Add publication URL</strong></div></div>
            <div className="contact-placeholder"><MapPin size={19} /><div><span>Location</span><strong>{SITE.location}</strong></div></div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  )
}

function ContactForm() {
  const startedAt = useRef(Date.now())
  const [state, setState] = useState({ type: 'idle', message: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const subject = String(form.get('subject') || '').trim()
    const message = String(form.get('message') || '').trim()
    const website = String(form.get('website') || '').trim()

    if (website) {
      setState({ type: 'success', message: 'Thanks. Your message has been processed.' })
      return
    }
    if (Date.now() - startedAt.current < 1500) {
      setState({ type: 'error', message: 'Please take a moment to review the form and submit it again.' })
      return
    }
    if (name.length < 2 || subject.length < 3 || message.length < 20 || !/^\S+@\S+\.\S+$/.test(email)) {
      setState({ type: 'error', message: 'Please enter a valid email and a message of at least 20 characters.' })
      return
    }

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const mailSubject = encodeURIComponent(subject)
    setState({ type: 'success', message: 'Your email app should open with a pre-filled draft. The website has not silently stored your message.' })
    window.location.href = `mailto:${SITE.email}?subject=${mailSubject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><span>MESSAGE / 01</span><h2>Tell me what you’re working on.</h2></div>
      <div className="form-row">
        <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      </div>
      <label>Subject<input name="subject" placeholder="What would you like to discuss?" required /></label>
      <label>Message<textarea name="message" rows="7" placeholder="Share the problem, context, and useful outcome…" required /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {state.type !== 'idle' && <div className={`form-state ${state.type}`} role="status" aria-live="polite">{state.type === 'success' ? <Check size={17} /> : <CircleDot size={17} />}{state.message}</div>}
      <button className="button primary submit-button" type="submit">Open email draft <Send size={17} /></button>
      <p className="privacy-note"><ShieldCheck size={15} />This form uses a honeypot and timing check for basic spam protection. It opens your email client and does not require exposed API credentials.</p>
    </form>
  )
}

function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container contact-cta-inner">
        <div><p className="section-label light"><span />Contact</p><h2>Have a problem worth understanding?</h2><p>Let’s start with context, users, constraints, and the smallest useful outcome.</p></div>
        <Link href="/contact" className="button light-button">Start a conversation <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found container">
      <span>404 / ROUTE NOT FOUND</span>
      <h1>This page is outside the current system.</h1>
      <p>The link may be outdated, or the page has not been published yet.</p>
      <Link href="/" className="button primary">Return home <ArrowRight size={18} /></Link>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
