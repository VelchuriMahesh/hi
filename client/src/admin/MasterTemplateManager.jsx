import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  fetchMasterTemplates,
  fetchMasterTemplateById,
  saveMasterTemplate,
  fetchBangaloreLocations
} from '../services/api';
import { uploadImageToImgbb } from '../services/uploaders';
import {
  SERVICE_CATEGORIES,
  MASTER_SERVICE_TEMPLATES,
  normalizeServiceCategory
} from '../utils/bangaloreLandingPage';

function moveUp(list, index) {
  if (!Array.isArray(list) || index <= 0) return list;
  const copy = [...list];
  const item = copy[index];
  copy[index] = copy[index - 1];
  copy[index - 1] = item;
  return copy;
}

function moveDown(list, index) {
  if (!Array.isArray(list) || index >= list.length - 1) return list;
  const copy = [...list];
  const item = copy[index];
  copy[index] = copy[index + 1];
  copy[index + 1] = item;
  return copy;
}

const TABS = [
  { id: 'seo', label: '1. SEO & Metadata' },
  { id: 'hero', label: '2. Hero Section' },
  { id: 'about', label: '3. About & Features' },
  { id: 'chiefDesigner', label: '4. Meet Our Chief Designer' },
  { id: 'why', label: '5. Why Choose Us' },
  { id: 'process', label: '6. 5-Step Process' },
  { id: 'gallery', label: '7. Gallery Showcase' },
  { id: 'proximity', label: '8. Proximity & Maps' },
  { id: 'testimonials', label: '9. Testimonials' },
  { id: 'faqs', label: '10. FAQs (Schema)' },
  { id: 'cta', label: '11. Bottom CTA' }
];

