import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventDetails({
  event,
  user,
  registered,
  onClose,
  onRegister,
}) {
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.getElementById("close-details").focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      if (previousFocus) previousFocus.focus();
    };
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(event);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-details"
          className="modal-close"
          aria-label="Close details"
          onClick={onClose}
        >
          ×
        </button>
        <span className={"category " + event.category.toLowerCase()}>
          {event.category}
        </span>
        <h2 id="event-title">{event.title}</h2>
        <p>{event.description}</p>
        <div className="detail-meta">
          <p>
            ◷{" "}
            {new Date(event.date + "T12:00:00").toLocaleDateString("en-GB", {
              dateStyle: "long",
            })}{" "}
            · {event.time}
          </p>
          <p>⌖ {event.location}</p>
          <p>
            ♧ {event.attendees} / {event.capacity} spots filled · Free entry
          </p>
        </div>
        {!user ? (
          <div className="registration-login">
            <h3>Your next memory is waiting.</h3>
            <p>
              Log in to save your spot and keep track of your registrations.
            </p>
            <Link
              className="button primary full-width"
              to="/login"
              onClick={onClose}
            >
              Log in to register ↗
            </Link>
            <small className="form-note">
              New here?{" "}
              <Link to="/signup" onClick={onClose}>
                Create an account ↗
              </Link>
            </small>
          </div>
        ) : registered ? (
          <div className="notice">
            ✓ You’re registered for this event as {user.name}.
          </div>
        ) : event.attendees >= event.capacity ? (
          <div className="notice">This event is fully booked.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Save your spot</h3>
            <label>
              Full name
              <input readOnly value={user.name} />
            </label>
            <label>
              Email address
              <input type="email" readOnly value={user.email} />
            </label>
            <button className="button primary full-width" type="submit">
              Confirm registration ↗
            </button>
            <small className="form-note">
              Saved to your account on this device. No confirmation email is
              sent.
            </small>
          </form>
        )}
      </section>
    </div>
  );
}
