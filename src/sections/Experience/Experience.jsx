import { experiences } from '../../data'
import './Experience.css'

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">06.</span> Experience
        </h2>
        <div className="experience__timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience__item fade-up">
              <div className="experience__dot"></div>
              <div className="experience__content">
                <h3 className="experience__role">{exp.role}</h3>
                <p className="experience__company">{exp.company}</p>
                <p className="experience__period">{exp.period}</p>
                <p className="experience__description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
