import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import { fetchPosts, updatePost } from '../services/api';
import {
  fetchGalleryDocuments,
  fetchVideos,
  updateGalleryDocument,
  updateVideo
} from '../services/cms';
import { uploadImageToImgbb } from '../services/uploaders';

function typeCopy(type) {
  switch (type) {
    case 'image':
      return {
        title: 'Edit gallery image',
        description: 'Update the gallery category, title, alt text, and modal description.'
      };
    case 'blog':
      return {
        title: 'Edit blog post',
        description: 'Update the blog copy and replace the featured image if needed.'
      };
    case 'video':
      return {
        title: 'Edit testimonial video',
        description: 'Update the YouTube link and the text shown on the About page.'
      };
    default:
      return {
        title: 'Edit content',
        description: 'Update boutique content from the admin panel.'
      };
  }
}

export default function Edit() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const copy = typeCopy(type);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    loadItem();
  }, [id, navigate, type]);

  async function loadItem() {
    setLoading(true);
    setMessage('');

    try {
      if (type === 'image') {
        const item = (await fetchGalleryDocuments()).find((entry) => entry.id === id);

        if (!item) {
          throw new Error('Image not found.');
        }

        setForm({
          category: item.category || 'home',
          title: item.title || '',
          alt: item.alt || '',
          description: item.description || '',
          previewUrl: item.thumbUrl || item.url
        });
      } else if (type === 'blog') {
        const response = await fetchPosts();
        const item = (response.items || []).find((entry) => entry.id === id);

        if (!item) {
          throw new Error('Blog post not found.');
        }

        setForm({
          title: item.title || '',
          excerpt: item.excerpt || '',
          content: item.content || '',
          coverImage: item.coverImage || ''
        });
      } else if (type === 'video') {
        const item = (await fetchVideos()).find((entry) => entry.id === id);

        if (!item) {
          throw new Error('Video not found.');
        }

        setForm({
          title: item.title || '',
          description: item.description || '',
          youtubeUrl: item.youtubeUrl || item.url || '',
          page: item.page || item.section || 'about'
        });
      } else {
        throw new Error('Unsupported edit type.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      if (type === 'image') {
        await updateGalleryDocument(id, {
          category: form.category,
          title: form.title,
          alt: form.alt,
          description: form.description
        });
      } else if (type === 'blog') {
        await updatePost(token, id, {
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          coverImage: form.coverImage
        });
      } else if (type === 'video') {
        await updateVideo(token, id, {
          title: form.title,
          description: form.description,
          youtubeUrl: form.youtubeUrl,
          url: form.youtubeUrl,
          page: form.page,
          section: form.page
        });
      }

      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleBlogImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingImage(true);
    setMessage('');

    try {
      const upload = await uploadImageToImgbb(file);
      const imageUrl = upload.url || upload.thumbUrl;

      if (!imageUrl) {
        throw new Error('Unable to upload image.');
      }

      setForm((current) => ({ ...current, coverImage: imageUrl }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <>
      <PageMeta
        title={`${copy.title} | Shrusara Admin`}
        description={copy.description}
        canonicalPath={`/admin/edit/${type}/${id}`}
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-linen pb-12">
        <div className="section-shell py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Admin Edit
              </p>
              <h1 className="mt-2 font-heading text-4xl text-ink">{copy.title}</h1>
              <p className="mt-2 text-sm text-stone-600">{copy.description}</p>
            </div>
            <Link className="button-secondary" to="/admin/dashboard">
              Back to dashboard
            </Link>
          </div>

          {message ? (
            <div className="mt-4 rounded-[24px] border border-cocoa/20 bg-white px-5 py-4 text-sm text-cocoa shadow-card">
              {message}
            </div>
          ) : null}

          <section className="mt-8 luxury-card">
            {loading ? (
              <div className="space-y-4">
                <div className="skeleton h-12 w-1/2 animate-shimmer" />
                <div className="skeleton h-64 w-full animate-shimmer" />
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {type === 'image' ? (
                  <>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Category</span>
                      <select
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.category || 'home'}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, category: event.target.value }))
                        }
                      >
                        <option value="home">Home</option>
                        <option value="bridal">Bridal</option>
                        <option value="designer">Designer</option>
                        <option value="kids">Kids</option>
                      </select>
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Title</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.title || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, title: event.target.value }))
                        }
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Alt text</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.alt || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, alt: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Description</span>
                      <textarea
                        className="min-h-28 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.description || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, description: event.target.value }))
                        }
                      />
                    </label>
                    {form.previewUrl ? (
                      <div className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-card">
                        <div className="aspect-[4/5] overflow-hidden">
                          <img
                            src={form.previewUrl}
                            alt={form.alt || form.title || 'Gallery preview'}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {type === 'blog' ? (
                  <>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Title</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.title || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, title: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Excerpt</span>
                      <textarea
                        className="min-h-24 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.excerpt || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, excerpt: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Content</span>
                      <textarea
                        className="min-h-40 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.content || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, content: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Replace featured image</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        type="file"
                        accept="image/*"
                        onChange={handleBlogImageUpload}
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Featured image URL</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.coverImage || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, coverImage: event.target.value }))
                        }
                      />
                    </label>
                    {uploadingImage ? (
                      <p className="text-sm font-medium text-cocoa">Uploading image...</p>
                    ) : null}
                    {form.coverImage ? (
                      <div className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-card">
                        <img
                          src={form.coverImage}
                          alt={form.title || 'Blog cover preview'}
                          className="h-56 w-full object-cover"
                        />
                      </div>
                    ) : null}
                  </>
                ) : null}

                {type === 'video' ? (
                  <>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Title</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.title || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, title: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Description</span>
                      <textarea
                        className="min-h-28 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.description || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, description: event.target.value }))
                        }
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">YouTube URL</span>
                      <input
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.youtubeUrl || ''}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, youtubeUrl: event.target.value }))
                        }
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-stone-700">Page</span>
                      <select
                        className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                        value={form.page || 'about'}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, page: event.target.value }))
                        }
                      >
                        <option value="about">About</option>
                      </select>
                    </label>
                  </>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <button className="button-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                  <Link className="button-secondary" to="/admin/dashboard">
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
