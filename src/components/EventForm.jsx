import { useEffect, useState } from "react";
import "../styles/EventForm.css";

export default function EventForm({ event, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: event ? event.title : "",
    date: event ? event.date : "",
    time: event ? event.time : "10:00",
    location: event ? event.location : "",
    category: event ? event.category : "Technology",
    description: event ? event.description : "",
    capacity: event ? event.capacity : 50,
  });
  const [error, setError] = useState("");

  // Bring the editor into view when creating or editing an event.
  useEffect(() => {
    document.getElementById("editor-title").focus();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.description.trim()
    ) {
      setError("Please enter an event name, location, and description.");
      return;
    }
    const date = new Date(form.date + "T" + form.time);
    if (
      !form.date ||
      !form.time ||
      isNaN(date.getTime()) ||
      date <= new Date()
    ) {
      setError("Please choose a date and time in the future.");
      return;
    }
    const capacity = Number(form.capacity);
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 10000) {
      setError("Capacity must be a whole number between 1 and 10,000.");
      return;
    }
    const saveError = onSave(form, event ? event.id : null);
    if (saveError) setError(saveError);
  }

  return (
    <section className="event-editor" aria-labelledby="editor-title">
      <div className="editor-heading">
        <span className="editor-icon" aria-hidden="true">
          ✧
        </span>
        <div>
          <p className="eyebrow">BRING PEOPLE TOGETHER</p>
          <h2 id="editor-title" tabIndex="-1">
            {event ? "A little fine-tuning." : "Give your idea a date."}
          </h2>
          <p>
            {event
              ? "Update your event and keep everyone in the loop."
              : "A few details are all it takes to start something good."}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Event name
          <input
            name="title"
            required
            maxLength="80"
            value={form.title}
            onChange={handleChange}
            placeholder="Give your event a great name"
          />
        </label>
        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Time
            <input
              type="time"
              name="time"
              required
              value={form.time}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Location
          <input
            name="location"
            required
            maxLength="100"
            value={form.location}
            onChange={handleChange}
            placeholder="Where will everyone meet?"
          />
        </label>
        <div className="form-row">
          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {["Technology", "Workshops", "Social", "Business"].map(
                (category) => (
                  <option key={category}>{category}</option>
                ),
              )}
            </select>
          </label>
          <label>
            Capacity
            <input
              type="number"
              name="capacity"
              min="1"
              max="10000"
              step="1"
              required
              value={form.capacity}
              onChange={handleChange}
            />
          </label>
        </div>
        <label>
          Description
          <textarea
            name="description"
            required
            rows="4"
            maxLength="1500"
            value={form.description}
            onChange={handleChange}
            placeholder="What makes this event worth showing up for?"
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="editor-actions">
          <p>
            Free to attend. Made to remember.
            <br />
            <small>Your event details, all in one place.</small>
          </p>
          <div>
            <button className="button outline" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="button primary" type="submit">
              {event ? "Save changes ↗" : "Save event ↗"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
