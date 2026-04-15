import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';

export async function listVideos(req, res, next) {
  try {
    const snapshot = await db.collection('videos').orderBy('createdAt', 'desc').get();
    const items = snapshot.docs.map(mapDocument);
    res.json({ items });
  } catch (error) {
    console.error('🔥 Firestore Error in listVideos:', error.message);
    next(error);
  }
}

export async function createVideo(req, res, next) {
  try {
    const title = String(req.body.title || '').trim();
    const description = String(req.body.description || '').trim();
    const page = String(req.body.page || 'about').trim().toLowerCase();
    const section = String(req.body.section || page).trim().toLowerCase();
    const youtubeUrl = String(req.body.youtubeUrl || '').trim();
    const url = String(req.body.url || '').trim();

    if (!url && !youtubeUrl) {
      return res.status(400).json({ message: 'A video URL or YouTube URL is required.' });
    }

    const payload = {
      title,
      description,
      page,
      section,
      url: url || youtubeUrl,
      youtubeUrl: youtubeUrl || '',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await db.collection('videos').add(payload);

    res.status(201).json({ item: { id: docRef.id, ...serializeFirestore(payload) } });
  } catch (error) {
    console.error('🔥 Firestore Error in createVideo:', error.message);
    next(error);
  }
}

export async function updateVideoById(req, res, next) {
  try {
    const videoRef = db.collection('videos').doc(req.params.id);
    const snapshot = await videoRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    const currentData = snapshot.data();
    const title = String(req.body.title || currentData.title || '').trim();
    const description = String(req.body.description || currentData.description || '').trim();
    const page = String(req.body.page || currentData.page || 'about').trim().toLowerCase();
    const section = String(req.body.section || currentData.section || page).trim().toLowerCase();
    const youtubeUrl = String(req.body.youtubeUrl || req.body.url || currentData.youtubeUrl || currentData.url || '').trim();
    const url = youtubeUrl;

    const payload = {
      title,
      description,
      page,
      section,
      url,
      youtubeUrl,
      updatedAt: Timestamp.now()
    };

    await videoRef.update(payload);

    res.json({ item: { id: req.params.id, ...serializeFirestore({ ...currentData, ...payload }) } });
  } catch (error) {
    console.error('🔥 Firestore Error in updateVideoById:', error.message);
    next(error);
  }
}

export async function deleteVideoById(req, res, next) {
  try {
    const videoRef = db.collection('videos').doc(req.params.id);
    const snapshot = await videoRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    await videoRef.delete();
    res.json({ message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('🔥 Firestore Error in deleteVideoById:', error.message);
    next(error);
  }
}
