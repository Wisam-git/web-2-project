// Both forms use these plain JavaScript functions for the same validation rules.
export function cleanFullName(name) {
  return name.trim().replace(/\s+/gu, " ");
}

export function validateFullName(name) {
  const fullName = cleanFullName(name);
  if (!fullName) return "Please enter your full name.";
  if (/\p{N}/u.test(fullName)) {
    return "Your full name cannot contain numbers. Please use your name in letters.";
  }

  const parts = fullName.split(" ");
  if (parts.length < 2) {
    return "Please enter at least two name parts, such as your first and last name.";
  }

  // L = letters in any language; M = accent marks, including Arabic vowel marks.
  // Hyphens and straight/curly apostrophes can join letters within a name part.
  const namePart = /^\p{L}[\p{L}\p{M}]*(?:[-'’ʼ‐‑]\p{L}[\p{L}\p{M}]*)*$/u;
  for (const part of parts) {
    if (!namePart.test(part)) {
      return "Use letters for each name part. Hyphens and apostrophes are welcome; other symbols are not.";
    }
  }
  return "";
}

export function cleanEmail(email) {
  return email.trim().toLowerCase();
}

export function validateEmail(email) {
  const address = cleanEmail(email);
  if (!address) return "Please enter your email address.";

  const error = "Please enter a valid email address, such as name@example.com.";
  // A practical format check; this does not check whether the mailbox exists.
  const emailFormat =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
  if (!emailFormat.test(address) || address.includes("..")) return error;

  const parts = address.split("@");
  if (parts[0].startsWith(".") || parts[0].endsWith(".")) return error;
  const domainParts = parts[1].split(".");
  for (const part of domainParts) {
    if (part.startsWith("-") || part.endsWith("-")) return error;
  }
  return "";
}