function slugifyService(serviceName = '') {
  return String(serviceName)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function MasterTemplateManager() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedService, setSelectedService] = useState(() => {
    const fromParam = searchParams.get('service');
    if (fromParam) return normalizeServiceCategory(fromParam);
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('shrusara_active_master_service');
      if (saved) return normalizeServiceCategory(saved);
    }
    return SERVICE_CATEGORIES[0];
  });

  const [activeTab, setActiveTab] = useState('seo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [testLocation, setTestLocation] = useState('Malleshwaram');
  const [locations, setLocations] = useState([]);

  const [uploadingImage, setUploadingImage] = useState(false);

  // Remote templates map: { [id]: template }
  const [backendTemplates, setBackendTemplates] = useState({});
  // Active editing template
  const [template, setTemplate] = useState(null);

  async function handleImageUpload(e, target = 'heroImage', galleryIndex = null) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage('');
    try {
      const uploaded = await uploadImageToImgbb(file);
      if (target === 'heroImage') {
        setTemplate((prev) => ({
          ...prev,
          heroImage: uploaded.url,
          featuredImage: {
            ...prev.featuredImage,
            url: uploaded.url
          }
        }));
      } else if (target === 'chiefDesigner') {
        setTemplate((prev) => ({
          ...prev,
          chiefDesigner: {
            ...prev.chiefDesigner,
            designerImage: {
              ...(typeof prev.chiefDesigner?.designerImage === 'object' ? prev.chiefDesigner.designerImage : {}),
              url: uploaded.url
            }
          }
        }));
      } else if (target === 'gallery' && galleryIndex !== null) {
        setTemplate((prev) => {
          const updated = [...(prev.gallery || [])];
          updated[galleryIndex] = { ...updated[galleryIndex], url: uploaded.url };
          return { ...prev, gallery: updated };
        });
      } else if (target === 'newGallery') {
        setTemplate((prev) => ({
          ...prev,
          gallery: [
            ...(prev.gallery || []),
            {
              url: uploaded.url,
              title: `${selectedService} in {Location}`,
              alt: `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`,
              caption: 'Customized design.'
            }
          ]
        }));
      }
      setMessage('Image uploaded successfully.');
    } catch (err) {
      setMessage(err.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  }

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }
    loadAll();
  }, [navigate]);

  useEffect(() => {
    const fromParam = searchParams.get('service');
    if (fromParam) {
      const norm = normalizeServiceCategory(fromParam);
      if (norm && norm !== selectedService) {
        setSelectedService(norm);
        initTemplateForService(norm, backendTemplates);
      }
    }
  }, [searchParams]);

  async function loadAll() {
    setLoading(true);
    setMessage('');
    try {
      const [tplRes, locRes] = await Promise.all([
        fetchMasterTemplates().catch(() => ({ items: [] })),
        fetchBangaloreLocations().catch(() => ({ items: [] }))
      ]);

      const map = {};
      (tplRes?.items || []).forEach((t) => {
        if (!t) return;
        const norm = normalizeServiceCategory(t.serviceName || t.serviceCategory || t.id);
        const keys = [
          t.id,
          slugifyService(t.id),
          t.serviceName,
          slugifyService(t.serviceName),
          t.serviceCategory,
          slugifyService(t.serviceCategory),
          norm,
          slugifyService(norm),
          String(t.serviceName || '').toLowerCase(),
          String(t.serviceCategory || '').toLowerCase()
        ].filter(Boolean);

        keys.forEach((k) => {
          if (!map[k] || new Date(t.updatedAt || 0) >= new Date(map[k].updatedAt || 0)) {
            map[k] = t;
          }
        });

        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            keys.forEach((k) => {
              window.localStorage.setItem(`shrusara_master_tpl_${k}`, JSON.stringify(t));
            });
          } catch {
            // ignore localStorage quota errors
          }
        }
      });
      setBackendTemplates(map);
      setLocations(locRes?.items || []);

      initTemplateForService(selectedService, map);
    } catch {
      initTemplateForService(selectedService, {});
    } finally {
      setLoading(false);
    }
  }

  function initTemplateForService(serviceName, templatesMap = backendTemplates) {
    const sId = slugifyService(serviceName);
    const norm = normalizeServiceCategory(serviceName);
    const normSlug = slugifyService(norm);

    let existing =
      templatesMap[serviceName] ||
      templatesMap[sId] ||
      templatesMap[norm] ||
      templatesMap[normSlug] ||
      templatesMap[String(serviceName).toLowerCase()];

    // Also check localStorage if not found in memory map
    if (!existing && typeof window !== 'undefined' && window.localStorage) {
      const keys = [serviceName, sId, norm, normSlug, `shrusara_master_tpl_${sId}`, `shrusara_master_tpl_${serviceName}`];
      for (const k of keys) {
        try {
          const raw = window.localStorage.getItem(k.startsWith('shrusara_master_tpl_') ? k : `shrusara_master_tpl_${k}`);
          if (raw) {
            existing = JSON.parse(raw);
            break;
          }
        } catch {}
      }
    }

    if (existing) {
      const t = JSON.parse(JSON.stringify(existing));
      if (!t.heroImage && t.featuredImage?.url) {
        t.heroImage = t.featuredImage.url;
      }
      if (!t.featuredImage && t.heroImage) {
        t.featuredImage = { url: t.heroImage, alt: `${serviceName} in {Location}` };
      }
      setTemplate(t);
      return;
    }

    // Fall back to preset from MASTER_SERVICE_TEMPLATES
    const preset = MASTER_SERVICE_TEMPLATES[serviceName] || MASTER_SERVICE_TEMPLATES[normalizeServiceCategory(serviceName)] || MASTER_SERVICE_TEMPLATES['Bridal Blouse'] || {};

    const defaultTpl = {
      id: sId,
      serviceCategory: serviceName,
      singular: preset.singular || serviceName,
      plural: preset.plural || `${serviceName}s`,
      heroImage: preset.heroImage || '',
      featuredImage: {
        url: preset.heroImage || '',
        alt: `${serviceName} in {Location}, Bangalore – Shrusara Fashion Boutique`,
        title: `${serviceName} in {Location}`,
        caption: `100% Customized ${serviceName} tailored by Shrusara Fashion Boutique in Bangalore.`
      },
      seo: {
        metaTitleTemplate: preset.seo?.metaTitleTemplate || `${serviceName} in {Location}, Bangalore | Shrusara Fashion Boutique`,
        metaDescriptionTemplate: preset.seo?.metaDescriptionTemplate || `Customized ${serviceName} in {Location}, Bangalore. Perfect fit, hand embroidery & 1-on-1 consultation with Chief Designer Shruthi Ajith.`,
        metaKeywords: [
          `${serviceName.toLowerCase()} in {Location}`,
          `${serviceName.toLowerCase()} bangalore`,
          `customized ${serviceName.toLowerCase()}`,
          `best ${serviceName.toLowerCase()} near {Location}`,
          'shrusara fashion boutique'
        ],
        canonicalUrlPattern: `/bangalore/${slugifyService(serviceName)}-stitching-{location}`
      },
      hero: {
        badgeTemplate: preset.hero?.badgeTemplate || `100% Customized | {Location}, Bangalore`,
        headingTemplate: preset.hero?.headingTemplate || `${serviceName} in {Location}, Bangalore`,
        taglineTemplate: preset.hero?.taglineTemplate || `Experience bespoke luxury, meticulous craftsmanship, and personalized consultation for clients in {Location}, Bangalore.`,
        highlights: preset.hero?.highlights || [
          '1-on-1 Consultation with Chief Designer Shruthi Ajith',
          'Personalized Measurements & Trial Fitting',
          'Try Before You Customize (Boutique Exclusive)',
          'Video Consultation Available Across Bangalore',
          'Pickup & Courier Delivery Across Bangalore',
          'Comfortable Customized Stitching'
        ],
        primaryCtaText: preset.hero?.primaryCtaText || 'Chat on WhatsApp',
        primaryCtaMessageTemplate: preset.hero?.primaryCtaMessageTemplate || `Hi Shrusara! I'd like to know more about ${serviceName} in {Location}.`,
        secondaryCtaText: preset.hero?.secondaryCtaText || 'Call Shrusara Boutique',
        secondaryCtaLink: preset.hero?.secondaryCtaLink || '#contact'
      },
      about: {
        headingTemplate: preset.about?.headingTemplate || `Customized ${serviceName} in {Location}`,
        introTemplate: preset.about?.introTemplate || `At Shrusara Fashion Boutique, we specialize exclusively in bespoke ${serviceName}. We do not sell mass-produced ready-made garments. Every single piece is tailored uniquely to your body contours, measurements, and personal style.`,
        descriptionTemplate: preset.about?.descriptionTemplate || `Clients from {Location} and across Bangalore trust Shrusara for heirloom-quality finish, comfortable fit, and stress-free tailoring with dedicated trials.`,
        highlights: preset.about?.highlights || [
          { title: 'Personalized Fitting', description: 'Tailored precisely to your exact measurements, posture, and preferences.' },
          { title: 'Premium Craftsmanship', description: 'Handcrafted by master artisans with high-grade interlinings and finished seams.' },
          { title: 'Try Before You Customize', description: 'Visit our Mahalakshmipuram studio to inspect samples and silhouettes firsthand.' }
        ]
      },
      whyChooseUs: {
        headingTemplate: preset.whyChooseUs?.headingTemplate || `Why Clients in {Location} Choose Shrusara for ${serviceName}`,
        introTemplate: preset.whyChooseUs?.introTemplate || `Serving Bangalore's discerning clients with unmatched design expertise, precision fitting, and transparent timelines.`,
        cards: preset.whyChooseUs?.cards || [
          { title: 'Direct Designer Access', description: 'Work directly with Chief Designer Shruthi Ajith throughout your consultation and trial.' },
          { title: 'Stress-Free Timelines', description: 'Guaranteed delivery dates planned well ahead of your special occasions.' },
          { title: 'Doorstep Courier & Porter', description: 'Reliable pickup and drop-off available directly to your home in {Location}.' }
        ]
      },
      processSteps: preset.processSteps || [
        { stepNumber: 1, title: 'Design Consultation & Fabric Selection', description: 'Discuss your outfit style, necklines, sleeves, and fabric requirements.', duration: 'Day 1' },
        { stepNumber: 2, title: 'Measurements & Silhouette Planning', description: 'Precision measurements taken with posture evaluation and trial fit checks.', duration: 'Day 1-2' },
        { stepNumber: 3, title: 'Master Cutting & Artisan Crafting', description: 'Hand-cut by master cutters and crafted with premium reinforcements.', duration: 'Day 3-5' },
        { stepNumber: 4, title: 'Trial Fitting & Comfort Check', description: 'Try on the outfit to verify posture, seam comfort, and armhole fit.', duration: 'Day 5-6' },
        { stepNumber: 5, title: 'Steam Finishing & Handover to {Location}', description: 'Final quality inspection, steam press, and boutique pickup or courier delivery.', duration: 'Final Delivery' }
      ],
      gallery: (preset.gallery || [
        { url: '/bridal/bridalblow/hero-bridal.webp', title: `${serviceName} Showcase`, caption: 'Mastercrafted finishing' },
        { url: '/bridal/bridalblow/IMG-20220609-WA0069.webp', title: `${serviceName} Silhouette`, caption: 'Exquisite attention to detail' }
      ]).map((g) => ({
        url: g.url || '',
        title: g.title || `${serviceName} in {Location}`,
        alt: g.alt || `${serviceName} in {Location}, Bangalore – Shrusara Fashion Boutique`,
        caption: g.caption || ''
      })),
      proximity: {
        defaultLandmark: 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
        defaultTravelTime: '10-15 mins',
        defaultDistanceNote: 'Easily accessible from {Location}. Doorstep Porter & express courier delivery available across Bangalore.',
        workingHours: 'Monday - Sunday: 10:30 AM - 8:30 PM (By Appointment & Walk-in)',
        boutiqueAddress: '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086',
        googleMapsUrl: 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore'
      },
      testimonials: preset.testimonials || [
        { name: 'Pooja K.', location: '{Location}, Bangalore', rating: 5, outfitType: serviceName, reviewText: `Shrusara exceeded all my expectations for ${serviceName}. The fit was absolutely flawless and Shruthi ma'am understood my style instantly. Highly recommended for everyone in {Location}!` },
        { name: 'Divya M.', location: '{Location}, Bangalore', rating: 5, outfitType: serviceName, reviewText: `The attention to detail and trial session made all the difference. Delivered right on schedule to my home in {Location}.` }
      ],
      faqs: preset.faqs || [
        { question: `Can I get customized ${serviceName} in {Location}?`, answer: `Yes! Shrusara Fashion Boutique caters to clients across {Location}, Bangalore. You can visit our Mahalakshmipuram studio (conveniently connected) or book a virtual video consultation with doorstep courier pickup and delivery.` },
        { question: `How long does customized ${serviceName} take?`, answer: `Standard crafting takes approximately 5 to 7 days, including design consultation and trial fitting. For emergency wedding dates or immediate events in {Location}, priority express slots are also accommodated.` },
        { question: `Do you provide home pickup and delivery in {Location}?`, answer: `Yes, we arrange reliable door-to-door Porter fabric pickup and courier delivery across all localities in {Location}, Bangalore.` }
      ],
      cta: {
        headingTemplate: preset.cta?.headingTemplate || `Customized ${serviceName} Near {Location}, Bangalore`,
        subheadingTemplate: preset.cta?.subheadingTemplate || `Book your consultation with Chief Designer Shruthi Ajith today. Experience bespoke luxury in Bangalore.`,
        whatsappText: 'Chat on WhatsApp',
        callText: 'Call Shrusara Boutique'
      }
    };

    setTemplate(defaultTpl);

    // Also attempt direct fetch from backend for this service ID if missing from current templatesMap
    fetchMasterTemplateById(sId)
      .then((res) => {
        if (res?.item) {
          const t = JSON.parse(JSON.stringify(res.item));
          if (!t.heroImage && t.featuredImage?.url) {
            t.heroImage = t.featuredImage.url;
          }
          if (!t.featuredImage && t.heroImage) {
            t.featuredImage = { url: t.heroImage, alt: `${serviceName} in {Location}` };
          }
          setTemplate(t);
          setBackendTemplates((prev) => ({
            ...prev,
            [sId]: t,
            [serviceName]: t,
            [norm]: t,
            [normSlug]: t
          }));
        }
      })
      .catch(() => {});
  }

  function handleSwitchService(serviceName) {
    setSelectedService(serviceName);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('shrusara_active_master_service', serviceName);
      } catch {}
    }
    setSearchParams({ service: serviceName });
    initTemplateForService(serviceName);
    setMessage('');
  }

  async function handleSave() {
    const token = getAdminToken();
    if (!token) {
      setMessage('Session expired. Please log in again.');
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const sId = slugifyService(selectedService);
      const norm = normalizeServiceCategory(selectedService);
      const normSlug = slugifyService(norm);
      const headingTpl =
        template.hero?.headingTemplate ||
        template.titleTemplate ||
        template.seo?.titleTemplate ||
        `${selectedService} in {Location}, Bangalore`;

      const payload = {
        ...template,
        id: sId,
        serviceName: selectedService,
        serviceCategory: selectedService,
        serviceSlug: sId,
        titleTemplate: headingTpl,
        heroImage: template.heroImage || template.featuredImage?.url || '',
        featuredImage: {
          url: template.heroImage || template.featuredImage?.url || '',
          alt: template.featuredImage?.alt || `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`,
          title: template.featuredImage?.title || `${selectedService} in {Location}`,
          caption: template.featuredImage?.caption || `100% Customized ${selectedService} tailored by Shrusara Fashion Boutique in Bangalore.`
        },
        seo: {
          ...template.seo,
          titleTemplate: headingTpl
        },
        hero: {
          ...template.hero,
          headingTemplate: headingTpl
        },
        updatedAt: new Date().toISOString()
      };

      const res = await saveMasterTemplate(token, sId, payload);
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const keys = [
            selectedService,
            sId,
            norm,
            normSlug,
            `shrusara_master_tpl_${sId}`,
            `shrusara_master_tpl_${selectedService}`
          ];
          keys.forEach((k) => {
            window.localStorage.setItem(k.startsWith('shrusara_master_tpl_') ? k : `shrusara_master_tpl_${k}`, JSON.stringify(payload));
          });
          window.localStorage.setItem('shrusara_active_master_service', selectedService);
        } catch {
          // ignore quota errors
        }
      }
      setBackendTemplates((prev) => {
        const next = { ...prev };
        [selectedService, sId, norm, normSlug].forEach((k) => {
          next[k] = payload;
        });
        return next;
      });
      setMessage(res?.message || `✅ Master Template for "${selectedService}" saved successfully!`);
    } catch (err) {
      setMessage(err.message || 'Failed to save master template');
    } finally {
      setSaving(false);
    }
  }

  // Helper to preview text replacing {Location}
  function preview(text = '') {
    return String(text || '').replace(/\{Location\}/g, testLocation);
  }

  if (loading || !template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand text-ink">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cocoa border-t-transparent mx-auto" />
          <p className="mt-4 text-sm font-medium">Loading Master Templates...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Master Templates CMS V2 | Shrusara Admin"
        description="Configure Master Templates for 8 Core Service Categories across Bangalore."
      />

      <div className="min-h-screen bg-sand px-4 py-8 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Top Bar */}
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link to="/admin/landing-pages" className="text-xs font-semibold text-cocoa hover:underline">
                  ← Bangalore Landing Pages
                </Link>
                <span className="text-stone-400">/</span>
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Master Templates (CMS V2)
                </span>
              </div>
              <h1 className="mt-1 font-heading text-3xl text-ink">
                Service Master Templates
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                The single source of truth for each service. When a Bangalore location is selected, the CMS dynamically duplicates this content and substitutes <code className="rounded bg-linen px-1 py-0.5 font-mono text-cocoa font-bold">{"{Location}"}</code>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/admin/landing-pages" className="button-secondary py-2 text-xs font-semibold">
                View All Pages
              </Link>
              <Link
                to={`/admin/landing-pages/new?service=${encodeURIComponent(selectedService)}&location=${encodeURIComponent(testLocation)}`}
                className="rounded-xl bg-linen border border-cocoa/30 px-3.5 py-2 text-xs font-semibold text-cocoa shadow-sm hover:bg-cocoa/10 transition"
                title="Create a new landing page pre-filled with this master template"
              >
                ➕ Create Page with Template
              </Link>
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="button-primary py-2 text-xs font-semibold shadow-md"
              >
                {saving ? 'Saving...' : `💾 Save Master Template`}
              </button>
            </div>
          </div>

          {/* User Feedback Notice */}
          {message && (
            <div className="mt-4 rounded-2xl border border-cocoa/20 bg-white px-5 py-3 text-sm text-cocoa shadow-card">
              {message}
            </div>
          )}

          {/* Service Categories Bar */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Select Service Category (8 Core Services):
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              {SERVICE_CATEGORIES.map((srv) => {
                const sId = slugifyService(srv);
                const isCustomized = Boolean(backendTemplates[sId] || backendTemplates[srv]);
                const isSelected = selectedService === srv;

                // Category icon map for fast visual recognition
                const ICON_MAP = {
                  'Bridal Blouse': '👰',
                  'Maggam & Aari Work Bridal Blouse': '🪡',
                  'Designer Blouse': '✨',
                  'Designer Gown': '👗',
                  'Bridal Lehenga': '👑',
                  'Luxury Occasion Wear': '🌟',
                  'Ready-to-Wear Saree Customization': '🥻',
                  'Kids Boutique': '👧'
                };
                const icon = ICON_MAP[srv] || '✨';

                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => handleSwitchService(srv)}
                    className={`flex flex-col justify-between rounded-xl p-3 text-left transition ${
                      isSelected
                        ? 'bg-cocoa text-white shadow-md'
                        : 'bg-white border border-ink/10 text-ink hover:bg-linen'
                    }`}
                  >
                    <div>
                      <span className="text-base mb-1 block">{icon}</span>
                      <span className="text-xs font-semibold line-clamp-2 leading-tight">
                        {srv}
                      </span>
                    </div>
                    <span
                      className={`mt-2 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : isCustomized
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {isCustomized ? '● Saved' : '○ Default'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-Time Preview Simulator Bar */}
          <div className="mt-6 rounded-2xl border border-cocoa/30 bg-gradient-to-r from-cocoa/10 via-linen to-cocoa/5 p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cocoa">
                  🔍 Live Location Simulator
                </p>
                <p className="text-xs text-stone-600">
                  Type or choose any location to preview how <code className="font-mono text-cocoa font-bold">{"{Location}"}</code> tags evaluate for your customers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={testLocation}
                  onChange={(e) => setTestLocation(e.target.value)}
                  placeholder="e.g. Malleshwaram"
                  className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none"
                />
                {locations.length > 0 && (
                  <select
                    value={testLocation}
                    onChange={(e) => setTestLocation(e.target.value)}
                    className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id || loc.name} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Live Preview Snippet */}
            <div className="mt-3 rounded-xl bg-white p-3 border border-ink/10 text-xs text-stone-700">
              <span className="font-bold text-cocoa">Hero Heading Sample: </span>
              <span className="font-medium text-ink">"{preview(template.hero?.headingTemplate)}"</span>
              <span className="mx-2 text-stone-300">|</span>
              <span className="font-bold text-cocoa">Gallery Alt: </span>
              <span className="font-medium text-ink">"{preview(template.gallery?.[0]?.alt || `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`)}"</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mt-6 overflow-x-auto border-b border-ink/10 pb-px">
            <div className="flex gap-1 min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-t-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition ${
                    activeTab === tab.id
                      ? 'bg-white border-t-2 border-cocoa text-cocoa shadow-sm'
                      : 'text-stone-600 hover:text-ink hover:bg-linen/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENTS */}
          <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
            {/* TAB 1: SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">1. SEO & Metadata Templates</h2>
                  <p className="text-xs text-stone-500">
                    Defines Meta Title, Meta Description, Keywords, and Canonical URL pattern for all localized pages of "{selectedService}".
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Page Title (H1) / Main Heading Template
                  </label>
                  <input
                    type="text"
                    value={template.hero?.headingTemplate || template.titleTemplate || template.seo?.titleTemplate || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTemplate({
                        ...template,
                        titleTemplate: val,
                        seo: { ...template.seo, titleTemplate: val },
                        hero: { ...template.hero, headingTemplate: val }
                      });
                    }}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa font-semibold">{preview(template.hero?.headingTemplate || template.titleTemplate || template.seo?.titleTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Meta Title Template
                  </label>
                  <input
                    type="text"
                    value={template.seo?.metaTitleTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        seo: { ...template.seo, metaTitleTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.seo?.metaTitleTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Meta Description Template
                  </label>
                  <textarea
                    rows={3}
                    value={template.seo?.metaDescriptionTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        seo: { ...template.seo, metaDescriptionTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.seo?.metaDescriptionTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Canonical URL Pattern
                  </label>
                  <input
                    type="text"
                    value={template.seo?.canonicalUrlPattern || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        seo: { ...template.seo, canonicalUrlPattern: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Example: <code className="font-mono text-cocoa">/bangalore/{slugifyService(selectedService)}-stitching-malleshwaram</code>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Keywords Template (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(template.seo?.metaKeywords) ? template.seo.metaKeywords.join(', ') : template.seo?.metaKeywords || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        seo: {
                          ...template.seo,
                          metaKeywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean)
                        }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: HERO */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">2. Hero Section Template</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Badge Template
                    </label>
                    <input
                      type="text"
                      value={template.hero?.badgeTemplate || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          hero: { ...template.hero, badgeTemplate: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                    <p className="mt-1 text-[11px] text-stone-500">
                      Preview: <strong className="text-cocoa">{preview(template.hero?.badgeTemplate)}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Hero Image ALT Text Template (supports {'{Location}'})
                    </label>
                    <input
                      type="text"
                      placeholder="Customized bridal blouse designed at Shrusara Fashion Boutique in {Location}, Bangalore"
                      value={template.featuredImage?.alt || `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          featuredImage: { ...template.featuredImage, alt: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                {/* Hero Image Picker Card */}
                <div className="rounded-xl border border-ink/10 bg-linen/40 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Hero Image Management
                  </label>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {template.heroImage || template.featuredImage?.url ? (
                      <img
                        src={template.heroImage || template.featuredImage?.url}
                        alt="Hero preview"
                        className="h-28 w-28 rounded-xl object-cover border border-ink/10"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-ink/5 text-xs text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="button-secondary cursor-pointer py-1.5 px-3 text-xs font-semibold inline-block">
                          <span>{template.heroImage ? '📷 Replace Hero Image' : '📤 Upload Hero Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            onChange={(e) => handleImageUpload(e, 'heroImage')}
                            className="hidden"
                          />
                        </label>
                        {template.heroImage ? (
                          <button
                            type="button"
                            onClick={() =>
                              setTemplate({
                                ...template,
                                heroImage: '',
                                featuredImage: { ...template.featuredImage, url: '' }
                              })
                            }
                            className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            ✕ Remove Image
                          </button>
                        ) : null}
                      </div>
                      {uploadingImage && <p className="text-xs text-cocoa">Uploading to server...</p>}
                      <input
                        type="text"
                        placeholder="Hero Image URL / Path"
                        value={template.heroImage || template.featuredImage?.url || ''}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            heroImage: e.target.value,
                            featuredImage: { ...template.featuredImage, url: e.target.value }
                          })
                        }
                        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Hero Main Heading Template
                  </label>
                  <input
                    type="text"
                    value={template.hero?.headingTemplate || template.titleTemplate || template.seo?.titleTemplate || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTemplate({
                        ...template,
                        titleTemplate: val,
                        seo: { ...template.seo, titleTemplate: val },
                        hero: { ...template.hero, headingTemplate: val }
                      });
                    }}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa font-semibold">{preview(template.hero?.headingTemplate || template.titleTemplate || template.seo?.titleTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Hero Tagline Template
                  </label>
                  <textarea
                    rows={3}
                    value={template.hero?.taglineTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        hero: { ...template.hero, taglineTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.hero?.taglineTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    WhatsApp Message Template (Auto-populated on user click)
                  </label>
                  <input
                    type="text"
                    value={template.hero?.primaryCtaMessageTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        hero: { ...template.hero, primaryCtaMessageTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Hero Highlights (Bullet Points)
                  </label>
                  {(template.hero?.highlights || []).map((item, idx) => (
                    <div key={idx} className="mb-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...(template.hero?.highlights || [])];
                          updated[idx] = e.target.value;
                          setTemplate({
                            ...template,
                            hero: { ...template.hero, highlights: updated }
                          });
                        }}
                        className="flex-1 rounded-xl border border-ink/10 bg-linen px-3 py-1.5 text-xs text-ink outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = template.hero?.highlights.filter((_, i) => i !== idx);
                          setTemplate({
                            ...template,
                            hero: { ...template.hero, highlights: updated }
                          });
                        }}
                        className="rounded-lg bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(template.hero?.highlights || []), 'New Highlight Feature'];
                      setTemplate({
                        ...template,
                        hero: { ...template.hero, highlights: updated }
                      });
                    }}
                    className="mt-2 rounded-xl border border-dashed border-cocoa/40 px-3 py-1 text-xs font-semibold text-cocoa hover:bg-linen"
                  >
                    + Add Highlight
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">3. About & Features Template</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Heading Template
                  </label>
                  <input
                    type="text"
                    value={template.about?.headingTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        about: { ...template.about, headingTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.about?.headingTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Intro Template
                  </label>
                  <textarea
                    rows={3}
                    value={template.about?.introTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        about: { ...template.about, introTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Description Template
                  </label>
                  <textarea
                    rows={4}
                    value={template.about?.descriptionTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        about: { ...template.about, descriptionTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Feature Highlights
                  </label>
                  {(template.about?.highlights || []).map((h, idx) => (
                    <div key={idx} className="mb-3 rounded-xl border border-ink/10 bg-sand/30 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Feature Title"
                            value={h.title}
                            onChange={(e) => {
                              const updated = [...template.about.highlights];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setTemplate({
                                ...template,
                                about: { ...template.about, highlights: updated }
                              });
                            }}
                            className="rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs font-semibold text-ink"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setTemplate({
                                ...template,
                                about: { ...template.about, highlights: moveUp(template.about.highlights, idx) }
                              })
                            }
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === (template.about?.highlights?.length || 0) - 1}
                            onClick={() =>
                              setTemplate({
                                ...template,
                                about: { ...template.about, highlights: moveDown(template.about.highlights, idx) }
                              })
                            }
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = template.about.highlights.filter((_, i) => i !== idx);
                              setTemplate({
                                ...template,
                                about: { ...template.about, highlights: updated }
                              });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Feature Description"
                        value={h.description}
                        onChange={(e) => {
                          const updated = [...template.about.highlights];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setTemplate({
                            ...template,
                            about: { ...template.about, highlights: updated }
                          });
                        }}
                        className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-stone-700"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        ...(template.about?.highlights || []),
                        { title: 'New Feature Highlight', description: 'Description of the feature for {Location}.' }
                      ];
                      setTemplate({
                        ...template,
                        about: { ...template.about, highlights: updated }
                      });
                    }}
                    className="rounded-xl border border-dashed border-cocoa/40 px-3 py-1 text-xs font-semibold text-cocoa hover:bg-linen"
                  >
                    + Add Feature Highlight
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: MEET OUR CHIEF DESIGNER */}
            {activeTab === 'chiefDesigner' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">4. Meet Our Chief Designer Section</h2>
                  <p className="text-xs text-stone-500">
                    A dedicated section showcasing Founder & Chief Designer Shruthi Ajith. Available in every Service Master Template.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={template.chiefDesigner?.sectionHeading || 'Meet Our Chief Designer — Shruthi Ajith'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          chiefDesigner: { ...(template.chiefDesigner || {}), sectionHeading: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                    <p className="mt-1 text-[11px] text-stone-500">
                      Preview: <strong className="text-cocoa">{preview(template.chiefDesigner?.sectionHeading || 'Meet Our Chief Designer — Shruthi Ajith')}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Designer Name
                    </label>
                    <input
                      type="text"
                      value={template.chiefDesigner?.designerName || 'Shruthi Ajith'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          chiefDesigner: { ...(template.chiefDesigner || {}), designerName: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Section Intro
                  </label>
                  <textarea
                    rows={2}
                    value={template.chiefDesigner?.sectionIntro || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        chiefDesigner: { ...(template.chiefDesigner || {}), sectionIntro: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.chiefDesigner?.sectionIntro)}</strong>
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-linen/40 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Designer Image Management
                  </label>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {template.chiefDesigner?.designerImage?.url || template.chiefDesigner?.image ? (
                      <img
                        src={template.chiefDesigner?.designerImage?.url || template.chiefDesigner?.image}
                        alt="Chief Designer preview"
                        className="h-28 w-28 rounded-xl object-cover border border-ink/10"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-ink/5 text-xs text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="button-secondary cursor-pointer py-1.5 px-3 text-xs font-semibold inline-block">
                          <span>
                            {(template.chiefDesigner?.designerImage?.url || template.chiefDesigner?.image)
                              ? '📷 Replace Designer Image'
                              : '📤 Upload Designer Image'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            onChange={(e) => handleImageUpload(e, 'chiefDesigner')}
                            className="hidden"
                          />
                        </label>
                        {(template.chiefDesigner?.designerImage?.url || template.chiefDesigner?.image) ? (
                          <button
                            type="button"
                            onClick={() =>
                              setTemplate((prev) => ({
                                ...prev,
                                chiefDesigner: {
                                  ...(prev.chiefDesigner || {}),
                                  image: '',
                                  designerImage: {
                                    ...(prev.chiefDesigner?.designerImage || {}),
                                    url: ''
                                  }
                                }
                              }))
                            }
                            className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            ✕ Remove Designer Image
                          </button>
                        ) : null}
                      </div>
                      {uploadingImage && <p className="text-xs text-cocoa">Uploading to server...</p>}

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Designer Image URL
                          </label>
                          <input
                            type="text"
                            placeholder="/videos/lead-of-shrusara.webp"
                            value={template.chiefDesigner?.designerImage?.url || template.chiefDesigner?.image || ''}
                            onChange={(e) => {
                              const url = e.target.value;
                              setTemplate({
                                ...template,
                                chiefDesigner: {
                                  ...(template.chiefDesigner || {}),
                                  image: url,
                                  designerImage: {
                                    ...(template.chiefDesigner?.designerImage || {}),
                                    url
                                  }
                                }
                              });
                            }}
                            className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Designer Image ALT Text
                          </label>
                          <input
                            type="text"
                            placeholder="Shruthi Ajith, Founder & Chief Designer at Shrusara Fashion Boutique"
                            value={template.chiefDesigner?.designerImageAlt || template.chiefDesigner?.designerImage?.alt || ''}
                            onChange={(e) => {
                              const alt = e.target.value;
                              setTemplate({
                                ...template,
                                chiefDesigner: {
                                  ...(template.chiefDesigner || {}),
                                  designerImageAlt: alt,
                                  designerImage: {
                                    ...(template.chiefDesigner?.designerImage || {}),
                                    alt
                                  }
                                }
                              });
                            }}
                            className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                          />
                          <p className="mt-1 text-[11px] text-stone-500">
                            Preview: <strong className="text-cocoa">{preview(template.chiefDesigner?.designerImageAlt || template.chiefDesigner?.designerImage?.alt)}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={template.chiefDesigner?.designation || 'Founder & Chief Designer'}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        chiefDesigner: { ...(template.chiefDesigner || {}), designation: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Designer Bio (Rich / Multi-line Text)
                  </label>
                  <textarea
                    rows={4}
                    value={template.chiefDesigner?.designerBio || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        chiefDesigner: { ...(template.chiefDesigner || {}), designerBio: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div className="rounded-xl border border-cocoa/20 bg-sand/20 p-4 space-y-4">
                  <h3 className="font-heading text-base font-bold text-ink">Chief Designer CTA Box</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        CTA Heading
                      </label>
                      <input
                        type="text"
                        value={template.chiefDesigner?.designerCtaHeading || 'Discuss Your Design With Shruthi'}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            chiefDesigner: { ...(template.chiefDesigner || {}), designerCtaHeading: e.target.value }
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={template.chiefDesigner?.designerCtaButtonText || 'Chat With Our Designer'}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            chiefDesigner: { ...(template.chiefDesigner || {}), designerCtaButtonText: e.target.value }
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      CTA Description Text
                    </label>
                    <textarea
                      rows={2}
                      value={template.chiefDesigner?.designerCtaText || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          chiefDesigner: { ...(template.chiefDesigner || {}), designerCtaText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      CTA Link / Action URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://wa.me/919741827558?text=..."
                      value={template.chiefDesigner?.designerCtaLink || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          chiefDesigner: { ...(template.chiefDesigner || {}), designerCtaLink: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: WHY CHOOSE US */}
            {activeTab === 'why' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">5. Why Choose Us Section</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Heading Template
                  </label>
                  <input
                    type="text"
                    value={template.whyChooseUs?.headingTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        whyChooseUs: { ...template.whyChooseUs, headingTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.whyChooseUs?.headingTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Intro Template
                  </label>
                  <textarea
                    rows={2}
                    value={template.whyChooseUs?.introTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        whyChooseUs: { ...template.whyChooseUs, introTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Why Choose Cards
                  </label>
                  {(template.whyChooseUs?.cards || []).map((card, idx) => (
                    <div key={idx} className="mb-3 rounded-xl border border-ink/10 bg-sand/30 p-3">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...template.whyChooseUs.cards];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setTemplate({
                              ...template,
                              whyChooseUs: { ...template.whyChooseUs, cards: updated }
                            });
                          }}
                          className="w-1/2 rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs font-semibold text-ink"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() =>
                              setTemplate({
                                ...template,
                                whyChooseUs: { ...template.whyChooseUs, cards: moveUp(template.whyChooseUs.cards, idx) }
                              })
                            }
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === (template.whyChooseUs?.cards?.length || 0) - 1}
                            onClick={() =>
                              setTemplate({
                                ...template,
                                whyChooseUs: { ...template.whyChooseUs, cards: moveDown(template.whyChooseUs.cards, idx) }
                              })
                            }
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = template.whyChooseUs.cards.filter((_, i) => i !== idx);
                              setTemplate({
                                ...template,
                                whyChooseUs: { ...template.whyChooseUs, cards: updated }
                              });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Card Description"
                        value={card.description}
                        onChange={(e) => {
                          const updated = [...template.whyChooseUs.cards];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setTemplate({
                            ...template,
                            whyChooseUs: { ...template.whyChooseUs, cards: updated }
                          });
                        }}
                        className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-stone-700"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [
                        ...(template.whyChooseUs?.cards || []),
                        { title: 'New Advantage', description: 'Why customers in {Location} love this service.' }
                      ];
                      setTemplate({
                        ...template,
                        whyChooseUs: { ...template.whyChooseUs, cards: updated }
                      });
                    }}
                    className="rounded-xl border border-dashed border-cocoa/40 px-3 py-1 text-xs font-semibold text-cocoa hover:bg-linen"
                  >
                    + Add Card
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: PROCESS STEPS */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">6. 5-Step Process Template</h2>
                  <p className="text-xs text-stone-500">
                    Walk through the step-by-step experience from consultation to delivery in {"{Location}"}.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Process Section Heading Template
                    </label>
                    <input
                      type="text"
                      value={template.processHeading || template.process?.headingTemplate || 'Our 5-Step Customization Journey'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          processHeading: e.target.value,
                          process: { ...(template.process || {}), headingTemplate: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                    <p className="mt-1 text-[11px] text-stone-500">
                      Preview: <strong className="text-cocoa">{preview(template.processHeading || template.process?.headingTemplate || 'Our 5-Step Customization Journey')}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Process Section Intro Template
                    </label>
                    <textarea
                      rows={2}
                      value={template.processIntro || template.process?.introTemplate || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          processIntro: e.target.value,
                          process: { ...(template.process || {}), introTemplate: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                {(template.processSteps || []).map((step, idx) => (
                  <div key={idx} className="rounded-xl border border-ink/10 bg-sand/30 p-4">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cocoa text-xs font-bold text-white">
                          {step.stepNumber || idx + 1}
                        </span>
                        <input
                          type="text"
                          placeholder="Step Title"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...template.processSteps];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setTemplate({ ...template, processSteps: updated });
                          }}
                          className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. Day 1-2, As discussed)"
                          value={step.duration}
                          onChange={(e) => {
                            const updated = [...template.processSteps];
                            updated[idx] = { ...updated[idx], duration: e.target.value };
                            setTemplate({ ...template, processSteps: updated });
                          }}
                          className="w-44 rounded-lg border border-ink/10 bg-white px-3 py-1 text-xs text-stone-600"
                        />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => setTemplate({ ...template, processSteps: moveUp(template.processSteps, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▲ Up
                        </button>
                        <button
                          type="button"
                          disabled={idx === (template.processSteps?.length || 0) - 1}
                          onClick={() => setTemplate({ ...template, processSteps: moveDown(template.processSteps, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▼ Down
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = template.processSteps.filter((_, i) => i !== idx);
                            setTemplate({ ...template, processSteps: updated });
                          }}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Step Description"
                      value={step.description}
                      onChange={(e) => {
                        const updated = [...template.processSteps];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setTemplate({ ...template, processSteps: updated });
                      }}
                      className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-stone-700"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(template.processSteps || []),
                      { stepNumber: (template.processSteps?.length || 0) + 1, title: 'New Customization Step', description: 'Step details for {Location}.', duration: 'Day 1' }
                    ];
                    setTemplate({ ...template, processSteps: updated });
                  }}
                  className="rounded-xl border border-dashed border-cocoa/40 px-3 py-1.5 text-xs font-semibold text-cocoa hover:bg-linen"
                >
                  + Add Process Step
                </button>
              </div>
            )}

            {/* TAB 7: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">7. Gallery Showcase Template</h2>
                  <p className="mt-1 text-xs text-stone-500">
                    Alt text automatically resolves to: <code className="font-mono text-cocoa font-bold">"{selectedService} in {"{Location}"}, Bangalore – Shrusara Fashion Boutique"</code>
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Gallery Section Heading Template
                    </label>
                    <input
                      type="text"
                      value={template.galleryHeading || template.gallery?.headingTemplate || `${selectedService} Gallery Showcase`}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          galleryHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Gallery Section Intro Template
                    </label>
                    <textarea
                      rows={2}
                      value={template.galleryIntro || template.gallery?.introTemplate || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          galleryIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(template.gallery || []).map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-xl border border-ink/10 bg-sand/20 p-3">
                      {img.url ? (
                        <img
                          src={img.url}
                          alt={preview(img.alt)}
                          className="h-36 w-full rounded-lg object-cover bg-linen"
                        />
                      ) : (
                        <div className="flex h-36 w-full items-center justify-center rounded-lg bg-linen text-xs text-stone-400">
                          No Image URL
                        </div>
                      )}

                      <div className="mt-2 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <label className="button-secondary cursor-pointer py-1 px-2.5 text-[11px] font-semibold inline-block">
                            <span>{img.url ? '📷 Replace Image' : '📤 Upload Image'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              onChange={(e) => handleImageUpload(e, 'gallery', idx)}
                              className="hidden"
                            />
                          </label>
                          {img.url ? (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...template.gallery];
                                updated[idx] = { ...updated[idx], url: '' };
                                setTemplate({ ...template, gallery: updated });
                              }}
                              className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-100"
                            >
                              ✕ Clear Image URL
                            </button>
                          ) : null}
                        </div>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={img.url}
                          onChange={(e) => {
                            const updated = [...template.gallery];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setTemplate({ ...template, gallery: updated });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Title Template"
                          value={img.title || ''}
                          onChange={(e) => {
                            const updated = [...template.gallery];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setTemplate({ ...template, gallery: updated });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Caption / Subtext"
                          value={img.caption || ''}
                          onChange={(e) => {
                            const updated = [...template.gallery];
                            updated[idx] = { ...updated[idx], caption: e.target.value };
                            setTemplate({ ...template, gallery: updated });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-stone-700"
                        />
                        <input
                          type="text"
                          placeholder="Alt Tag Template (supports {Location})"
                          value={img.alt || `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`}
                          onChange={(e) => {
                            const updated = [...template.gallery];
                            updated[idx] = { ...updated[idx], alt: e.target.value };
                            setTemplate({ ...template, gallery: updated });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-stone-600"
                        />
                        <p className="text-[10px] text-stone-500">
                          Alt Preview: <span className="text-cocoa font-medium">{preview(img.alt || `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`)}</span>
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => setTemplate({ ...template, gallery: moveUp(template.gallery, idx) })}
                              className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                            >
                              ▲ Up
                            </button>
                            <button
                              type="button"
                              disabled={idx === (template.gallery?.length || 0) - 1}
                              onClick={() => setTemplate({ ...template, gallery: moveDown(template.gallery, idx) })}
                              className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                            >
                              ▼ Down
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = template.gallery.filter((_, i) => i !== idx);
                              setTemplate({ ...template, gallery: updated });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(template.gallery || []),
                      {
                        url: '',
                        title: `${selectedService} in {Location}`,
                        alt: `${selectedService} in {Location}, Bangalore – Shrusara Fashion Boutique`,
                        caption: 'Customized bespoke design.'
                      }
                    ];
                    setTemplate({ ...template, gallery: updated });
                  }}
                  className="rounded-xl border border-dashed border-cocoa/40 px-4 py-2 text-xs font-semibold text-cocoa hover:bg-linen"
                >
                  + Add Image to Gallery
                </button>
              </div>
            )}

            {/* TAB 8: PROXIMITY & MAPS */}
            {activeTab === 'proximity' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">8. Location, Distance & Maps Defaults</h2>
                  <p className="text-xs text-stone-500">
                    Default proximity settings when generating a page. Location-specific travel times and landmarks are automatically merged from the Bangalore Locations directory.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Proximity Section Heading Template
                    </label>
                    <input
                      type="text"
                      value={template.proximityHeading || template.proximity?.headingTemplate || 'Convenient for Clients in {Location}, Bangalore'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          proximityHeading: e.target.value,
                          proximity: { ...template.proximity, headingTemplate: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Maps Button Text
                    </label>
                    <input
                      type="text"
                      value={template.proximity?.mapsButtonText || 'Get Google Maps Directions'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          proximity: { ...template.proximity, mapsButtonText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Boutique Address (Physical Hub: Mahalakshmipuram)
                    </label>
                    <input
                      type="text"
                      value={template.proximity?.boutiqueAddress || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          proximity: { ...template.proximity, boutiqueAddress: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={template.proximity?.workingHours || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          proximity: { ...template.proximity, workingHours: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Default Distance Note / Location Intro Template (supports {"{Location}"})
                  </label>
                  <textarea
                    rows={2}
                    value={template.proximity?.defaultDistanceNote || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        proximity: { ...template.proximity, defaultDistanceNote: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.proximity?.defaultDistanceNote)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Google Maps Direction URL
                  </label>
                  <input
                    type="text"
                    value={template.proximity?.googleMapsUrl || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        proximity: { ...template.proximity, googleMapsUrl: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>
              </div>
            )}

            {/* TAB 9: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">9. Testimonials Template</h2>
                  <p className="text-xs text-stone-500">
                    Note: Customer locations remain real actual localities (e.g. "Rajajinagar, Bangalore") and are preserved.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Testimonials Heading Template
                    </label>
                    <input
                      type="text"
                      value={template.testimonialsHeading || template.testimonials?.headingTemplate || 'Loved by Clients Across Bangalore'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          testimonialsHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Testimonials Intro Template
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Genuine 5-star experiences from clients who trusted Shrusara with their milestone outfits."
                      value={template.testimonialsIntro || template.testimonials?.introTemplate || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          testimonialsIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Google Reviews URL (Global Link)
                    </label>
                    <input
                      type="text"
                      placeholder="https://g.page/r/..."
                      value={template.googleReviewsUrl || template.testimonials?.googleReviewsUrl || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          googleReviewsUrl: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Google Review Button Text
                    </label>
                    <input
                      type="text"
                      placeholder="Read Our Google Reviews ↗"
                      value={template.googleReviewButtonText || template.testimonials?.googleReviewButtonText || 'Read Our Google Reviews ↗'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          googleReviewButtonText: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                {(template.testimonials || []).map((t, idx) => (
                  <div key={idx} className="rounded-xl border border-ink/10 bg-sand/30 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 flex-1">
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={t.name}
                          onChange={(e) => {
                            const updated = [...template.testimonials];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setTemplate({ ...template, testimonials: updated });
                          }}
                          className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-semibold text-ink"
                        />
                        <input
                          type="text"
                          placeholder="Customer Actual Locality (e.g. Rajajinagar, Bangalore)"
                          value={t.location || ''}
                          onChange={(e) => {
                            const updated = [...template.testimonials];
                            updated[idx] = { ...updated[idx], location: e.target.value };
                            setTemplate({ ...template, testimonials: updated });
                          }}
                          className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-stone-600"
                        />
                        <select
                          value={t.rating || 5}
                          onChange={(e) => {
                            const updated = [...template.testimonials];
                            updated[idx] = { ...updated[idx], rating: Number(e.target.value) };
                            setTemplate({ ...template, testimonials: updated });
                          }}
                          className="rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-amber-600 font-bold"
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                          <option value={3}>★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => setTemplate({ ...template, testimonials: moveUp(template.testimonials, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▲ Up
                        </button>
                        <button
                          type="button"
                          disabled={idx === (template.testimonials?.length || 0) - 1}
                          onClick={() => setTemplate({ ...template, testimonials: moveDown(template.testimonials, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▼ Down
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = template.testimonials.filter((_, i) => i !== idx);
                            setTemplate({ ...template, testimonials: updated });
                          }}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove Testimonial
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Review Text"
                      value={t.reviewText}
                      onChange={(e) => {
                        const updated = [...template.testimonials];
                        updated[idx] = { ...updated[idx], reviewText: e.target.value };
                        setTemplate({ ...template, testimonials: updated });
                      }}
                      className="w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-stone-700"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(template.testimonials || []),
                      {
                        name: 'Boutique Client',
                        location: '{Location}, Bangalore',
                        rating: 5,
                        outfitType: selectedService,
                        reviewText: `Shrusara provided exceptional customized ${selectedService} in {Location}. I received compliments all evening!`
                      }
                    ];
                    setTemplate({ ...template, testimonials: updated });
                  }}
                  className="rounded-xl border border-dashed border-cocoa/40 px-3 py-1 text-xs font-semibold text-cocoa hover:bg-linen"
                >
                  + Add Testimonial
                </button>
              </div>
            )}

            {/* TAB 10: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">10. FAQs (Google FAQ Schema)</h2>
                  <p className="text-xs text-stone-500">
                    These questions and answers feed directly into Google Structured Data (FAQPage schema) for rich SERP snippets.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      FAQ Section Heading Template
                    </label>
                    <input
                      type="text"
                      value={template.faqsHeading || template.faqs?.headingTemplate || `${selectedService} in {Location} FAQs`}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          faqsHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      FAQ Section Intro Template
                    </label>
                    <textarea
                      rows={2}
                      value={template.faqsIntro || template.faqs?.introTemplate || ''}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          faqsIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                {(template.faqs || []).map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-ink/10 bg-sand/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cocoa">Q{idx + 1}:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => setTemplate({ ...template, faqs: moveUp(template.faqs, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▲ Up
                        </button>
                        <button
                          type="button"
                          disabled={idx === (template.faqs?.length || 0) - 1}
                          onClick={() => setTemplate({ ...template, faqs: moveDown(template.faqs, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▼ Down
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = template.faqs.filter((_, i) => i !== idx);
                            setTemplate({ ...template, faqs: updated });
                          }}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove FAQ
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Question (use {Location})"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...template.faqs];
                        updated[idx] = { ...updated[idx], question: e.target.value };
                        setTemplate({ ...template, faqs: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink"
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer (use {Location})"
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...template.faqs];
                        updated[idx] = { ...updated[idx], answer: e.target.value };
                        setTemplate({ ...template, faqs: updated });
                      }}
                      className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-stone-700"
                    />
                    <p className="mt-1 text-[11px] text-stone-500">
                      Answer Preview: <span className="text-cocoa font-medium">{preview(faq.answer)}</span>
                    </p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(template.faqs || []),
                      {
                        question: `How do I book an appointment for ${selectedService} from {Location}?`,
                        answer: `You can reach Shrusara on WhatsApp or call our boutique. We will arrange a 1-on-1 consultation or virtual session with door-to-door courier service across {Location}.`
                      }
                    ];
                    setTemplate({ ...template, faqs: updated });
                  }}
                  className="rounded-xl border border-dashed border-cocoa/40 px-3 py-1 text-xs font-semibold text-cocoa hover:bg-linen"
                >
                  + Add FAQ
                </button>
              </div>
            )}

            {/* TAB 11: BOTTOM CTA */}
            {activeTab === 'cta' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">11. Bottom Call-To-Action (CTA)</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Offer / Highlight Badge Template
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Personalized Couture | Book Free Consultation Today"
                    value={template.cta?.offerBadgeTemplate || 'Personalized Couture'}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        cta: { ...template.cta, offerBadgeTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Heading Template
                  </label>
                  <input
                    type="text"
                    value={template.cta?.headingTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        cta: { ...template.cta, headingTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.cta?.headingTemplate)}</strong>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Subheading Template
                  </label>
                  <textarea
                    rows={2}
                    value={template.cta?.subheadingTemplate || ''}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        cta: { ...template.cta, subheadingTemplate: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                  <p className="mt-1 text-[11px] text-stone-500">
                    Preview: <strong className="text-cocoa">{preview(template.cta?.subheadingTemplate)}</strong>
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      WhatsApp Button Text
                    </label>
                    <input
                      type="text"
                      value={template.cta?.whatsappText || 'Chat on WhatsApp'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          cta: { ...template.cta, whatsappText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Call Button Text
                    </label>
                    <input
                      type="text"
                      value={template.cta?.callText || 'Call Shrusara Boutique'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          cta: { ...template.cta, callText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Save Action */}
          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
            <p className="text-xs text-stone-500">
              Changes will immediately take effect for all newly created pages and batch generations of <strong className="text-cocoa">{selectedService}</strong>.
            </p>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="button-primary py-2.5 px-6 text-sm font-semibold shadow-md"
            >
              {saving ? 'Saving...' : `💾 Save Master Template`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}