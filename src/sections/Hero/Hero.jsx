import { useState, useEffect, useRef } from 'react'
import { ArrowDownIcon } from '../../components/Icons'
import './Hero.css'

const titles = [
  'AI Automation Specialist',
  'Junior Full Stack Engineer',
  'n8n Workflow Builder',
  'Social Media Automation',
]

function Hero({ scrollTo, theme }) {
  const [earthLoaded, setEarthLoaded] = useState(false)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

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
          <h2 className="hero__tagline">
            <span className="hero__typewriter">{displayText}</span>
            <span className="hero__cursor">|</span>
          </h2>
          <p className="hero__description">
           I'm a Junior Full Stack Developer and AI Automation Specialist who builds intelligent, end-to-end applications. 
           By connecting AI models, robust APIs, and modern web frameworks, I design workflows that eliminate manual tasks and unlock scalable growth for companies.
          </p>
          <div className="hero__cta">
            <a className="btn btn--rgb" href="#" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
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
      <div className="hero__scroll" onClick={() => scrollTo('about')}>
        <ArrowDownIcon />
      </div>
    </section>
  )
}

export default Hero
