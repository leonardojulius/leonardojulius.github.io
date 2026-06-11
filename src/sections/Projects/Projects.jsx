import { useState, useEffect } from 'react'
import { projects } from '../../data'
import { GithubIcon, ExternalLinkIcon, FolderIcon, EyeIcon, DesktopIcon, TabletIcon, MobileIcon, CloseIcon } from '../../components/Icons'
import './Projects.css'

function Projects() {
  const [expandedItems, setExpandedItems] = useState({})
  const [previewProject, setPreviewProject] = useState(null)
  const [deviceView, setDeviceView] = useState('desktop')

  // Extract unique categories (excluding any null/undefined)
  const uniqueCategories = [...new Set(projects.map(p => p.category).filter(Boolean))]

  const toggleExpand = (category) => {
    setExpandedItems((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [previewProject])

  const openPreview = (project) => {
    setPreviewProject(project)
    setDeviceView('desktop')
  }

  const isWebDesign = (project) => project.category === 'Web Design'

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section__header fade-up" style={{ marginBottom: '2rem' }}>
          <h2 className="section__title" style={{ marginBottom: 0 }}>
            Featured Projects
          </h2>
        </div>

        <div className="projects__timeline">
          {uniqueCategories.map((category, index) => {
            const isExpanded = expandedItems[category]

            // Get all projects for this category
            const categoryProjects = projects.filter(p => p.category === category)

            return (
              <div key={category} className="projects__item fade-up">
                <div className="projects__dot"></div>
                <div className="projects__content">
                  <h3 className="projects__title">{category}</h3>
                  <p className="projects__category-label">{categoryProjects.length} Projects</p>

                  <button
                    className="projects__expand-btn"
                    onClick={() => toggleExpand(category)}
                  >
                    {isExpanded ? 'Hide projects' : 'Show projects'}
                    <span className={`projects__expand-icon ${isExpanded ? 'open' : ''}`}>▼</span>
                  </button>

                  {isExpanded && (
                    <div className="projects__details">
                      <div className="projects__grid">
                        {categoryProjects.map((project, i) => (
                          isWebDesign(project) ? (
                            /* ===== Web Design Card with prominent image ===== */
                            <article key={i} className="project-card project-card--webdesign">
                              <div
                                className="project-card__preview-image"
                                onClick={() => openPreview(project)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && openPreview(project)}
                              >
                                {project.image && (
                                  <img src={project.image} alt={project.title} className="project-card__image" />
                                )}
                                <div className="project-card__overlay">
                                  <span className="project-card__overlay-btn">
                                    <EyeIcon /> Preview Layout
                                  </span>
                                </div>
                              </div>
                              <div className="project-card__info">
                                <div className="project-card__info-top">
                                  <h3 className="project-card__title">{project.title}</h3>
                                  <div className="project-card__links">
                                    {project.github && project.github !== '#' && (
                                      <a href={project.github} aria-label="GitHub" className="project-card__icon-link" target="_blank" rel="noopener noreferrer">
                                        <GithubIcon />
                                      </a>
                                    )}
                                    {project.live && project.live !== '#' && (
                                      <a href={project.live} aria-label="Live demo" className="project-card__icon-link" target="_blank" rel="noopener noreferrer">
                                        <ExternalLinkIcon />
                                      </a>
                                    )}
                                  </div>
                                </div>
                                <p className="project-card__description">{project.description}</p>
                                {project.tags && (
                                  <ul className="project-card__tags">
                                    {project.tags.map((tag) => (
                                      <li key={tag}>{tag}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </article>
                          ) : (
                            /* ===== Default card (non-web-design) ===== */
                            <article key={i} className="project-card">
                              <div className="project-card__header">
                                <div className="project-card__folder">
                                  <FolderIcon />
                                </div>
                                <div className="project-card__links">
                                  {project.github && project.github !== '#' && (
                                    <a href={project.github} aria-label="GitHub" className="project-card__icon-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                      <GithubIcon />
                                    </a>
                                  )}
                                  {project.live && project.live !== '#' && (
                                    <a href={project.live} aria-label="Live demo" className="project-card__icon-link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                      <ExternalLinkIcon />
                                    </a>
                                  )}
                                </div>
                              </div>

                              {project.image && (
                                <div className="project-card__image-container">
                                  <img src={project.image} alt={project.title} className="project-card__image" />
                                </div>
                              )}

                              <h3 className="project-card__title">{project.title}</h3>
                              <p className="project-card__description">{project.description}</p>

                              {project.tags && (
                                <ul className="project-card__tags">
                                  {project.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                  ))}
                                </ul>
                              )}
                            </article>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ===== Preview Modal ===== */}
      {previewProject && (
        <div className="preview-modal" onClick={() => setPreviewProject(null)}>
          <div className="preview-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal__header">
              <h3 className="preview-modal__title">{previewProject.title}</h3>
              <div className="preview-modal__controls">
                <div className="preview-modal__device-group">
                  <button
                    className={`preview-modal__device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
                    onClick={() => setDeviceView('mobile')}
                    title="Mobile View"
                  >
                    <MobileIcon />
                    <span className="preview-modal__device-label">Mobile</span>
                  </button>
                  <button
                    className={`preview-modal__device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
                    onClick={() => setDeviceView('tablet')}
                    title="Tablet View"
                  >
                    <TabletIcon />
                    <span className="preview-modal__device-label">Tablet</span>
                  </button>
                  <button
                    className={`preview-modal__device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
                    onClick={() => setDeviceView('desktop')}
                    title="Desktop View"
                  >
                    <DesktopIcon />
                    <span className="preview-modal__device-label">Desktop</span>
                  </button>
                </div>
                <button className="preview-modal__close-btn" onClick={() => setPreviewProject(null)} title="Close Preview">
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="preview-modal__body-wrapper">
              <div className={`preview-modal__body device-${deviceView}`}>
                {previewProject.live && previewProject.live !== '#' ? (
                  <iframe src={previewProject.live} title={previewProject.title} className="preview-modal__iframe" />
                ) : previewProject.image ? (
                  <img src={previewProject.image} alt={previewProject.title} className="preview-modal__image-fallback" />
                ) : (
                  <div className="preview-modal__no-preview">No preview available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Projects
