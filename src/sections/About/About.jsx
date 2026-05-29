import './About.css'

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">01.</span> About Me
        </h2>
        <div className="about__content fade-up">
          <div className="about__text">
            <p>
              Hello! I'm Julius, an AI Automation Specialist passionate about bridging the gap
              between artificial intelligence and real-world business operations. I help companies
              automate repetitive tasks, streamline workflows, and leverage AI to make smarter decisions.
            </p>
            <p>
              My expertise lies in building end-to-end automation systems using n8n
              and custom code — integrated with large language models (GPT-4, Claude) to create
              intelligent, self-improving workflows.
            </p>
            <p>
              I believe the future of work is about humans focusing on creativity and strategy
              while AI handles the rest. I'm here to make that future a reality for your business.
            </p>
          </div>
          <div className="about__image">
            <div className="about__image-wrapper">
              <div className="about__image-placeholder">
                <span>JL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
