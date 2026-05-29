import { ArrowDownIcon } from '../../components/Icons'
import './Hero.css'

function Hero({ scrollTo }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hi, my name is</p>
        <h1 className="hero__name">Julius Leonardo.</h1>
        <h2 className="hero__tagline">I automate businesses with AI.</h2>
        <p className="hero__description">
          I'm an AI Automation Specialist who designs and builds intelligent workflows
          that connect AI models, APIs, and business tools — eliminating manual work
          and unlocking scalable growth for companies.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" onClick={() => scrollTo('projects')}>
            View My Work
          </a>
          <a className="btn btn--outline" onClick={() => scrollTo('contact')}>
            Get In Touch
          </a>
        </div>
      </div>
      <div className="hero__scroll" onClick={() => scrollTo('about')}>
        <ArrowDownIcon />
      </div>
    </section>
  )
}

export default Hero
