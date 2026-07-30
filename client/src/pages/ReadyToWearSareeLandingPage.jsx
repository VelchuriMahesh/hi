import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '9741827558';
const normalizeWhatsAppNumber = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
};
const WHATSAPP_NUMBER = normalizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER || PHONE_NUMBER);
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'help@shrusara.com';
const ADDRESS = '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086';
const IMAGE_BASE = '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree';

const DESIGNER_MESSAGE = "Hi, I'd like to know more about your Ready-to-Wear Sarees.";
const PHOTO_MESSAGE = "Hi, I'd like to know if my saree is suitable for Ready-to-Wear customization. I'll share my saree photos here.";

const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const anchorLinks = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process Video', href: '#process-video' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'Q&A', href: '#faq' }
];

const heroHighlights = [
  'Bring Your Own Saree',
  'Customized to Your Measurements',
  'Permanent Pre-Stitching',
  'Permanent Pleats',
  'Premium Lining',
  'Comfortable and Secure Fit',
  'Easy to Wear in Minutes',
  'Visit Boutique or Book Video Consultation',
  'Porter and Courier Service Available'
];

const galleryImages = [
  {
    src: `${IMAGE_BASE}/ready-to-wear-saree-bangalore.webp`,
    alt: 'Ready-to-wear saree customization front view in Bangalore',
    title: 'Ready-to-Wear Saree Front View',
    desc: 'A graceful front-view finish created after ready-to-wear saree customization.'
  },
  {
    src: `${IMAGE_BASE}/customized-ready-to-wear-saree-bangalore.webp`,
    alt: 'Customized ready-to-wear saree walking view in Bangalore',
    title: 'Customized Walking Drape',
    desc: 'A ready-to-wear saree customized for easy movement, comfort, and elegant fall.'
  },
  {
    src: `${IMAGE_BASE}/ready-to-wear-saree-customization-bangalore.webp`,
    alt: 'Ready-to-wear saree side view by Shrusara',
    title: 'Side Profile Saree Fit',
    desc: 'A clean side profile showing tailored pleat structure and secure fitting.'
  },
  {
    src: `${IMAGE_BASE}/easy-to-wear-saree-bangalore.webp`,
    alt: 'Ready-to-wear saree sitting pose with comfortable drape',
    title: 'Comfortable Sitting Drape',
    desc: 'A practical ready-to-wear saree finish planned for comfort through long functions.'
  },
  {
    src: `${IMAGE_BASE}/pre-stitched-saree-bangalore.webp`,
    alt: 'Ready-to-wear saree pallu close-up after customization',
    title: 'Pallu Finish Detail',
    desc: 'Pallu styling is balanced to preserve the saree beauty while making it easy to wear.'
  },
  {
    src: `${IMAGE_BASE}/permanent-saree-stitching-bangalore.webp`,
    alt: 'Permanent saree stitching pleat detail',
    title: 'Permanent Pleat Detail',
    desc: 'Permanent pleat setting helps your saree sit neatly every time you wear it.'
  },
  {
    src: `${IMAGE_BASE}/one-minute-saree-bangalore.webp`,
    alt: 'Boutique consultation sample for ready-to-wear saree customization',
    title: 'One-Minute Saree Styling',
    desc: 'A boutique-ready drape for women who want saree elegance without everyday draping effort.'
  },
  {
    src: `${IMAGE_BASE}/customized-pre-stitched-saree-bangalore.webp`,
    alt: 'Boutique-finished ready-to-wear saree in Bangalore',
    title: 'Pre-Stitched Boutique Finish',
    desc: 'A reusable pre-stitched saree tailored to your measurements and original saree fabric.'
  }
];

const trustPoints = [
  {
    icon: '01',
    label: 'Customization',
    title: 'Bring Your Own Saree',
    desc: 'We convert your existing saree into a ready-to-wear saree tailored to your measurements.'
  },
  {
    icon: '02',
    label: 'Fit',
    title: 'Made-to-Measure Drape',
    desc: 'Permanent pleats, waist structure, and fall are planned around your comfort and body type.'
  },
  {
    icon: '03',
    label: 'Finish',
    title: 'Premium Lining and Stitching',
    desc: 'Each saree is finished with care so it feels secure, polished, and occasion-ready.'
  },
  {
    icon: '04',
    label: 'Guidance',
    title: 'Designer Consultation',
    desc: 'Shrusara helps you decide whether your saree is suitable before customization begins.'
  },
  {
    icon: '05',
    label: 'Convenience',
    title: 'Wear It in Minutes',
    desc: 'Enjoy saree elegance without arranging pleats or needing help with traditional draping.'
  },
  {
    icon: '06',
    label: 'Access',
    title: 'Boutique, Video, Porter or Courier',
    desc: 'Visit us in Bangalore or coordinate remotely with photo review and safe saree handling.'
  }
];

const beforeItems = [
  'Traditional draping every time',
  'Pleats need to be arranged',
  'Takes time to wear',
  'May require assistance',
  'Different drape every time'
];

const afterItems = [
  'Permanent pleats',
  'Customized to your measurements',
  'Easy to wear in minutes',
  'Comfortable and secure fit',
  'Elegant drape every time',
  'Reusable again and again'
];

const consultationOptions = [
  {
    step: '01',
    title: 'Visit Our Boutique',
    desc: 'Visit Shrusara Fashion Boutique in Mahalakshmipuram, Bangalore. Meet our designer, discuss your requirements, select the best customization option, and get your measurements taken.'
  },
  {
    step: '02',
    title: 'Book a Video Consultation',
    desc: "Can't visit us? Schedule a video consultation from the comfort of your home. We'll discuss your saree, answer your questions, guide you on measurements, and explain the customization process."
  },
  {
    step: '03',
    title: 'Porter and Courier Service',
    desc: "If you're in Bangalore, you can send your saree through Porter. Customers from outside Bangalore can courier their saree to us. After customization, we'll safely return it using the same method."
  }
];

const craftImages = [
  {
    src: `${IMAGE_BASE}/permanent-saree-stitching-bangalore.webp`,
    alt: 'Permanent pleat stitching for ready-to-wear saree'
  },
  {
    src: `${IMAGE_BASE}/pre-stitched-saree-bangalore.webp`,
    alt: 'Pre-stitched saree pallu finishing'
  },
  {
    src: `${IMAGE_BASE}/customized-ready-to-wear-saree-bangalore.webp`,
    alt: 'Customized ready-to-wear saree fit'
  },
  {
    src: `${IMAGE_BASE}/easy-to-wear-saree-bangalore.webp`,
    alt: 'Easy-to-wear saree boutique finish'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    desc: 'Visit the boutique or schedule a video consultation.'
  },
  {
    step: '02',
    title: 'Measurements',
    desc: 'Share your measurements or get measured at the boutique.'
  },
  {
    step: '03',
    title: 'Send Your Saree',
    desc: 'Drop it off at our boutique or send it via Porter or courier.'
  },
  {
    step: '04',
    title: 'Customization',
    desc: 'We professionally customize your saree with permanent pleats, premium lining, and finishing.'
  },
  {
    step: '05',
    title: 'Quality Check',
    desc: 'Every saree is carefully inspected before dispatch.'
  },
  {
    step: '06',
    title: 'Delivery',
    desc: 'Collect your saree from our boutique or receive it safely at your doorstep.'
  }
];

const whyPoints = [
  'Customization Only - No Ready-Made Stock',
  'Experienced Fashion Designer',
  'Personalized Consultation',
  'Premium Stitching and Finishing',
  'Tailored to Your Measurements',
  'Trusted by Customers Across Bangalore'
];

const googleTrustHighlights = [
  '4.9+ Google Rating',
  'Hundreds of Happy Customers',
  'Personalized Consultation',
  'Premium Quality Workmanship'
];

const reviews = [
  {
    name: 'Meena R.',
    text: 'I gave my silk saree for ready-to-wear customization and the fit was excellent. It takes just minutes to wear now, but still looks graceful.'
  },
  {
    name: 'Suma T.',
    text: 'Shrusara made the whole process very easy. I shared my saree photos first, then visited for measurements. The finishing was neat and comfortable.'
  },
  {
    name: 'Kavitha M.',
    text: 'Perfect service for busy functions. My saree now has permanent pleats and sits securely without needing help every time.'
  },
  {
    name: 'Anjali P.',
    text: 'The designer explained everything clearly before stitching. I loved that my original saree beauty was maintained.'
  },
  {
    name: 'Nandini K.',
    text: 'The pre-stitched saree looked elegant and was very comfortable. The boutique team handled my saree carefully.'
  },
  {
    name: 'Haritha S.',
    text: 'I used Porter to send my saree and the whole coordination was smooth. The final drape was clean and easy to wear.'
  }
];

