import { GithubIcon, LinkedInIcon, MailIcon } from '../../components/Icons'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a href="#" aria-label="GitHub"><GithubIcon /></a>
        <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="mailto:hello@juliusleonardo.com" aria-label="Email"><MailIcon /></a>
      </div>
      <p className="footer__credit">
        Designed & Built by Julius Leonardo
      </p>
      <p className="footer__copyright">© 2026 All rights reserved.</p>
    </footer>
  )
}

export default Footer
