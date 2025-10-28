import { useEffect, useState } from 'react';
import { Moon, Sun, MonitorCog, Menu } from 'lucide-react';

type Theme = 'light' | 'dark' | 'auto';

interface NavbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function Navbar({ theme, onThemeChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 8);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <a href="#" className="nav-logo">Purely Works</a>
        </div>
        <nav className="nav-right">
          <a className="nav-link" href="#services">Services</a>
          <a className="nav-link" href="#how">How We Work</a>
          <a className="nav-link" href="#contact">Contact</a>

          <div className="theme-toggle" role="group" aria-label="Theme">
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              title="Light"
              onClick={() => onThemeChange('light')}
            >
              <Sun className="icon-small" />
            </button>
            <button
              className={`theme-btn ${theme === 'auto' ? 'active' : ''}`}
              title="System"
              onClick={() => onThemeChange('auto')}
            >
              <MonitorCog className="icon-small" />
            </button>
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              title="Dark"
              onClick={() => onThemeChange('dark')}
            >
              <Moon className="icon-small" />
            </button>
          </div>

          <button className="nav-menu-btn" aria-label="Menu">
            <Menu className="icon-small" />
          </button>
        </nav>
      </div>
    </header>
  );
}
