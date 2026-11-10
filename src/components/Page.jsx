import { useEffect } from "react";

// A basic effect updates the browser title and scrolls to the top on navigation.
export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title + " | EventFlow";
    window.scrollTo(0, 0);
  }, [title]);

  return children;
}
