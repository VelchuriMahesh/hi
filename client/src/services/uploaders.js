/**
 * Detects if a File/Canvas contains transparent pixels (alpha channel).
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 * @returns {boolean}
 */
function hasTransparency(canvas, ctx) {
  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] < 255) {
        return true;
      }
    }
  } catch (e) {
    // Canvas tainted or error reading pixels
  }
  return false;
}

/**
 * Compress image using HTML5 Canvas API to target size (~200 KB) while preserving HD visual quality.
 * Rules:
 * - WebP preferred for normal photographic/banner images
 * - PNG retained/chosen when transparency (alpha channel) is present
 * - JPEG used as fallback if WebP is unsupported
 * - Preserves aspect ratio and does NOT upscale smaller images
 * - Removes EXIF/unnecessary metadata
 * - Skips recompression if image is already <= 200 KB and within HD bounds
 * 
 * @param {File} file Original image file uploaded by user/admin
 * @param {number} targetMaxKB Target maximum file size in kilobytes (default 150)
 * @param {number} maxDimension Max width/height dimension in pixels for HD quality (default 1400)
 * @returns {Promise<File>} Compressed File object (or original file if uncompressable/error)
 */
export async function compressImage(file, targetMaxKB = 150, maxDimension = 1400) {
  if (!file || !(file instanceof File) || !file.type.startsWith('image/')) {
    return file;
  }

  // Skip SVG or animated GIF to prevent losing animations/vector format
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  const targetSizeBytes = targetMaxKB * 1024;

  // If already <= 200 KB, check if dimensions are already within HD bounds
  // If so, avoid unnecessary recompression!
  if (file.size <= targetSizeBytes) {
    return new Promise((resolve) => {
      const checkImg = new Image();
      const checkUrl = URL.createObjectURL(file);
      checkImg.onload = () => {
        URL.revokeObjectURL(checkUrl);
        if (checkImg.width <= maxDimension && checkImg.height <= maxDimension) {
          console.log(`[ImageCompressor] File '${file.name}' is already ${(file.size / 1024).toFixed(1)}KB (<= ${targetMaxKB}KB). Skipping recompression.`);
          resolve(file);
        } else {
          runCompression(file, targetMaxKB, maxDimension).then(resolve);
        }
      };
      checkImg.onerror = () => {
        URL.revokeObjectURL(checkUrl);
        resolve(file);
      };
      checkImg.src = checkUrl;
    });
  }

  return runCompression(file, targetMaxKB, maxDimension);
}

async function runCompression(file, targetMaxKB = 200, maxDimension = 1920) {
  const targetSizeBytes = targetMaxKB * 1024;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = async () => {
      URL.revokeObjectURL(objectUrl);
      try {
        let width = img.width;
        let height = img.height;

        // DO NOT UPSCALE small images! Scale down ONLY if width or height > maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(file);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Check if PNG/image has transparency (alpha channel)
        const isTransparent = file.type === 'image/png' && hasTransparency(canvas, ctx);

        const canvasToBlob = (mime, quality) =>
          new Promise((res) => canvas.toBlob(res, mime, quality));

        // Format selection:
        // 1. Transparent PNG -> keep image/png or image/webp with alpha
        // 2. WebP preferred for normal photographic images
        // 3. JPEG fallback if WebP unsupported
        let mimeType = isTransparent ? 'image/png' : 'image/webp';
        let quality = 0.90; // High initial visual quality for HD sharpness
        let blob = await canvasToBlob(mimeType, quality);

        // Fallback to JPEG if WebP unsupported and not transparent
        if (!blob || blob.size === 0) {
          mimeType = isTransparent ? 'image/png' : 'image/jpeg';
          blob = await canvasToBlob(mimeType, quality);
        }

        // Iteratively reduce quality slightly if size > targetMaxKB (for lossy WebP and JPEG)
        if (mimeType !== 'image/png') {
          while (blob && blob.size > targetSizeBytes && quality > 0.45) {
            quality -= 0.07;
            blob = await canvasToBlob(mimeType, quality);
          }
        }

        // If still over targetSizeBytes for huge images or non-compressible PNGs, resize canvas step-by-step
        let scaleDim = maxDimension;
        while (blob && blob.size > targetSizeBytes && scaleDim > 600) {
          scaleDim -= 200;
          let newW = img.width;
          let newH = img.height;
          if (newW > scaleDim || newH > scaleDim) {
            if (newW > newH) {
              newH = Math.round((newH * scaleDim) / newW);
              newW = scaleDim;
            } else {
              newW = Math.round((newW * scaleDim) / newH);
              newH = scaleDim;
            }
          }
          canvas.width = newW;
          canvas.height = newH;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, newW, newH);

          quality = mimeType === 'image/png' ? undefined : 0.85;
          blob = await canvasToBlob(mimeType, quality);
        }

        if (!blob || blob.size === 0) {
          return resolve(file);
        }

        let ext = '.webp';
        if (mimeType === 'image/jpeg') ext = '.jpg';
        if (mimeType === 'image/png') ext = '.png';

        const newFileName = file.name.replace(/\.[^/.]+$/, '') + ext;
        const compressedFile = new File([blob], newFileName, { type: mimeType });

        console.log(
          `[ImageCompressor] '${file.name}' compressed from ${(file.size / 1024).toFixed(1)}KB to ${(compressedFile.size / 1024).toFixed(1)}KB (${mimeType}, ${width}x${height}px)`
        );

        resolve(compressedFile);
      } catch (err) {
        console.warn('[ImageCompressor] Error during compression, proceeding with original file:', err);
        resolve(file);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

export async function uploadImageToImgbb(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('Set VITE_IMGBB_API_KEY in client/.env to upload blog images.');
  }

  // Automatically compress file to ~150 KB with HD quality before uploading
  let fileToUpload = file;
  try {
    fileToUpload = await compressImage(file, 150, 1400);
  } catch (err) {
    console.warn('Image compression fallback:', err);
  }

  const formData = new FormData();
  formData.append('image', fileToUpload);
  formData.append('name', fileToUpload.name.replace(/\.[^/.]+$/, ''));

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
