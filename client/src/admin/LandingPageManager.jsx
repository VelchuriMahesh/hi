import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  deleteLandingPage,
  duplicateLandingPage,
  fetchAdminLandingPages,
  fetchBangaloreLocations,
  updateLandingPage
} from '../services/api';
import { BANGALORE_BASE_PATH, SERVICE_CATEGORIES } from '../utils/bangaloreLandingPage';

export default function LandingPageManager() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

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
    const token = getAdminToken();
    try {
      const [pagesRes, locsRes] = await Promise.all([
        fetchAdminLandingPages(token),
        fetchBangaloreLocations().catch(() => ({ items: [] }))
      ]);
      setPages(pagesRes.items || []);
      setLocations(locsRes.items || []);
    } catch (error) {
      setMessage(error.message || 'Failed to load landing pages.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, title) {
    const token = getAdminToken();
    if (!token) return;

    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteLandingPage(token, id);
      setPages((current) => current.filter((p) => p.id !== id));
      setMessage(`Landing page "${title}" deleted successfully.`);
    } catch (error) {
      setMessage(error.message || 'Failed to delete landing page.');
    }
  }

  async function handleDuplicate(id) {
    const token = getAdminToken();
    if (!token) return;

    try {
      const res = await duplicateLandingPage(token, id);
      setMessage(`Landing page duplicated as draft.`);
      await loadData();
      if (res?.item?.id) {
        navigate(`/admin/landing-pages/edit/${res.item.id}`);
      }
    } catch (error) {
      setMessage(error.message || 'Failed to duplicate landing page.');
    }
  }

  async function handleToggleStatus(page) {
    const token = getAdminToken();
    if (!token) return;

    const newStatus = page.status === 'published' ? 'draft' : 'published';
    try {
      await updateLandingPage(token, page.id, {
        ...page,
        status: newStatus,
        publishedAt: newStatus === 'published' ? (page.publishedAt || new Date().toISOString()) : ''
      });
      setPages((current) =>
        current.map((p) => (p.id === page.id ? { ...p, status: newStatus } : p))
      );
      setMessage(`Status updated to ${newStatus}.`);
    } catch (error) {
      setMessage(error.message || 'Failed to update status.');
    }
  }

  // Filtered pages
  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const matchesSearch =
        !searchTerm ||
        [page.title, page.slug, page.locationName, page.serviceCategory]
          .some((val) => String(val || '').toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesService =
        selectedService === 'all' ||
        String(page.serviceCategory || '').toLowerCase() === selectedService.toLowerCase();

      const matchesLocation =
        selectedLocation === 'all' ||
        String(page.locationName || '').toLowerCase() === selectedLocation.toLowerCase();

      const matchesStatus =
        selectedStatus === 'all' || (page.status || 'draft') === selectedStatus;

      return matchesSearch && matchesService && matchesLocation && matchesStatus;
    });
  }, [pages, searchTerm, selectedService, selectedLocation, selectedStatus]);

  // Metrics
  const metrics = useMemo(() => {
    const published = pages.filter((p) => (p.status || 'draft') === 'published').length;
    const drafts = pages.filter((p) => (p.status || 'draft') === 'draft').length;
    const totalViews = pages.reduce((sum, p) => sum + (Number(p.analytics?.views) || 0), 0);
    return {
      total: pages.length,
      published,
      drafts,
      totalViews
    };
  }, [pages]);

  return (
    <>
      <PageMeta
        title="Bangalore Landing Page Manager | Shrusara Admin"
        description="Create and manage localized SEO landing pages for Bangalore."
      />
      <div className="min-h-screen bg-sand px-4 py-8 text-ink sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Bangalore Landing Page CMS (Chapter 3)
              </p>
              <h1 className="mt-1 font-heading text-3xl text-ink">
                Bangalore Landing Pages
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                Create and manage high-converting localized SEO pages across Bangalore with auto-schemas and canonical tags.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/admin/landing-pages/new" className="button-primary text-sm font-semibold">
                + New Landing Page
              </Link>
              <Link to="/admin/locations" className="button-secondary text-sm">
                📍 Manage Locations
              </Link>
              <Link to="/admin/dashboard" className="button-secondary text-sm">
                Dashboard
              </Link>
            </div>
          </div>

          {message ? (
            <div className="mt-4 rounded-2xl border border-cocoa/20 bg-white px-5 py-3 text-sm text-cocoa shadow-card">
              {message}
            </div>
          ) : null}

          {/* Metric Cards */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="luxury-card py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-cocoa">Total Pages</p>
              <p className="mt-2 font-heading text-3xl text-ink">{metrics.total}</p>
            </div>
            <div className="luxury-card py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Published</p>
              <p className="mt-2 font-heading text-3xl text-emerald-700">{metrics.published}</p>
            </div>
            <div className="luxury-card py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Drafts</p>
              <p className="mt-2 font-heading text-3xl text-amber-700">{metrics.drafts}</p>
            </div>
            <div className="luxury-card py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">Total Views</p>
              <p className="mt-2 font-heading text-3xl text-ink">{metrics.totalViews}</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-4 shadow-card">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <input
                  type="text"
                  placeholder="Search title, slug, area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                />
              </div>

              <div>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                >
                  <option value="all">All Service Categories</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                >
                  <option value="all">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.areaGroup || 'Bangalore'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full rounded-xl border border-ink/10 bg-linen px-3 py-2 text-sm text-ink outline-none transition focus:border-cocoa"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Drafts Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Landing Pages Table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-14 animate-pulse rounded-xl bg-ink/5" />
                ))}
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="p-12 text-center">
                <p className="font-heading text-xl text-ink">No Bangalore Landing Pages Found</p>
                <p className="mt-2 text-sm text-stone-500">
                  {pages.length === 0
                    ? 'Get started by creating your first localized landing page!'
                    : 'No pages match your search filters.'}
                </p>
                <Link
                  to="/admin/landing-pages/new"
                  className="button-primary mt-4 inline-block text-sm font-semibold"
                >
                  + Create Landing Page Now
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 bg-linen/50 text-xs font-semibold uppercase tracking-wider text-cocoa">
                      <th className="py-3.5 pl-4 pr-3">Landing Page</th>
                      <th className="py-3.5 px-3">Service Category</th>
                      <th className="py-3.5 px-3">Location</th>
                      <th className="py-3.5 px-3">Status</th>
                      <th className="py-3.5 px-3 text-center">Views</th>
                      <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-ink/[0.02] transition">
                        <td className="py-3.5 pl-4 pr-3">
                          <div className="font-semibold text-ink">{page.title}</div>
                          <div className="font-mono text-xs text-cocoa/80">
                            {BANGALORE_BASE_PATH}/{page.slug}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex rounded-md bg-cocoa/10 px-2.5 py-1 text-xs font-medium text-cocoa">
                            {page.serviceCategory || 'Bridal Blouse'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-medium text-ink">{page.locationName || 'Bangalore'}</div>
                          <div className="text-xs text-stone-500">{page.areaGroup || 'Bangalore'}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(page)}
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                              page.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                          >
                            {page.status === 'published' ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono text-xs text-stone-600">
                          {page.analytics?.views || 0}
                        </td>
                        <td className="py-3.5 pl-3 pr-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/bangalore/${page.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-ink/10 px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-linen"
                            >
                              Live ↗
                            </a>
                            <Link
                              to={`/admin/landing-pages/edit/${page.id}`}
                              className="rounded-lg bg-cocoa px-2.5 py-1 text-xs font-semibold text-white hover:bg-cocoa/90"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDuplicate(page.id)}
                              className="text-xs text-stone-600 hover:text-ink hover:underline"
                            >
                              Copy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(page.id, page.title)}
                              className="text-xs text-red-600 hover:text-red-800 hover:underline"
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
    </>
  );
}
