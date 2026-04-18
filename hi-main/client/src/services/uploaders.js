export async function uploadImageToImgbb(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('Set VITE_IMGBB_API_KEY in client/.env to upload blog images.');
  }

  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', file.name.replace(/\.[^/.]+$/, ''));

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Unable to upload image to imgbb.');
  }

  return {
    url: data.data.display_url || data.data.url,
    thumbUrl: data.data.thumb?.url || data.data.medium?.url || data.data.url
  };
}

