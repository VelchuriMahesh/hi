import { useCallback, useEffect, useMemo, useState } from 'react';
import { getStaticGallery, mergeGalleryImages } from '../data/staticImages';
import { fetchGallery } from '../services/api';

const knownCategories = new Set(['home', 'bridal', 'designer', 'kids']);

function filterFirebaseImages(category, items = []) {
  if (category === 'all') {
    return items.filter((item) => knownCategories.has(item.category));
  }

  if (category === 'home') {
    return items.filter((item) => item.category === 'home');
  }

  return items.filter((item) => item.category === category);
}

export default function useMergedGallery(category) {
  const staticImages = useMemo(() => getStaticGallery(category), [category]);
  const [firebaseImages, setFirebaseImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await (category === 'all' ? fetchGallery() : fetchGallery(category));
      setFirebaseImages(filterFirebaseImages(category, response.items || []));
    } catch {
      setFirebaseImages([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      refresh();
    }

    return () => {
      mounted = false;
    };
  }, [category, refresh]);

  const images = useMemo(
    () => mergeGalleryImages(staticImages, firebaseImages),
    [firebaseImages, staticImages]
  );

  return {
    images,
    firebaseImages,
    loading,
    refresh
  };
}
