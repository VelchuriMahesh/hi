import { useCallback, useEffect, useState } from 'react';
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

/**
 * useGallery
 *
 * Returns ONLY admin-uploaded (Firebase/dynamic) images for a given category.
 * Unlike useMergedGallery, this hook does NOT merge in any static local imports.
 *
 * Use this in the Gallery section so it stays 100% separate from the
 * Explore Styles section which uses static d1–d12 imports only.
 *
 * @param {string} category  e.g. 'designer', 'bridal', 'kids', 'home', 'all'
 * @returns {{ images: Array, loading: boolean, refresh: Function }}
 */
export default function useGallery(category) {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await (category === 'all'
        ? fetchGallery()
        : fetchGallery(category));
      // Only Firebase/admin images — no static merge
      setImages(filterFirebaseImages(category, response.items || []));
    } catch {
      setImages([]);
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

  return { images, loading, refresh };
}