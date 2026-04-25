// ✅ STEP 2 + 3: Google Analytics GA4 — SPA Page Tracking
// gtag.js is already loaded in index.html, so this file ONLY sends page_view events.
// It runs on every route change, which is what GA4 needs for React SPA apps.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-T1D96GDB0K";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Guard: if gtag isn't ready yet (very rare), skip silently
    if (typeof window.gtag !== "function") return;

    // Fire a manual page_view on every route change
    // This is required for React SPAs because the browser doesn't reload on navigation
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    });
  }, [location]);

  return null;
}