import { GithubIcon, XIcon, MailIcon } from '../../components/Icons'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a href="https://github.com/leonardojulius/" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><GithubIcon /></a>
        <a href="https://x.com/Jleonardo91179308" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"><XIcon /></a>
        <a href="mailto:leonardojulius.jcl@gmail.com" aria-label="Email"><MailIcon /></a>
      </div>
      <p className="footer__credit">
        Designed & Built by Julius Leonardo
      </p>
      <p className="footer__copyright">© 2026 All rights reserved.</p>
    </footer>
  )
}

export default Footer
