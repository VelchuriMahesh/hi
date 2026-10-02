import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  createLandingPage,
  fetchAdminLandingPages,
  fetchBangaloreLocations,
  fetchLandingPageById,
  fetchMasterTemplateById,
  generateLandingPageFromMaster,
  saveMasterTemplate,
  syncLandingPageFromMaster,
  updateLandingPage
} from '../services/api';
import { uploadImageToImgbb } from '../services/uploaders';
import {
  BANGALORE_BASE_PATH,
  BANGALORE_LOCATIONS_PRESET,
  DEFAULT_SITE_URL,
  SERVICE_CATEGORIES,
  buildLandingPageFromMaster,
  hydrateLandingPageFromMasterTemplate,
  extractMasterTemplateFromPage,
  generateLandingPageSchemas,
  generatePresetContent,
  normalizeServiceCategory,
  slugifyBangalorePage,
  slugifyService
} from '../utils/bangaloreLandingPage';

const TABS = [
  { id: 'seo', label: '1. SEO & Slug' },
  { id: 'hero', label: '2. Hero Section' },
  { id: 'about', label: '3. About & Features' },
  { id: 'chiefDesigner', label: '4. Meet Our Chief Designer' },
  { id: 'why', label: '5. Why Choose Us' },
  { id: 'process', label: '6. 5-Step Process' },
  { id: 'gallery', label: '7. Gallery Showcase' },
  { id: 'proximity', label: '8. Location & Maps' },
  { id: 'testimonials', label: '9. Testimonials' },
  { id: 'faqs', label: '10. FAQs (Schema)' },
  { id: 'cta', label: '11. Bottom CTA' }
];

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

