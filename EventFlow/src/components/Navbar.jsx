import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-symbol">
            e<span>↗</span>
          </span>
          eventflow<span className="brand-dot">.</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav
          className={menuOpen ? "navigation open" : "navigation"}
          aria-label="Main navigation"
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/events" onClick={() => setMenuOpen(false)}>
            Upcoming events
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About us
          </Link>
          <Link to="/features" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <div className="nav-account">
            {user ? (
              <>
                <span className="user-name">Hi, {user.name.split(" ")[0]}</span>
                <button
                  className="button outline small"
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                >
                  Log out ↗
                </button>
              </>
            ) : (
              <>
                <Link
                  className="login-link"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  className="button primary small"
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Get started <span>↗</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
