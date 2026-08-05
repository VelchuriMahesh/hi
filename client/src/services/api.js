import { DEFAULT_BLOG_SETTINGS, normalizeBlogSettings } from '../utils/blog';

const API_BASE = import.meta.env.VITE_API_URL;
const BLOG_SETTINGS_CACHE_KEY = 'shrusara-blog-settings';

function getCachedBlogSettings() {
  if (typeof window === 'undefined') return null;

  try {
    const cached = window.localStorage.getItem(BLOG_SETTINGS_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    window.localStorage.removeItem(BLOG_SETTINGS_CACHE_KEY);
    return null;
  }
}

function cacheBlogSettings(settings) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      BLOG_SETTINGS_CACHE_KEY,
      JSON.stringify(normalizeBlogSettings(settings))
    );
  } catch {
    // Local preview cache is optional; backend persistence remains the source of truth.
  }
}

function canUseLocalBlogSettingsFallback(error) {
  return error?.status === 404 || String(error?.message || '').includes('Cannot connect to the API');
}

function slugifyValue(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function request(path, options = {}) {
  const { timeoutMs, ...fetchOptions } = options;
  const controller = timeoutMs && typeof AbortController !== 'undefined'
    ? new AbortController()
    : null;
  const timeoutId = controller
    ? globalThis.setTimeout(() => controller.abort(), timeoutMs)
    : null;
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...fetchOptions,
      signal: controller?.signal,
      headers: {
        Accept: 'application/json',
        ...(fetchOptions.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...fetchOptions.headers
      }
    });
  } catch (err) {
    throw new Error(`Cannot connect to the API at ${API_BASE}`);
  } finally {
    if (timeoutId) {
      globalThis.clearTimeout(timeoutId);
    }
  }

  const raw = await response.text();
  let payload = {};

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = {
        message: response.ok
          ? 'Invalid response from server'
          : `Error ${response.status}`
      };
    }
  }

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

// AUTH
export const loginAdmin = (credentials) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

// GALLERY
export const fetchGallery = (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/gallery${query}`);
};

export const uploadGalleryItem = (token, formData) =>
  request('/gallery', {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateGalleryItem = (token, id, data) =>
  request(`/gallery/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });

export const deleteGalleryItem = (token, id) =>
  request(`/gallery/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

// POSTS
export const fetchPosts = () => request('/posts');

export const fetchBlogSettings = () =>
  request('/posts/settings', { timeoutMs: 6000 })
    .then((response) => {
      const item = response.item || getCachedBlogSettings();

      if (item) {
        cacheBlogSettings(item);
      }

      return {
        ...response,
        item
      };
    })
    .catch((error) => {
      if (!canUseLocalBlogSettingsFallback(error)) {
        throw error;
      }

      return {
        item: getCachedBlogSettings() || normalizeBlogSettings(DEFAULT_BLOG_SETTINGS),
        localOnly: true
      };
    });

export const updateBlogSettings = (token, data) =>
  request('/posts/settings', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
    timeoutMs: 10000
  })
    .then((response) => {
      cacheBlogSettings(response.item || data);
      return response;
    })
    .catch((error) => {
      if (!canUseLocalBlogSettingsFallback(error)) {
        throw error;
      }

      const item = normalizeBlogSettings(data);
      cacheBlogSettings(item);

      return {
        item,
        localOnly: true
      };
    });

export const fetchAdminPosts = (token) =>
  request('/posts/admin', {
    headers: { Authorization: `Bearer ${token}` }
  }).catch((error) => {
    if (error.status === 404) {
      return fetchPosts();
    }

    throw error;
  });

export const fetchPostBySlug = (slug) =>
  request(`/posts/slug/${encodeURIComponent(slug)}`).catch(async (error) => {
    if (error.status !== 404) {
      throw error;
    }

    const targetSlug = slugifyValue(slug);
    const response = await fetchPosts();
    const item = (response.items || []).find((post) => {
      const candidates = [
        post.slug,
        post.title,
        post.id,
        String(post.url || '').split('/').filter(Boolean).pop()
      ];

      return candidates.some((candidate) => slugifyValue(candidate) === targetSlug);
    });

    if (!item) {
      throw error;
    }

    return { item };
  });

export const createPost = (token, data) =>
  request('/posts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });

export const updatePost = (token, id, data) =>
  request(`/posts/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });

export const deletePost = (token, id) =>
  request(`/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

export const duplicatePost = (token, id) =>
  request(`/posts/${id}/duplicate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });

export const trackPostView = (id) =>
  request(`/posts/${id}/view`, {
    method: 'POST'
  });

// VIDEOS
export const fetchVideos = () => request('/videos');

export const createVideo = (token, data) =>
  request('/videos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });

export const updateVideo = (token, id, data) =>
  request(`/videos/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });

export const deleteVideo = (token, id) =>
  request(`/videos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

// REVIEWS
export const fetchReviews = () => request('/reviews');
