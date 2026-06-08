import { useState } from 'react'
import { webDesigns } from '../../data'
import { GithubIcon, ExternalLinkIcon } from '../../components/Icons'
import './WebDesigns.css'

const DEVICE_SIZES = {
  mobile: { width: 375, label: 'Mobile', icon: '📱' },
  tablet: { width: 768, label: 'Tablet', icon: '📟' },
  desktop: { width: '100%', label: 'Desktop', icon: '🖥️' },
}

function WebDesigns() {
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [activeDevice, setActiveDevice] = useState('desktop')

  const handleOpenPreview = (design) => {
    setSelectedDesign(design)
    setActiveDevice('desktop')
  }

  const handleClose = () => {
    setSelectedDesign(null)
  }

  return (
    <section id="webdesigns" className="section webdesigns">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">04.</span> Web Designs
        </h2>
        <p className="webdesigns__subtitle fade-up">
          Front-end projects showcasing responsive design, modern UI patterns, and clean code architecture.
        </p>

        <div className="webdesigns__grid">
          {webDesigns.map((design, index) => (
            <article key={index} className="webdesign-card fade-up">
              {/* Live Preview Thumbnail */}
              <div
                className="webdesign-card__preview"
                onClick={() => handleOpenPreview(design)}
              >
                <div className="webdesign-card__iframe-wrapper">
                  {design.image ? (
                    <img 
                      src={design.image} 
                      alt={`${design.title} preview`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <iframe
                      src={design.previewUrl}
                      title={`${design.title} preview`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                      scrolling="no"
                    />
                  )}
                </div>
                <div className="webdesign-card__preview-overlay">
                  <span className="webdesign-card__preview-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Preview
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="webdesign-card__body">
                <h3 className="webdesign-card__title">{design.title}</h3>
                <p className="webdesign-card__description">{design.description}</p>
                <ul className="webdesign-card__tags">
                  {design.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="webdesign-card__actions">
                  <button
                    className="webdesign-card__btn webdesign-card__btn--preview"
                    onClick={() => handleOpenPreview(design)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Live Preview
                  </button>
                  <a
                    href={design.github}
                    className="webdesign-card__btn webdesign-card__btn--github"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon /> Repository
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedDesign && (
        <div className="preview-overlay" onClick={handleClose}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Toolbar */}
            <div className="preview-modal__toolbar">
              <div className="preview-modal__title-area">
                <span className="preview-modal__dot preview-modal__dot--red" />
                <span className="preview-modal__dot preview-modal__dot--yellow" />
                <span className="preview-modal__dot preview-modal__dot--green" />
                <span className="preview-modal__toolbar-title">{selectedDesign.title}</span>
              </div>

              {/* Device Toggle */}
              <div className="preview-modal__devices">
                {Object.entries(DEVICE_SIZES).map(([key, device]) => (
                  <button
                    key={key}
                    className={`preview-modal__device-btn ${activeDevice === key ? 'active' : ''}`}
                    onClick={() => setActiveDevice(key)}
                    title={device.label}
                  >
                    <span className="device-icon">{device.icon}</span>
                    <span className="device-label">{device.label}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="preview-modal__actions">
                <a
                  href={selectedDesign.github}
                  className="preview-modal__action-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub Repository"
                >
                  <GithubIcon />
                </a>
                <a
                  href={selectedDesign.previewUrl}
                  className="preview-modal__action-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                >
                  <ExternalLinkIcon />
                </a>
                <button
                  className="preview-modal__close"
                  onClick={handleClose}
                  aria-label="Close preview"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="preview-modal__viewport">
              <div
                className="preview-modal__iframe-container"
                style={{
                  width: typeof DEVICE_SIZES[activeDevice].width === 'number'
                    ? `${DEVICE_SIZES[activeDevice].width}px`
                    : DEVICE_SIZES[activeDevice].width,
                }}
              >
                <iframe
                  src={selectedDesign.previewUrl}
                  title={`${selectedDesign.title} live preview`}
                  className="preview-modal__iframe"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default WebDesigns
