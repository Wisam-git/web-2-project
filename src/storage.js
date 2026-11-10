import { initialEvents } from "./data";

export const storageKey = "eventflow-demo-v1";

// JSON turns our arrays and objects into a string that localStorage can save.
export function loadDemoData() {
  const emptyData = {
    events: initialEvents,
    registrations: [],
    accounts: [],
    user: null,
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (
      !saved ||
      !Array.isArray(saved.events) ||
      !Array.isArray(saved.registrations) ||
      !Array.isArray(saved.accounts)
    ) {
      return emptyData;
    }

    // Basic shape checks also handle accidentally edited localStorage data.
    for (const event of saved.events) {
      if (
        !event ||
        typeof event.id !== "number" ||
        typeof event.title !== "string" ||
        typeof event.location !== "string" ||
        typeof event.category !== "string" ||
        typeof event.description !== "string" ||
        typeof event.image !== "string" ||
        typeof event.time !== "string" ||
        typeof event.date !== "string" ||
        isNaN(new Date(event.date).getTime()) ||
        !Number.isInteger(event.attendees) ||
        event.attendees < 0 ||
        !Number.isInteger(event.capacity) ||
        event.capacity < 1
      )
        return emptyData;
    }
    // Preserve existing profiles, but explicitly discard legacy password fields.
    const accounts = saved.accounts
      .filter(
        (account) =>
          account &&
          typeof account.name === "string" &&
          typeof account.email === "string",
      )
      .map((account) => ({
        name: account.name,
        email: account.email.trim().toLowerCase(),
      }));

    // Ignore bookings for events or accounts that no longer exist.
    const registrations = saved.registrations.filter(
      (booking) =>
        booking &&
        saved.events.some((event) => event.id === booking.eventId) &&
        accounts.some((account) => account.email === booking.userEmail),
    );
    const user =
      saved.user &&
      typeof saved.user.email === "string" &&
      accounts.find(
        (account) => account.email === saved.user.email.trim().toLowerCase(),
      );
    const data = {
      events: saved.events,
      registrations,
      accounts,
      user: user ? { name: user.name, email: user.email } : null,
    };
    // Migrate saved data immediately so old plaintext passwords are removed.
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      // Keep the loaded data usable when the browser cannot save changes.
    }
    return data;
  } catch {
    // Invalid JSON or blocked browser storage should not break the website.
    return emptyData;
  }
}
