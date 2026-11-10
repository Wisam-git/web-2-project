import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link className="brand" to="/">
            <span className="brand-symbol">
              e<span>↗</span>
            </span>
            eventflow.
          </Link>
          <p>
            Less scrolling. More showing up.
            <br />
            Your next great memory starts here.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/events">Upcoming events</Link>
        </div>
        <div>
          <h3>EventFlow</h3>
          <Link to="/about">Our story</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Get in touch</Link>
        </div>
        <div>
          <h3>Join the community</h3>
          <Link to="/signup">Create an account ↗</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 EventFlow. Good people. Great moments.</span>
        <span>Discover. Connect. Belong.</span>
      </div>
    </footer>
  );
}
