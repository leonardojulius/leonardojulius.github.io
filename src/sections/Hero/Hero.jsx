import { useState, useEffect } from 'react'
import { ArrowDownIcon } from '../../components/Icons'
import './Hero.css'

function Hero({ scrollTo, theme }) {
  const [earthLoaded, setEarthLoaded] = useState(false)
  const [profileLoaded, setProfileLoaded] = useState(false)

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
          <h2 className="hero__tagline">AI Automation  Web Development</h2>
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
