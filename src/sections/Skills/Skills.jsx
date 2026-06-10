import { skills } from '../../data'
import './Skills.css'

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section__title fade-up">
          Skills & Technologies
        </h2>
        <div className="skills__grid fade-up">
          {skills.map((group) => (
            <div key={group.category} className="skills__card">
              <h3 className="skills__category">{group.category}</h3>
              <ul className="skills__list">
                {group.items.map((skill) => (
                  <li key={skill} className="skills__item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
