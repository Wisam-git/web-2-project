import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { cleanEmail, validateEmail } from "../validation";
import "../styles/Login.css";

export default function Login({ onLogin, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const returnToCreate =
    new URLSearchParams(window.location.search).get("next") === "create";
  const destination = returnToCreate ? "/events?create=1" : "/events";

  function handleSubmit(e) {
    e.preventDefault();
    const address = cleanEmail(email);
    setEmail(address);
    const emailError = validateEmail(address);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (!onLogin(address, password))
      setError(
        "Email or password doesn’t match an account created during this visit. After a refresh, sign up again to set up your demo credentials.",
      );
    else setError("");
  }

  return (
    <main className="login-page container">
      <section className="login-visual">
        <img src="/images/event-3.jpg" alt="An inviting evening event venue" />
        <div className="login-visual-overlay" />
        <span className="auth-image-tag">GOOD PEOPLE. GREAT MOMENTS.</span>
        <div className="login-visual-copy">
          <span>✳</span>
          <h2>
            Your people.
            <br />
            Your plans.
            <br />
            <i>Your next chapter.</i>
          </h2>
          <p>
            Pick up where you left off.
            <br />
            There’s a whole world waiting outside.
          </p>
        </div>
      </section>
      <section className="login-panel">
        <p className="eyebrow">GOOD TO HAVE YOU BACK</p>
        {user ? (
          <Navigate to={destination} replace />
        ) : (
          <>
            <h1>
              Welcome <span className="serif-word">back.</span>
            </h1>
            <p className="auth-subtitle">
              {returnToCreate
                ? "Log in to continue creating your event."
                : "Your next great experience is waiting."}
            </p>
            <form onSubmit={handleSubmit}>
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
              <label>
                Password
                <span className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    aria-label="Password"
                    placeholder="Enter your password"
                    required
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
              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <button className="button primary full-width" type="submit">
                Log in <span>↗</span>
              </button>
            </form>
            <p className="auth-switch">
              New around here?{" "}
              <Link to={returnToCreate ? "/signup?next=create" : "/signup"}>
                Create an account ↗
              </Link>
            </p>
            <p className="auth-demo">
              Demonstration accounts only. Passwords stay in memory until
              refresh. After refreshing and signing out, sign up again with the
              same email to keep your saved events.
            </p>
          </>
        )}
      </section>
    </main>
  );
}
