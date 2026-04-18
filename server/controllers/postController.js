import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';
import slugify from '../utils/slugify.js';

const DEFAULT_POST_IMAGE = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80';

/**
 * Helper to ensure slugs are unique by checking the database
 */
async function buildUniqueSlug(title, currentId = null) {
  const baseSlug = slugify(title) || `post-${Date.now()}`;
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    // Admin SDK check for existing slug
    const snapshot = await db.collection('posts').where('slug', '==', candidate).get();
    const collision = snapshot.docs.find((item) => item.id !== currentId);

    if (!collision) return candidate;
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

/**
 * GET /api/posts
 */
export async function listPosts(req, res, next) {
  try {
    const snapshot = await db.collection('posts').get();
    
    const items = snapshot.docs
      .map(mapDocument)
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    res.json({ items });
  } catch (error) {
    console.error("🔥 Firestore Error in listPosts:", error.message);
    next(error);
  }
}

/**
 * POST /api/posts
 */
export async function createPost(req, res, next) {
  try {
    const title = String(req.body.title || '').trim();
    const excerpt = String(req.body.excerpt || '').trim();
    const content = String(req.body.content || '').trim();

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }

    // Prepare metadata
    const uniqueSlug = await buildUniqueSlug(title);
    
    const payload = {
      title,
      slug: uniqueSlug,
      excerpt,
      content,
      coverImage: String(req.body.coverImage || '').trim() || DEFAULT_POST_IMAGE,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    // Admin SDK bypasses security rules
    const reference = await db.collection('posts').add(payload);

    res.status(201).json({
      item: {
        id: reference.id,
        ...serializeFirestore(payload)
      }
    });
  } catch (error) {
    console.error("🔥 Firestore Error in createPost:", error.message);
    next(error);
  }
}

/**
 * PUT /api/posts/:id
 */
export async function updatePostById(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const currentData = snapshot.data();
    const title = req.body.title || currentData.title;

    const payload = {
      ...req.body,
      slug: await buildUniqueSlug(title, req.params.id),
      updatedAt: Timestamp.now()
    };

    await postRef.update(payload);

    res.json({
      item: {
        id: req.params.id,
        ...serializeFirestore({ ...currentData, ...payload })
      }
    });
  } catch (error) {
    console.error("🔥 Firestore Error in updatePost:", error.message);
    next(error);
  }
}

/**
 * DELETE /api/posts/:id
 */
export async function deletePostById(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    await postRef.delete();
    res.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error("🔥 Firestore Error in deletePost:", error.message);
    next(error);
  }
}