import { useState, useRef, useCallback } from 'react'
import { certificates, specializations } from '../../data'
import { CertificateIcon, ExternalLinkIcon } from '../../components/Icons'
import './Certificates.css'

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [expandedSpec, setExpandedSpec] = useState(null)
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [lensVisible, setLensVisible] = useState(false)
  const [fsLensVisible, setFsLensVisible] = useState(false)

  const lensRef = useRef(null)
  const imageContainerRef = useRef(null)
  
  const fsLensRef = useRef(null)
  const fsImageContainerRef = useRef(null)

  const ZOOM_FACTOR = 2.5

  const handleZoomMove = useCallback((e, containerRef, zoomLensRef, setVisible) => {
    const container = containerRef.current
    const lens = zoomLensRef.current
    if (!container || !lens) return

    const img = container.querySelector('img')
    if (!img) return

    const rect = img.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Keep lens within image bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setVisible(false)
      return
    }

    setVisible(true)

    const lensSize = 160
    const halfLens = lensSize / 2

    // Position lens centered on cursor
    lens.style.left = `${e.clientX - container.getBoundingClientRect().left - halfLens}px`
    lens.style.top = `${e.clientY - container.getBoundingClientRect().top - halfLens}px`

    // Calculate background position for zoom
    const bgX = (x / rect.width) * 100
    const bgY = (y / rect.height) * 100

    lens.style.backgroundImage = `url(${img.src})`
    lens.style.backgroundSize = `${rect.width * ZOOM_FACTOR}px ${rect.height * ZOOM_FACTOR}px`
    lens.style.backgroundPosition = `${bgX}% ${bgY}%`
  }, [ZOOM_FACTOR])

  const handleMouseMove = useCallback((e) => {
    handleZoomMove(e, imageContainerRef, lensRef, setLensVisible)
  }, [handleZoomMove])

  const handleMouseLeave = useCallback(() => {
    setLensVisible(false)
  }, [])

  const handleFsMouseMove = useCallback((e) => {
    handleZoomMove(e, fsImageContainerRef, fsLensRef, setFsLensVisible)
  }, [handleZoomMove])

  const handleFsMouseLeave = useCallback(() => {
    setFsLensVisible(false)
  }, [])

  const handleImageClick = useCallback((imageSrc) => {
    setFullscreenImage(imageSrc)
  }, [])

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">05.</span> Specializations & Certifications
        </h2>

        {/* Specializations */}
        <div className="specializations">
          <h3 className="subsection__title fade-up">
            <span className="subsection__icon">🎓</span> Specializations
          </h3>
          <div className="specializations__grid">
            {specializations.map((spec, index) => (
              <div key={index} className="specialization-card fade-up">
                <div className="specialization-card__badge">Specialization</div>
                <div className="specialization-card__header">
                  <div className="specialization-card__icon">
                    {spec.icon ? (
                      <img src={spec.icon} alt={spec.issuer} className="specialization-card__icon-img" />
                    ) : (
                      <CertificateIcon />
                    )}
                  </div>
                  <div className="specialization-card__meta">
                    <h4 className="specialization-card__title">{spec.title}</h4>
                    <p className="specialization-card__issuer">{spec.issuer}</p>
                    <p className="specialization-card__date">{spec.date}</p>
                  </div>
                </div>

                {spec.courses && spec.courses.length > 0 && (
                  <div className="specialization-card__courses">
                    <button
                      className="specialization-card__courses-toggle"
                      onClick={() => setExpandedSpec(expandedSpec === index ? null : index)}
                    >
                      <span>{spec.courses.length} Courses Included</span>
                      <span className={`toggle-arrow ${expandedSpec === index ? 'open' : ''}`}>▾</span>
                    </button>
                    {expandedSpec === index && (
                      <ul className="specialization-card__course-list">
                        {spec.courses.map((course, i) => (
                          <li
                            key={i}
                            className="specialization-card__course-item specialization-card__course-item--clickable"
                            onClick={() => setSelectedCert(course)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedCert(course) }}
                          >
                            <span className="course-check">✓</span>
                            <span className="course-name">{course.name}</span>
                            <span className="course-view-icon" title="View certificate">
                              <ExternalLinkIcon />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <button onClick={() => setSelectedCert(spec)} className="specialization-card__link">
                  View Credential <ExternalLinkIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider fade-up"></div>

        {/* Certifications */}
        <div className="certifications">
          <h3 className="subsection__title fade-up">
            <span className="subsection__icon">📜</span> Certifications
          </h3>
          <div className="certificates__grid">
            {certificates.map((cert, index) => (
              <div key={index} className="certificate-card fade-up">
                <div className="certificate-card__icon">
                  {cert.icon ? (
                    <img src={cert.icon} alt={cert.issuer} className="certificate-card__icon-img" />
                  ) : (
                    <CertificateIcon />
                  )}
                </div>
                <h3 className="certificate-card__title">{cert.title}</h3>
                <p className="certificate-card__issuer">{cert.issuer}</p>
                <p className="certificate-card__date">{cert.date}</p>
                <button onClick={() => setSelectedCert(cert)} className="certificate-card__link">
                  View Credential <ExternalLinkIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              &times;
            </button>
            <div
              className="modal__image"
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleImageClick(selectedCert.image)}
            >
              <img src={selectedCert.image} alt={selectedCert.title || selectedCert.name} />
              {/* Magnifying Lens */}
              <div
                ref={lensRef}
                className={`modal__zoom-lens ${lensVisible ? 'visible' : ''}`}
              />
              {/* Zoom Hint */}
              <div className="modal__zoom-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Hover to zoom · Click to view full size</span>
              </div>
            </div>
            <div className="modal__info">
              <h3 className="modal__title">{selectedCert.title || selectedCert.name}</h3>
              {selectedCert.issuer && (
                <p className="modal__issuer">{selectedCert.issuer} — {selectedCert.date}</p>
              )}
              <a
                href={selectedCert.credentialUrl}
                className="modal__verify-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify Credential <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fullscreen-overlay"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="fullscreen__close"
            onClick={() => setFullscreenImage(null)}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
          <div 
            className="fullscreen__content" 
            ref={fsImageContainerRef}
            onClick={() => setFullscreenImage(null)}
            onMouseMove={handleFsMouseMove}
            onMouseLeave={handleFsMouseLeave}
            style={{ position: 'relative', cursor: 'zoom-out' }}
          >
            <img
              src={fullscreenImage}
              alt="Certificate full view"
              className="fullscreen__image"
              onClick={() => setFullscreenImage(null)}
              style={{ pointerEvents: 'none' }}
            />
            {/* Magnifying Lens for Fullscreen */}
            <div
              ref={fsLensRef}
              className={`modal__zoom-lens ${fsLensVisible ? 'visible' : ''}`}
            />
          </div>
          <p className="fullscreen__hint">Click anywhere to close</p>
        </div>
      )}
    </section>
  )
}

export default Certificates
