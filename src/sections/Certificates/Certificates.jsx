import { useState } from 'react'
import { certificates } from '../../data'
import { CertificateIcon, ExternalLinkIcon } from '../../components/Icons'
import './Certificates.css'

function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">04.</span> Certifications
        </h2>
        <div className="certificates__grid">
          {certificates.map((cert, index) => (
            <div key={index} className="certificate-card fade-up">
              <div className="certificate-card__icon">
                <CertificateIcon />
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

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedCert(null)} aria-label="Close modal">
              &times;
            </button>
            <div className="modal__image">
              <img src={selectedCert.image} alt={selectedCert.title} />
            </div>
            <div className="modal__info">
              <h3 className="modal__title">{selectedCert.title}</h3>
              <p className="modal__issuer">{selectedCert.issuer} — {selectedCert.date}</p>
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
    </section>
  )
}

export default Certificates
