import { Link } from "react-router-dom";
import "../styles/About.css";
export default function About() {
  return (
    <main className="container about-page">
      <div className="page-intro">
        <p className="eyebrow">A PLATFORM WITH PEOPLE AT ITS HEART</p>
        <h1>
          Life happens
          <br />
          <span className="serif-word">when we show up.</span>
        </h1>
        <p>We’re here to make the showing up part a little easier.</p>
        <span className="intro-spark" aria-hidden="true">
          ✳
        </span>
      </div>
      <section className="about-story">
        <div>
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Less searching.
            <br />
            More belonging.
          </h2>
          <p>
            A workshop that sparks an idea. A conversation that becomes a
            friendship. An evening that reminds you why campus life is special.
          </p>
          <p>
            These moments matter. But finding them shouldn’t mean scrolling
            through scattered announcements and group chats. EventFlow brings
            campus events into one welcoming place.
          </p>
          <p>
            Our purpose is simple: make it easier to find your people, share
            your interests, and feel more connected to the community around you.
          </p>
          <Link className="button primary" to="/events">
            Find your next moment ↗
          </Link>
        </div>
        <img
          src="/images/event-2.jpg"
          alt="A team gathering around a table to share ideas"
        />
      </section>
      <section className="values-section">
        <p className="eyebrow">WHAT WE BELIEVE</p>
        <h2>Good experiences start with good intentions.</h2>
        <div className="value-grid">
          {[
            {
              icon: "↗",
              title: "Curiosity opens doors.",
              text: "Try something you haven’t tried. Meet someone you haven’t met. There’s always room for a first.",
            },
            {
              icon: "✳",
              title: "Everyone has a place.",
              text: "Different interests. Shared experiences. A community is stronger when everyone feels welcome.",
            },
            {
              icon: "◎",
              title: "Keep it human.",
              text: "Simple to discover. Easy to join. More time making memories, less time figuring things out.",
            },
          ].map((value) => (
            <article key={value.title}>
              <span>{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-callout">
        <span>YOUR CAMPUS. YOUR COMMUNITY.</span>
        <h2>
          Let’s make the next
          <br />
          chapter a <i>good one.</i>
        </h2>
        <Link className="button cream" to="/signup">
          Be part of it ↗
        </Link>
      </section>
    </main>
  );
}