const faqs = [
  {
    q: 'Do you sell Ready-to-Wear Sarees?',
    a: 'No. We do not sell ready-made or Ready-to-Wear Sarees. This is a customization service where we transform your own saree into a Ready-to-Wear Saree.'
  },
  {
    q: 'Can I visit your boutique?',
    a: 'Yes. You are welcome to visit our boutique in Mahalakshmipuram, Bangalore, for a personalized consultation, measurements, and saree assessment.'
  },
  {
    q: 'Can I book a video consultation?',
    a: "Yes. If you're unable to visit the boutique, you can schedule a video consultation and discuss your saree, measurements, and customization requirements with our designer."
  },
  {
    q: 'Can I send my saree through Porter?',
    a: 'Yes. Customers within Bangalore can conveniently send and receive their saree through Porter.'
  },
  {
    q: 'Can I courier my saree from another city?',
    a: "Yes. Customers from outside Bangalore can courier their saree to us. After customization, we'll safely courier it back."
  },
  {
    q: 'Can any saree be converted into a Ready-to-Wear Saree?',
    a: "Most sarees can be customized. Simply send us a photo of your saree on WhatsApp, and we'll let you know if it's suitable."
  },
  {
    q: 'Is the stitching permanent?',
    a: 'Yes. The pleats and draping structure are permanently customized, making the saree easy to wear while maintaining an elegant appearance.'
  },
  {
    q: 'Will my saree be damaged during customization?',
    a: 'No. Every saree is handled with great care. Our professional customization process is designed to preserve the beauty and elegance of your saree.'
  },
  {
    q: 'How long does the customization take?',
    a: "The turnaround time depends on the fabric, design, and current workload. We'll confirm the estimated delivery timeline during your consultation."
  },
  {
    q: 'What is included in the Rs. 1,050 customization charge?',
    a: 'The service includes permanent pre-stitching, permanent pleat setting, premium lining, waist belt stitching, professional finishing, and a complete quality check. Any additional alterations or blouse stitching, if required, are charged separately.'
  },
  {
    q: 'How do I get started?',
    a: "Simply send us a photo of your saree on WhatsApp or book a consultation. We'll guide you through the entire process."
  }
];

const footerServices = [
  'Bridal Blouse Stitching',
  'Bridal Lehenga Stitching',
  'Designer Blouse Stitching',
  'Ready-to-Wear Saree Customization',
  'Luxury Occasion Wear',
  'Designer Gowns',
  'Aari and Maggam Work'
];

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-shrusara-boutique' },
  { label: 'Bridal Boutique', href: '/customized-bridal-blouse-bangalore' },
  { label: 'Designer Outfits', href: '/customized-designer-outfits-bangalore' },
  { label: 'Ready-to-Wear Sarees', href: '/ready-to-wear-saree-bangalore' },
  { label: 'Contact Us', href: '/contact-shrusara-bangalore' }
];

const footerBusinessHours = [
  'Monday - Saturday: 10:00 AM - 7:30 PM',
  'Sunday: By Appointment Only'
];

const footerSocials = ['Instagram', 'Facebook'];

const readyToWearSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Ready-to-Wear Saree Customization in Bangalore',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Shrusara Fashion Boutique',
        telephone: PHONE_NUMBER,
        email: EMAIL,
        address: ADDRESS
      },
      areaServed: 'Bangalore',
      offers: {
        '@type': 'Offer',
        price: '1050',
        priceCurrency: 'INR',
        description: 'Permanent ready-to-wear saree customization for customer-owned sarees.'
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    }
  ]
};

const WaIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MapPinIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GoogleIcon = ({ size = 38 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-label="Google" role="img" style={{ flexShrink: 0 }}>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

function GalleryModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="rtwm-overlay" onClick={onClose}>
      <div className="rtwm-box" onClick={(event) => event.stopPropagation()}>
        <button className="rtwm-close" onClick={onClose} aria-label="Close preview">x</button>
        <div className="rtwm-img-wrap">
          <img src={item.src} alt={item.alt} />
        </div>
        <div className="rtwm-body">
          <p className="rtwm-eyebrow">Design Preview</p>
          <h3 className="rtwm-title">{item.title}</h3>
          <p className="rtwm-desc">{item.desc}</p>
          <button className="rtwm-btn-cont" onClick={onClose}>Close Preview</button>
        </div>
      </div>
    </div>
  );
}

