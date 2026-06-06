import { useState } from 'react'
import { projects } from '../../data'
import { GithubIcon, ExternalLinkIcon, FolderIcon } from '../../components/Icons'
import './Projects.css'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">03.</span> Featured Projects
        </h2>
        <div className="projects__grid">
          {projects.map((project, index) => (
            <article key={index} className="project-card fade-up" onClick={() => setSelectedProject(project)}>
              <div className="project-card__header">
                <div className="project-card__folder">
                  <FolderIcon />
                </div>
                <div className="project-card__links">
                  <a href={project.github} aria-label="GitHub" className="project-card__icon-link" onClick={(e) => e.stopPropagation()}>
                    <GithubIcon />
                  </a>
                  <a href={project.live} aria-label="Live demo" className="project-card__icon-link" onClick={(e) => e.stopPropagation()}>
                    <ExternalLinkIcon />
                  </a>
                </div>
              </div>
              {project.image && (
                <div className="project-card__image-container">
                  <img src={project.image} alt={project.title} className="project-card__image" />
                </div>
              )}
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

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              &times;
            </button>
            {selectedProject.image && (
              <div className="modal__image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
            )}
            <div className="modal__info">
              <h3 className="modal__title">{selectedProject.title}</h3>
              <p className="project-card__description" style={{margin: '1rem 0'}}>{selectedProject.description}</p>
              <ul className="project-card__tags" style={{justifyContent: 'center', marginBottom: '1.5rem'}}>
                {selectedProject.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="project-card__links" style={{justifyContent: 'center', gap: '1rem'}}>
                  <a href={selectedProject.github} aria-label="GitHub" className="modal__verify-link" target="_blank" rel="noopener noreferrer">
                    <GithubIcon /> GitHub
                  </a>
                  <a href={selectedProject.live} aria-label="Live demo" className="modal__verify-link" target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon /> Live Demo
                  </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
