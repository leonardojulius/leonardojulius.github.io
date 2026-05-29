import { projects } from '../../data'
import { GithubIcon, ExternalLinkIcon, FolderIcon } from '../../components/Icons'
import './Projects.css'

function Projects() {
  return (
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
                  <FolderIcon />
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
  )
}

export default Projects
