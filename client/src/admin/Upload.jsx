import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { getAdminToken } from '../components/ProtectedRoute';
import {
  fetchHeroMedia,
  saveHeroMedia,
  uploadHeroVideo,
  uploadTestimonialVideo,
  fetchVideos,
  createVideo,
  deleteVideo
} from '../services/cms';
import { fetchGallery, uploadGalleryItem, deleteGalleryItem } from '../services/api';
import { heroContent } from '../data/content';

const emptyImageForm = {
  category: 'home',
  title: '',
  alt: '',
  description: '',
  image: null
};

export default function Upload() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyImageForm);
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [heroForm, setHeroForm] = useState({
    page: 'home',
    videoUrl: '',
    imageUrl: '',
    videoFile: null
  });
  const [heroSaving, setHeroSaving] = useState(false);
  const [heroMessage, setHeroMessage] = useState('');
  const [currentHero, setCurrentHero] = useState(null);

  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoType: 'youtube',
    youtubeUrl: '',
    videoFile: null,
    page: 'about'
  });
  const [videoSaving, setVideoSaving] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    loadGallery('home');
    loadHeroMedia('home');
    loadVideos('about');
  }, [navigate]);

  async function loadVideos(page) {
    try {
      const response = await fetchVideos();
      const filtered = (response.items || []).filter(
        (item) => String(item.page || item.section || 'about').trim().toLowerCase() === page
      );
      setVideos(filtered);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  useEffect(() => {
    loadGallery(form.category);
  }, [form.category]);

  useEffect(() => {
    loadHeroMedia(heroForm.page);
  }, [heroForm.page]);

  async function loadGallery(category) {
    try {
      const response = await fetchGallery(category);
      setImages(response.items || []);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = getAdminToken();

    if (!token || !form.image) {
      setMessage('Choose an image and sign in again if needed.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const payload = new FormData();
      payload.append('category', form.category);
      payload.append('title', form.title);
      payload.append('alt', form.alt);
      payload.append('image', form.image);

      const response = await uploadGalleryItem(token, payload);

      setMessage('Image uploaded successfully.');
      setForm((current) => ({ ...emptyImageForm, category: current.category }));
      setPreview('');
      await loadGallery(form.category);
      localStorage.setItem('gallery-updated', String(Date.now()));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteImage(id) {
    const token = getAdminToken();

    if (!token || !window.confirm('Delete this image from the gallery?')) {
      return;
    }

    try {
      await deleteGalleryItem(token, id);
      setImages((current) => current.filter((item) => item.id !== id));
      setMessage('Image deleted successfully.');
      localStorage.setItem('gallery-updated', String(Date.now()));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function loadHeroMedia(page) {
    try {
      const media = await fetchHeroMedia(page);
      setCurrentHero(media);
      setHeroForm((current) => ({
        ...current,
        page,
        videoUrl: media?.videoUrl || '',
        imageUrl: media?.imageUrl || '',
        videoFile: null
      }));
    } catch {
      setCurrentHero(null);
      setHeroForm((current) => ({
        ...current,
        page,
        videoUrl: '',
        imageUrl: '',
        videoFile: null
      }));
    }
  }

  async function handleHeroSubmit(event) {
    event.preventDefault();
    setHeroSaving(true);
    setHeroMessage('');

    try {
      let videoUrl = heroForm.videoUrl;

      if (heroForm.videoFile) {
        videoUrl = await uploadHeroVideo(heroForm.videoFile, heroForm.page);
      }

      await saveHeroMedia(heroForm.page, {
        videoUrl,
        imageUrl: heroForm.imageUrl || heroContent[heroForm.page]?.image || ''
      });

      setHeroMessage('Hero media saved successfully.');
      await loadHeroMedia(heroForm.page);
      localStorage.setItem('hero-updated', String(Date.now()));
      // Notify same-tab listeners too
      try {
        window.dispatchEvent(new Event('hero-updated'));
      } catch (err) {
        // ignore
      }
    } catch (error) {
      setHeroMessage(error.message);
    } finally {
      setHeroSaving(false);
    }
  }

  async function handleCreateVideo(event) {
    event.preventDefault();
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    setVideoSaving(true);
    setVideoMessage('');

    try {
      let url = '';
      let youtubeUrl = '';

      if (videoForm.videoType === 'file' && videoForm.videoFile) {
        url = await uploadTestimonialVideo(videoForm.videoFile);
      } else if (videoForm.videoType === 'youtube' && videoForm.youtubeUrl) {
        url = videoForm.youtubeUrl;
        youtubeUrl = videoForm.youtubeUrl;
      } else {
        throw new Error('Please select a video file or provide a YouTube URL.');
      }

      await createVideo(token, {
        title: videoForm.title,
        description: videoForm.description,
        page: videoForm.page,
        section: videoForm.page,
        url,
        youtubeUrl
      });

      setVideoForm({
        title: '',
        description: '',
        videoType: 'youtube',
        youtubeUrl: '',
        videoFile: null,
        page: 'about'
      });
      setVideoMessage('Testimonial video saved successfully.');
      await loadVideos(videoForm.page);
    } catch (error) {
      setVideoMessage(error.message);
    } finally {
      setVideoSaving(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Upload Images | Shrusara Fashion Boutique"
        description="Admin image upload page."
        canonicalPath="/admin/upload"
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-linen pb-12">
        <div className="section-shell py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Gallery Upload
              </p>
              <h1 className="mt-2 font-heading text-4xl text-ink">Upload boutique images</h1>
            </div>
            <Link className="button-secondary" to="/admin/dashboard">
              Back to dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="luxury-card">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Category</span>
                  <select
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={form.category}
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
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, title: event.target.value }))
                    }
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Alt text</span>
                  <input
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={form.alt}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, alt: event.target.value }))
                    }
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Description</span>
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, description: event.target.value }))
                    }
                    placeholder="Short description used in the product modal and WhatsApp message."
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Image file</span>
                  <input
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      setForm((current) => ({ ...current, image: file }));
                      setPreview(file ? URL.createObjectURL(file) : '');
                    }}
                    required
                  />
                </label>

                {preview ? (
                  <div className="overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-card">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  </div>
                ) : null}

                {message ? (
                  <div className="rounded-[20px] border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa">
                    {message}
                  </div>
                ) : null}

                <button className="button-primary" type="submit" disabled={submitting}>
                  {submitting ? 'Uploading...' : 'Upload image'}
                </button>
              </form>
            </section>

            <section className="luxury-card">
              <h2 className="font-heading text-3xl text-ink">Recent images in {form.category}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {images.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-card"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={item.thumbUrl || item.url}
                        alt={item.alt || item.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-sm font-medium text-ink">{item.title || item.alt}</p>
                      <p className="text-sm leading-6 text-stone-500">
                        {item.description || 'No description yet.'}
                      </p>
                      <div className="flex items-center gap-3">
                        <Link className="text-sm font-semibold text-cocoa" to={`/admin/edit/image/${item.id}`}>
                          Edit image
                        </Link>
                        <button
                          className="text-sm font-semibold text-red-600 hover:text-red-800"
                          type="button"
                          onClick={() => handleDeleteImage(item.id)}
                        >
                          Delete image
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

        </div>
      </main>
    </>
  );
}
