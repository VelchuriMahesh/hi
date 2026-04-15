const API_BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers
      }
    });
  } catch (err) {
    throw new Error(`Cannot connect to the API at ${API_BASE}`);
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
    throw new Error(payload.message || 'Request failed');
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

export const deleteGalleryItem = (token, id) =>
  request(`/gallery/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

// POSTS
export const fetchPosts = () => request('/posts');

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