import { useState, useEffect, useRef } from 'react'
import './App.css'

// Icons as simple SVG components
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
)

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
)

// Data
const projects = [
  {
    title: 'Cloud Infrastructure Platform',
    description: 'A full-stack platform for managing cloud resources with real-time monitoring, auto-scaling policies, and cost optimization dashboards.',
    tags: ['React', 'Node.js', 'AWS', 'Terraform', 'PostgreSQL'],
    github: '#',
    live: '#',
  },
  {
    title: 'AI-Powered Code Review',
    description: 'Automated code review tool that uses machine learning to detect bugs, security vulnerabilities, and suggest improvements.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'Docker', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    title: 'Real-Time Collaboration Editor',
    description: 'A collaborative document editor with conflict-free replicated data types (CRDTs) supporting simultaneous multi-user editing.',
    tags: ['TypeScript', 'WebSocket', 'Yjs', 'React', 'Express'],
    github: '#',
    live: '#',
  },
  {
    title: 'E-Commerce Microservices',
    description: 'Scalable e-commerce backend built with microservices architecture, event-driven communication, and distributed tracing.',
    tags: ['Go', 'gRPC', 'Kafka', 'Kubernetes', 'MongoDB'],
    github: '#',
    live: '#',
  },
]

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'] },
  { category: 'Tools', items: ['Git', 'Linux', 'Figma', 'Jira', 'Datadog'] },
]

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'Tech Corp',
    period: '2023 — Present',
    description: 'Leading development of cloud-native applications serving 2M+ users. Architected microservices migration reducing latency by 40%.',
  },
  {
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2021 — 2023',
    description: 'Built and shipped 3 products from zero to production. Implemented CI/CD pipelines and established engineering best practices.',
  },
  {
    role: 'Software Engineer',
    company: 'Digital Agency',
    period: '2019 — 2021',
    description: 'Developed high-performance web applications for enterprise clients. Mentored junior developers and led code review processes.',
  },
]

function useIntersectionObserver(options = {}) {
  const [entries, setEntries] = useState([])
  const [nodes, setNodes] = useState([])
  const observer = useRef(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries)
    }, { threshold: 0.1, ...options })

    nodes.forEach((node) => {
      if (node) observer.current.observe(node)
    })

    return () => observer.current.disconnect()
  }, [nodes])

  return [setNodes, entries]
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__container">
          <a className="nav__logo" onClick={() => scrollTo('hero')}>
            <span className="nav__logo-bracket">&lt;</span>
            JD
            <span className="nav__logo-bracket"> /&gt;</span>
          </a>

          <button
            className={`nav__hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <li key={item}>
                <a
                  className={`nav__link ${activeSection === item ? 'nav__link--active' : ''}`}
                  onClick={() => scrollTo(item)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a className="nav__resume-btn" href="#" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero__content">
          <p className="hero__greeting">Hi, my name is</p>
          <h1 className="hero__name">Julius Developer.</h1>
          <h2 className="hero__tagline">I build things for the web.</h2>
          <p className="hero__description">
            I'm a software engineer specializing in building exceptional digital experiences.
            Currently focused on building scalable, accessible, and performant web applications.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" onClick={() => scrollTo('projects')}>
              View My Work
            </a>
            <a className="btn btn--outline" onClick={() => scrollTo('contact')}>
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero__scroll" onClick={() => scrollTo('about')}>
          <ArrowDownIcon />
        </div>
      </section>

      {/* About */}
      <section id="about" className="section about">
        <div className="container">
          <h2 className="section__title fade-up">
            <span className="section__number">01.</span> About Me
          </h2>
          <div className="about__content fade-up">
            <div className="about__text">
              <p>
                Hello! I'm Julius, a passionate software engineer who loves turning complex problems
                into simple, elegant solutions. My journey in tech started when I built my first
                website at 15, and I've been hooked ever since.
              </p>
              <p>
                I specialize in full-stack development with a focus on modern JavaScript ecosystems.
                I care deeply about writing clean, maintainable code and creating intuitive user
                experiences that make a real impact.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects,
                writing technical articles, or exploring new technologies.
              </p>
            </div>
            <div className="about__image">
              <div className="about__image-wrapper">
                <div className="about__image-placeholder">
                  <span>JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section skills">
        <div className="container">
          <h2 className="section__title fade-up">
            <span className="section__number">02.</span> Skills & Technologies
          </h2>
          <div className="skills__grid fade-up">
            {skills.map((group) => (
              <div key={group.category} className="skills__card">
                <h3 className="skills__category">{group.category}</h3>
                <ul className="skills__list">
                  {group.items.map((skill) => (
                    <li key={skill} className="skills__item">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section projects">
        <div className="container">
          <h2 className="section__title fade-up">
            <span className="section__number">03.</span> Featured Projects
          </h2>
          <div className="projects__grid">
            {projects.map((project, index) => (
              <article key={index} className="project-card fade-up">
                <div className="project-card__header">
                  <div className="project-card__folder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
                  </div>
                  <div className="project-card__links">
                    <a href={project.github} aria-label="GitHub" className="project-card__icon-link">
                      <GithubIcon />
                    </a>
                    <a href={project.live} aria-label="Live demo" className="project-card__icon-link">
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
                <ul className="project-card__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section experience">
        <div className="container">
          <h2 className="section__title fade-up">
            <span className="section__number">04.</span> Experience
          </h2>
          <div className="experience__timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="experience__item fade-up">
                <div className="experience__dot"></div>
                <div className="experience__content">
                  <h3 className="experience__role">{exp.role}</h3>
                  <p className="experience__company">{exp.company}</p>
                  <p className="experience__period">{exp.period}</p>
                  <p className="experience__description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <div className="container">
          <h2 className="section__title fade-up">
            <span className="section__number">05.</span> Get In Touch
          </h2>
          <div className="contact__content fade-up">
            <p className="contact__text">
              I'm currently open to new opportunities and always happy to connect.
              Whether you have a project in mind, a question, or just want to say hi —
              my inbox is always open.
            </p>
            <a className="btn btn--primary btn--large" href="mailto:hello@juliusdev.com">
              Say Hello
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__socials">
          <a href="#" aria-label="GitHub"><GithubIcon /></a>
          <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="mailto:hello@juliusdev.com" aria-label="Email"><MailIcon /></a>
        </div>
        <p className="footer__credit">
          Designed & Built by Julius Developer
        </p>
        <p className="footer__copyright">© 2026 All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
