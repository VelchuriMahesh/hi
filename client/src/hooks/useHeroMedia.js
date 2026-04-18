import { useCallback, useEffect, useState } from 'react';
import { fetchHeroMedia } from '../services/cms';
import { heroContent } from '../data/content';

export default function useHeroMedia(pageKey) {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchHeroMedia(pageKey);
      if (result && (result.videoUrl || result.imageUrl)) {
        setMedia(result);
      } else {
        setMedia({
          imageUrl: heroContent[pageKey]?.image || null,
          videoUrl: heroContent[pageKey]?.videoUrl || null
        });
      }
    } catch (err) {
      setMedia({
        imageUrl: heroContent[pageKey]?.image || null,
        videoUrl: heroContent[pageKey]?.videoUrl || null
      });
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      refresh();
    }

    return () => {
      mounted = false;
    };
  }, [pageKey, refresh]);

  useEffect(() => {
    function handleStorage(e) {
      if (!e) return;
      if (e.key === 'hero-updated') {
        refresh();
      }
    }

    function handleCustomEvent() {
      refresh();
    }

    window.addEventListener('storage', handleStorage);
    // also listen for a same-tab custom event
    window.addEventListener('hero-updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('hero-updated', handleCustomEvent);
    };
  }, [refresh]);

  return { media, loading, refresh };
}

