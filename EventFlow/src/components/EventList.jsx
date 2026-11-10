import { Link } from "react-router-dom";
import EventCard from "./EventCard";

export default function EventList({
  heading,
  subtitle,
  events,
  search,
  setSearch,
  category,
  setCategory,
  onSelect,
  registrations,
  dashboard,
}) {
  return (
    <section className="events-section">
      <div className="section-heading">
        <div>
          <h2>
            {heading}
            <span className="heading-dot" />
          </h2>
          <p>{subtitle}</p>
        </div>
        {dashboard && (
          <Link className="text-link" to="/events">
            View all events ↗
          </Link>
        )}
      </div>
      <div className="event-controls">
        <div className="tabs">
          {["All events", "Technology", "Workshops", "Social", "Business"].map(
            (item) => (
              <button
                key={item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <label className="search">
          <span>⌕</span>
          <input
            aria-label="Search events"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      {events.length ? (
        <div className="event-grid">
          {events.map((event) => (
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
      ) : (
        <div className="empty-state">
          <h3>No events found</h3>
          <p>Try a different search or category.</p>
          <button
            className="button secondary"
            onClick={() => {
              setSearch("");
              setCategory("All events");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
