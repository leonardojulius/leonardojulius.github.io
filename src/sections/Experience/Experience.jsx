import { useState } from 'react'
import { experiences } from '../../data'
import './Experience.css'

function Experience() {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section__title fade-up">
          Experience
        </h2>
        <div className="experience__timeline">
          {experiences.map((exp, index) => {
            const isExpanded = expandedItems[index]

            return (
              <div key={index} className="experience__item fade-up">
                <div className="experience__dot"></div>
                <div className="experience__content">
                  <h3 className="experience__role">{exp.role}</h3>
                  <p className="experience__company">{exp.company}</p>

                  <button 
                    className="experience__expand-btn"
                    onClick={() => toggleExpand(index)}
                  >
                    {isExpanded ? 'Hide full details' : 'Show full details'}
                    <span className={`experience__expand-icon ${isExpanded ? 'open' : ''}`}>▼</span>
                  </button>

                  {isExpanded && (
                    <div className="experience__details">
                      <p className="experience__period">{exp.period}</p>
                      <p className="experience__description">{exp.description}</p>
                      {exp.tools && (
                        <div className="experience__tools">
                          {exp.tools.map((tool, i) => (
                            <span key={i} className="experience__tool-tag">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
