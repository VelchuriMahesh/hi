export function trackWhatsApp(location = 'unknown') {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'whatsapp_click', {
    event_category: 'Lead',
    event_label: location,
    value: 1,
  });
}

export function trackPhoneCall(location = 'unknown') {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'phone_call_click', {
    event_category: 'Lead',
    event_label: location,
    value: 1,
  });
}