function ReadyToWearSareeLandingPage() {
  const [modalItem, setModalItem] = useState(null);

  return (
    <>
      <PageMeta
        title="Ready-to-Wear Saree Customization in Bangalore | Shrusara"
        description="Convert your own saree into a ready-to-wear saree in Bangalore with permanent pleats, premium lining, secure fit, and boutique finishing by Shrusara."
        keywords="ready to wear saree Bangalore, pre stitched saree Bangalore, one minute saree Bangalore, saree customization Bangalore"
        canonicalPath="/ready-to-wear-saree-bangalore"
        image={`${IMAGE_BASE}/ready-to-wear-saree-bangalore.webp`}
        schema={readyToWearSchema}
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --rtw-gold: #B8935A;
          --rtw-gold-pale: #F5EDD9;
          --rtw-dark: #1C1410;
          --rtw-cream: #FBF8F3;
          --rtw-text: #3A2E25;
          --rtw-muted: #7A6A5A;
          --rtw-white: #FFFFFF;
        }
        .rtw-body {
          font-family: 'Jost', 'Poppins', sans-serif;
          background: var(--rtw-cream);
          color: var(--rtw-text);
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }
        .rtw-body a { color: inherit; text-decoration: none; }
        .rtw-body img { display: block; max-width: 100%; }

        .rtw-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(251,248,243,.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(184,147,90,.15);
          padding: 0 4vw;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
          gap: 8px;
        }
        .rtw-hdr-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .rtw-hdr-logo { height: 44px; width: auto; object-fit: contain; display: block; }
        .rtw-hdr-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: #2b2118;
          line-height: 1; white-space: nowrap;
        }
        .rtw-hdr-sub {
          font-size: .48rem; letter-spacing: .28em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-top: 4px; line-height: 1;
        }
        .rtw-hdr-badge {
          display: flex; align-items: center; gap: 6px;
          font-size: .56rem; letter-spacing: .15em; text-transform: uppercase;
          color: var(--rtw-muted); font-weight: 500; white-space: nowrap;
        }
        .rtw-hdr-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4CAF50;
          animation: rtw-pulse 2s infinite; flex-shrink: 0;
        }
        @keyframes rtw-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .rtw-hdr-cta {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--rtw-dark); color: var(--rtw-white);
          font-size: .58rem; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; padding: 10px 16px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: background .2s;
        }
        .rtw-hdr-cta:hover { background: var(--rtw-gold); }

        .rtw-hero {
          display: flex; flex-direction: row;
          align-items: stretch; width: 100%;
          min-height: 88vh;
          background: var(--rtw-cream);
          position: relative; overflow: hidden;
        }
        .rtw-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 60% 70% at 30% 50%, rgba(184,147,90,.08) 0%, transparent 70%);
        }
        .rtw-hero-text {
          flex: 1.1; display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 72px 40px 72px 5vw; z-index: 2;
        }
        .rtw-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: .6rem; letter-spacing: .24em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 18px;
        }
        .rtw-hero-eyebrow::before {
          content: ''; width: 24px; height: 1px; background: var(--rtw-gold); display: block;
        }
        .rtw-hero-h1 {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3vw, 3.2rem);
          font-weight: 700; line-height: 1.12;
          color: var(--rtw-dark); margin-bottom: 10px;
        }
        .rtw-hero-h1 em { font-style: italic; color: var(--rtw-gold); }
        .rtw-hero-h2 {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1rem, 1.5vw, 1.5rem);
          font-weight: 400; font-style: italic;
          color: var(--rtw-muted); margin-bottom: 18px; line-height: 1.35;
        }
        .rtw-hero-sub {
          font-size: .86rem; line-height: 1.8; color: var(--rtw-muted);
          max-width: 440px; margin-bottom: 6px; font-weight: 300;
        }
        .rtw-hero-highlight-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px 16px;
          max-width: 620px;
          margin: 0 0 22px;
        }
        .rtw-hero-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: .74rem;
          line-height: 1.52;
          color: var(--rtw-text);
          font-weight: 500;
        }
        .rtw-hero-highlight-item::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--rtw-gold);
          margin-top: .48em;
          flex-shrink: 0;
        }
        .rtw-hero-note-card {
          max-width: 560px;
          border: 1px solid rgba(184,147,90,.18);
          background: rgba(255,255,255,.84);
          padding: 16px 18px;
          margin: 0 0 22px;
          box-shadow: 0 4px 20px rgba(28,20,16,.06);
        }
        .rtw-hero-note-title {
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--rtw-gold);
          margin-bottom: 6px;
        }
        .rtw-hero-note-text {
          font-size: .76rem;
          line-height: 1.68;
          color: var(--rtw-muted);
          font-weight: 300;
        }
        .rtw-hero-designer {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: .7rem; font-weight: 600; letter-spacing: .06em;
          color: var(--rtw-dark); margin-bottom: 6px;
        }
        .rtw-hero-designer::before { content: '\\2726'; color: var(--rtw-gold); font-size: .68rem; }
        .rtw-hero-price { font-size: .74rem; color: var(--rtw-muted); margin-bottom: 10px; }
        .rtw-hero-price strong { color: var(--rtw-dark); font-weight: 700; }
        .rtw-hero-scarcity {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .66rem; color: rgba(184,147,90,.85);
          font-weight: 500; letter-spacing: .04em; margin-bottom: 24px;
        }
        .rtw-hero-scarcity::before { content: '\\2691'; font-size: .63rem; }
        .rtw-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .rtw-hero-img-wrap { flex: 1; position: relative; min-height: 88vh; overflow: hidden; }
        .rtw-hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .rtw-hero-img-fade { position: absolute; inset: 0; background: linear-gradient(to right, var(--rtw-cream) 0%, transparent 18%); }

        .rtw-btn-pri,
        .rtw-btn-sec {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: .68rem; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; padding: 14px 24px;
          text-decoration: none; border: 2px solid var(--rtw-dark);
          transition: transform .2s, box-shadow .2s, background .2s, color .2s;
        }
        .rtw-btn-pri { background: var(--rtw-dark); color: var(--rtw-white); }
        .rtw-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,20,16,.2); }
        .rtw-btn-sec { background: transparent; color: var(--rtw-dark); }
        .rtw-btn-sec:hover { background: var(--rtw-dark); color: var(--rtw-white); }

        .rtw-anchor-wrap {
          position: sticky;
          top: 64px;
          z-index: 90;
          background: rgba(251,248,243,.96);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(184,147,90,.12);
          padding: 10px 4vw;
        }
        .rtw-anchor-nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .rtw-anchor-link {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(184,147,90,.32);
          color: var(--rtw-muted);
          font-size: .58rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 8px 16px;
          transition: border-color .2s, color .2s, background .2s;
        }
        .rtw-anchor-link:hover {
          border-color: var(--rtw-gold);
          color: var(--rtw-gold);
          background: rgba(184,147,90,.06);
        }

        .rtw-trust { padding: 0 4vw 56px; background: var(--rtw-white); }
        .rtw-trust-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(184,147,90,.12);
        }
        .rtw-trust-item {
          background: var(--rtw-white); padding: 28px 22px;
          display: flex; align-items: flex-start; gap: 14px;
        }
        .rtw-trust-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--rtw-gold-pale); display: flex;
          align-items: center; justify-content: center;
          flex-shrink: 0; font-size: .95rem; color: var(--rtw-gold);
        }
        .rtw-trust-label {
          font-size: .56rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 5px;
        }
        .rtw-trust-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 700; color: var(--rtw-dark); margin-bottom: 4px;
        }
        .rtw-trust-desc {
          font-size: .78rem; color: var(--rtw-muted); line-height: 1.6; font-weight: 300;
        }

        .rtw-before,
        .rtw-consult,
        .rtw-gallery,
        .rtw-why,
        .rtw-process,
        .rtw-faq,
        .rtw-price {
          padding: 64px 4vw;
          background: var(--rtw-cream);
        }
        .rtw-white-sec { background: var(--rtw-white); }
        .rtw-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 12px;
        }
        .rtw-sec-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--rtw-gold); display: block; }
        .rtw-sec-h,
        .rtw-craft-h,
        .rtw-why-h,
        .rtw-designer-sec-h,
        .rtw-reviews-title,
        .rtw-google-review-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.6vw, 2.4rem);
          font-weight: 700; line-height: 1.2;
        }
        .rtw-sec-h,
        .rtw-craft-h,
        .rtw-why-h,
        .rtw-reviews-title,
        .rtw-google-review-title { color: var(--rtw-dark); margin-bottom: 10px; }
        .rtw-sec-sub,
        .rtw-craft-desc,
        .rtw-why-desc,
        .rtw-reviews-sub,
        .rtw-price-desc {
          font-size: .85rem; color: var(--rtw-muted); line-height: 1.75;
          max-width: 620px; font-weight: 300;
        }
        .rtw-sec-sub { max-width: 500px; }
        .rtw-before-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 20px;
          align-items: stretch;
          margin-top: 34px;
        }
        .rtw-compare-card {
          background: var(--rtw-white);
          border: 1px solid rgba(184,147,90,.12);
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .rtw-compare-label {
          display: block;
          font-size: .58rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--rtw-gold);
          font-weight: 700;
          margin-bottom: 10px;
        }
        .rtw-compare-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.22rem;
          color: var(--rtw-dark);
          margin-bottom: 12px;
        }
        .rtw-compare-list,
        .rtw-why-list,
        .rtw-footer-list,
        .rtw-footer-text-list,
        .rtw-footer-inline-links {
          list-style: none;
        }
        .rtw-compare-list {
          display: grid;
          gap: 9px;
        }
        .rtw-compare-list li,
        .rtw-why-item {
          display: flex;
          gap: 9px;
          font-size: .8rem;
          color: var(--rtw-muted);
          line-height: 1.62;
          font-weight: 300;
        }
        .rtw-compare-list li::before,
        .rtw-why-item::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--rtw-gold);
          margin-top: .54em;
          flex-shrink: 0;
        }
        .rtw-compare-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--rtw-gold);
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
        }
        .rtw-before-note {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border-top: 1px solid rgba(184,147,90,.16);
          padding-top: 24px;
        }
        .rtw-before-note p {
          max-width: 640px;
          color: var(--rtw-muted);
          font-size: .85rem;
          line-height: 1.72;
          font-weight: 300;
        }
        .rtw-consult-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }
        .rtw-gallery-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 36px;
        }
        .rtw-gallery-card {
          overflow: hidden; border-radius: 22px;
          border: 1px solid rgba(255,255,255,.6);
          background: rgba(255,255,255,.82); padding: 10px;
          box-shadow: 0 4px 20px rgba(28,20,16,.10);
          transition: transform .3s, box-shadow .3s;
          cursor: pointer; width: 100%; text-align: left;
          appearance: none; -webkit-appearance: none; display: block;
        }
        .rtw-gallery-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(28,20,16,.16); }
        .rtw-gallery-card-inner { border-radius: 16px; overflow: hidden; background: var(--rtw-gold-pale); aspect-ratio: 4/5; }
        .rtw-gallery-card-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .rtw-gallery-card:hover .rtw-gallery-card-inner img { transform: scale(1.05); }

        .rtw-google-sec {
          padding: 80px 4vw;
          background: var(--rtw-cream);
          text-align: center;
        }
        .rtw-img-top-label {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin-bottom: 22px;
        }
        .rtw-img-top-label span {
          font-size: .62rem; font-weight: 700; letter-spacing: .28em;
          text-transform: uppercase; color: var(--rtw-gold);
        }
        .rtw-img-line { width: 40px; height: 1px; background: var(--rtw-gold); opacity: .6; }
        .rtw-img-main-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3.8vw, 3.6rem);
          color: #2b2118; margin: 0 0 14px; font-weight: 700;
        }
        .rtw-img-main-sub {
          font-size: 1rem; color: var(--rtw-muted); line-height: 1.6;
          max-width: 560px; margin: 0 auto 44px; font-weight: 300;
        }
        .rtw-google-card {
          background: white; border-radius: 30px; padding: 22px 40px;
          max-width: 860px; margin: 0 auto 28px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          box-shadow: 0 12px 40px rgba(0,0,0,.03);
          border: 1px solid rgba(0,0,0,.03); flex-wrap: wrap;
        }
        .rtw-google-div { width: 1px; height: 46px; background: #eee; flex-shrink: 0; }
        .rtw-rating-wrap { display: flex; align-items: center; gap: 16px; text-align: left; }
        .rtw-big-num { font-size: 3.8rem; font-weight: 700; color: #2b2118; line-height: 1; font-family: 'Jost', sans-serif; }
        .rtw-stars-group { display: flex; flex-direction: column; gap: 2px; }
        .rtw-stars-row { color: #FFB400; font-size: 1.5rem; letter-spacing: 2px; line-height: 1; }
        .rtw-source-lbl { font-size: 1rem; font-weight: 600; color: #444; }
        .rtw-sub-row { font-size: .92rem; color: var(--rtw-muted); text-align: left; }
        .rtw-sub-row strong { color: #2b2118; font-weight: 700; }
        .rtw-pill-btn {
          border: 1px solid var(--rtw-gold); border-radius: 100px; padding: 13px 28px;
          color: var(--rtw-gold); font-size: .72rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase; text-decoration: none;
          display: flex; align-items: center; gap: 10px; transition: all .2s;
        }
        .rtw-pill-btn:hover { background: var(--rtw-gold); color: white; }
        .rtw-black-badge {
          background: #251D18; border-radius: 18px; padding: 22px 40px;
          max-width: 620px; margin: 0 auto; display: flex; align-items: center;
          gap: 30px; text-align: left; position: relative;
        }
        .rtw-black-badge::after {
          content: ""; position: absolute; bottom: 0; left: 12%; right: 45%;
          height: 4px; background: #A88A64; border-radius: 10px 10px 0 0;
        }
        .rtw-badge-icon { color: #A88A64; flex-shrink: 0; }
        .rtw-badge-div { width: 1px; height: 56px; background: rgba(168,138,100,.2); }
        .rtw-badge-stars { color: #A88A64; font-size: 1.3rem; letter-spacing: 4px; margin-bottom: 10px; line-height: 1; }
        .rtw-badge-content h3 {
          color: #A88A64; font-size: 1rem; font-weight: 700;
          letter-spacing: .05em; margin: 0 0 5px; text-transform: uppercase;
        }
        .rtw-badge-content p { color: #9C9C9C; font-size: .95rem; margin: 0; font-weight: 300; }
        .rtw-google-highlights {
          max-width: 1100px;
          margin: 0 auto 28px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        .rtw-google-highlight {
          background: rgba(255,255,255,.82);
          border: 1px solid rgba(184,147,90,.14);
          padding: 18px 16px;
          text-align: left;
        }
        .rtw-google-highlight-label {
          font-size: .56rem;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--rtw-gold);
          margin-bottom: 6px;
        }
        .rtw-google-highlight-text {
          font-size: .82rem;
          color: var(--rtw-text);
          line-height: 1.55;
        }
        .rtw-google-review-title { margin: 38px auto 12px; }
        .rtw-google-review-grid {
          max-width: 1100px;
          margin: 26px auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .rtw-google-review-card {
          background: #fff;
          border: 1px solid rgba(184,147,90,.12);
          border-radius: 14px;
          padding: 22px 20px;
          text-align: left;
          box-shadow: 0 4px 18px rgba(28,20,16,.06);
        }
        .rtw-google-review-stars {
          color: #FFB400;
          font-size: .88rem;
          letter-spacing: 3px;
          margin-bottom: 12px;
        }
        .rtw-google-review-text {
          font-size: .82rem;
          line-height: 1.72;
          color: var(--rtw-text);
          font-weight: 300;
          margin-bottom: 16px;
          font-style: italic;
        }
        .rtw-google-review-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .rtw-google-review-name {
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--rtw-dark);
        }
        .rtw-google-review-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .58rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--rtw-gold);
        }

        .rtw-craft { padding: 64px 4vw; background: var(--rtw-white); }
        .rtw-craft-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        }
        .rtw-craft-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 12px;
        }
        .rtw-craft-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--rtw-gold); display: block; }
        .rtw-craft-h { margin-bottom: 18px; }
        .rtw-craft-desc { font-size: .88rem; line-height: 1.82; margin-bottom: 14px; }
        .rtw-craft-note {
          font-size: .83rem; line-height: 1.72; color: var(--rtw-text);
          font-weight: 400; margin-top: 18px; border-left: 2px solid var(--rtw-gold);
          padding-left: 14px;
        }
        .rtw-craft-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .rtw-craft-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--rtw-gold-pale); color: var(--rtw-dark);
          font-size: .6rem; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; padding: 7px 14px; border: 1px solid rgba(184,147,90,.25);
        }
        .rtw-craft-tag::before { content: '\\2726'; color: var(--rtw-gold); font-size: .52rem; }
        .rtw-craft-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rtw-craft-img-card {
          overflow: hidden; border-radius: 18px; border: 1px solid rgba(255,255,255,.6);
          background: rgba(255,255,255,.82); padding: 8px; box-shadow: 0 4px 18px rgba(28,20,16,.09);
          transition: transform .3s, box-shadow .3s;
        }
        .rtw-craft-img-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(28,20,16,.14); }
        .rtw-craft-img-inner { border-radius: 14px; overflow: hidden; background: var(--rtw-gold-pale); aspect-ratio: 3/4; }
        .rtw-craft-img-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .rtw-craft-img-card:hover .rtw-craft-img-inner img { transform: scale(1.05); }
        .rtw-why-list {
          display: grid;
          gap: 14px;
          margin-top: 26px;
        }
        .rtw-why-item {
          background: var(--rtw-white);
          border: 1px solid rgba(184,147,90,.12);
          padding: 16px 18px;
          color: var(--rtw-text);
          font-weight: 400;
        }

        .rtw-designer { padding: 64px 4vw; background: var(--rtw-dark); }
        .rtw-designer-inner { max-width: 960px; margin: 0 auto; }
        .rtw-designer-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 12px;
        }
        .rtw-designer-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--rtw-gold); display: block; }
        .rtw-designer-sec-h { color: var(--rtw-white); margin-bottom: 40px; }
        .rtw-designer-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 48px; align-items: center; }
        .rtw-designer-accent { position: relative; padding: 30px 26px; border: 1px solid rgba(184,147,90,.3); }
        .rtw-designer-accent::before { content: ''; position: absolute; top: -1px; left: 32px; right: 32px; height: 2px; background: var(--rtw-gold); }
        .rtw-designer-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem; font-weight: 700; color: var(--rtw-white); margin-bottom: 5px;
        }
        .rtw-designer-role {
          font-size: .56rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 12px;
        }
        .rtw-designer-stars { color: var(--rtw-gold); letter-spacing: 3px; font-size: .88rem; }
        .rtw-designer-text {
          font-size: 1rem; line-height: 1.88; color: rgba(255,255,255,.75);
          font-weight: 300; font-family: 'Cormorant Garamond', serif;
          font-style: italic; margin-bottom: 16px;
        }
        .rtw-designer-sub { font-size: .85rem; line-height: 1.72; color: rgba(255,255,255,.5); font-weight: 300; }
        .rtw-designer-trusted {
          font-size: .8rem; line-height: 1.68; color: rgba(255,255,255,.42);
          font-weight: 300; margin-top: 24px; border-top: 1px solid rgba(184,147,90,.2);
          padding-top: 18px;
        }

        .rtw-reviews { padding: 64px 4vw; background: var(--rtw-white); }
        .rtw-reviews-hdr { text-align: center; max-width: 680px; margin: 0 auto 40px; }
        .rtw-reviews-title { margin-bottom: 10px; }
        .rtw-reviews-sub { margin: 0 auto; }
        .rtw-reviews-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 18px; max-width: 1100px; margin: 0 auto;
        }
        .rtw-review-card {
          background: var(--rtw-cream); border: 1px solid rgba(184,147,90,.14);
          border-radius: 14px; padding: 24px 20px; box-shadow: 0 2px 12px rgba(28,20,16,.05);
        }
        .rtw-review-stars { color: #FFC107; letter-spacing: 3px; font-size: .88rem; margin-bottom: 10px; }
        .rtw-review-text {
          font-size: .82rem; line-height: 1.72; color: var(--rtw-text);
          font-weight: 300; margin-bottom: 16px; font-style: italic;
        }
        .rtw-review-name {
          font-size: .7rem; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: var(--rtw-dark);
        }

        .rtw-process-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 36px;
        }
        .rtw-video-layout {
          display: grid;
          grid-template-columns: minmax(0, .92fr) minmax(360px, 1fr);
          gap: 28px;
          align-items: start;
          margin-top: 32px;
        }
        .rtw-video-card {
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,.6);
          background: rgba(255,255,255,.82);
          padding: 10px;
          box-shadow: 0 4px 20px rgba(28,20,16,.10);
        }
        .rtw-video-inner {
          border-radius: 16px;
          overflow: hidden;
          background: var(--rtw-gold-pale);
          aspect-ratio: 16 / 10;
        }
        .rtw-video-inner video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rtw-video-layout .rtw-process-grid {
          grid-template-columns: repeat(2, 1fr);
          margin-top: 0;
        }
        .rtw-process-card,
        .rtw-faq-card,
        .rtw-price-card {
          background: var(--rtw-cream);
          padding: 30px 24px;
          border: 1px solid rgba(184,147,90,.12);
          position: relative; overflow: hidden;
        }
        .rtw-process .rtw-process-card { background: var(--rtw-cream); }
        .rtw-consult .rtw-process-card { background: var(--rtw-cream); }
        .rtw-process-card::before {
          content: attr(data-step); position: absolute; top: -12px; right: 12px;
          font-family: 'Cormorant Garamond', serif; font-size: 4.5rem;
          font-weight: 700; color: rgba(184,147,90,.1); pointer-events: none; line-height: 1;
        }
        .rtw-process-step {
          display: inline-block; font-size: .6rem; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: var(--rtw-gold);
          margin-bottom: 12px;
        }
        .rtw-process-title,
        .rtw-faq-title,
        .rtw-price-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.22rem; font-weight: 700; color: var(--rtw-dark); margin-bottom: 8px;
        }
        .rtw-process-desc,
        .rtw-faq-text,
        .rtw-price-list li {
          font-size: .8rem; color: var(--rtw-muted); line-height: 1.68; font-weight: 300;
        }
        .rtw-price-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr .82fr; gap: 32px; align-items: center;
        }
        .rtw-price-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          color: var(--rtw-gold); line-height: .95; margin: 18px 0 22px;
        }
        .rtw-price-number span {
          display: block; font-family: 'Jost', sans-serif;
          font-size: .78rem; color: var(--rtw-muted); letter-spacing: .16em;
          text-transform: uppercase; margin-top: 8px;
        }
        .rtw-price-card { background: var(--rtw-white); }
        .rtw-price-list { list-style: none; display: grid; gap: 11px; }
        .rtw-price-list li { display: flex; gap: 10px; }
        .rtw-price-list li::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: var(--rtw-gold); margin-top: .55em; flex-shrink: 0;
        }
        .rtw-price-note {
          font-size: .78rem; line-height: 1.64; color: var(--rtw-muted);
          margin-top: 16px; font-weight: 300;
        }
        .rtw-faq-hdr { text-align: center; max-width: 720px; margin: 0 auto; }
        .rtw-faq .rtw-sec-eyebrow { justify-content: center; }
        .rtw-faq-grid {
          max-width: 960px; margin: 36px auto 0;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
        }
        .rtw-faq-card { background: var(--rtw-white); padding: 24px 20px; }

        .rtw-cta-wrap { padding: 64px 4vw; background: var(--rtw-cream); }
        .rtw-cta-box {
          background: var(--rtw-dark); padding: 60px 48px; text-align: center;
          position: relative; overflow: hidden; max-width: 960px; margin: 0 auto;
        }
        .rtw-cta-box::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 55% at 50% 100%, rgba(184,147,90,.12) 0%, transparent 70%);
        }
        .rtw-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .6rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 18px;
          position: relative; z-index: 1;
        }
        .rtw-cta-eyebrow::before,
        .rtw-cta-eyebrow::after {
          content: ''; width: 18px; height: 1px; background: var(--rtw-gold); display: block;
        }
        .rtw-cta-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 2.8vw, 2.6rem);
          font-weight: 700; color: var(--rtw-white); margin-bottom: 12px; line-height: 1.2;
          position: relative; z-index: 1;
        }
        .rtw-cta-sub {
          font-size: .88rem; line-height: 1.72; color: rgba(255,255,255,.7);
          max-width: 600px; margin: 0 auto 28px; font-weight: 300;
          position: relative; z-index: 1;
        }
        .rtw-cta-btns {
          display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .rtw-cta-btn-pri,
        .rtw-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: .68rem; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; padding: 14px 28px; text-decoration: none;
          transition: transform .2s, box-shadow .2s, background .2s;
        }
        .rtw-cta-btn-pri {
          background: var(--rtw-gold); color: var(--rtw-white);
          border: 2px solid var(--rtw-gold);
        }
        .rtw-cta-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,90,.35); }
        .rtw-cta-btn-sec {
          background: transparent; color: var(--rtw-white);
          border: 2px solid rgba(255,255,255,.3);
        }
        .rtw-cta-btn-sec:hover { background: rgba(255,255,255,.08); }

        .rtw-footer {
          background: var(--rtw-dark);
          border-top: 1px solid rgba(184,147,90,.18);
          padding: 32px 4vw 20px; color: rgba(255,255,255,.65);
        }
        .rtw-footer-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; flex-wrap: wrap; align-items: flex-start; gap: 28px 48px;
        }
        .rtw-footer-brand { display: flex; flex-direction: column; gap: 4px; min-width: 180px; flex: 1.2; }
        .rtw-footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 700; color: var(--rtw-white); margin: 0;
        }
        .rtw-footer-brand-tag {
          font-size: .5rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 8px;
        }
        .rtw-footer-desc,
        .rtw-footer-seo {
          font-size: .74rem; line-height: 1.68; color: rgba(255,255,255,.42);
          font-weight: 300; max-width: 300px; margin: 0;
        }
        .rtw-footer-seo { font-size: .7rem; color: rgba(255,255,255,.26); margin-top: 8px; max-width: 340px; }
        .rtw-footer-divider-v { width: 1px; align-self: stretch; background: rgba(184,147,90,.15); flex-shrink: 0; }
        .rtw-footer-contact { flex: 1; min-width: 180px; }
        .rtw-footer-contact-title {
          font-size: .54rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 12px;
        }
        .rtw-footer-col-title {
          font-size: .54rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--rtw-gold);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .rtw-footer-list,
        .rtw-footer-text-list,
        .rtw-footer-inline-links {
          display: grid;
          gap: 8px;
        }
        .rtw-footer-list li,
        .rtw-footer-list a,
        .rtw-footer-text-list li,
        .rtw-footer-inline-links li {
          font-size: .74rem;
          color: rgba(255,255,255,.52);
          line-height: 1.5;
          transition: color .2s;
        }
        .rtw-footer-list a:hover { color: var(--rtw-gold); }
        .rtw-footer-contact-list { display: flex; flex-direction: column; gap: 9px; }
        .rtw-footer-contact-item {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: .74rem; color: rgba(255,255,255,.52);
          line-height: 1.44; text-decoration: none; transition: color .2s;
        }
        .rtw-footer-contact-item:hover { color: var(--rtw-gold); }
        .rtw-footer-contact-icon { color: var(--rtw-gold); flex-shrink: 0; margin-top: 2px; }
        .rtw-footer-map-link {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 12px;
          font-size: .58rem; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; color: var(--rtw-gold); text-decoration: none;
          border: 1px solid rgba(184,147,90,.3); padding: 6px 12px; transition: background .2s;
        }
        .rtw-footer-map-link:hover { background: rgba(184,147,90,.1); }
        .rtw-footer-bottom {
          max-width: 1100px; margin: 18px auto 0; padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .rtw-footer-copy { font-size: .62rem; color: rgba(255,255,255,.22); }

        .rtw-float-call { position: fixed; bottom: 96px; right: 20px; z-index: 200; }
        .rtw-float-call a {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 50%;
          background: #000; color: #fff; box-shadow: 0 6px 24px rgba(0,0,0,.4); text-decoration: none;
        }
        .rtw-float-call a:hover { background: #B8935A; }
        .rtw-float-wa { position: fixed; bottom: 24px; right: 20px; z-index: 200; }
        .rtw-float-wa a {
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 50%;
          background: #25D366; color: var(--rtw-white);
          box-shadow: 0 6px 24px rgba(37,211,102,.45);
          position: relative; text-decoration: none;
        }
        .rtw-float-wa a::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: #25D366; opacity: .55; animation: rtw-ring 2s infinite;
        }
        @keyframes rtw-ring { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(1.75);opacity:0} }

        .rtwm-overlay {
          position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.86);
          backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .rtwm-box {
          background: #FAF8F5; border-radius: 18px; max-width: 860px; width: 100%;
          max-height: 92vh; overflow-y: auto; position: relative;
        }
        .rtwm-close {
          position: absolute; top: 12px; right: 12px; width: 38px; height: 38px;
          border-radius: 50%; background: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; color: #1C1410; z-index: 10;
        }
        .rtwm-img-wrap { width: 100%; background: #000; display: flex; justify-content: center; }
        .rtwm-img-wrap img { width: 100%; height: auto; max-height: 65vh; object-fit: contain; display: block; }
        .rtwm-body { padding: 20px 24px; text-align: center; }
        .rtwm-eyebrow {
          font-size: .56rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rtw-gold); font-weight: 600; margin-bottom: 5px;
        }
        .rtwm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 700; color: #1C1410; margin-bottom: 8px;
        }
        .rtwm-desc {
          font-size: .88rem; line-height: 1.58; color: #7A6A5A;
          margin: 0 auto 20px; max-width: 560px;
        }
        .rtwm-btn-cont {
          padding: 12px 36px; background: #1C1410; color: #fff; border: none;
          border-radius: 100px; font-size: .72rem; font-weight: 600;
          letter-spacing: .14em; text-transform: uppercase; cursor: pointer;
        }

        @media (max-width: 1024px) {
          .rtw-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .rtw-craft-inner,
          .rtw-designer-layout,
          .rtw-video-layout,
          .rtw-price-inner { grid-template-columns: 1fr; gap: 36px; }
          .rtw-footer-divider-v { display: none; }
          .rtw-reviews-grid,
          .rtw-google-review-grid,
          .rtw-google-highlights,
          .rtw-consult-grid,
          .rtw-process-grid,
          .rtw-trust-grid { grid-template-columns: repeat(2, 1fr); }
          .rtw-before-grid { grid-template-columns: 1fr; }
          .rtw-compare-arrow { padding: 4px 0; }
        }

        @media (max-width: 768px) {
          .rtw-hdr { height: 60px; padding: 0 16px; gap: 6px; }
          .rtw-hdr-logo { height: 38px; }
          .rtw-hdr-name { font-size: 1.25rem; }
          .rtw-hdr-sub { font-size: .42rem; letter-spacing: .22em; }
          .rtw-hdr-badge { display: none; }
          .rtw-hdr-cta { font-size: .54rem; padding: 9px 12px; letter-spacing: .1em; gap: 5px; }

          .rtw-hero { flex-direction: column; min-height: auto; }
          .rtw-hero-img-wrap { order: 1; height: 56vw; min-height: 240px; width: 100%; }
          .rtw-hero-img-fade { background: linear-gradient(to bottom, transparent 55%, var(--rtw-cream) 100%); }
          .rtw-hero-text { order: 2; padding: 32px 16px 40px; }
          .rtw-hero-eyebrow { font-size: .56rem; margin-bottom: 12px; }
          .rtw-hero-h1 { font-size: clamp(1.5rem, 6vw, 2rem); margin-bottom: 8px; }
          .rtw-hero-h2 { font-size: clamp(.95rem, 3.5vw, 1.2rem); margin-bottom: 14px; }
          .rtw-hero-sub { font-size: .82rem; max-width: 100%; margin-bottom: 6px; }
          .rtw-hero-highlight-list { grid-template-columns: 1fr; gap: 9px; }
          .rtw-hero-designer { font-size: .66rem; }
          .rtw-hero-price { font-size: .7rem; }
          .rtw-hero-scarcity { font-size: .63rem; margin-bottom: 20px; }
          .rtw-hero-btns,
          .rtw-cta-btns { flex-direction: column; gap: 10px; width: 100%; }
          .rtw-btn-pri,
          .rtw-btn-sec,
          .rtw-cta-btn-pri,
          .rtw-cta-btn-sec { width: 100%; justify-content: center; padding: 14px 20px; font-size: .66rem; }
          .rtw-anchor-wrap { display: none; }

          .rtw-trust { padding: 0 16px 40px; }
          .rtw-trust-grid,
          .rtw-reviews-grid,
          .rtw-google-review-grid,
          .rtw-google-highlights,
          .rtw-consult-grid,
          .rtw-process-grid,
          .rtw-faq-grid { grid-template-columns: 1fr; }
          .rtw-trust-item { padding: 20px 16px; }

          .rtw-before,
          .rtw-consult,
          .rtw-gallery,
          .rtw-why,
          .rtw-process,
          .rtw-faq,
          .rtw-price,
          .rtw-craft,
          .rtw-designer,
          .rtw-reviews,
          .rtw-cta-wrap { padding: 48px 16px; }
          .rtw-gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 24px; }
          .rtw-gallery-card { padding: 8px; border-radius: 16px; }
          .rtw-gallery-card-inner { border-radius: 12px; }
          .rtw-before-grid { grid-template-columns: 1fr; gap: 14px; margin-top: 24px; }
          .rtw-before-note { flex-direction: column; align-items: stretch; }
          .rtw-compare-arrow { padding: 2px 0; }
          .rtw-video-layout { grid-template-columns: 1fr; gap: 22px; }

          .rtw-google-sec { padding: 60px 16px; }
          .rtw-img-top-label { gap: 10px; }
          .rtw-img-top-label span { font-size: .56rem; letter-spacing: .18em; }
          .rtw-img-main-h { font-size: clamp(1.6rem, 6vw, 2.4rem); }
          .rtw-img-main-sub { font-size: .88rem; margin-bottom: 32px; }
          .rtw-google-card {
            flex-direction: column; padding: 24px 20px;
            text-align: center; gap: 16px; border-radius: 20px;
          }
          .rtw-google-div { display: none; }
          .rtw-rating-wrap { flex-direction: column; align-items: center; text-align: center; gap: 8px; }
          .rtw-big-num { font-size: 3.2rem; }
          .rtw-stars-row { font-size: 1.3rem; }
          .rtw-source-lbl { font-size: .9rem; }
          .rtw-sub-row { text-align: center; font-size: .85rem; }
          .rtw-pill-btn { width: 100%; justify-content: center; padding: 12px 20px; font-size: .68rem; }
          .rtw-black-badge {
            flex-direction: column; text-align: center;
            padding: 24px 20px; gap: 16px;
            border-radius: 16px; max-width: 100%;
          }
          .rtw-badge-div { display: none; }

          .rtw-craft-inner { gap: 28px; }
          .rtw-craft-right { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .rtw-craft-tags { gap: 6px; }
          .rtw-designer-layout { grid-template-columns: 1fr; gap: 20px; }
          .rtw-reviews-hdr { margin-bottom: 28px; }
          .rtw-process-grid { gap: 14px; margin-top: 24px; }
          .rtw-cta-box { padding: 36px 20px; }
          .rtw-footer { padding: 28px 16px 18px; }
          .rtw-footer-inner { gap: 20px 0; flex-direction: column; }
          .rtw-footer-desc,
          .rtw-footer-seo { max-width: 100%; }
          .rtwm-body { padding: 16px 18px; }
          .rtwm-title { font-size: 1.35rem; }
          .rtwm-desc { font-size: .82rem; }
          .rtw-float-call { bottom: 90px; right: 16px; }
          .rtw-float-call a { width: 50px; height: 50px; }
          .rtw-float-wa { bottom: 20px; right: 16px; }
          .rtw-float-wa a { width: 50px; height: 50px; }
        }

        @media (max-width: 480px) {
          .rtw-gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .rtw-hdr-name { font-size: 1.1rem; }
          .rtw-hdr-cta { padding: 8px 10px; font-size: .5rem; }
          .rtw-hero-img-wrap { height: 64vw; }
          .rtw-black-badge::after { left: 8%; right: 40%; }
        }
      `}</style>

      <div className="rtw-body">
        <header className="rtw-hdr">
          <a className="rtw-hdr-brand" href="/">
            <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="rtw-hdr-logo" />
            <div>
              <div className="rtw-hdr-name">Shrusara</div>
              <div className="rtw-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
            </div>
          </a>
          <div className="rtw-hdr-badge"><span className="rtw-hdr-badge-dot" />Bangalore's Saree Studio</div>
          <a href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" className="rtw-hdr-cta" onClick={() => trackWhatsApp('ready_to_wear_header')}>
            <WaIcon size={13} /> Chat With Our Designer
          </a>
        </header>

        <main>
          <section className="rtw-hero">
            <div className="rtw-hero-text">
              <p className="rtw-hero-eyebrow">Ready-to-Wear Saree Specialist Bangalore</p>
              <h1 className="rtw-hero-h1">Convert Your Saree Into a Ready-to-Wear Saree in <em>Bangalore</em></h1>
              <h2 className="rtw-hero-h2">Wear Your Favourite Saree in Minutes - Without the Hassle of Traditional Draping.</h2>
              <p className="rtw-hero-sub">
                Bring your own saree and we'll professionally customize it into a Ready-to-Wear Saree tailored to your measurements. With permanent pleats, premium lining, and elegant finishing, your saree becomes comfortable, secure, reusable, and effortless to wear without changing its beauty.
              </p>
              <ul className="rtw-hero-highlight-list">
                {heroHighlights.map((item) => (
                  <li key={item} className="rtw-hero-highlight-item">{item}</li>
                ))}
              </ul>
              <div className="rtw-hero-note-card">
                <p className="rtw-hero-note-title">Customization Service Only</p>
                <p className="rtw-hero-note-text">
                  We do not sell ready-made or Ready-to-Wear Sarees. Simply bring or send your own saree, and we'll professionally customize it into a Ready-to-Wear Saree tailored to your measurements.
                </p>
              </div>
              <p className="rtw-hero-designer">Customized personally with boutique guidance by Shrusara</p>
              <p className="rtw-hero-price">Ready-to-wear customization starts at <strong>Rs. 1,050 per saree</strong></p>
              <p className="rtw-hero-scarcity">No ready-made stock - your own saree is customized for you</p>
              <div className="rtw-hero-btns">
                <a className="rtw-btn-pri" href={waLink(PHOTO_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_hero_photo')}>
                  <WaIcon size={16} /> Share Your Saree Photo
                </a>
                <a className="rtw-btn-sec" href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_hero_designer')}>
                  <WaIcon size={16} /> Chat With Our Designer
                </a>
              </div>
            </div>
            <div className="rtw-hero-img-wrap">
              <img src={`${IMAGE_BASE}/ready-to-wear-saree-bangalore.webp`} alt="Ready-to-wear saree customization by Shrusara Fashion Boutique Bangalore" />
              <div className="rtw-hero-img-fade" />
            </div>
          </section>

          <div className="rtw-anchor-wrap">
            <nav className="rtw-anchor-nav" aria-label="Ready-to-wear saree page sections">
              {anchorLinks.map((item) => (
                <a key={item.href} className="rtw-anchor-link" href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <section className="rtw-trust">
            <div className="rtw-trust-grid">
              {trustPoints.map((item) => (
                <div key={item.title} className="rtw-trust-item">
                  <div className="rtw-trust-icon">{item.icon}</div>
                  <div>
                    <p className="rtw-trust-label">{item.label}</p>
                    <p className="rtw-trust-title">{item.title}</p>
                    <p className="rtw-trust-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rtw-before">
            <p className="rtw-sec-eyebrow">From Traditional Draping to Everyday Convenience</p>
            <h2 className="rtw-sec-h">Love Wearing Sarees, But Not the Hassle of Draping?</h2>
            <p className="rtw-sec-sub">
              A saree is timeless and elegant, but arranging pleats and achieving the perfect drape every time can be time-consuming. Our Ready-to-Wear Saree customization service professionally pre-stitches your own saree according to your measurements, making it effortless to wear while preserving its original beauty.
            </p>
            <div className="rtw-before-grid">
              <article className="rtw-compare-card">
                <span className="rtw-compare-label">Before</span>
                <h3 className="rtw-compare-title">Your Regular Saree</h3>
                <ul className="rtw-compare-list">
                  {beforeItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <div className="rtw-compare-arrow">To</div>
              <article className="rtw-compare-card">
                <span className="rtw-compare-label">After</span>
                <h3 className="rtw-compare-title">Your Ready-to-Wear Saree</h3>
                <ul className="rtw-compare-list">
                  {afterItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
            <div className="rtw-before-note">
              <p>
                Your saree remains your saree. We simply customize the draping structure to make it easier and more convenient to wear.
                <br />
                <br />
                Not sure if your saree can be customized? Send us a photo on WhatsApp. We'll check it and guide you.
              </p>
              <a className="rtw-btn-pri" href={waLink(PHOTO_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_before_after_photo')}>
                <WaIcon size={16} /> Share Your Saree Photo
              </a>
            </div>
          </section>

          <section id="consultation" className="rtw-consult rtw-white-sec">
            <p className="rtw-sec-eyebrow">Consultation</p>
            <h2 className="rtw-sec-h">Choose the Consultation Option That Works Best for You</h2>
            <p className="rtw-sec-sub">Visit the boutique, book a video consultation, or send your saree through Porter or courier.</p>
            <div className="rtw-consult-grid">
              {consultationOptions.map((item) => (
                <article className="rtw-process-card" data-step={item.step} key={item.title}>
                  <span className="rtw-process-step">Option {item.step}</span>
                  <h3 className="rtw-process-title">{item.title}</h3>
                  <p className="rtw-process-desc">{item.desc}</p>
                </article>
              ))}
            </div>
            <div className="rtw-hero-btns" style={{ marginTop: 28 }}>
              <a className="rtw-btn-pri" href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_consultation')}>
                <WaIcon size={16} /> Chat With Our Designer
              </a>
            </div>
          </section>

          <section id="process-video" className="rtw-process rtw-white-sec">
            <p className="rtw-sec-eyebrow">AI Process Video (45 Seconds)</p>
            <h2 className="rtw-sec-h">See How Your Saree Is Professionally Customized</h2>
            <p className="rtw-sec-sub">Below the video, you'll see the six-step boutique process from consultation to doorstep delivery.</p>
            <div className="rtw-video-layout">
              <div className="rtw-video-card">
                <div className="rtw-video-inner">
                  <video controls playsInline poster={`${IMAGE_BASE}/customized-ready-to-wear-saree-bangalore.webp`}>
                    <source src="/videos/about.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="rtw-process-grid">
                {processSteps.map((item) => (
                  <article className="rtw-process-card" data-step={item.step} key={item.step}>
                    <span className="rtw-process-step">Step {item.step}</span>
                    <h3 className="rtw-process-title">{item.title}</h3>
                    <p className="rtw-process-desc">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="rtw-hero-btns" style={{ marginTop: 28 }}>
              <a className="rtw-btn-pri" href={waLink(PHOTO_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_process_photo')}>
                <WaIcon size={16} /> Share Your Saree Photo
              </a>
            </div>
          </section>

          <section id="gallery" className="rtw-gallery">
            <p className="rtw-sec-eyebrow">Ready-to-Wear Gallery</p>
            <h2 className="rtw-sec-h">Original Boutique Images of Customized Ready-to-Wear Sarees</h2>
            <p className="rtw-sec-sub">Front view, walking, side profile, sitting pose, pallu finishing, pleat detail, consultation reference, and boutique-ready styling.</p>
            <div className="rtw-gallery-grid">
              {galleryImages.map((item, index) => (
                <button
                  className="rtw-gallery-card"
                  key={item.src}
                  onClick={() => setModalItem(item)}
                  aria-label={`View ${item.title}`}
                >
                  <div className="rtw-gallery-card-inner">
                    <img src={item.src} alt={item.alt} loading={index < 4 ? 'eager' : 'lazy'} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rtw-craft rtw-why">
            <div className="rtw-craft-inner">
              <div>
                <p className="rtw-craft-eyebrow">Why Shrusara?</p>
                <h2 className="rtw-why-h">Why Choose Shrusara Fashion Boutique?</h2>
                <p className="rtw-why-desc">
                  We focus on customized work, personal guidance, and premium finishing, so your saree feels effortless without losing its original elegance.
                </p>
                <ul className="rtw-why-list">
                  {whyPoints.map((item) => <li key={item} className="rtw-why-item">{item}</li>)}
                </ul>
              </div>
              <div className="rtw-craft-right">
                {craftImages.map((img) => (
                  <div key={img.src} className="rtw-craft-img-card">
                    <div className="rtw-craft-img-inner">
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rtw-google-sec">
            <div className="rtw-img-top-label">
              <div className="rtw-img-line" />
              <span>Google Reviews</span>
              <div className="rtw-img-line" />
            </div>
            <h2 className="rtw-img-main-h">Loved by Women Across Bangalore</h2>
            <p className="rtw-img-main-sub">See what our customers say about their experience at Shrusara Fashion Boutique.</p>
            <div className="rtw-google-highlights">
              {googleTrustHighlights.map((item, index) => (
                <div className="rtw-google-highlight" key={item}>
                  <p className="rtw-google-highlight-label">Trust Highlight {index + 1}</p>
                  <p className="rtw-google-highlight-text">{item}</p>
                </div>
              ))}
            </div>
            <div className="rtw-google-card">
              <GoogleIcon size={42} />
              <div className="rtw-google-div" />
              <div className="rtw-rating-wrap">
                <span className="rtw-big-num">4.9</span>
                <div className="rtw-stars-group">
                  <div className="rtw-stars-row">*****</div>
                  <div className="rtw-source-lbl">Google Reviews</div>
                </div>
              </div>
              <div className="rtw-google-div" />
              <div className="rtw-sub-row">Based on <strong>250+</strong> verified reviews on Google</div>
              <div className="rtw-google-div" />
              <a href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore" target="_blank" rel="noopener noreferrer" className="rtw-pill-btn">
                View on Google <span style={{ fontSize: '1.1rem' }}>-&gt;</span>
              </a>
            </div>
            <div className="rtw-black-badge">
              <div className="rtw-badge-icon">
                <GoogleIcon size={48} />
              </div>
              <div className="rtw-badge-div" />
              <div className="rtw-badge-content">
                <div className="rtw-badge-stars">*****</div>
                <h3>Hundreds of Happy Customers</h3>
                <p>Personalized consultation and premium quality workmanship.</p>
              </div>
            </div>
            <h3 className="rtw-google-review-title">Featured Reviews</h3>
            <div className="rtw-google-review-grid">
              {reviews.map((review) => (
                <article className="rtw-google-review-card" key={review.name}>
                  <p className="rtw-google-review-stars">*****</p>
                  <p className="rtw-google-review-text">{review.text}</p>
                  <div className="rtw-google-review-meta">
                    <p className="rtw-google-review-name">{review.name}</p>
                    <p className="rtw-google-review-badge"><GoogleIcon size={16} /> Verified Google Review</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rtw-price rtw-white-sec">
            <div className="rtw-price-inner">
              <div>
                <p className="rtw-sec-eyebrow">Pricing</p>
                <h2 className="rtw-sec-h">Ready-to-Wear Saree Customization</h2>
                <p className="rtw-price-desc">
                  Rs. 1,050 per saree for permanent ready-to-wear conversion with pre-stitching, pleat setting, lining, waist support, professional finishing, and quality check.
                </p>
                <div className="rtw-price-number">Rs. 1,050<span>Per saree</span></div>
                <div className="rtw-hero-btns">
                  <a className="rtw-btn-pri" href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_pricing')}>
                    <WaIcon size={16} /> Chat With Our Designer
                  </a>
                </div>
              </div>
              <div className="rtw-price-card">
                <h3 className="rtw-price-title">Included in the customization</h3>
                <ul className="rtw-price-list">
                  <li>Permanent pre-stitching</li>
                  <li>Permanent pleat setting</li>
                  <li>Premium lining</li>
                  <li>Waist belt stitching</li>
                  <li>Professional finishing</li>
                  <li>Final quality check</li>
                </ul>
                <p className="rtw-price-note">Blouse stitching, alterations, or additional customization, if required, will be charged separately.</p>
              </div>
            </div>
          </section>

          <section id="faq" className="rtw-faq">
            <div className="rtw-faq-hdr">
              <p className="rtw-sec-eyebrow">Q&amp;A</p>
              <h2 className="rtw-sec-h">Frequently Asked Questions</h2>
              <p className="rtw-sec-sub" style={{ margin: '0 auto' }}>Everything you need to know before sending your saree for ready-to-wear customization.</p>
            </div>
            <div className="rtw-faq-grid">
              {faqs.map((faq) => (
                <article className="rtw-faq-card" key={faq.q}>
                  <h3 className="rtw-faq-title">{faq.q}</h3>
                  <p className="rtw-faq-text">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rtw-cta-wrap">
            <div className="rtw-cta-box">
              <p className="rtw-cta-eyebrow">Final Call to Action</p>
              <h2 className="rtw-cta-h">Ready to Transform Your Favourite Saree?</h2>
              <p className="rtw-cta-sub">
                Whether you visit our boutique, book a video consultation, or send your saree through Porter or courier, we'll professionally customize it into a beautifully tailored Ready-to-Wear Saree that's elegant, comfortable, and effortless to wear.
              </p>
              <div className="rtw-cta-btns">
                <a className="rtw-cta-btn-pri" href={waLink(PHOTO_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_final_photo')}>
                  <WaIcon size={16} /> Share Your Saree Photo
                </a>
                <a className="rtw-cta-btn-sec" href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('ready_to_wear_final_designer')}>
                  <WaIcon size={16} /> Chat With Our Designer
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="rtw-footer">
          <div className="rtw-footer-inner">
            <div className="rtw-footer-brand">
              <p className="rtw-footer-brand-name">Shrusara Fashion Boutique</p>
              <p className="rtw-footer-brand-tag">We Design Your Dreams</p>
              <p className="rtw-footer-desc">Customized Women's Boutique in Bangalore</p>
              <p className="rtw-footer-seo">Shrusara Fashion Boutique specializes in ready-to-wear saree customization in Bangalore with permanent pleats, premium lining, secure fit, and boutique finishing.</p>
            </div>
            <div>
              <p className="rtw-footer-col-title">Services</p>
              <ul className="rtw-footer-list">
                {footerServices.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="rtw-footer-col-title">Quick Links</p>
              <ul className="rtw-footer-list">
                {footerLinks.map((item) => (
                  <li key={item.href}><a href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="rtw-footer-divider-v" />
            <div className="rtw-footer-contact">
              <p className="rtw-footer-contact-title">Contact Us</p>
              <div className="rtw-footer-contact-list">
                <span className="rtw-footer-contact-item">
                  <span className="rtw-footer-contact-icon"><MapPinIcon size={13} /></span>
                  #106, 6th Main, Mahalakshmipuram, Bangalore
                </span>
                <a href={`tel:${PHONE_NUMBER}`} className="rtw-footer-contact-item" onClick={() => trackPhoneCall('ready_to_wear_footer')}>
                  <span className="rtw-footer-contact-icon"><PhoneIcon size={13} /></span>Call Us
                </a>
                <a href={waLink(DESIGNER_MESSAGE)} target="_blank" rel="noopener noreferrer" className="rtw-footer-contact-item" onClick={() => trackWhatsApp('ready_to_wear_footer')}>
                  <span className="rtw-footer-contact-icon"><WaIcon size={13} /></span>WhatsApp
                </a>
                <a href={`mailto:${EMAIL}`} className="rtw-footer-contact-item">
                  <span className="rtw-footer-contact-icon"><MailIcon size={13} /></span>Email
                </a>
              </div>
              <a href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore" target="_blank" rel="noopener noreferrer" className="rtw-footer-map-link">
                <MapPinIcon size={11} /> View on Google Maps
              </a>
            </div>
            <div>
              <p className="rtw-footer-col-title">Business Hours</p>
              <ul className="rtw-footer-text-list">
                {footerBusinessHours.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="rtw-footer-col-title">Follow Us</p>
              <ul className="rtw-footer-inline-links">
                {footerSocials.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="rtw-footer-bottom">
            <p className="rtw-footer-copy">Copyright 2026 Shrusara Fashion Boutique. All rights reserved.</p>
            <p className="rtw-footer-copy">Privacy Policy | Terms &amp; Conditions</p>
          </div>
        </footer>

        <div className="rtw-float-call">
          <a href={`tel:${PHONE_NUMBER}`} aria-label="Call Now" onClick={() => trackPhoneCall('ready_to_wear_floating')}>
            <PhoneIcon size={24} />
          </a>
        </div>
        <div className="rtw-float-wa">
          <a href={waLink(PHOTO_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackWhatsApp('ready_to_wear_floating_photo')}>
            <WaIcon size={26} />
          </a>
        </div>
      </div>

      <GalleryModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
}

export default ReadyToWearSareeLandingPage;
