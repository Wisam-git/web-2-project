import { Link } from "react-router-dom";
import "../styles/Features.css";

const features = [
  {
    number: "01",
    icon: "◎",
    title: "Discover your next good thing.",
    label: "EVENT DISCOVERY",
    text: "From inspiring talks to a night with new friends. Explore campus experiences, see the details, and find something worth showing up for.",
    link: "Explore the lineup",
    color: "lilac",
  },
  {
    number: "02",
    icon: "✓",
    title: "Your spot. Your plans.",
    label: "PERSONAL REGISTRATION",
    text: "Keep your bookings in one place, save a spot at the events you love, and cancel when plans change. Your plans are always easy to find.",
    link: "Find your next plan",
    color: "sage",
  },
  {
    number: "03",
    icon: "✧",
    title: "Turn an idea into an invitation.",
    label: "CREATE & MANAGE",
    text: "Give your event a name, date, venue, and story. Publish it to the discovery page, then edit the details or delete it from My events whenever you need to.",
    link: "Bring your idea to life",
    color: "peach",
  },
  {
    number: "04",
    icon: "⌕",
    title: "Less searching. More finding.",
    label: "SEARCH & FILTER",
    text: "Looking for a workshop or a specific venue? Search by event name or location, and narrow the lineup by Technology, Workshops, Social, or Business.",
    link: "Find your kind of thing",
    color: "sand",
  },
  {
    number: "05",
    icon: "◫",
    title: "A little order. A lot of possibility.",
    label: "EASY ORGANIZATION",
    text: "Switch between discovering events, your registrations, and the events you organize. Simple forms and clear attendance counts keep every detail in view.",
    link: "Get organized",
    color: "lilac",
  },
];

export default function Features() {
  return (
    <main className="container features-page">
      <div className="page-intro">
        <p className="eyebrow">LESS FRICTION. MORE CONNECTION.</p>
        <h1>
          Everything you need.
          <br />
          <span className="serif-word">More room for moments.</span>
        </h1>
        <p>From your first “what’s on?” to your next “see you there.”</p>
        <span className="intro-spark" aria-hidden="true">
          ✳
        </span>
      </div>
      <section className="features-intro">
        <p className="eyebrow">THOUGHTFULLY SIMPLE</p>
        <h2>
          Good experiences.
          <br />
          Without the extra steps.
        </h2>
        <p>
          Discover, join, and organize in one welcoming place. EventFlow makes
          the planning easy, so the people can be the best part.
        </p>
      </section>
      <section className="feature-grid" aria-label="EventFlow features">
        {features.map((feature) => (
          <article
            key={feature.number}
            className={"feature-card " + feature.color}
          >
            <div className="feature-card-top">
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <span>{feature.number} / EVENTFLOW</span>
            </div>
            <p className="eyebrow">{feature.label}</p>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
            <Link to="/events" className="text-link">
              {feature.link} <span>↗</span>
            </Link>
          </article>
        ))}
      </section>
      <section className="feature-steps">
        <div>
          <p className="eyebrow">FROM CURIOUS TO CONNECTED</p>
          <h2>
            It starts with
            <br />a simple <span className="serif-word">hello.</span>
          </h2>
          <Link className="button primary" to="/signup">
            Create an account ↗
          </Link>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>Make it yours.</h3>
              <p>Create an account and start planning your next experience.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Follow your curiosity.</h3>
              <p>Find an event to join, or create an experience of your own.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Keep the details together.</h3>
              <p>Manage your events and registrations from the Events page.</p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}
