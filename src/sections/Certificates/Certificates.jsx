import { useState } from 'react'
import { certificates, specializations } from '../../data'
import { CertificateIcon, ExternalLinkIcon } from '../../components/Icons'
import './Certificates.css'

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [expandedSpec, setExpandedSpec] = useState(null)

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title fade-up">
          Specializations & Certifications
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

      {/* Certificate Modal — Full View */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              &times;
            </button>
            <div className="modal__image">
              <img src={selectedCert.image} alt={selectedCert.title || selectedCert.name} />
              <a
                href={selectedCert.credentialUrl}
                className="modal__verify-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Verify Credential <ExternalLinkIcon />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates
