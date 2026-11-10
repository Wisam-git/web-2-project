import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Page from "./components/Page";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import { loadDemoData, storageKey } from "./storage";
import "./App.css";

// Read saved demo data once when the application loads.
const savedData = loadDemoData();

export default function App() {
  // Shared state stays in App; children communicate using props and callbacks.
  const [data, setData] = useState(savedData);
  const { events, registrations, accounts, user } = data;
  // Passwords live only in React memory, never in the data saved to localStorage.
  const [demoAccounts, setDemoAccounts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState(false);

  // Save updated arrays/objects from event handlers, alongside React state.
  function saveData(changes) {
    const updatedData = { ...data, ...changes };
    setData(updatedData);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }

  // Only the active demo user's bookings go to the pages and event cards.
  const myRegistrations = registrations.filter(
    (item) => user && item.userEmail === user.email,
  );
  // Keep sample attendance separate from demo bookings to avoid double-counting.
  const displayedEvents = events.map((event) => ({
    ...event,
    attendees:
      event.attendees +
      registrations.filter((item) => item.eventId === event.id).length,
  }));

  function register(event) {
    if (!user) return;
    const currentEvent = displayedEvents.find((item) => item.id === event.id);
    if (!currentEvent || currentEvent.attendees >= currentEvent.capacity)
      return;
    if (myRegistrations.some((item) => item.eventId === event.id)) return;
    saveData({
      registrations: [
        ...registrations,
        {
          eventId: event.id,
          userEmail: user.email,
          name: user.name,
          email: user.email,
        },
      ],
    });
    setSelectedEvent(null);
    setNotice(
      "You’re on the list for " +
        event.title +
        "! Your registration is saved to your account on this device.",
    );
  }

  function cancelRegistration(eventId) {
    if (!user) return;
    saveData({
      registrations: registrations.filter(
        (item) => !(item.eventId === eventId && item.userEmail === user.email),
      ),
    });
    setNotice(
      "Your registration has been cancelled. You can book again if your plans change.",
    );
  }

  function saveEvent(form, eventId) {
    if (!user) return "Please log in before saving an event.";
    const existing = displayedEvents.find((event) => event.id === eventId);
    if (eventId && (!existing || existing.ownerEmail !== user.email)) {
      return "You can only edit events you created.";
    }
    if (existing && Number(form.capacity) < existing.attendees) {
      return (
        "Capacity cannot be lower than the number of current registrations (" +
        existing.attendees +
        ")."
      );
    }
    const details = {
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      location: form.location.trim(),
      category: form.category,
      description: form.description.trim(),
      capacity: Number(form.capacity),
    };
    if (eventId) {
      saveData({
        events: events.map((event) =>
          event.id === eventId ? { ...event, ...details } : event,
        ),
      });
      setNotice("Your event has been updated with the latest details.");
    } else {
      const images = { Technology: 1, Workshops: 2, Social: 3, Business: 4 };
      saveData({
        events: [
          ...events,
          {
            ...details,
            id: Date.now(),
            ownerEmail: user.email,
            attendees: 0,
            image: "/images/event-" + images[form.category] + ".jpg",
          },
        ],
      });
      setNotice("Your event is saved. Find it in Discover events.");
    }
    return "";
  }

  function deleteEvent(eventId) {
    const event = events.find((item) => item.id === eventId);
    if (!user || !event || event.ownerEmail !== user.email) return;
    saveData({
      events: events.filter((item) => item.id !== eventId),
      registrations: registrations.filter((item) => item.eventId !== eventId),
    });
    setSelectedEvent(null);
    setNotice("Your event and its associated registrations have been deleted.");
  }

  function signup(account) {
    const profile = {
      name: account.name,
      email: account.email.trim().toLowerCase(),
    };
    if (demoAccounts.some((item) => item.email === profile.email)) return false;
    setDemoAccounts([
      ...demoAccounts,
      { ...profile, password: account.password },
    ]);
    // Recreating demo credentials after a refresh preserves existing event ownership.
    const profiles = accounts.filter((item) => item.email !== profile.email);
    saveData({ accounts: [...profiles, profile], user: profile });
    setSelectedEvent(null);
    setNotice("");
    return true;
  }

  function login(email, password) {
    const address = email.trim().toLowerCase();
    const account = demoAccounts.find(
      (item) => item.email === address && item.password === password,
    );
    if (!account) return false;
    saveData({ user: { name: account.name, email: account.email } });
    setSelectedEvent(null);
    setNotice("");
    return true;
  }

  function logout() {
    saveData({ user: null });
    setSelectedEvent(null);
    setNotice("");
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      {storageError && (
        <p className="storage-warning" role="alert">
          Your changes can’t be saved on this device right now. You can keep
          browsing, but changes may be lost when you refresh.
        </p>
      )}
      {notice && (
        <div className="global-notice" role="status">
          <span>✓ {notice}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Page title="Home">
              <Home
                events={displayedEvents}
                onSelect={setSelectedEvent}
                registrations={myRegistrations}
              />
            </Page>
          }
        />
        <Route
          path="/events"
          element={
            <Page title="Upcoming Events">
              <Events
                events={displayedEvents}
                user={user}
                onSelect={setSelectedEvent}
                registrations={myRegistrations}
                onCancel={cancelRegistration}
                onSave={saveEvent}
                onDelete={deleteEvent}
              />
            </Page>
          }
        />
        <Route
          path="/about"
          element={
            <Page title="About">
              <About />
            </Page>
          }
        />
        <Route
          path="/features"
          element={
            <Page title="Features">
              <Features />
            </Page>
          }
        />
        <Route
          path="/login"
          element={
            <Page title="Login">
              <Login onLogin={login} user={user} />
            </Page>
          }
        />
        <Route
          path="/signup"
          element={
            <Page title="Sign Up">
              <Signup onSignup={signup} user={user} />
            </Page>
          }
        />
        <Route
          path="/contact"
          element={
            <Page title="Contact">
              <Contact />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <main className="container empty-state">
              <h1>Looks like a wrong turn.</h1>
              <p>Let’s get you back to the good stuff.</p>
              <Link to="/" className="button primary">
                Back to home ↗
              </Link>
            </main>
          }
        />
      </Routes>
      <Footer />
      {selectedEvent && (
        <EventDetails
          key={selectedEvent.id}
          event={selectedEvent}
          user={user}
          registered={myRegistrations.some(
            (item) => item.eventId === selectedEvent.id,
          )}
          onClose={() => setSelectedEvent(null)}
          onRegister={register}
        />
      )}
    </BrowserRouter>
  );
}
