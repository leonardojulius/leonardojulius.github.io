import { useState, useEffect, useRef } from 'react'
import { currentEvents } from '../../data'
import { ArrowDownIcon, CloseIcon } from '../../components/Icons'
import './Hero.css'

const titles = [
  'AI Automation Engineer',
  'Fullstack Web Developer',
  'n8n Automation Specialist',
]

function Hero({ scrollTo, theme }) {
  const [earthLoaded, setEarthLoaded] = useState(false)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [popupMousePos, setPopupMousePos] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const taglineRef = useRef(null)
  const textRef = useRef(null)
  const hideTimeout = useRef(null)

  const marqueeItems = [...currentEvents, ...currentEvents, ...currentEvents, ...currentEvents, ...currentEvents]

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 40)
      } else {
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % titles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, titleIndex])

  useEffect(() => {
    const textures = [
      'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg',
      'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
      'https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg',
    ]

    let loaded = 0
    textures.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loaded++
        if (loaded === textures.length) {
          setEarthLoaded(true)
        }
      }
      img.onerror = () => {
        loaded++
        if (loaded === textures.length) {
          setEarthLoaded(true)
        }
      }
      img.src = src
    })
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__greeting">Hi, my name is</p>
          <h1 className="hero__name">Julius Leonardo</h1>
          <h2 className="hero__tagline" ref={taglineRef}>
            <span className="hero__typewriter" ref={textRef}>{displayText}</span>
            <span className="hero__cursor">|</span>
          </h2>
          <p className="hero__description">
            I build and deploy n8n-powered automation systems that eliminate manual bottlenecks, reduce operational costs, and scale business processes.
          </p>
          <div className="hero__cta">
            <button className="btn btn--rgb" onClick={() => setShowResume(true)}>
              Resume
            </button>
            <a className="btn btn--outline" onClick={() => scrollTo('contact')}>
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero__image">
          <img
            src="/profile/no-bg.png"
            alt="Julius Leonardo"
            className={profileLoaded ? 'hero__profile--loaded' : ''}
            onLoad={() => setProfileLoaded(true)}
          />
          <div className={`hero__earth ${earthLoaded ? 'hero__earth--loaded' : ''}`}>
            <div className={`planet-container ${theme === 'dark' ? 'planet--night' : 'planet--day'}`}>
              <div className="planet-night"></div>
              <div className="planet-day"></div>
              <div className="planet-clouds"></div>
              <div className="planet-inner-shadow"></div>
              <div className="planet-atmosphere"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Personal Gallery Marquee ===== */}
      <div className="hero__marquee-container">
        <div className="hero__marquee">
          {marqueeItems.map((eventItem, idx) => (
            <div
              key={`marquee-${idx}`}
              className="hero__marquee-item"
              onMouseEnter={() => {
                clearTimeout(hideTimeout.current)
                setHoveredIdx(idx)
              }}
              onMouseLeave={() => {
                hideTimeout.current = setTimeout(() => setHoveredIdx(null), 200)
              }}
            >
              <img src={eventItem.image} alt={eventItem.title} className="hero__marquee-base-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll" onClick={() => scrollTo('about')}>
        <ArrowDownIcon />
      </div>

      {/* ===== Resume Modal ===== */}
      {showResume && (
        <div className="resume-modal-overlay" onClick={() => setShowResume(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <button className="resume-modal__close" onClick={() => setShowResume(false)} aria-label="Close modal">
              <CloseIcon />
            </button>
            <iframe
              src="/resume/ResumePortfolio.pdf"
              className="resume-modal__iframe"
              title="Resume Preview"
            />
          </div>
        </div>
      )}

      {/* Global Popup for Marquee Hover */}
      <div
        className={`projects__global-popup ${hoveredIdx !== null ? 'active' : ''}`}
        onMouseEnter={() => clearTimeout(hideTimeout.current)}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {hoveredIdx !== null && marqueeItems[hoveredIdx] && (
          <>
            <div
              className="projects__marquee-overlay-img"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPopupMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  w: rect.width,
                  h: rect.height
                });
              }}
            >
              <img src={marqueeItems[hoveredIdx].image} alt={marqueeItems[hoveredIdx].title} />
              <div
                className="projects__magnifier"
                style={{
                  left: popupMousePos.x,
                  top: popupMousePos.y,
                }}
              >
                <img
                  src={marqueeItems[hoveredIdx].image}
                  alt="magnified"
                  className="projects__magnifier-img"
                  style={{
                    width: popupMousePos.w * 2.5,
                    height: popupMousePos.h * 2.5,
                    left: -(popupMousePos.x * 2.5 - 75),
                    top: -(popupMousePos.y * 2.5 - 75),
                  }}
                />
              </div>
            </div>
            <div className="projects__marquee-overlay-content">
              <span className="projects__marquee-title">{marqueeItems[hoveredIdx].title}</span>
              <p className="projects__marquee-desc">{marqueeItems[hoveredIdx].description}</p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
