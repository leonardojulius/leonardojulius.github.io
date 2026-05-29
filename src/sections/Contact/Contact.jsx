import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section__title fade-up">
          <span className="section__number">06.</span> Get In Touch
        </h2>
        <div className="contact__content fade-up">
          <p className="contact__text">
            Looking to automate your business processes with AI? I'm currently available
            for freelance projects and consulting. Whether you need a custom automation
            system, AI integration, or workflow optimization — let's talk.
          </p>
          <a className="btn btn--primary btn--large" href="mailto:hello@juliusleonardo.com">
            Say Hello
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
