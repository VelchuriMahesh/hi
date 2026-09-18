import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  createLandingPage,
  fetchAdminLandingPages,
  fetchBangaloreLocations,
  fetchLandingPageById,
  updateLandingPage
} from '../services/api';
import { uploadImageToImgbb } from '../services/uploaders';
import {
  BANGALORE_BASE_PATH,
  BANGALORE_LOCATIONS_PRESET,
  DEFAULT_SITE_URL,
  SERVICE_CATEGORIES,
  buildLandingPageFromMaster,
  generateLandingPageSchemas,
  generatePresetContent,
  normalizeServiceCategory,
  slugifyBangalorePage
} from '../utils/bangaloreLandingPage';

const TABS = [
  { id: 'seo', label: '1. SEO & Slug' },
  { id: 'hero', label: '2. Hero Section' },
  { id: 'about', label: '3. About & Features' },
  { id: 'why', label: '4. Why Choose Us' },
  { id: 'process', label: '5. 5-Step Process' },
  { id: 'gallery', label: '6. Gallery' },
  { id: 'proximity', label: '7. Location & Maps' },
  { id: 'testimonials', label: '8. Testimonials' },
  { id: 'faqs', label: '9. FAQs (Schema)' },
  { id: 'cta', label: '10. Bottom CTA' }
];

