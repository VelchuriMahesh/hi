export function extractYouTubeId(url = '') {
  const value = String(url).trim();

  if (!value) {
    return '';
  }

  const shortMatch = value.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch) {
    return shortMatch[1];
  }

  const watchMatch = value.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watchMatch) {
    return watchMatch[1];
  }

  const embedMatch = value.match(/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch) {
    return embedMatch[1];
  }

  return '';
}

export function getYouTubeThumbnail(url = '') {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}
