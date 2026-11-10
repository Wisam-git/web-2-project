export default function EventCard({ event, onSelect, registered }) {
  const date = new Date(event.date + "T12:00:00");
  return (
    <article className="event-card">
      <div className="card-image">
        <img src={event.image} alt={event.title} />
        <span className="date-badge">
          <small>
            {date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
          </small>
          <strong>{date.getDate()}</strong>
        </span>
        <span className="free-badge">Free entry</span>
      </div>
      <div className="card-content">
        <span className={"category " + event.category.toLowerCase()}>
          {event.category}
        </span>
        <h3>{event.title}</h3>
        <p className="card-meta">
          ◷{" "}
          {date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}{" "}
          <span>·</span> {event.time}
        </p>
        <p className="card-meta">⌖ {event.location}</p>
        <div className="card-bottom">
          <span className="attendees">
            <span className="mini-avatars">
              <i>J</i>
              <i>A</i>
              <i>M</i>
            </span>
            <small>{event.attendees} going</small>
          </span>
          <button onClick={() => onSelect(event)}>
            {registered ? "Registered ✓" : "View event ↗"}
          </button>
        </div>
      </div>
    </article>
  );
}
