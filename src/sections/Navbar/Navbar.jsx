import ThemeToggle from '../../components/ThemeToggle'
import './Navbar.css'

function Navbar({ scrolled, menuOpen, setMenuOpen, activeSection, scrollTo, theme, toggleTheme }) {
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__container">
        <a className="nav__logo" onClick={() => scrollTo('hero')}>
          <span className="nav__logo-bracket">&lt;</span>
          JL
          <span className="nav__logo-bracket"> /&gt;</span>
        </a>

        <button
          className={`nav__hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          <li>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </li>
          {['projects', 'experience', 'skills', 'certificates', 'contact'].map((item) => (
            <li key={item}>
              <a
                className={`nav__link ${activeSection === item ? 'nav__link--active' : ''}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
