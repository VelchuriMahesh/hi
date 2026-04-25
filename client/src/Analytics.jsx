import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-T1D96GDB0K";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Load script ONLY once
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());

      // IMPORTANT: disable auto pageview
      window.gtag("config", GA_ID, {
        send_page_view: false,
      });
    }

    // MANUAL PAGE TRACKING (SPA FIX)
    window.gtag("event", "page_view", {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });

  }, [location]);

  return null;
}