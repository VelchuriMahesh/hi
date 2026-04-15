import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import { ADMIN_TOKEN_KEY, getAdminToken } from '../components/ProtectedRoute';
import { createPost, deleteGalleryItem, deletePost } from '../services/api';
import {
  createVideo,
  deleteVideo,
  fetchBlogDocuments,
  fetchGalleryDocuments,
  fetchVideos,
  uploadTestimonialVideo
} from '../services/cms';
import { uploadImageToImgbb } from '../services/uploaders';

const emptyPostForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: ''
};

const emptyVideoForm = {
  title: '',
  description: '',
  videoType: 'youtube', // 'youtube' or 'file'
  youtubeUrl: '',
  videoFile: null,
  page: 'about'
};

function sortByCreatedAt(items) {
  return [...items].sort((left, right) => {
    const leftValue = left.createdAt?.seconds
      ? left.createdAt.seconds * 1000
      : new Date(left.createdAt || left.publishedAt || 0).getTime();
    const rightValue = right.createdAt?.seconds
      ? right.createdAt.seconds * 1000
      : new Date(right.createdAt || right.publishedAt || 0).getTime();

    return rightValue - leftValue;
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  const [savingVideo, setSavingVideo] = useState(false);
  const [postForm, setPostForm] = useState(emptyPostForm);
  const [videoForm, setVideoForm] = useState(emptyVideoForm);
  const [postImageUploading, setPostImageUploading] = useState(false);
  const [postImageMessage, setPostImageMessage] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    loadDashboard();
  }, [navigate]);

  async function loadDashboard() {
    setLoading(true);
    setMessage('');

    try {
      const [galleryItems, postItems, videoItems] = await Promise.all([
        fetchGalleryDocuments(),
        fetchBlogDocuments(),
        fetchVideos()
      ]);

      setGallery(sortByCreatedAt(galleryItems));
      setPosts(sortByCreatedAt(postItems));
      setVideos(sortByCreatedAt(videoItems));
      setCurrentPostIndex(0);
      setCurrentVideoIndex(0);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    navigate('/admin', { replace: true });
  }

  async function handleCreatePost(event) {
    event.preventDefault();
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    setSavingPost(true);
    setMessage('');

    try {
      await createPost(token, postForm);
      setPostForm(emptyPostForm);
      setPostImageMessage('');
      setFileInputKey(Date.now());
      setMessage('Blog post created.');
      await loadDashboard();
      setCurrentPostIndex(0);
      localStorage.setItem('gallery-updated', String(Date.now()));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingPost(false);
    }
  }

  async function handleCreateVideo(event) {
    event.preventDefault();
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    setSavingVideo(true);
    setMessage('');

    try {
      let url = '';
      let youtubeUrl = '';

      if (videoForm.videoType === 'file' && videoForm.videoFile) {
        url = await uploadTestimonialVideo(videoForm.videoFile);
        youtubeUrl = '';
      } else if (videoForm.videoType === 'youtube' && videoForm.youtubeUrl) {
        url = videoForm.youtubeUrl;
        youtubeUrl = videoForm.youtubeUrl;
      } else {
        throw new Error('Provide a YouTube URL or select a local video file.');
      }

      await createVideo(token, {
        title: videoForm.title,
        description: videoForm.description,
        page: videoForm.page,
        section: videoForm.page,
        url,
        youtubeUrl
      });

      setVideoForm(emptyVideoForm);
      setMessage('Testimonial video added.');
      await loadDashboard();
      setCurrentVideoIndex(0);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingVideo(false);
    }
  }

  async function handleDeleteImage(id) {
    const token = getAdminToken();

    if (!token || !window.confirm('Delete this image from the gallery?')) {
      return;
    }

    try {
      await deleteGalleryItem(token, id);
      setGallery((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDeletePost(postId) {
    const token = getAdminToken();

    if (!token || !window.confirm('Delete this blog post?')) {
      return;
    }

    try {
      await deletePost(token, postId);
      setPosts((current) => current.filter((post) => post.id !== postId));
      localStorage.setItem('gallery-updated', String(Date.now()));
      setCurrentPostIndex((prev) => Math.max(0, prev - 1));
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handlePrevPost() {
    setCurrentPostIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }

  function handleNextPost() {
    setCurrentPostIndex((prev) => (prev + 1) % posts.length);
  }

  async function handleDeleteVideo(videoId) {
    const token = getAdminToken();

    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    if (!window.confirm('Delete this testimonial video?')) {
      return;
    }

    try {
      await deleteVideo(token, videoId);
      setVideos((current) => current.filter((video) => video.id !== videoId));
      localStorage.setItem('gallery-updated', String(Date.now()));
      setCurrentVideoIndex((prev) => Math.max(0, prev - 1));
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handlePrevVideo() {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }

  function handleNextVideo() {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  }

  async function handlePostImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPostImageUploading(true);
    setPostImageMessage('');

    try {
      const upload = await uploadImageToImgbb(file);
      const imageUrl = upload.url || upload.thumbUrl;

      if (!imageUrl) {
        throw new Error('Failed to get image URL from imgbb.');
      }

      setPostForm((current) => ({ ...current, coverImage: imageUrl }));
      setPostImageMessage('Featured image uploaded and attached to the blog form.');
    } catch (error) {
      setPostImageMessage(`Upload failed: ${error.message}`);
    } finally {
      setPostImageUploading(false);
    }
  }

  const categoryCounts = useMemo(
    () =>
      gallery.reduce(
        (counts, item) => ({
          ...counts,
          [item.category]: (counts[item.category] || 0) + 1
        }),
        {}
      ),
    [gallery]
  );

  return (
    <>
      <PageMeta
        title="Admin Dashboard | Shrusara Fashion Boutique"
        description="Dashboard for gallery, blog, and video management."
        canonicalPath="/admin/dashboard"
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-linen pb-12">
        <div className="section-shell py-8">
          <div className="flex flex-col gap-4 rounded-[32px] bg-white/85 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                Admin Dashboard
              </p>
              <h1 className="mt-2 font-heading text-4xl text-ink">
                Premium content control center
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button-secondary" to="/admin/upload">
                Upload images
              </Link>
              <button className="button-primary" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {message ? (
            <div className="mt-4 rounded-[24px] border border-cocoa/20 bg-white px-5 py-4 text-sm text-cocoa shadow-card">
              {message}
            </div>
          ) : null}

          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-7">
            {[
              { label: 'Total images', value: gallery.length },
              { label: 'Home', value: categoryCounts.home || 0 },
              { label: 'Bridal', value: categoryCounts.bridal || 0 },
              { label: 'Designer', value: categoryCounts.designer || 0 },
              { label: 'Kids', value: categoryCounts.kids || 0 },
              { label: 'Blog posts', value: posts.length },
              { label: 'Videos', value: videos.length }
            ].map((card) => (
              <article key={card.label} className="luxury-card">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                  {card.label}
                </p>
                <p className="mt-4 font-heading text-4xl text-ink">{card.value}</p>
              </article>
            ))}
          </section>

          <div className="mt-8 grid gap-8 2xl:grid-cols-[1.05fr_1fr_0.95fr]">
            <section className="luxury-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                    Gallery
                  </p>
                  <h2 className="mt-2 font-heading text-3xl text-ink">Manage images</h2>
                </div>
                <button className="button-secondary" type="button" onClick={loadDashboard}>
                  Refresh
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="skeleton h-48 animate-shimmer rounded-[24px]" />
                    ))
                  : gallery.map((item) => (
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
                        <div className="space-y-1 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cocoa">
                            {item.category}
                          </p>
                          <p className="line-clamp-1 text-xs font-medium text-ink">
                            {item.title || item.alt || 'Untitled'}
                          </p>
                          <div className="mt-2 flex gap-3 text-xs font-semibold">
                            <Link className="text-cocoa" to={`/admin/edit/image/${item.id}`}>
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="text-red-600"
                              onClick={() => handleDeleteImage(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
              </div>
            </section>

            <section className="luxury-card">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                  Blog Manager
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink">Create blog post</h2>
                <p className="mt-2 text-sm text-stone-600">
                  Upload a local image to imgbb, then publish a styled blog card with a featured image.
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleCreatePost}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Title</span>
                  <input
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={postForm.title}
                    onChange={(event) =>
                      setPostForm((current) => ({ ...current, title: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Excerpt</span>
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={postForm.excerpt}
                    onChange={(event) =>
                      setPostForm((current) => ({ ...current, excerpt: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Content</span>
                  <textarea
                    className="min-h-36 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={postForm.content}
                    onChange={(event) =>
                      setPostForm((current) => ({ ...current, content: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Featured image upload</span>
                  <input
                    key={fileInputKey}
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    type="file"
                    accept="image/*"
                    onChange={handlePostImageUpload}
                  />
                </label>
                {postImageMessage ? (
                  <div className="rounded-[20px] border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa">
                    {postImageMessage}
                  </div>
                ) : null}
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Featured image URL</span>
                  <input
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={postForm.coverImage}
                    onChange={(event) =>
                      setPostForm((current) => ({ ...current, coverImage: event.target.value }))
                    }
                    placeholder="https://..."
                  />
                </label>
                {postForm.coverImage ? (
                  <div className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-card">
                    <img
                      src={postForm.coverImage}
                      alt="Blog cover preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <button className="button-primary" type="submit" disabled={savingPost}>
                    {savingPost ? 'Saving...' : 'Create post'}
                  </button>
                  {postImageUploading ? (
                    <span className="inline-flex items-center text-sm font-medium text-cocoa">
                      Uploading image...
                    </span>
                  ) : null}
                </div>
              </form>

              <div className="mt-10">
                {loading ? (
                  <div className="skeleton h-28 animate-shimmer rounded-[22px]" />
                ) : posts.length === 0 ? (
                  <p className="text-sm text-stone-600">No blog posts yet. Create your first post above.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">
                        {posts.length > 0 ? `${currentPostIndex + 1} of ${posts.length}` : 'No posts'}
                      </span>
                      {posts.length > 1 && (
                        <div className="flex gap-2">
                          <button
                            className="button-secondary h-9 w-9 p-0"
                            type="button"
                            onClick={handlePrevPost}
                          >
                            ←
                          </button>
                          <button
                            className="button-secondary h-9 w-9 p-0"
                            type="button"
                            onClick={handleNextPost}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      {posts[currentPostIndex] && (
                        <motion.article
                          key={posts[currentPostIndex].id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-[22px] border border-ink/8 bg-white/90 p-4 shadow-card"
                        >
                          <p className="font-semibold text-ink">{posts[currentPostIndex].title}</p>
                          <p className="mt-2 text-sm text-stone-600">{posts[currentPostIndex].excerpt}</p>
                          <div className="mt-4 flex gap-4 text-sm font-semibold">
                            <Link
                              className="text-cocoa"
                              to={`/admin/edit/blog/${posts[currentPostIndex].id}`}
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="text-red-600"
                              onClick={() => handleDeletePost(posts[currentPostIndex].id)}
                            >
                              Delete
                            </button>
                          </div>
                        </motion.article>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </section>

            <section className="luxury-card">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                  Video Manager
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink">Add testimonial video</h2>
                <p className="mt-2 text-sm text-stone-600">
                  Store YouTube testimonial links in Firebase and render them on the About page.
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleCreateVideo}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Title</span>
                  <input
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={videoForm.title}
                    onChange={(event) =>
                      setVideoForm((current) => ({ ...current, title: event.target.value }))
                    }
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Description</span>
                  <textarea
                    className="min-h-24 w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={videoForm.description}
                    onChange={(event) =>
                      setVideoForm((current) => ({ ...current, description: event.target.value }))
                    }
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-stone-700">Video source</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        videoForm.videoType === 'youtube'
                          ? 'bg-ink text-white'
                          : 'bg-white border border-ink/20 text-ink'
                      }`}
                      onClick={() =>
                        setVideoForm((current) => ({
                          ...current,
                          videoType: 'youtube',
                          videoFile: null
                        }))
                      }
                    >
                      YouTube link
                    </button>
                    <button
                      type="button"
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                        videoForm.videoType === 'file'
                          ? 'bg-ink text-white'
                          : 'bg-white border border-ink/20 text-ink'
                      }`}
                      onClick={() =>
                        setVideoForm((current) => ({
                          ...current,
                          videoType: 'file',
                          youtubeUrl: ''
                        }))
                      }
                    >
                      Upload file
                    </button>
                  </div>
                </label>

                {videoForm.videoType === 'youtube' ? (
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-stone-700">YouTube URL</span>
                    <input
                      className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                      value={videoForm.youtubeUrl}
                      onChange={(event) =>
                        setVideoForm((current) => ({ ...current, youtubeUrl: event.target.value }))
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                      required={videoForm.videoType === 'youtube'}
                    />
                  </label>
                ) : (
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-stone-700">Video file</span>
                    <input
                      className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                      type="file"
                      accept="video/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        setVideoForm((current) => ({
                          ...current,
                          videoFile: file
                        }));
                      }}
                      required={videoForm.videoType === 'file'}
                    />
                  </label>
                )}

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-stone-700">Page</span>
                  <select
                    className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                    value={videoForm.page}
                    onChange={(event) =>
                      setVideoForm((current) => ({ ...current, page: event.target.value }))
                    }
                  >
                    <option value="about">About</option>
                  </select>
                </label>

                <button className="button-primary" type="submit" disabled={savingVideo}>
                  {savingVideo ? 'Saving...' : 'Add video'}
                </button>
              </form>

              <div className="mt-10">
                {loading ? (
                  <div className="skeleton h-28 animate-shimmer rounded-[22px]" />
                ) : videos.length === 0 ? (
                  <p className="text-sm text-stone-600">No testimonial videos yet. Add your first video above.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">
                        {videos.length > 0 ? `${currentVideoIndex + 1} of ${videos.length}` : 'No videos'}
                      </span>
                      {videos.length > 1 && (
                        <div className="flex gap-2">
                          <button
                            className="button-secondary h-9 w-9 p-0"
                            type="button"
                            onClick={handlePrevVideo}
                          >
                            ←
                          </button>
                          <button
                            className="button-secondary h-9 w-9 p-0"
                            type="button"
                            onClick={handleNextVideo}
                          >
                            →
                          </button>
                        </div>
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      {videos[currentVideoIndex] && (
                        <motion.article
                          key={videos[currentVideoIndex].id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-[22px] border border-ink/8 bg-white/90 p-4 shadow-card"
                        >
                          <p className="font-semibold text-ink">{videos[currentVideoIndex].title}</p>
                          <p className="mt-2 text-sm text-stone-600">{videos[currentVideoIndex].description}</p>
                          <div className="mt-4 flex gap-4 text-sm font-semibold">
                            <Link
                              className="text-cocoa"
                              to={`/admin/edit/video/${videos[currentVideoIndex].id}`}
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              className="text-red-600"
                              onClick={() => handleDeleteVideo(videos[currentVideoIndex].id)}
                            >
                              Delete
                            </button>
                          </div>
                        </motion.article>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
