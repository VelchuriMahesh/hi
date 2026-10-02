import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  batchGenerateLandingPages,
  deleteBangaloreLocation,
  fetchBangaloreLocations,
  fetchMasterTemplates,
  saveBangaloreLocation
} from '../services/api';
import { BANGALORE_LOCATIONS_PRESET, SERVICE_CATEGORIES } from '../utils/bangaloreLandingPage';

const AREA_GROUPS = [
  'Bangalore West',
  'Bangalore North',
  'Bangalore East',
  'Bangalore South',
  'Bangalore Central'
];

export default function LocationManager() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [masterServices, setMasterServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingLoc, setEditingLoc] = useState(null);

  // Form State for Location
  const [form, setForm] = useState({
    name: '',
    slug: '',
    areaGroup: 'Bangalore West',
    displayOrder: 1,
    status: 'active',
    seoTitle: '',
    metaDescription: '',
    travelTime: '',
    landmark: '',
    distanceNote: '',
    googleMapsUrl: '',
    nearbyAreas: '',
    isMainBoutique: false
  });

  // Batch Generation Modal State
  const [showGenModal, setShowGenModal] = useState(false);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [genStatus, setGenStatus] = useState('published');
  const [genOverwrite, setGenOverwrite] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }
    loadData();
  }, [navigate]);

  async function loadData() {
    setLoading(true);
    setMessage('');
    try {
      const [locRes, masterRes] = await Promise.all([
        fetchBangaloreLocations().catch(() => ({ items: [] })),
        fetchMasterTemplates().catch(() => ({ items: [] }))
      ]);

      const locItems = locRes.items || [];
      setLocations(locItems);

      const masters = masterRes.items?.length
        ? masterRes.items.map((m) => ({ id: m.id, name: m.serviceName || m.id }))
        : SERVICE_CATEGORIES.map((s) => ({ id: s.id, name: s.label }));
      setMasterServices(masters);

      // Select all by default for batch gen
      setSelectedLocationIds(locItems.map((l) => l.name));
      setSelectedServiceIds(masters.map((m) => m.id));
    } catch (error) {
      setMessage(error.message || 'Failed to load locations');
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(loc) {
    setEditingLoc(loc);
    setForm({
      id: loc.id,
      name: loc.name || '',
      slug: loc.slug || '',
      areaGroup: loc.areaGroup || 'Bangalore West',
      displayOrder: loc.displayOrder || 1,
      status: loc.status || 'active',
      seoTitle: loc.seoTitle || '',
      metaDescription: loc.metaDescription || '',
      travelTime: loc.travelTime || '',
      landmark: loc.landmark || '',
      distanceNote: loc.distanceNote || '',
      googleMapsUrl: loc.googleMapsUrl || '',
      nearbyAreas: Array.isArray(loc.nearbyAreas) ? loc.nearbyAreas.join(', ') : loc.nearbyAreas || '',
      isMainBoutique: Boolean(loc.isMainBoutique)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingLoc(null);
    setForm({
      name: '',
      slug: '',
      areaGroup: 'Bangalore West',
      displayOrder: locations.length + 1,
      status: 'active',
      seoTitle: '',
      metaDescription: '',
      travelTime: '',
      landmark: '',
      distanceNote: '',
      googleMapsUrl: '',
      nearbyAreas: '',
      isMainBoutique: false
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;

    if (!form.name.trim()) {
      setMessage('Location name is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    const nearbyArray = typeof form.nearbyAreas === 'string'
      ? form.nearbyAreas.split(',').map((s) => s.trim()).filter(Boolean)
      : Array.isArray(form.nearbyAreas)
      ? form.nearbyAreas
      : [];

    try {
      await saveBangaloreLocation(token, {
        ...form,
        displayOrder: Number(form.displayOrder) || 1,
        nearbyAreas: nearbyArray
      });
      setMessage(editingLoc ? `Location "${form.name}" updated successfully.` : `Location "${form.name}" added successfully.`);
      handleCancelEdit();
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to save location.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    const token = getAdminToken();
    if (!token) return;

    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteBangaloreLocation(token, id);
      setMessage(`Location "${name}" deleted.`);
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to delete location.');
    }
  }

  async function handleToggleStatus(loc) {
    const token = getAdminToken();
    if (!token) return;

    const newStatus = loc.status === 'active' ? 'inactive' : 'active';
    try {
      await saveBangaloreLocation(token, {
        ...loc,
        status: newStatus
      });
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to update status.');
    }
  }

  async function handleSeedDefaults() {
    const token = getAdminToken();
    if (!token) return;

    if (!window.confirm('Reset/Seed 16 default Bangalore locations? Existing edits will be preserved or merged.')) {
      return;
    }

    setSaving(true);
    try {
      for (const preset of BANGALORE_LOCATIONS_PRESET) {
        await saveBangaloreLocation(token, {
          ...preset,
          status: 'active'
        });
      }
      setMessage('16 default Bangalore locations seeded successfully!');
      await loadData();
    } catch (error) {
      setMessage(error.message || 'Failed to seed locations.');
    } finally {
      setSaving(false);
    }
  }

  // Batch Generation Handlers
  function toggleSelectAllLocations() {
    if (selectedLocationIds.length === locations.length) {
      setSelectedLocationIds([]);
    } else {
      setSelectedLocationIds(locations.map((l) => l.name));
    }
  }

  function toggleLocationSelect(locName) {
    if (selectedLocationIds.includes(locName)) {
      setSelectedLocationIds(selectedLocationIds.filter((n) => n !== locName));
    } else {
      setSelectedLocationIds([...selectedLocationIds, locName]);
    }
  }

  function toggleSelectAllServices() {
    if (selectedServiceIds.length === masterServices.length) {
      setSelectedServiceIds([]);
    } else {
      setSelectedServiceIds(masterServices.map((m) => m.id));
    }
  }

  function toggleServiceSelect(srvId) {
    if (selectedServiceIds.includes(srvId)) {
      setSelectedServiceIds(selectedServiceIds.filter((id) => id !== srvId));
    } else {
      setSelectedServiceIds([...selectedServiceIds, srvId]);
    }
  }

  async function handleExecuteBatchGeneration() {
    const token = getAdminToken();
    if (!token) return;

    if (selectedLocationIds.length === 0) {
      alert('Please select at least one Bangalore location.');
      return;
    }
    if (selectedServiceIds.length === 0) {
      alert('Please select at least one Service Master Template.');
      return;
    }

    setGenerating(true);
    setGenResult(null);

    try {
      const res = await batchGenerateLandingPages(token, {
        serviceCategories: selectedServiceIds,
        locationNames: selectedLocationIds,
        status: genStatus,
        overwriteExisting: genOverwrite
      });

      setGenResult(res);
      setMessage(`🎉 Batch generation complete! ${res.count || (res.items?.length || 0)} landing pages generated/updated.`);
    } catch (error) {
      alert(error.message || 'Batch generation failed.');
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Bangalore Location Manager | Shrusara Admin"
        description="Manage Bangalore localities and batch-generate SEO landing pages."
      />
      <div className="min-h-screen bg-sand px-4 py-8 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Bangalore Landing Page CMS
              </p>
              <h1 className="mt-1 font-heading text-3xl text-ink">
                Bangalore Location Directory
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                Manage target localities across Bangalore &amp; generate service landing pages.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setGenResult(null);
                  setShowGenModal(true);
                }}
                className="button-primary text-sm font-semibold flex items-center gap-1.5"
              >
                <span>⚡ Batch Generate Landing Pages</span>
              </button>
              <Link to="/admin/landing-pages" className="button-secondary text-sm">
                ← Landing Pages
              </Link>
              <Link to="/admin/master-templates" className="button-secondary text-sm">
                Master Templates
              </Link>
            </div>
          </div>

          {message ? (
            <div className="mt-4 rounded-2xl border border-cocoa/20 bg-white px-5 py-3 text-sm text-cocoa shadow-card flex items-center justify-between">
              <span>{message}</span>
              <button
                type="button"
                onClick={() => setMessage('')}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          ) : null}

          <div className="mt-8 grid gap-8 lg:grid-cols-[400px_1fr]">
            {/* Location Form */}
            <div className="luxury-card h-fit">
              <h2 className="font-heading text-2xl text-ink">
                {editingLoc ? 'Edit Location' : 'Add Bangalore Location'}
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                Location data is automatically merged into Service Master Templates.
              </p>

              <form onSubmit={handleSave} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Location Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajajinagar, Whitefield"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Area Zone
                    </label>
                    <select
                      value={form.areaGroup}
                      onChange={(e) => setForm({ ...form, areaGroup: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                    >
                      {AREA_GROUPS.map((grp) => (
                        <option key={grp} value={grp}>
                          {grp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                    >
                      <option value="active">Active (Published)</option>
                      <option value="inactive">Inactive (Draft)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.displayOrder}
                      onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                      <input
                        type="checkbox"
                        checked={form.isMainBoutique}
                        onChange={(e) => setForm({ ...form, isMainBoutique: e.target.checked })}
                        className="rounded border-stone-300 text-cocoa focus:ring-cocoa"
                      />
                      ★ Main Boutique Hub
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Proximity / Distance Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Our Mahalakshmipuram boutique is just 5-10 minutes from Rajajinagar. Visit us for fitting & measurements."
                    value={form.distanceNote}
                    onChange={(e) => setForm({ ...form, distanceNote: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                  <p className="mt-0.5 text-[11px] text-stone-500">
                    Boutique physical location remains Mahalakshmipuram. Supports <code>{'{Location}'}</code>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Landmark / Route Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Mahalakshmi Metro Station / 5 mins via Chord Road"
                    value={form.landmark}
                    onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Travel Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5-10 mins drive, 15 mins via Metro"
                    value={form.travelTime}
                    onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={form.googleMapsUrl}
                    onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Nearby Localities (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajajinagar, Malleshwaram, Basaveshwaranagar"
                    value={form.nearbyAreas}
                    onChange={(e) => setForm({ ...form, nearbyAreas: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="button-primary flex-1 py-2.5 text-sm font-semibold"
                  >
                    {saving ? 'Saving...' : editingLoc ? 'Update Location' : 'Add Location'}
                  </button>
                  {editingLoc ? (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="button-secondary py-2.5 text-sm"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>
            </div>

            {/* Locations Table */}
            <div className="luxury-card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-2xl text-ink">
                    Bangalore Locations ({locations.length})
                  </h2>
                  <p className="text-xs text-stone-600">
                    Active locations are used for page generation and location directory links.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSeedDefaults}
                    disabled={saving}
                    className="button-secondary text-xs"
                  >
                    ⚡ Seed 16 Defaults
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="mt-6 space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 animate-pulse rounded-xl bg-ink/5" />
                  ))}
                </div>
              ) : locations.length === 0 ? (
                <div className="mt-8 text-center text-sm text-stone-500">
                  No locations found. Click &quot;Seed 16 Defaults&quot; to seed initial Bangalore locations.
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wider text-cocoa">
                        <th className="pb-3 pr-2">#</th>
                        <th className="pb-3 pr-4">Location &amp; Details</th>
                        <th className="pb-3 pr-4">Zone</th>
                        <th className="pb-3 pr-4">Nearby Localities</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {locations.map((loc) => (
                        <tr key={loc.id || loc.name} className="hover:bg-ink/[0.02]">
                          <td className="py-3 pr-2 font-mono text-xs text-stone-400">
                            {loc.displayOrder || 1}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-1.5 font-semibold text-ink">
                              <span>{loc.name}</span>
                              {loc.isMainBoutique && (
                                <span className="rounded bg-cocoa/10 px-1.5 py-0.5 text-[10px] font-bold text-cocoa">
                                  ★ Boutique Hub
                                </span>
                              )}
                            </div>
                            {loc.landmark ? (
                              <div className="text-xs text-stone-600">
                                📍 {loc.landmark}
                              </div>
                            ) : null}
                            {loc.travelTime ? (
                              <div className="text-xs text-stone-500">
                                ⏱ {loc.travelTime}
                              </div>
                            ) : null}
                            {loc.distanceNote ? (
                              <div className="line-clamp-1 text-[11px] text-stone-400">
                                {loc.distanceNote}
                              </div>
                            ) : null}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="rounded-md bg-ink/5 px-2 py-1 text-xs font-medium text-stone-700 whitespace-nowrap">
                              {loc.areaGroup || 'Bangalore'}
                            </span>
                          </td>
                          <td className="py-3 pr-4 max-w-[200px]">
                            {Array.isArray(loc.nearbyAreas) && loc.nearbyAreas.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {loc.nearbyAreas.slice(0, 3).map((area, aIdx) => (
                                  <span key={aIdx} className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-600">
                                    {area}
                                  </span>
                                ))}
                                {loc.nearbyAreas.length > 3 && (
                                  <span className="text-[10px] text-stone-400">
                                    +{loc.nearbyAreas.length - 3} more
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-stone-400">—</span>
                            )}
                          </td>
                          <td className="py-3 pr-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(loc)}
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
                                loc.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                              }`}
                            >
                              {loc.status === 'active' ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="py-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditClick(loc)}
                                className="text-xs font-semibold text-cocoa hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(loc.id || loc.name, loc.name)}
                                className="text-xs font-semibold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Batch Generation Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="luxury-card my-8 w-full max-w-3xl bg-sand p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <h3 className="font-heading text-2xl text-ink">
                  ⚡ Batch Generate Location Pages
                </h3>
                <p className="text-xs text-stone-600">
                  Select Bangalore locations and Service Master Templates to generate SEO landing pages automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGenModal(false)}
                className="rounded-full p-2 text-stone-400 hover:bg-ink/5 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Select Locations */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa">
                    1. Target Bangalore Locations ({selectedLocationIds.length} of {locations.length} selected)
                  </label>
                  <button
                    type="button"
                    onClick={toggleSelectAllLocations}
                    className="text-xs font-semibold text-cocoa hover:underline"
                  >
                    {selectedLocationIds.length === locations.length ? 'Deselect All' : 'Select All Locations'}
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 max-h-48 overflow-y-auto border border-ink/10 rounded-xl bg-white p-3">
                  {locations.map((loc) => {
                    const isSel = selectedLocationIds.includes(loc.name);
                    return (
                      <label
                        key={loc.id || loc.name}
                        className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg text-xs font-medium transition ${
                          isSel ? 'bg-cocoa/10 text-cocoa font-bold' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleLocationSelect(loc.name)}
                          className="rounded border-stone-300 text-cocoa focus:ring-cocoa"
                        />
                        <span className="truncate">{loc.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Select Master Services */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa">
                    2. Target Master Services ({selectedServiceIds.length} of {masterServices.length} selected)
                  </label>
                  <button
                    type="button"
                    onClick={toggleSelectAllServices}
                    className="text-xs font-semibold text-cocoa hover:underline"
                  >
                    {selectedServiceIds.length === masterServices.length ? 'Deselect All' : 'Select All Services'}
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 max-h-48 overflow-y-auto border border-ink/10 rounded-xl bg-white p-3">
                  {masterServices.map((srv) => {
                    const isSel = selectedServiceIds.includes(srv.id);
                    return (
                      <label
                        key={srv.id}
                        className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg text-xs font-medium transition ${
                          isSel ? 'bg-cocoa/10 text-cocoa font-bold' : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleServiceSelect(srv.id)}
                          className="rounded border-stone-300 text-cocoa focus:ring-cocoa"
                        />
                        <span className="truncate">{srv.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Generation Settings */}
              <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Publish Status
                  </label>
                  <select
                    value={genStatus}
                    onChange={(e) => setGenStatus(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none"
                  >
                    <option value="published">Published (Live immediately)</option>
                    <option value="draft">Draft (Save for review)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                    <input
                      type="checkbox"
                      checked={genOverwrite}
                      onChange={(e) => setGenOverwrite(e.target.checked)}
                      className="rounded border-stone-300 text-cocoa focus:ring-cocoa"
                    />
                    Update/Overwrite existing pages with latest Master Template content
                  </label>
                </div>
              </div>

              {/* Results summary */}
              {genResult && (
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900 space-y-2">
                  <div className="font-bold text-sm">
                    ✅ Generated/Updated {genResult.count || genResult.items?.length || 0} Pages Successfully!
                  </div>
                  {genResult.skippedCount ? (
                    <p>Skipped {genResult.skippedCount} existing pages (overwrite turned off).</p>
                  ) : null}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowGenModal(false);
                        navigate('/admin/landing-pages');
                      }}
                      className="button-primary py-1.5 px-3 text-xs"
                    >
                      View Generated Landing Pages →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
              <button
                type="button"
                onClick={() => setShowGenModal(false)}
                className="button-secondary text-sm"
              >
                Close
              </button>
              <button
                type="button"
                disabled={generating}
                onClick={handleExecuteBatchGeneration}
                className="button-primary text-sm font-semibold"
              >
                {generating
                  ? 'Generating Pages...'
                  : `Generate ${selectedLocationIds.length * selectedServiceIds.length} Landing Pages ⚡`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
