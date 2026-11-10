import { useState } from "react";
import { Link } from "react-router-dom";
import {
  cleanFullName,
  validateFullName,
  cleanEmail,
  validateEmail,
} from "../validation";
import "../styles/Contact.css";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General question");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const fullName = cleanFullName(name);
    const emailAddress = cleanEmail(email);
    setName(fullName);
    setEmail(emailAddress);
    const nameError = validateFullName(fullName);
    const emailError = validateEmail(emailAddress);
    if (nameError || emailError) {
      setError(nameError || emailError);
      return;
    }
    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }
    setError("");
    setSuccess(true);
  }
  return (
    <main className="container contact-page">
      <div className="page-intro">
        <p className="eyebrow">EVERY GOOD CONNECTION STARTS WITH HELLO</p>
        <h1>
          We’re all <span className="serif-word">ears.</span>
        </h1>
        <p>
          A question, an idea, or just a friendly hello. We’d love to hear it.
        </p>
        <span className="intro-spark" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="contact-layout">
        <section className="contact-copy">
          <p className="eyebrow">LET’S TALK</p>
          <h2>
            Good conversations
            <br />
            lead to <i>great things.</i>
          </h2>
          <p>
            Need help finding an event? Have an idea for making campus life
            better? You’re in the right place.
          </p>
          <p className="contact-help">
            Looking for a date, venue, or available spot? You’ll find everything
            you need in the event details.
          </p>
          <Link className="text-link" to="/events">
            Explore events <span>↗</span>
          </Link>
          <div className="contact-information">
            <h3>Contact information</h3>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd>+1 (202) 555-0147</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>hello@eventflow.example</dd>
              </div>
            </dl>
          </div>
          <div className="contact-note">
            ✧ A little feedback can make a big difference.
          </div>
        </section>
        <section className="contact-form-card">
          {success ? (
            <div className="contact-success" role="status">
              <span>✓</span>
              <h2>
                Your message is ready,
                <br />
                <i>{name.trim().split(" ")[0]}.</i>
              </h2>
              <p>
                Message delivery isn’t connected yet, so your message hasn’t
                been sent.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setSuccess(false);
                  setMessage("");
                }}
              >
                Write another message ↗
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Drop us a note.</h2>
              <p>All fields are required. We’re glad you’re here.</p>
              <div className="form-row">
                <label>
                  Full name
                  <input
                    required
                    maxLength="80"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setName(cleanFullName(name))}
                  />
                </label>
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmail(cleanEmail(email))}
                  />
                </label>
              </div>
              <label>
                Subject
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option>General question</option>
                  <option>Event support</option>
                  <option>Feedback and ideas</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  rows="5"
                  placeholder="Tell us a little more..."
                  required
                  maxLength="2000"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="button primary full-width" type="submit">
                Submit message <span>↗</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
