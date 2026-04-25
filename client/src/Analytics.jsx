import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-T1D96GDB0K";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Load script once
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;

      gtag("js", new Date());
      gtag("config", GA_ID);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}