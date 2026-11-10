import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import "../styles/Home.css";

export default function Home({ events, onSelect, registrations }) {
  return (
    <main>
      <section className="home-hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> GO OUT. TUNE IN. FEEL SOMETHING.
          </p>
          <h1>
            Good things
            <br />
            happen <span className="serif-word">together.</span>
            <svg
              className="hero-underline"
              viewBox="0 0 300 15"
              aria-hidden="true"
            >
              <path d="M3 10 Q140 -4 296 9" />
            </svg>
          </h1>
          <p className="hero-description">
            Find your people. Follow your curiosity. Discover events that turn
            an ordinary day into a story worth telling.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="button primary">
              Find your next experience <span>↗</span>
            </Link>
            <Link to="/about" className="hero-secondary">
              <span>↗</span> The EventFlow story
            </Link>
          </div>
          <div className="social-proof">
            <div className="proof-avatars">
              <span>JA</span>
              <span>MK</span>
              <span>SR</span>
              <span>AL</span>
            </div>
            <div>
              <strong>Big moments. Real connections.</strong>
              <small>A whole community waiting to meet you.</small>
            </div>
            <span className="proof-spark">✳</span>
          </div>
        </div>
        <div className="hero-collage">
          <img
            className="hero-photo"
            src="/images/event-3.jpg"
            alt="A beautifully lit venue ready to bring people together"
          />
          <div className="photo-shade" />
          <span className="photo-label">
            <span className="status-dot" /> REAL LIFE LOOKS GOOD ON YOU
          </span>
          <div className="photo-caption">
            <span>MORE THAN AN EVENT.</span>
            <h2>
              A feeling you
              <br />
              can’t <i>stream.</i>
            </h2>
          </div>
          <div className="hero-flower" aria-hidden="true">
            ✳
          </div>
          <div className="floating-ticket">
            <div>
              <span>YOUR NEXT CHAPTER</span>
              <strong>Starts with showing up.</strong>
            </div>
            <b>↗</b>
          </div>
          <span className="hero-image-number">
            01 / THE ART OF COMING TOGETHER
          </span>
        </div>
      </section>
      <div className="category-strip">
        <div className="container">
          <span>FIND YOUR KIND OF THING</span>
          <p>
            Technology <i>✳</i> Workshops <i>✳</i> Social <i>✳</i> Business{" "}
            <i>✳</i> A little of everything <i>✳</i>
          </p>
        </div>
      </div>
      <section className="container home-events">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE CALENDAR IS LOOKING GOOD</p>
            <h2>
              Make room for <span className="serif-word">something great.</span>
            </h2>
            <p>Fresh ideas, familiar faces, and a few happy surprises.</p>
          </div>
          <Link className="text-link" to="/events">
            Explore all events <span>↗</span>
          </Link>
        </div>
        <div className="event-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={onSelect}
              registered={registrations.some(
                (item) => item.eventId === event.id,
              )}
            />
          ))}
        </div>
      </section>
      <section className="container home-story">
        <div className="story-image">
          <img
            src="/images/event-2.jpg"
            alt="Students collaborating and sharing ideas"
          />
          <span>BETTER, TOGETHER. ↗</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">A LITTLE CONNECTION GOES A LONG WAY</p>
          <h2>
            Find more than plans.
            <br />
            Find <span className="serif-word">your people.</span>
          </h2>
          <p>
            We believe the best experiences are the ones we share. EventFlow
            brings campus life into one place, so you can spend less time
            searching and more time being part of it.
          </p>
          <Link to="/about" className="text-link">
            Get to know us <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="container join-banner">
        <div>
          <p className="eyebrow">SAY YES TO SOMETHING NEW</p>
          <h2>
            Your next “remember when”
            <br />
            is just around the corner.
          </h2>
        </div>
        <Link className="button cream" to="/signup">
          Find your flow <span>↗</span>
        </Link>
        <span className="join-spark" aria-hidden="true">
          ✳
        </span>
      </section>
    </main>
  );
}
