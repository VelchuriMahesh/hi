const GOOGLE_ADS_CONVERSION_ID = 'AW-17324211970';
const GOOGLE_ADS_CONVERSION_LABELS = {
  whatsapp: 'Uw3RCPy1v6kcEIL-6cRA',
  phoneCall: '4weRCJj6pqkcEIL-6cRA',
};

function trackLeadEvent(eventName, source, conversionLabel) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    event_category: 'Lead',
    event_label: source,
    value: 1,
  });

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`,
  });
}

export function trackWhatsApp(source = 'unknown') {
  trackLeadEvent('whatsapp_click', source, GOOGLE_ADS_CONVERSION_LABELS.whatsapp);
}

export function trackPhoneCall(source = 'unknown') {
  trackLeadEvent('phone_call_click', source, GOOGLE_ADS_CONVERSION_LABELS.phoneCall);
}
