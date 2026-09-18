import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  deleteBangaloreLocation,
  fetchBangaloreLocations,
  saveBangaloreLocation
} from '../services/api';
import { BANGALORE_LOCATIONS_PRESET } from '../utils/bangaloreLandingPage';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingLoc, setEditingLoc] = useState(null);

  const [form, setForm] = useState({
    name: '',
    areaGroup: 'Bangalore West',
    displayOrder: 1,
    status: 'active',
    travelTime: '',
    landmark: '',
    distanceNote: '',
    nearbyAreas: ''
  });

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }
    loadLocations();
  }, [navigate]);

  async function loadLocations() {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetchBangaloreLocations();
      setLocations(response.items || []);
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
      areaGroup: loc.areaGroup || 'Bangalore West',
      displayOrder: loc.displayOrder || 1,
      status: loc.status || 'active',
      travelTime: loc.travelTime || '',
      landmark: loc.landmark || '',
      distanceNote: loc.distanceNote || '',
      nearbyAreas: Array.isArray(loc.nearbyAreas) ? loc.nearbyAreas.join(', ') : loc.nearbyAreas || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingLoc(null);
    setForm({
      name: '',
      areaGroup: 'Bangalore West',
      displayOrder: locations.length + 1,
      status: 'active',
      travelTime: '',
      landmark: '',
      distanceNote: '',
      nearbyAreas: ''
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
      setMessage(editingLoc ? 'Location updated successfully.' : 'Location added successfully.');
      handleCancelEdit();
      await loadLocations();
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
      await loadLocations();
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
      await loadLocations();
    } catch (error) {
      setMessage(error.message || 'Failed to update status.');
    }
  }

  async function handleSeedDefaults() {
    const token = getAdminToken();
    if (!token) return;

    if (!window.confirm('Reset/Seed 16 default Bangalore locations?')) {
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
      await loadLocations();
    } catch (error) {
      setMessage(error.message || 'Failed to seed locations.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Bangalore Location Manager | Shrusara Admin"
        description="Manage Bangalore localities and zones for landing pages."
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
                Bangalore Location Manager
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                Manage target localities across Bangalore for automated SEO landing pages.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/admin/landing-pages" className="button-secondary text-sm">
                ← Back to Landing Pages
              </Link>
              <Link to="/admin/dashboard" className="button-secondary text-sm">
                Admin Dashboard
              </Link>
            </div>
          </div>

          {message ? (
            <div className="mt-4 rounded-2xl border border-cocoa/20 bg-white px-5 py-3 text-sm text-cocoa shadow-card">
              {message}
            </div>
          ) : null}

          <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
            {/* Form */}
            <div className="luxury-card h-fit">
              <h2 className="font-heading text-2xl text-ink">
                {editingLoc ? 'Edit Location' : 'Add Bangalore Location'}
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                Locations appear in the Landing Page CMS dropdown selector.
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

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Landmark / Route Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Mahalakshmi Metro / 5 mins via Chord Road"
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
                    placeholder="e.g. 5-10 mins, 20 mins via Metro"
                    value={form.travelTime}
                    onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Distance / Connectivity Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 5-10 minutes from Rajajinagar 1st Block & Metro Station. Doorstep pickup available."
                    value={form.distanceNote}
                    onChange={(e) => setForm({ ...form, distanceNote: e.target.value })}
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
                    className="button-primary flex-1 py-2 text-sm font-semibold"
                  >
                    {saving ? 'Saving...' : editingLoc ? 'Update Location' : 'Add Location'}
                  </button>
                  {editingLoc ? (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="button-secondary py-2 text-sm"
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
                    All Locations ({locations.length})
                  </h2>
                  <p className="text-xs text-stone-600">
                    Active locations are accessible when generating new landing pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={saving}
                  className="button-secondary text-xs"
                >
                  ⚡ Reset 16 Bangalore Defaults
                </button>
              </div>

              {loading ? (
                <div className="mt-6 space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 animate-pulse rounded-xl bg-ink/5" />
                  ))}
                </div>
              ) : locations.length === 0 ? (
                <div className="mt-8 text-center text-sm text-stone-500">
                  No locations found. Click &quot;Reset 16 Bangalore Defaults&quot; to seed initial locations.
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wider text-cocoa">
                        <th className="pb-3 pr-2">#</th>
                        <th className="pb-3 pr-4">Location & Details</th>
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
    </>
  );
}