export default function LandingPageEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('seo');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Preset Selector States
  const [presetService, setPresetService] = useState('Ready-to-Wear Saree Customization');
  const [presetLocation, setPresetLocation] = useState('Rajajinagar');

  // Main Form State
  const [page, setPage] = useState(() => generatePresetContent('Ready-to-Wear Saree Customization', 'Rajajinagar', 'Bangalore West'));

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
            const normalized = buildLandingPageFromMaster(
              res.item.serviceCategory || 'Ready-to-Wear Saree Customization',
              res.item.locationName || 'Rajajinagar',
              res.item
            );
            setPage({ ...res.item, ...normalized });
            setPresetService(normalizeServiceCategory(res.item.serviceCategory || 'Ready-to-Wear Saree Customization'));
            setPresetLocation(res.item.locationName || 'Rajajinagar');
          } else {
            setMessage('Landing page not found.');
          }
        }
      } catch (err) {
        setMessage(err.message || 'Error loading page');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [id, isEditing, navigate]);

  const [isCustomLocationInput, setIsCustomLocationInput] = useState(false);

  function handleApplyPreset() {
    const selectedLocObj = locations.find((l) => l.name.toLowerCase() === presetLocation.toLowerCase()) || {
      name: presetLocation,
      areaGroup: 'Bangalore West'
    };

    if (
      window.confirm(
        `Auto-generate preset content for "${presetService}" in "${presetLocation}"? This will populate all 10 sections.`
      )
    ) {
      const generated = buildLandingPageFromMaster(
        presetService,
        presetLocation,
        { locationObj: selectedLocObj }
      );
      setPage((prev) => ({
        ...prev,
        ...generated,
        status: prev.status || 'draft'
      }));
      setMessage(`Generated customized template for ${presetService} in ${presetLocation}.`);
    }
  }

  function handleTargetLocationChange(e) {
    const val = e.target.value;
    if (val === '_custom') {
      setIsCustomLocationInput(true);
      return;
    }
    setIsCustomLocationInput(false);
    const locObj = locations.find((l) => l.name.toLowerCase() === val.toLowerCase());
    applySelectedLocation(val, locObj);
  }

  function handleCustomLocationNameChange(val) {
    applySelectedLocation(val, { name: val, areaGroup: page.areaGroup || 'Bangalore West' });
  }

  function applySelectedLocation(locationName, locObj) {
    const fallbackObj = BANGALORE_LOCATIONS_PRESET.find((l) => l.name.toLowerCase() === String(locationName || '').toLowerCase()) || {
      name: locationName,
      areaGroup: 'Bangalore West'
    };
    const targetObj = locObj || fallbackObj;

    setPage((prev) => {
      const updatedSlug = slugifyBangalorePage(prev.serviceCategory, locationName);
      return {
        ...prev,
        locationName,
        areaGroup: targetObj.areaGroup || prev.areaGroup || 'Bangalore West',
        slug: prev.slug === slugifyBangalorePage(prev.serviceCategory, prev.locationName) ? updatedSlug : prev.slug,
        proximity: {
          ...prev.proximity,
          locationName,
          areaGroup: targetObj.areaGroup || prev.areaGroup || 'Bangalore West',
          landmark: targetObj.landmark || prev.proximity?.landmark || 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
          travelTime: targetObj.travelTime || prev.proximity?.travelTime || '10-15 mins',
          distanceNote: targetObj.distanceNote || prev.proximity?.distanceNote || `Easily accessible from ${locationName}. Doorstep Porter & express courier delivery available across Bangalore.`,
          nearbyAreas: (targetObj.nearbyAreas?.length ? targetObj.nearbyAreas : null) || prev.proximity?.nearbyAreas || []
        }
      };
    });
    setPresetLocation(locationName);
  }

  function handleSyncLocationToContent() {
    if (
      !window.confirm(
        `Re-apply master template for "${page.serviceCategory}" in "${page.locationName}"? This will refresh location mentions across Headings, FAQs, Proximity, and SEO metadata while preserving current status.`
      )
    ) {
      return;
    }
    const locObj = locations.find((l) => l.name.toLowerCase() === (page.locationName || '').toLowerCase());
    const refreshed = buildLandingPageFromMaster(page.serviceCategory, page.locationName, {
      ...page,
      locationObj: locObj
    });
    setPage((prev) => ({
      ...prev,
      ...refreshed,
      status: prev.status || 'draft'
    }));
    setMessage(`Successfully synchronized template content for "${page.serviceCategory}" in "${page.locationName}".`);
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

  async function handleSave(newStatus) {
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setMessage('');

    const targetStatus = newStatus || page.status || 'draft';
    const payload = {
      ...page,
      status: targetStatus,
      publishedAt: targetStatus === 'published' ? page.publishedAt || new Date().toISOString() : ''
    };

    try {
      if (isEditing) {
        await updateLandingPage(token, id, payload);
        setMessage('Landing page updated successfully!');
      } else {
        const res = await createLandingPage(token, payload);
        setMessage('Landing page created successfully!');
        if (res?.item?.id) {
          navigate(`/admin/landing-pages/edit/${res.item.id}`, { replace: true });
        }
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

            <div className="flex flex-wrap items-center gap-2.5">
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
                className="rounded-xl border border-ink/20 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-linen"
              >
                {saving && page.status === 'draft' ? 'Saving...' : 'Save Draft'}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave('published')}
                className="button-primary py-2 text-xs font-semibold shadow-md"
              >
                {saving && page.status === 'published' ? 'Publishing...' : '🚀 Publish Page'}
              </button>
            </div>
          </div>

          {message ? (
            <div className="mt-4 rounded-2xl border border-cocoa/20 bg-white px-5 py-3 text-sm text-cocoa shadow-card">
              {message}
            </div>
          ) : null}

          {/* 1-Click Smart Preset Generator Toolbar */}
          <div className="mt-6 rounded-2xl border border-cocoa/30 bg-gradient-to-r from-cocoa/10 via-linen to-cocoa/5 p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cocoa">
                  ⚡ 1-Click Smart Content Generator
                </p>
                <p className="text-xs text-stone-600">
                  Select Service & Bangalore Location to instantly generate SEO-optimized content across all 10 sections.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={presetService}
                  onChange={(e) => setPresetService(e.target.value)}
                  className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none"
                >
                  {SERVICE_CATEGORIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select
                  value={presetLocation}
                  onChange={(e) => setPresetLocation(e.target.value)}
                  className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none"
                >
                  {locations.map((loc) => (
                    <option key={loc.id || loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleApplyPreset}
                  className="rounded-xl bg-cocoa px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-cocoa/90 transition"
                >
                  Auto-Generate All 10 Sections
                </button>
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
                <h2 className="font-heading text-xl text-ink">1. Technical SEO & Canonical URL Settings</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Service Category *
                    </label>
                    <select
                      value={page.serviceCategory}
                      onChange={(e) => setPage({ ...page, serviceCategory: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
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
                      onChange={handleTargetLocationChange}
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

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSyncLocationToContent}
                        className="text-xs font-semibold text-cocoa bg-cocoa/10 hover:bg-cocoa/20 px-3 py-1 rounded-lg transition"
                        title="Re-run template placeholders to update Titles, FAQs, Alt tags, and Proximity for this location"
                      >
                        ⚡ Re-apply Template for &quot;{page.locationName || 'Location'}&quot;
                      </button>
                    </div>
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
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
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
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Meta Title (Recommended: 50-60 chars)
                    </label>
                    <span
                      className={`text-xs font-mono ${
                        (page.metaTitle?.length || 0) > 60 ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {page.metaTitle?.length || 0}/60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={page.metaTitle}
                    onChange={(e) => setPage({ ...page, metaTitle: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none focus:border-cocoa"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Meta Description (Recommended: 140-160 chars)
                    </label>
                    <span
                      className={`text-xs font-mono ${
                        (page.metaDescription?.length || 0) > 160 ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {page.metaDescription?.length || 0}/160 chars
                    </span>
                  </div>
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
                      Hero Heading
                    </label>
                    <input
                      type="text"
                      value={page.hero?.heading || ''}
                      onChange={(e) =>
                        setPage({ ...page, hero: { ...page.hero, heading: e.target.value } })
                      }
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

            {/* TAB 4: WHY CHOOSE US */}
            {activeTab === 'why' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">4. Why Choose Shrusara Boutique</h2>

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

            {/* TAB 5: 5-STEP CUSTOMIZATION JOURNEY */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl text-ink">5. 5-Step Customization Journey</h2>
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

            {/* TAB 6: DESIGN GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl text-ink">6. Curated Design Gallery</h2>
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: LOCATION & PROXIMITY */}
            {activeTab === 'proximity' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">7. Location & Proximity Advantage</h2>

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

            {/* TAB 8: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl text-ink">8. Customer Testimonials</h2>
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
                  {(page.testimonials || []).map((testi, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-cocoa">Review #{idx + 1}</span>
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

            {/* TAB 9: FAQS & SCHEMA */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl text-ink">9. Localized FAQs (Auto FAQPage Schema)</h2>
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

                <div className="space-y-3">
                  {(page.faqs || []).map((faq, idx) => (
                    <div key={idx} className="rounded-xl border border-ink/10 bg-linen/50 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-cocoa">Q#{idx + 1}</span>
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

            {/* TAB 10: BOTTOM CTA */}
            {activeTab === 'cta' && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl text-ink">10. Bottom Conversion CTA Banner</h2>

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
