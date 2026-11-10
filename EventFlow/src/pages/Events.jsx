import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import "../styles/Events.css";

export default function Events({
  events,
  user,
  onSelect,
  registrations,
  onCancel,
  onSave,
  onDelete,
}) {
  const navigate = useNavigate();
  // A simple URL flag keeps the requested action through Login and Sign Up.
  const requestedCreate =
    new URLSearchParams(window.location.search).get("create") === "1";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All events");
  const [view, setView] = useState(requestedCreate ? "manage" : "discover");
  const [showForm, setShowForm] = useState(requestedCreate);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const myEvents = events.filter(
    (event) => user && event.ownerEmail === user.email,
  );
  const filteredEvents = events.filter(
    (event) =>
      (category === "All events" || event.category === category) &&
      (event.title + event.location)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (view !== "registered" ||
        registrations.some((item) => item.eventId === event.id)),
  );

  function changeView(nextView) {
    if (requestedCreate) navigate("/events", { replace: true });
    setView(nextView);
    setSearch("");
    setCategory("All events");
    setShowForm(false);
    setEditingEvent(null);
    setDeleteId(null);
  }

  function startCreate() {
    if (!user) {
      navigate("/login?next=create");
      return;
    }
    changeView("manage");
    setShowForm(true);
  }

  function saveEvent(form, eventId) {
    const error = onSave(form, eventId);
    if (!error) {
      setShowForm(false);
      setEditingEvent(null);
      if (requestedCreate) navigate("/events", { replace: true });
    }
    return error;
  }

  if (!user && requestedCreate)
    return <Navigate to="/login?next=create" replace />;

  return (
    <main className="container events-page">
      <div className="page-intro">
        <p className="eyebrow">LESS SOMEDAY. MORE LET’S GO.</p>
        <h1>
          Your next great
          <br />
          <span className="serif-word">experience awaits.</span>
        </h1>
        <p>From big ideas to good times. Find something that feels like you.</p>
        <span className="intro-spark" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="events-toolbar">
        <div className="events-view-toggle">
          <button
            className={view === "discover" ? "selected" : ""}
            onClick={() => changeView("discover")}
          >
            Discover events
          </button>
          <button
            className={view === "registered" ? "selected" : ""}
            onClick={() => changeView("registered")}
          >
            My registrations <span>{registrations.length}</span>
          </button>
          <button
            className={view === "manage" ? "selected" : ""}
            onClick={() => changeView("manage")}
          >
            My events <span>{myEvents.length}</span>
          </button>
        </div>
        <button className="button primary small" onClick={startCreate}>
          ＋ Create event
        </button>
      </div>
      {!user && view !== "discover" ? (
        <section className="empty-state">
          <p className="eyebrow">YOUR OWN LITTLE CORNER OF CAMPUS</p>
          <h2>
            {view === "manage"
              ? "Big ideas start with you."
              : "Keep your plans together."}
          </h2>
          <p>
            Log in to{" "}
            {view === "manage"
              ? "create and manage your own events"
              : "view your own registrations"}
            . Keep your plans and events together in one place.
          </p>
          <Link
            className="button primary"
            to={view === "manage" ? "/login?next=create" : "/login"}
          >
            Log in ↗
          </Link>
          <p>
            New here?{" "}
            <Link
              className="text-link"
              to={view === "manage" ? "/signup?next=create" : "/signup"}
            >
              Create an account ↗
            </Link>
          </p>
        </section>
      ) : view === "manage" ? (
        <>
          {showForm && (
            <EventForm
              key={editingEvent ? editingEvent.id : "new"}
              event={editingEvent}
              onSave={saveEvent}
              onCancel={() => changeView("manage")}
            />
          )}
          <div className="section-heading">
            <div>
              <p className="eyebrow">MADE BY YOU. OPEN TO EVERYONE.</p>
              <h2>Your ideas, out in the world.</h2>
              <p>
                {myEvents.length} created events · Only you can edit or delete
                these events.
              </p>
            </div>
          </div>
          {myEvents.length === 0 ? (
            <section className="empty-state">
              <h2>Your next big idea belongs here.</h2>
              <p>Create your first event and bring your community together.</p>
              {!showForm && (
                <button className="button primary" onClick={startCreate}>
                  Create an event ↗
                </button>
              )}
            </section>
          ) : (
            <div className="created-events">
              {myEvents.map((event) => (
                <article className="created-event" key={event.id}>
                  <img src={event.image} alt="" />
                  <div className="created-event-copy">
                    <span
                      className={"category " + event.category.toLowerCase()}
                    >
                      {event.category}
                    </span>
                    <h3>{event.title}</h3>
                    <p>
                      {new Date(event.date + "T12:00:00").toLocaleDateString(
                        "en-GB",
                        { dateStyle: "medium" },
                      )}{" "}
                      · {event.time} · {event.location}
                    </p>
                    <small>
                      {event.attendees} / {event.capacity} spots filled
                    </small>
                  </div>
                  <div className="created-event-actions">
                    <button
                      className="button outline small"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowForm(true);
                        setDeleteId(null);
                      }}
                    >
                      Edit event
                    </button>
                    <button
                      className="delete-link"
                      onClick={() => setDeleteId(event.id)}
                    >
                      Delete event
                    </button>
                  </div>
                  {deleteId === event.id && (
                    <div className="delete-confirm" role="alert">
                      <div>
                        <strong>Delete “{event.title}”?</strong>
                        <p>
                          This also removes all registrations for this event.
                          This action cannot be undone.
                        </p>
                      </div>
                      <button
                        className="button outline small"
                        onClick={() => setDeleteId(null)}
                      >
                        Keep event
                      </button>
                      <button
                        className="button danger small"
                        onClick={() => {
                          onDelete(event.id);
                          setDeleteId(null);
                          if (editingEvent && editingEvent.id === event.id) {
                            setShowForm(false);
                            setEditingEvent(null);
                          }
                        }}
                      >
                        Confirm delete
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <EventList
            heading={
              view === "registered"
                ? "You’re on the list."
                : "Good things on the horizon."
            }
            subtitle={
              filteredEvents.length +
              " events · All experiences are free to attend"
            }
            events={filteredEvents}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            onSelect={onSelect}
            registrations={registrations}
          />
          {view === "registered" && registrations.length === 0 && (
            <p className="booking-hint">
              No plans yet? Choose Discover events to find your next experience.
            </p>
          )}
          {view === "registered" && registrations.length > 0 && (
            <section className="manage-bookings">
              <h2>Manage your bookings</h2>
              {registrations.map((item) => (
                <div key={item.eventId}>
                  <p>
                    <strong>
                      {events.find((event) => event.id === item.eventId).title}
                    </strong>
                    <small>
                      {item.name} · {item.email}
                    </small>
                  </p>
                  <button onClick={() => onCancel(item.eventId)}>
                    Cancel registration
                  </button>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}
