const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

// ✅ Upload image using native fetch (fixes OpenSSL decoder error on Node 18)
export async function uploadToImgbb(fileBuffer, fileName = 'boutique-image') {
  const apiKey = process.env.IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('❌ IMGBB_API_KEY is missing in environment variables');
  }

  if (!fileBuffer) {
    throw new Error('❌ File buffer is missing');
  }

  // Convert buffer → base64
  const base64Image = fileBuffer.toString('base64');

  // Use native FormData (built into Node 18)
  const form = new FormData();
  form.append('image', base64Image);
  form.append('name', fileName.replace(/\.[^/.]+$/, ''));

  try {
    const response = await fetch(`${IMGBB_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      body: form
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data?.error?.message || '❌ ImgBB upload failed');
    }

    return {
      url: data.data.display_url || data.data.url,
      thumbUrl:
        data.data.thumb?.url ||
        data.data.medium?.url ||
        data.data.url,
      deleteUrl: data.data.delete_url || '',
      width: data.data.width || null,
      height: data.data.height || null
    };
  } catch (error) {
    console.error('❌ IMGBB ERROR:', error.message);
    throw new Error('❌ Failed to upload image to ImgBB: ' + error.message);
  }
}

// ✅ Delete image
export async function deleteFromImgbb(deleteUrl) {
  if (!deleteUrl) return false;

  try {
    const response = await fetch(deleteUrl);
    return response.ok;
  } catch (error) {
    return false;
  }
}