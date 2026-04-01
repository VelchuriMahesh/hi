import { db, serializeFirestore } from '../services/firebase.js';
import { deleteFromImgbb, uploadToImgbb } from '../services/imgbb.js';

const allowedCategories = new Set(['home', 'bridal', 'designer', 'kids']);

export async function createGalleryItem(req, res, next) {
  try {
    const { category, alt, title, description } = req.body;

    if (!req.file) return res.status(400).json({ message: 'Please select an image.' });

    // 1. Upload to ImgBB
    const upload = await uploadToImgbb(req.file.buffer, req.file.originalname);

    // 2. Prepare Payload
    const payload = {
      category: String(category || 'home').toLowerCase(),
      title: String(title || '').trim(),
      alt: String(alt || '').trim(),
      description: String(description || '').trim(),
      url: upload.url,
      thumbUrl: upload.thumbUrl,
      deleteUrl: upload.deleteUrl,
      width: upload.width,
      height: upload.height,
      createdAt: new Date().toISOString() 
    };

    // 3. Save to Firestore using Admin SDK (This bypasses all permission errors)
    const docRef = await db.collection('gallery').add(payload);

    res.status(201).json({
      item: { id: docRef.id, ...payload }
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function listGallery(req, res, next) {
  try {
    const category = req.query.category;
    let query = db.collection('gallery');
    if (category && category !== 'all') {
      query = query.where('category', '==', category.toLowerCase());
    }
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...serializeFirestore(doc.data())
    }));
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryItemById(req, res, next) {
  try {
    const docRef = db.collection('gallery').doc(req.params.id);
    const snapshot = await docRef.get();
    if (snapshot.exists && snapshot.data().deleteUrl) {
      await deleteFromImgbb(snapshot.data().deleteUrl);
    }
    await docRef.delete();
    res.json({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
}