export default function LandingPageEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const queryService = searchParams.get('service');
  const queryLocation = searchParams.get('location');

  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('seo');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [autoSyncMaster, setAutoSyncMaster] = useState(true);

  // Master Template Loading State
  const initialService = queryService ? normalizeServiceCategory(queryService) : 'Ready-to-Wear Saree Customization';
  const initialLocation = queryLocation || 'Malleshwaram';
  const [isApplyingMaster, setIsApplyingMaster] = useState(false);

  // Main Form State: Pre-loaded synchronously so ALL fields are 100% filled from Master Template instantly
  const [page, setPage] = useState(() => {
    const locObj = BANGALORE_LOCATIONS_PRESET.find((l) => l.name.toLowerCase() === initialLocation.toLowerCase()) || {
      name: initialLocation,
      areaGroup: 'Bangalore West',
      landmark: '10-12 mins via Link Road / Chord Road',
      travelTime: '10-15 mins',
      distanceNote: '10-15 minutes from 8th Cross & Margosa Road, Malleshwaram.'
    };
    return buildLandingPageFromMaster(initialService, initialLocation, { locationObj: locObj });
  });

  // Core helper: fetch from backend or fallback to local master template and update page state
  async function applyMasterTemplate(targetService, targetLocation, currentOverrides = {}) {
    const srv = normalizeServiceCategory(targetService || page.serviceCategory || initialService);
    const loc = targetLocation || page.locationName || initialLocation;
    const token = getAdminToken();

    setIsApplyingMaster(true);
    try {
      const locObj = (locations?.length ? locations : BANGALORE_LOCATIONS_PRESET).find(
        (l) => l.name.toLowerCase() === loc.toLowerCase()
      ) || { name: loc, areaGroup: 'Bangalore West' };

      // 1. First attempt: call backend generation endpoint
      try {
        const res = await generateLandingPageFromMaster(token, {
          serviceCategory: srv,
          locationName: loc
        });
        if (res?.item) {
          const hydrated = hydrateLandingPageFromMasterTemplate(res.item, loc, {
            serviceCategory: srv,
            locationObj: locObj,
            overrides: currentOverrides
          });
          setPage((prev) => ({
            ...hydrated,
            id: prev.id,
            status: prev.status || 'draft',
            serviceCategory: srv,
            locationName: loc
          }));
          setMessage(`✨ Loaded Master Template for "${srv}" in "${loc}". All 10 sections populated!`);
          return;
        }
      } catch (err) {
        console.warn('Backend master template generate failed, trying direct template fetch:', err);
      }

      // 2. Second attempt: fetch raw master template by ID from backend
      try {
        const tplRes = await fetchMasterTemplateById(slugifyService(srv));
        if (tplRes?.item) {
          const hydrated = hydrateLandingPageFromMasterTemplate(tplRes.item, loc, {
            serviceCategory: srv,
            locationObj: locObj,
            overrides: currentOverrides
          });
          setPage((prev) => ({
            ...hydrated,
            id: prev.id,
            status: prev.status || 'draft',
            serviceCategory: srv,
            locationName: loc
          }));
          setMessage(`✨ Loaded Master Template for "${srv}" in "${loc}". All 10 sections populated!`);
          return;
        }
      } catch (err) {
        console.warn('Backend fetchMasterTemplateById failed, checking local cache & presets:', err);
      }

      // 3. Third attempt: check localStorage for saved master template
      let localMaster = null;
      if (typeof window !== 'undefined' && window.localStorage) {
        const sKey = slugifyService(srv);
        const raw = window.localStorage.getItem(`shrusara_master_tpl_${sKey}`) || window.localStorage.getItem(`shrusara_master_tpl_${srv}`);
        if (raw) {
          try {
            localMaster = JSON.parse(raw);
          } catch {
            // ignore
          }
        }
      }

      const generated = buildLandingPageFromMaster(srv, loc, {
        ...currentOverrides,
        masterTemplate: localMaster,
        locationObj: locObj
      });

      setPage((prev) => ({
        ...generated,
        ...currentOverrides,
        id: prev.id,
        status: prev.status || 'draft',
        serviceCategory: srv,
        locationName: loc
      }));
      setMessage(`✨ Loaded Master Template for "${srv}" in "${loc}". All 10 sections populated!`);
    } finally {
      setIsApplyingMaster(false);
    }
  }

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    async function init() {
      try {
        const locRes = await fetchBangaloreLocations().catch(() => ({ items: [] }));
        const loadedLocs = locRes.items?.length ? locRes.items : BANGALORE_LOCATIONS_PRESET;
        setLocations(loadedLocs);

        if (isEditing) {
          const res = await fetchLandingPageById(id);
          if (res?.item) {
            const item = res.item;
            const normalized = buildLandingPageFromMaster(
              item.serviceCategory || initialService,
              item.locationName || initialLocation,
              item
            );
            const effectiveTitle = item.hero?.heading || item.title || normalized.title;
            setPage({
              ...normalized,
              ...item,
              title: effectiveTitle,
              hero: {
                ...(normalized.hero || {}),
                ...(item.hero || {}),
                heading: effectiveTitle
              }
            });
            if (res.isCached) {
              setMessage('⚠️ Showing cached version of this landing page (offline / unable to reach cloud database).');
            }
          } else {
            setMessage('Landing page not found.');
          }
        } else {
          // Creating a new page: automatically populate from Master Template
          await applyMasterTemplate(initialService, initialLocation);
        }
      } catch (err) {
        const errorMsg = String(err.message || '');
        if (
          errorMsg.includes('ENOTFOUND') ||
          errorMsg.includes('getaddrinfo') ||
          errorMsg.includes('firestore.googleapis.com') ||
          errorMsg.includes('Offline')
        ) {
          setMessage('⚠️ Network Connection Offline: Unable to reach cloud database. Please check your internet connection.');
        } else {
          setMessage(errorMsg || 'Error loading page');
        }
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [id, isEditing, navigate]);

  const [isCustomLocationInput, setIsCustomLocationInput] = useState(false);

  // When user changes Service in header or Tab 1
  function handleServiceChange(newService) {
    const normalized = normalizeServiceCategory(newService);
    applyMasterTemplate(normalized, page.locationName || initialLocation);
  }

  // When user changes Location in header or Tab 1
  function handleLocationChange(newLocation) {
    if (newLocation === '_custom') {
      setIsCustomLocationInput(true);
      return;
    }
    setIsCustomLocationInput(false);
    applyMasterTemplate(page.serviceCategory || initialService, newLocation);
  }

  function handleCustomLocationNameChange(val) {
    setPage((prev) => ({
      ...prev,
      locationName: val,
      slug: slugifyBangalorePage(prev.serviceCategory, val),
      proximity: {
        ...prev.proximity,
        locationName: val,
        distanceNote: `Easily accessible from ${val}. Doorstep Porter & express courier delivery available across Bangalore.`
      }
    }));
  }

  async function handleReloadMasterTemplate() {
    if (
      !window.confirm(
        `Pull latest content from "${page.serviceCategory}" Master Template for "${page.locationName}"?\n\nThis will re-populate all 10 sections with the customized Master Template copy saved in Master Templates CMS.`
      )
    ) {
      return;
    }

    setIsApplyingMaster(true);
    setMessage('');
    try {
      if (isEditing && id) {
        const token = getAdminToken();
        const syncRes = await syncLandingPageFromMaster(token, id);
        if (syncRes?.item) {
          setPage(syncRes.item);
          setMessage(`✅ Successfully synced and updated with the latest "${page.serviceCategory}" Master Template! Changes are live.`);
          return;
        }
      }
      await applyMasterTemplate(page.serviceCategory, page.locationName);
    } catch (err) {
      console.warn('Server sync failed, applying master in local editor state:', err);
      await applyMasterTemplate(page.serviceCategory, page.locationName);
    } finally {
      setIsApplyingMaster(false);
    }
  }

  async function handleImageUpload(e, target = 'featuredImage') {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage('');
    try {
      const uploaded = await uploadImageToImgbb(file);
      if (target === 'featuredImage') {
        setPage((prev) => ({
          ...prev,
          featuredImage: {
            url: uploaded.url,
            alt: prev.featuredImage?.alt || `${prev.serviceCategory} in ${prev.locationName}, Bangalore`,
            caption: prev.featuredImage?.caption || ''
          }
        }));
      } else if (target === 'gallery') {
        setPage((prev) => ({
          ...prev,
          gallery: [
            ...(prev.gallery || []),
            {
              url: uploaded.url,
              alt: `${prev.serviceCategory} design in Bangalore`,
              title: `${prev.serviceCategory} Gallery`,
              caption: ''
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

  async function handlePushToMasterTemplate() {
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setMessage('');
    try {
      const srv = page.serviceCategory;
      const sId = slugifyService(srv);
      const masterPayload = extractMasterTemplateFromPage(page);

      await saveMasterTemplate(token, sId, masterPayload);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`shrusara_master_tpl_${sId}`, JSON.stringify(masterPayload));
        window.localStorage.setItem(`shrusara_master_tpl_${srv}`, JSON.stringify(masterPayload));
      }
      setMessage(`🌟 Master Template for "${srv}" successfully updated from this page! New pages created for "${srv}" will automatically inherit these headings, copy, and settings.`);
    } catch (err) {
      setMessage(`⚠️ Failed to update Master Template: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(newStatus) {
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setMessage('');

    const targetStatus = newStatus || page.status || 'draft';
    const mainTitle = page.title || page.hero?.heading || '';
    const payload = {
      ...page,
      title: mainTitle,
      hero: {
        ...page.hero,
        heading: mainTitle
      },
      status: targetStatus,
      publishedAt: targetStatus === 'published' ? page.publishedAt || new Date().toISOString() : ''
    };

    try {
      if (isEditing) {
        await updateLandingPage(token, id, payload);
      } else {
        const res = await createLandingPage(token, payload);
        if (res?.item?.id) {
          navigate(`/admin/landing-pages/edit/${res.item.id}`, { replace: true });
        }
      }

      // Auto-sync edits into the Service Master Template so new pages inherit these changes!
      if (autoSyncMaster) {
        const srv = payload.serviceCategory;
        const sId = slugifyService(srv);
        const masterPayload = extractMasterTemplateFromPage(payload);
        try {
          await saveMasterTemplate(token, sId, masterPayload);
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(`shrusara_master_tpl_${sId}`, JSON.stringify(masterPayload));
            window.localStorage.setItem(`shrusara_master_tpl_${srv}`, JSON.stringify(masterPayload));
          }
          setMessage(`✅ Landing page saved & Master Template for "${srv}" updated! (New "${srv}" pages will automatically inherit these edits)`);
        } catch (masterErr) {
          console.warn('Master template auto-sync warning:', masterErr);
          setMessage('Landing page saved successfully!');
        }
      } else {
        setMessage('Landing page saved successfully!');
      }
    } catch (err) {
      setMessage(err.message || 'Failed to save landing page.');
    } finally {
      setSaving(false);
    }
  }

  const liveUrl = `${DEFAULT_SITE_URL}${BANGALORE_BASE_PATH}/${page.slug || ''}`;
  const schemas = generateLandingPageSchemas({ page, siteUrl: DEFAULT_SITE_URL });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand text-ink">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cocoa border-t-transparent mx-auto" />
          <p className="mt-4 text-sm font-medium">Loading Landing Page Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={`${isEditing ? 'Edit' : 'New'} Bangalore Landing Page | Shrusara Admin`}
        description="Bangalore Landing Page CMS Editor"
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
                  {isEditing ? 'Edit Page' : 'Create New Page'}
                </span>
              </div>
              <h1 className="mt-1 font-heading text-3xl text-ink">
                {page.title || 'Untitled Landing Page'}
              </h1>
              <p className="mt-1 font-mono text-xs text-cocoa">
                {liveUrl}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-cocoa cursor-pointer select-none bg-cocoa/5 px-3 py-2 rounded-xl border border-cocoa/20">
                <input
                  type="checkbox"
                  checked={autoSyncMaster}
                  onChange={(e) => setAutoSyncMaster(e.target.checked)}
                  className="rounded border-ink/20 text-cocoa focus:ring-cocoa"
                />
                <span>Auto-sync changes to <strong>{page.serviceCategory}</strong> Master Template</span>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {page.slug ? (
                  <a
                    href={`/bangalore/${page.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary py-2 text-xs font-semibold"
                  >
                    Preview Live ↗
                  </a>
                ) : null}

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('draft')}
                  className="rounded-xl border border-ink/20 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-linen transition disabled:opacity-50"
                >
                  {saving && page.status === 'draft' ? 'Saving...' : 'Save Draft'}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSave('published')}
                  className="button-primary py-2 text-xs font-semibold shadow-md transition disabled:opacity-50"
                >
                  {saving && page.status === 'published' ? 'Publishing...' : '🚀 Publish Page'}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handlePushToMasterTemplate}
                  title="Save current page content directly into the Master Template for this service"
                  className="rounded-xl border border-cocoa/30 bg-linen px-3.5 py-2 text-xs font-semibold text-cocoa shadow-sm hover:bg-cocoa/10 transition disabled:opacity-50 flex items-center gap-1"
                >
                  🌟 Push to Master
                </button>
              </div>
            </div>
          </div>

          {message ? (
            <div
              className={`mt-4 rounded-2xl border px-5 py-3 text-sm shadow-card ${
                message.includes('⚠️') || message.includes('Offline') || message.includes('Error') || message.includes('failed')
                  ? 'border-amber-300 bg-amber-50 text-amber-950 font-medium'
                  : message.includes('✨') || message.includes('success') || message.includes('✅') || message.includes('🎉')
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-medium'
                  : 'border-cocoa/20 bg-white text-cocoa'
              }`}
            >
              {message}
            </div>
          ) : null}

          {/* Master Template Control Card */}
          <div className="mt-6 rounded-2xl border-2 border-cocoa/30 bg-gradient-to-r from-cocoa/10 via-linen to-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Master Template Active
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-cocoa">
                    SHRUSARA CMS V2
                  </span>
                </div>
                <h3 className="font-heading text-lg text-ink font-semibold">
                  {page.serviceCategory} — {page.locationName}
                </h3>
                <p className="text-xs text-stone-600 max-w-xl">
                  Selecting a Service & Location automatically populates and formats all 10 sections (Headings, SEO, FAQs, Alt tags, Travel time, CTA, and Schema) from the service&apos;s master template.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    1. Service Category
                  </span>
                  <select
                    value={page.serviceCategory}
                    disabled={isApplyingMaster}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="rounded-xl border border-ink/20 bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm outline-none focus:border-cocoa"
                  >
                    {SERVICE_CATEGORIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    2. Bangalore Location
                  </span>
                  <select
                    value={locations.some((l) => l.name.toLowerCase() === (page.locationName || '').toLowerCase()) && !isCustomLocationInput ? page.locationName : '_custom'}
                    disabled={isApplyingMaster}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="rounded-xl border border-ink/20 bg-white px-3 py-2 text-xs font-semibold text-ink shadow-sm outline-none focus:border-cocoa"
                  >
                    <option value="" disabled>-- Select Locality --</option>
                    {Object.entries(
                      locations.reduce((acc, loc) => {
                        const grp = loc.areaGroup || 'Bangalore West';
                        if (!acc[grp]) acc[grp] = [];
                        acc[grp].push(loc);
                        return acc;
                      }, {})
                    ).map(([group, locs]) => (
                      <optgroup key={group} label={group}>
                        {locs.map((loc) => (
                          <option key={loc.id || loc.name} value={loc.name}>
                            {loc.name} {loc.isMainBoutique ? '★ (Boutique Hub)' : ''}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="_custom">✏ Custom / Other Location...</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-transparent mb-1 select-none">
                    Actions
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isApplyingMaster}
                      onClick={handleReloadMasterTemplate}
                      title="Re-populate all 10 sections from master template"
                      className="rounded-xl bg-stone-100 border border-ink/20 px-3 py-2 text-xs font-semibold text-stone-800 shadow-sm hover:bg-stone-200 transition disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isApplyingMaster ? 'Syncing...' : '🔄 Pull from Master'}
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={handlePushToMasterTemplate}
                      title="Update the Master Template for this service using the current edits"
                      className="rounded-xl bg-cocoa px-3.5 py-2 text-xs font-semibold text-white shadow hover:bg-cocoa/90 transition disabled:opacity-50 flex items-center gap-1.5"
                    >
                      🌟 Push to Master
                    </button>

                    <Link
                      to={`/admin/master-templates?service=${encodeURIComponent(page.serviceCategory)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-ink/20 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-linen transition flex items-center gap-1"
                      title="Edit master template for this service"
                    >
                      ⚙️ Edit Master ↗
                    </Link>
                  </div>
                </div>
              </div>
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

          {/* Tab Content Container */}
          <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
            {/* TAB 1: SEO & URL SETTINGS */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-ink/10 pb-4">
                  <div>
                    <h2 className="font-heading text-xl text-ink">1. Technical SEO & Canonical URL Settings</h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Changing Service or Location instantly synchronizes all 10 sections from the Master Template.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={isApplyingMaster}
                    onClick={handleReloadMasterTemplate}
                    className="text-xs font-semibold text-cocoa bg-cocoa/10 hover:bg-cocoa/20 px-3 py-1.5 rounded-xl transition flex items-center gap-1 self-start"
                  >
                    ⚡ Sync All Sections from Master
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Service Category *
                    </label>
                    <select
                      value={page.serviceCategory}
                      disabled={isApplyingMaster}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                    >
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                        Target Bangalore Location *
                      </label>
                      <Link
                        to="/admin/locations"
                        target="_blank"
                        className="text-[11px] font-medium text-cocoa hover:underline"
                      >
                        ⚙ Manage Locations
                      </Link>
                    </div>
                    <select
                      value={locations.some((l) => l.name.toLowerCase() === (page.locationName || '').toLowerCase()) && !isCustomLocationInput ? page.locationName : '_custom'}
                      disabled={isApplyingMaster}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                    >
                      <option value="" disabled>-- Select a Bangalore Locality --</option>
                      {Object.entries(
                        locations.reduce((acc, loc) => {
                          const grp = loc.areaGroup || 'Bangalore West';
                          if (!acc[grp]) acc[grp] = [];
                          acc[grp].push(loc);
                          return acc;
                        }, {})
                      ).map(([group, locs]) => (
                        <optgroup key={group} label={group}>
                          {locs.map((loc) => (
                            <option key={loc.id || loc.name} value={loc.name}>
                              {loc.name} {loc.isMainBoutique ? '★ (Boutique Hub)' : ''}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="_custom">✏ Custom / Other Location (Enter Below)</option>
                    </select>

                    {/* Custom location write-in field */}
                    {(isCustomLocationInput || !locations.some((l) => l.name.toLowerCase() === (page.locationName || '').toLowerCase())) && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={page.locationName}
                          onChange={(e) => handleCustomLocationNameChange(e.target.value)}
                          placeholder="Type custom location name (e.g. Sarjapur Road)"
                          className="w-full rounded-xl border border-cocoa/30 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Page Title (H1) *
                  </label>
                  <input
                    type="text"
                    required
                    value={page.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPage((prev) => ({
                        ...prev,
                        title: val,
                        hero: {
                          ...prev.hero,
                          heading: val
                        }
                      }));
                    }}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      URL Slug * (Auto-formats to /bangalore/:slug)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPage({
                          ...page,
                          slug: slugifyBangalorePage(page.serviceCategory, page.locationName)
                        })
                      }
                      className="text-xs text-cocoa hover:underline"
                    >
                      Generate Slug from Service + Location
                    </button>
                  </div>
                  <div className="mt-1 flex items-center rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm">
                    <span className="font-mono text-xs text-stone-500">{DEFAULT_SITE_URL}/bangalore/</span>
                    <input
                      type="text"
                      required
                      value={page.slug}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                        })
                      }
                      className="w-full bg-transparent font-mono text-sm text-ink outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={page.metaTitle}
                    onChange={(e) => setPage({ ...page, metaTitle: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={page.metaDescription}
                    onChange={(e) => setPage({ ...page, metaDescription: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Meta Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(page.metaKeywords) ? page.metaKeywords.join(', ') : page.metaKeywords || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        metaKeywords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div className="rounded-xl bg-linen p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cocoa">
                    Self-Referencing Canonical URL (Verified)
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink">{liveUrl}</p>
                </div>
              </div>
            )}

            {/* TAB 2: HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">2. Hero Section</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Hero Badge Pill
                    </label>
                    <input
                      type="text"
                      value={page.hero?.badge || ''}
                      onChange={(e) =>
                        setPage({ ...page, hero: { ...page.hero, badge: e.target.value } })
                      }
                      placeholder="100% Customized | Bangalore Boutique"
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Hero Heading (H1)
                    </label>
                    <input
                      type="text"
                      value={page.hero?.heading || page.title || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPage((prev) => ({
                          ...prev,
                          title: val,
                          hero: { ...prev.hero, heading: val }
                        }));
                      }}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Hero Subtitle / Tagline
                  </label>
                  <textarea
                    rows={3}
                    value={page.hero?.tagline || ''}
                    onChange={(e) =>
                      setPage({ ...page, hero: { ...page.hero, tagline: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                {/* Hero Image Upload */}
                <div className="rounded-xl border border-ink/10 bg-linen/50 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Featured / Hero Image
                  </label>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {page.featuredImage?.url ? (
                      <img
                        src={page.featuredImage.url}
                        alt="Featured preview"
                        className="h-28 w-28 rounded-xl object-cover border border-ink/10"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-ink/5 text-xs text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'featuredImage')}
                        className="text-xs text-stone-600"
                      />
                      {uploadingImage && <p className="text-xs text-cocoa">Uploading to ImgBB...</p>}
                      <input
                        type="text"
                        placeholder="Image URL or Path"
                        value={page.featuredImage?.url || ''}
                        onChange={(e) =>
                          setPage({
                            ...page,
                            featuredImage: { ...page.featuredImage, url: e.target.value }
                          })
                        }
                        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                      />
                      <input
                        type="text"
                        placeholder="Image Alt Text (for Google Images SEO)"
                        value={page.featuredImage?.alt || ''}
                        onChange={(e) =>
                          setPage({
                            ...page,
                            featuredImage: { ...page.featuredImage, alt: e.target.value }
                          })
                        }
                        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Highlights Checklist */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Hero Highlights (Checklist)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPage({
                          ...page,
                          hero: {
                            ...page.hero,
                            highlights: [...(page.hero?.highlights || []), '']
                          }
                        })
                      }
                      className="text-xs text-cocoa hover:underline font-semibold"
                    >
                      + Add Highlight
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {(page.hero?.highlights || []).map((hl, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => {
                            const newHls = [...page.hero.highlights];
                            newHls[idx] = e.target.value;
                            setPage({ ...page, hero: { ...page.hero, highlights: newHls } });
                          }}
                          className="flex-1 rounded-xl border border-ink/10 bg-linen px-3 py-1.5 text-sm text-ink outline-none focus:border-cocoa"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newHls = page.hero.highlights.filter((_, i) => i !== idx);
                            setPage({ ...page, hero: { ...page.hero, highlights: newHls } });
                          }}
                          className="rounded-lg px-2 text-xs text-red-600 hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Settings */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={page.hero?.primaryCtaText || 'Chat on WhatsApp'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          hero: { ...page.hero, primaryCtaText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      WhatsApp Pre-filled Message
                    </label>
                    <input
                      type="text"
                      value={page.hero?.primaryCtaMessage || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          hero: { ...page.hero, primaryCtaMessage: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ABOUT & FEATURES */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">3. About Service & Bangalore Experience</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={page.about?.heading || ''}
                    onChange={(e) =>
                      setPage({ ...page, about: { ...page.about, heading: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Description Text
                  </label>
                  <textarea
                    rows={4}
                    value={page.about?.description || ''}
                    onChange={(e) =>
                      setPage({ ...page, about: { ...page.about, description: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      6 Service Highlight Cards
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPage({
                          ...page,
                          about: {
                            ...page.about,
                            highlights: [
                              ...(page.about?.highlights || []),
                              { title: 'New Highlight', description: '' }
                            ]
                          }
                        })
                      }
                      className="text-xs text-cocoa font-semibold hover:underline"
                    >
                      + Add Highlight Card
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(page.about?.highlights || []).map((card, idx) => (
                      <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-cocoa">Card #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newCards = page.about.highlights.filter((_, i) => i !== idx);
                              setPage({ ...page, about: { ...page.about, highlights: newCards } });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Card Title"
                          value={card.title || ''}
                          onChange={(e) => {
                            const newCards = [...page.about.highlights];
                            newCards[idx] = { ...newCards[idx], title: e.target.value };
                            setPage({ ...page, about: { ...page.about, highlights: newCards } });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-semibold text-ink outline-none focus:border-cocoa"
                        />
                        <textarea
                          rows={2}
                          placeholder="Card Description"
                          value={card.description || ''}
                          onChange={(e) => {
                            const newCards = [...page.about.highlights];
                            newCards[idx] = { ...newCards[idx], description: e.target.value };
                            setPage({ ...page, about: { ...page.about, highlights: newCards } });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-stone-700 outline-none focus:border-cocoa"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MEET OUR CHIEF DESIGNER */}
            {activeTab === 'chiefDesigner' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading text-xl text-ink">4. Meet Our Chief Designer Section</h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Highlight Chief Designer Shruthi Ajith and customize designer bio &amp; consultation CTAs.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.sectionHeading || 'Meet Our Chief Designer — Shruthi Ajith'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, sectionHeading: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Section Intro
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.sectionIntro || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, sectionIntro: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-ink/10 bg-linen/50 p-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Designer Image
                  </label>
                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {page.chiefDesigner?.designerImage?.url || page.chiefDesigner?.designerImage ? (
                      <img
                        src={typeof page.chiefDesigner.designerImage === 'string' ? page.chiefDesigner.designerImage : page.chiefDesigner.designerImage?.url}
                        alt="Designer preview"
                        className="h-28 w-28 rounded-xl object-cover border border-ink/10"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-ink/5 text-xs text-stone-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'chiefDesigner')}
                        className="text-xs text-stone-600"
                      />
                      <input
                        type="text"
                        placeholder="Designer Image URL"
                        value={typeof page.chiefDesigner?.designerImage === 'string' ? page.chiefDesigner.designerImage : page.chiefDesigner?.designerImage?.url || ''}
                        onChange={(e) =>
                          setPage({
                            ...page,
                            chiefDesigner: {
                              ...page.chiefDesigner,
                              designerImage: {
                                ...(typeof page.chiefDesigner?.designerImage === 'object' ? page.chiefDesigner.designerImage : {}),
                                url: e.target.value
                              }
                            }
                          })
                        }
                        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                      />
                      <input
                        type="text"
                        placeholder="Designer Image ALT Text (supports {Location})"
                        value={page.chiefDesigner?.designerImageAlt || page.chiefDesigner?.designerImage?.alt || ''}
                        onChange={(e) =>
                          setPage({
                            ...page,
                            chiefDesigner: {
                              ...page.chiefDesigner,
                              designerImageAlt: e.target.value,
                              designerImage: {
                                ...(typeof page.chiefDesigner?.designerImage === 'object' ? page.chiefDesigner.designerImage : {}),
                                alt: e.target.value
                              }
                            }
                          })
                        }
                        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Designer Name
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.designerName || 'Shruthi Ajith'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, designerName: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.designation || 'Founder & Chief Designer'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, designation: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Designer Bio / Craftsmanship Story
                  </label>
                  <textarea
                    rows={4}
                    value={page.chiefDesigner?.designerBio || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        chiefDesigner: { ...page.chiefDesigner, designerBio: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      CTA Heading
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.designerCtaHeading || 'Discuss Your Design With Shruthi'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, designerCtaHeading: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.designerCtaButtonText || 'Chat With Our Designer'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, designerCtaButtonText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      CTA Action Link / WhatsApp URL
                    </label>
                    <input
                      type="text"
                      value={page.chiefDesigner?.designerCtaLink || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          chiefDesigner: { ...page.chiefDesigner, designerCtaLink: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    CTA Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={page.chiefDesigner?.designerCtaText || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        chiefDesigner: { ...page.chiefDesigner, designerCtaText: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: WHY CHOOSE US */}
            {activeTab === 'why' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">5. Why Choose Shrusara Boutique</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={page.whyChooseUs?.heading || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        whyChooseUs: { ...page.whyChooseUs, heading: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Description Text
                  </label>
                  <textarea
                    rows={3}
                    value={page.whyChooseUs?.description || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        whyChooseUs: { ...page.whyChooseUs, description: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Why Choose Us Value Cards
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPage({
                          ...page,
                          whyChooseUs: {
                            ...page.whyChooseUs,
                            cards: [
                              ...(page.whyChooseUs?.cards || []),
                              { title: 'New Reason', description: '' }
                            ]
                          }
                        })
                      }
                      className="text-xs text-cocoa font-semibold hover:underline"
                    >
                      + Add Value Card
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(page.whyChooseUs?.cards || []).map((card, idx) => (
                      <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-cocoa">Advantage #{idx + 1}</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => setPage({ ...page, whyChooseUs: { ...page.whyChooseUs, cards: moveUp(page.whyChooseUs.cards, idx) } })}
                              className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={idx === (page.whyChooseUs?.cards?.length || 0) - 1}
                              onClick={() => setPage({ ...page, whyChooseUs: { ...page.whyChooseUs, cards: moveDown(page.whyChooseUs.cards, idx) } })}
                              className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                            >
                              ▼
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newCards = page.whyChooseUs.cards.filter((_, i) => i !== idx);
                                setPage({
                                  ...page,
                                  whyChooseUs: { ...page.whyChooseUs, cards: newCards }
                                });
                              }}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Title"
                          value={card.title || ''}
                          onChange={(e) => {
                            const newCards = [...page.whyChooseUs.cards];
                            newCards[idx] = { ...newCards[idx], title: e.target.value };
                            setPage({
                              ...page,
                              whyChooseUs: { ...page.whyChooseUs, cards: newCards }
                            });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-semibold text-ink outline-none focus:border-cocoa"
                        />
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={card.description || ''}
                          onChange={(e) => {
                            const newCards = [...page.whyChooseUs.cards];
                            newCards[idx] = { ...newCards[idx], description: e.target.value };
                            setPage({
                              ...page,
                              whyChooseUs: { ...page.whyChooseUs, cards: newCards }
                            });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-stone-700 outline-none focus:border-cocoa"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: 5-STEP CUSTOMIZATION JOURNEY */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl text-ink">6. 5-Step Customization Journey</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        processSteps: [
                          ...(page.processSteps || []),
                          {
                            stepNumber: (page.processSteps?.length || 0) + 1,
                            title: 'New Step',
                            description: '',
                            duration: 'Day 1'
                          }
                        ]
                      })
                    }
                    className="text-xs font-semibold text-cocoa hover:underline"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Process Section Heading
                    </label>
                    <input
                      type="text"
                      value={page.processHeading || 'Our 5-Step Customization Journey'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          processHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Process Section Intro
                    </label>
                    <textarea
                      rows={2}
                      value={page.processIntro || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          processIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {(page.processSteps || []).map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-ink/10 bg-linen/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm font-bold text-cocoa">
                          Step {idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => setPage({ ...page, processSteps: moveUp(page.processSteps, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === (page.processSteps?.length || 0) - 1}
                            onClick={() => setPage({ ...page, processSteps: moveDown(page.processSteps, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newSteps = page.processSteps.filter((_, i) => i !== idx);
                              setPage({ ...page, processSteps: newSteps });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-stone-600">
                            Step Title
                          </label>
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => {
                              const newSteps = [...page.processSteps];
                              newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                              setPage({ ...page, processSteps: newSteps });
                            }}
                            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink outline-none focus:border-cocoa"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-600">
                            Estimated Duration / Day
                          </label>
                          <input
                            type="text"
                            value={step.duration || ''}
                            placeholder="e.g. Day 1, Day 3-10"
                            onChange={(e) => {
                              const newSteps = [...page.processSteps];
                              newSteps[idx] = { ...newSteps[idx], duration: e.target.value };
                              setPage({ ...page, processSteps: newSteps });
                            }}
                            className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink outline-none focus:border-cocoa"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600">
                          Step Description
                        </label>
                        <textarea
                          rows={2}
                          value={step.description || ''}
                          onChange={(e) => {
                            const newSteps = [...page.processSteps];
                            newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                            setPage({ ...page, processSteps: newSteps });
                          }}
                          className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-stone-700 outline-none focus:border-cocoa"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: DESIGN GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl text-ink">7. Curated Design Gallery</h2>
                  <div className="flex items-center gap-2">
                    <label className="button-primary cursor-pointer py-1.5 px-3 text-xs font-semibold">
                      <span>{uploadingImage ? 'Uploading...' : '+ Upload Gallery Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={(e) => handleImageUpload(e, 'gallery')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Gallery Section Heading
                    </label>
                    <input
                      type="text"
                      value={page.galleryHeading || `${page.serviceCategory} Gallery`}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          galleryHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Gallery Section Intro
                    </label>
                    <textarea
                      rows={2}
                      value={page.galleryIntro || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          galleryIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(page.gallery || []).map((img, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-3 space-y-2">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink/5">
                        <img
                          src={img.url}
                          alt={img.alt || 'Gallery image'}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newGallery = page.gallery.filter((_, i) => i !== idx);
                            setPage({ ...page, gallery: newGallery });
                          }}
                          className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-xs text-white shadow hover:bg-red-700"
                        >
                          ✕
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Image URL"
                        value={img.url || ''}
                        onChange={(e) => {
                          const newGallery = [...page.gallery];
                          newGallery[idx] = { ...newGallery[idx], url: e.target.value };
                          setPage({ ...page, gallery: newGallery });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink outline-none focus:border-cocoa"
                      />

                      <input
                        type="text"
                        placeholder="Alt Text (SEO)"
                        value={img.alt || ''}
                        onChange={(e) => {
                          const newGallery = [...page.gallery];
                          newGallery[idx] = { ...newGallery[idx], alt: e.target.value };
                          setPage({ ...page, gallery: newGallery });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink outline-none focus:border-cocoa"
                      />

                      <input
                        type="text"
                        placeholder="Caption / Title"
                        value={img.title || ''}
                        onChange={(e) => {
                          const newGallery = [...page.gallery];
                          newGallery[idx] = { ...newGallery[idx], title: e.target.value };
                          setPage({ ...page, gallery: newGallery });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink outline-none focus:border-cocoa"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => setPage({ ...page, gallery: moveUp(page.gallery, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▲ Up
                        </button>
                        <button
                          type="button"
                          disabled={idx === (page.gallery?.length || 0) - 1}
                          onClick={() => setPage({ ...page, gallery: moveDown(page.gallery, idx) })}
                          className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                        >
                          ▼ Down
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: LOCATION & PROXIMITY */}
            {activeTab === 'proximity' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">8. Location & Proximity Advantage</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Proximity Section Heading
                    </label>
                    <input
                      type="text"
                      value={page.proximityHeading || page.proximity?.heading || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximityHeading: e.target.value,
                          proximity: { ...page.proximity, heading: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Google Maps Button Text
                    </label>
                    <input
                      type="text"
                      value={page.proximity?.mapsButtonText || 'Get Google Maps Directions'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, mapsButtonText: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Boutique Address
                    </label>
                    <input
                      type="text"
                      value={page.proximity?.boutiqueAddress || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, boutiqueAddress: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={page.proximity?.landmark || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, landmark: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Estimated Travel Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10-15 mins, 20 mins via Metro"
                      value={page.proximity?.travelTime || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, travelTime: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Proximity & Connectivity Note (for {page.locationName})
                  </label>
                  <textarea
                    rows={3}
                    value={page.proximity?.distanceNote || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        proximity: { ...page.proximity, distanceNote: e.target.value }
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={page.proximity?.workingHours || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, workingHours: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Google Maps Link
                    </label>
                    <input
                      type="text"
                      value={page.proximity?.googleMapsUrl || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          proximity: { ...page.proximity, googleMapsUrl: e.target.value }
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Nearby Localities (Comma-separated for internal linking)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(page.proximity?.nearbyAreas) ? page.proximity.nearbyAreas.join(', ') : page.proximity?.nearbyAreas || ''}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        proximity: {
                          ...page.proximity,
                          nearbyAreas: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        }
                      })
                    }
                    placeholder="e.g. Rajajinagar, Malleshwaram, Basaveshwaranagar"
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Boutique Visit Options
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPage({
                          ...page,
                          proximity: {
                            ...page.proximity,
                            boutiqueVisitOptions: [
                              ...(page.proximity?.boutiqueVisitOptions || []),
                              { title: 'New Option', description: '' }
                            ]
                          }
                        })
                      }
                      className="text-xs text-cocoa font-semibold hover:underline"
                    >
                      + Add Visit Option
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(page.proximity?.boutiqueVisitOptions || []).map((opt, idx) => (
                      <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-cocoa">Option #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newOpts = page.proximity.boutiqueVisitOptions.filter((_, i) => i !== idx);
                              setPage({
                                ...page,
                                proximity: { ...page.proximity, boutiqueVisitOptions: newOpts }
                              });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Option Title"
                          value={opt.title || ''}
                          onChange={(e) => {
                            const newOpts = [...page.proximity.boutiqueVisitOptions];
                            newOpts[idx] = { ...newOpts[idx], title: e.target.value };
                            setPage({
                              ...page,
                              proximity: { ...page.proximity, boutiqueVisitOptions: newOpts }
                            });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-semibold text-ink outline-none focus:border-cocoa"
                        />
                        <textarea
                          rows={2}
                          placeholder="Option Description"
                          value={opt.description || ''}
                          onChange={(e) => {
                            const newOpts = [...page.proximity.boutiqueVisitOptions];
                            newOpts[idx] = { ...newOpts[idx], description: e.target.value };
                            setPage({
                              ...page,
                              proximity: { ...page.proximity, boutiqueVisitOptions: newOpts }
                            });
                          }}
                          className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-stone-700 outline-none focus:border-cocoa"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl text-ink">9. Customer Testimonials</h2>
                    <p className="text-xs text-stone-500">
                      Customer locations preserve actual localities (e.g. "Rajajinagar, Bangalore").
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        testimonials: [
                          ...(page.testimonials || []),
                          {
                            name: 'Client Name',
                            location: page.locationName || 'Bangalore',
                            rating: 5,
                            outfitType: page.serviceCategory || 'Bridal Blouse',
                            reviewText: ''
                          }
                        ]
                      })
                    }
                    className="text-xs font-semibold text-cocoa hover:underline"
                  >
                    + Add Review
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Testimonials Heading
                    </label>
                    <input
                      type="text"
                      value={page.testimonialsHeading || page.testimonialsHeader || 'Loved by Clients Across Bangalore'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          testimonialsHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Testimonials Intro
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Genuine 5-star experiences from clients who trusted Shrusara with their milestone outfits."
                      value={page.testimonialsIntro || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
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
                      Google Reviews URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://g.page/r/..."
                      value={page.googleReviewsUrl || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
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
                      value={page.googleReviewButtonText || 'Read Our Google Reviews ↗'}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          googleReviewButtonText: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {(page.testimonials || []).map((testi, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-cocoa">Review #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => setPage({ ...page, testimonials: moveUp(page.testimonials, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === (page.testimonials?.length || 0) - 1}
                            onClick={() => setPage({ ...page, testimonials: moveDown(page.testimonials, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newTestis = page.testimonials.filter((_, i) => i !== idx);
                              setPage({ ...page, testimonials: newTestis });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={testi.name || ''}
                          onChange={(e) => {
                            const newTestis = [...page.testimonials];
                            newTestis[idx] = { ...newTestis[idx], name: e.target.value };
                            setPage({ ...page, testimonials: newTestis });
                          }}
                          className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink outline-none focus:border-cocoa"
                        />
                        <input
                          type="text"
                          placeholder="Area / Locality"
                          value={testi.location || ''}
                          onChange={(e) => {
                            const newTestis = [...page.testimonials];
                            newTestis[idx] = { ...newTestis[idx], location: e.target.value };
                            setPage({ ...page, testimonials: newTestis });
                          }}
                          className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink outline-none focus:border-cocoa"
                        />
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Review Text"
                        value={testi.reviewText || ''}
                        onChange={(e) => {
                          const newTestis = [...page.testimonials];
                          newTestis[idx] = { ...newTestis[idx], reviewText: e.target.value };
                          setPage({ ...page, testimonials: newTestis });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs text-stone-700 outline-none focus:border-cocoa"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 10: FAQS & SCHEMA */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl text-ink">10. Localized FAQs (Auto FAQPage Schema)</h2>
                    <p className="text-xs text-stone-600">
                      These questions automatically render in the public accordion and generate Google `FAQPage` JSON-LD schema!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPage({
                        ...page,
                        faqs: [
                          ...(page.faqs || []),
                          { question: 'New Question?', answer: '' }
                        ]
                      })
                    }
                    className="text-xs font-semibold text-cocoa hover:underline"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      FAQs Section Heading
                    </label>
                    <input
                      type="text"
                      value={page.faqsHeading || `${page.serviceCategory} in ${page.locationName} FAQs`}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          faqsHeading: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      FAQs Section Intro
                    </label>
                    <textarea
                      rows={2}
                      value={page.faqsIntro || ''}
                      onChange={(e) =>
                        setPage({
                          ...page,
                          faqsIntro: e.target.value
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {(page.faqs || []).map((faq, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-cocoa">Q#{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => setPage({ ...page, faqs: moveUp(page.faqs, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▲ Up
                          </button>
                          <button
                            type="button"
                            disabled={idx === (page.faqs?.length || 0) - 1}
                            onClick={() => setPage({ ...page, faqs: moveDown(page.faqs, idx) })}
                            className="text-xs font-bold text-cocoa hover:underline disabled:opacity-30"
                          >
                            ▼ Down
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newFaqs = page.faqs.filter((_, i) => i !== idx);
                              setPage({ ...page, faqs: newFaqs });
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question || ''}
                        onChange={(e) => {
                          const newFaqs = [...page.faqs];
                          newFaqs[idx] = { ...newFaqs[idx], question: e.target.value };
                          setPage({ ...page, faqs: newFaqs });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink outline-none focus:border-cocoa"
                      />

                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={faq.answer || ''}
                        onChange={(e) => {
                          const newFaqs = [...page.faqs];
                          newFaqs[idx] = { ...newFaqs[idx], answer: e.target.value };
                          setPage({ ...page, faqs: newFaqs });
                        }}
                        className="w-full rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-stone-700 outline-none focus:border-cocoa"
                      />
                    </div>
                  ))}
                </div>

                {/* Schema Output Preview */}
                <div className="rounded-xl bg-linen p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cocoa">
                    Generated JSON-LD FAQPage Schema Preview
                  </p>
                  <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-white p-3 font-mono text-xs text-stone-700 border border-ink/10">
                    {JSON.stringify(schemas.faqSchema, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 11: BOTTOM CTA */}
            {activeTab === 'cta' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">11. Bottom Conversion CTA Banner</h2>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Offer / Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={page.cta?.offerBadge || page.cta?.offerBadgeTemplate || 'Personalized Couture'}
                    onChange={(e) =>
                      setPage({ ...page, cta: { ...page.cta, offerBadge: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Banner Heading
                  </label>
                  <input
                    type="text"
                    value={page.cta?.heading || ''}
                    onChange={(e) =>
                      setPage({ ...page, cta: { ...page.cta, heading: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Banner Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={page.cta?.subheading || ''}
                    onChange={(e) =>
                      setPage({ ...page, cta: { ...page.cta, subheading: e.target.value } })
                    }
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      WhatsApp Button Text
                    </label>
                    <input
                      type="text"
                      value={page.cta?.whatsappText || 'Chat on WhatsApp'}
                      onChange={(e) =>
                        setPage({ ...page, cta: { ...page.cta, whatsappText: e.target.value } })
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
                      value={page.cta?.callText || 'Call Shrusara Boutique'}
                      onChange={(e) =>
                        setPage({ ...page, cta: { ...page.cta, callText: e.target.value } })
                      }
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Save Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
            <div className="text-xs text-stone-600">
              Status: <span className="font-semibold uppercase text-cocoa">{page.status || 'draft'}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave('draft')}
                className="button-secondary py-2 text-xs font-semibold"
              >
                Save as Draft
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave('published')}
                className="button-primary py-2 text-xs font-semibold"
              >
                Publish Landing Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
