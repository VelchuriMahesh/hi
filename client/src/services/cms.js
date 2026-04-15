import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';
import { fetchGallery as fetchGalleryApi, fetchPosts as fetchPostsApi, fetchVideos as fetchVideosApi, createVideo as createVideoApi, updateVideo as updateVideoApi, deleteVideo as deleteVideoApi } from './api';

const HERO_COLLECTION = 'heroMedia';
const VIDEO_COLLECTION = 'videos';
const GALLERY_COLLECTION = 'gallery';
const BLOG_COLLECTION = 'posts';

function mapSnapshot(snapshot) {
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
}

export async function fetchHeroMedia(page) {
  const snapshot = await getDoc(doc(db, HERO_COLLECTION, page));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

export async function saveHeroMedia(page, payload) {
  await setDoc(
    doc(db, HERO_COLLECTION, page),
    {
      ...payload,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function uploadHeroVideo(file, page) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
  const fileRef = ref(storage, `hero-media/${page}/${fileName}`);
  const snapshot = await uploadBytes(fileRef, file, {
    contentType: file.type
  });

  return getDownloadURL(snapshot.ref);
}

export async function uploadTestimonialVideo(file) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;
  const fileRef = ref(storage, `testimonial-videos/${fileName}`);
  const snapshot = await uploadBytes(fileRef, file, {
    contentType: file.type
  });

  return getDownloadURL(snapshot.ref);
}

export async function fetchCollectionDocuments(collectionName) {
  const snapshot = await getDocs(query(collection(db, collectionName)));
  return mapSnapshot(snapshot);
}

export async function fetchGalleryDocuments() {
  try {
    const response = await fetchGalleryApi();
    return response.items || [];
  } catch (err) {
    // fallback to Firestore directly if API is unavailable
    return fetchCollectionDocuments(GALLERY_COLLECTION);
  }
}

export async function fetchBlogDocuments() {
  try {
    const response = await fetchPostsApi();
    return response.items || [];
  } catch (err) {
    // fallback to Firestore directly if API is unavailable
    return fetchCollectionDocuments(BLOG_COLLECTION);
  }
}

export async function updateGalleryDocument(id, payload) {
  await updateDoc(doc(db, GALLERY_COLLECTION, id), {
    ...payload,
    updatedAt: serverTimestamp()
  });
}

export async function fetchVideos() {
  const response = await fetchVideosApi();
  return response.items || [];
}

export async function createVideo(token, payload) {
  await createVideoApi(token, payload);
}

export async function updateVideo(token, id, payload) {
  await updateVideoApi(token, id, payload);
}

export async function deleteVideo(token, id) {
  await deleteVideoApi(token, id);
}
