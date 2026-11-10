import { useState } from "react";
import { Link } from "react-router-dom";
import {
  cleanFullName,
  validateFullName,
  cleanEmail,
  validateEmail,
} from "../validation";
import "../styles/Signup.css";

export default function Signup({ onSignup, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const returnToCreate =
    new URLSearchParams(window.location.search).get("next") === "create";
  const destination = returnToCreate ? "/events?create=1" : "/events";

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
    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords don’t match. Please try again.");
      return;
    }
    if (
      !onSignup({
        name: fullName,
        email: emailAddress,
        password,
      })
    ) {
      setError(
        "An account with this email already exists during this visit. Please log in.",
      );
      return;
    }
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="signup-page container">
      <section className="signup-visual">
        <div className="signup-orbit" />
        <span className="auth-image-tag">
          A LITTLE CURIOSITY. A LOT OF POSSIBILITY.
        </span>
        <div className="signup-visual-copy">
          <span className="signup-spark">✳</span>
          <h2>
            Come for
            <br />
            the experience.
            <br />
            <i>Stay for the people.</i>
          </h2>
          <p>
            Big ideas. New friends. Unexpected memories.
            <br />
            It all starts with a simple hello.
          </p>
        </div>
        <div className="signup-sticker">
          <span>YOUR INVITATION TO</span>
          <strong>something good.</strong>
          <b>↗</b>
        </div>
      </section>
      <section className="signup-panel">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        {user ? (
          <div className="auth-success" role="status">
            <span>✓</span>
            <h1>
              You’re one
              <br />
              of <i>us now.</i>
            </h1>
            <p>
              You’re signed in, {user.name.split(" ")[0]}.{" "}
              {returnToCreate
                ? "Continue to create your event."
                : "Your next experience is waiting."}
            </p>
            <Link className="button primary" to={destination}>
              {returnToCreate
                ? "Continue to create event ↗"
                : "Explore events ↗"}
            </Link>
          </div>
        ) : (
          <>
            <h1>
              Find your <span className="serif-word">flow.</span>
            </h1>
            <p className="auth-subtitle">
              A world of experiences. One little account.
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  maxLength="80"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setName(cleanFullName(name))}
                />
              </label>
              <label>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmail(cleanEmail(email))}
                />
              </label>
              <div className="signup-password-row">
                <label>
                  Password
                  <span className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      aria-label="Password"
                      placeholder="At least 8 characters"
                      required
                      minLength="8"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </label>
                <label>
                  Confirm password
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="One more time"
                    required
                    minLength="8"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <button className="button primary full-width" type="submit">
                Sign up <span>↗</span>
              </button>
            </form>
            <p className="auth-switch">
              Already part of the community?{" "}
              <Link to={returnToCreate ? "/login?next=create" : "/login"}>
                Log in ↗
              </Link>
            </p>
            <p className="auth-demo">
              Use a made-up password for this demonstration. Credentials stay in
              memory until refresh; only profile details, events, and bookings
              are saved. This is not secure authentication.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
