import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AssistantWidget from './components/AssistantWidget';
import Footer from './components/Footer';
import LoadingPage from './components/LoadingPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppButton from './components/WhatsAppButton';
import Analytics from './Analytics';

// Existing Lazy Imports
const Home              = lazy(() => import('./pages/Home'));
const Bridal            = lazy(() => import('./pages/Bridal'));
const Designer          = lazy(() => import('./pages/Designer'));
const Kids              = lazy(() => import('./pages/Kids'));
const About             = lazy(() => import('./pages/About'));
const Contact           = lazy(() => import('./pages/Contact'));
const Blog              = lazy(() => import('./pages/Blog'));
const BlogPost          = lazy(() => import('./pages/BlogPost'));
const Login             = lazy(() => import('./admin/Login'));
const Dashboard         = lazy(() => import('./admin/Dashboard'));
const Upload            = lazy(() => import('./admin/Upload'));
const Edit              = lazy(() => import('./admin/Edit'));
const BlogManager       = lazy(() => import('./admin/BlogManager'));

// Landing Pages — MUST be PascalCase variable names
const BridalLandingPage       = lazy(() => import('./pages/BridalLandingPage'));
const DesignerLandingPage     = lazy(() => import('./pages/designerLandingPage')); // NOTE: actual filename is lowercase "d"
const OccasionWearLandingPage = lazy(() => import('./pages/OccasionWearLandingPage'));
const SareeLandingPage        = lazy(() => import('./pages/SareeLandingPage')); // ← NEW — add this file to client/src/pages/

const HASH_SCROLL_RETRY_MS = 2500;
const HASH_SCROLL_RETRY_INTERVAL_MS = 100;
const HASH_SCROLL_ALIGNMENT_GAP = 12;

function getHashTargetId(hash) {
  const rawId = hash.startsWith('#') ? hash.slice(1) : hash;

  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
}

function getAnchorScrollOffset() {
  let offset = 0;

  document.querySelectorAll('header').forEach((header) => {
    const style = window.getComputedStyle(header);

    if (style.position !== 'fixed' && style.position !== 'sticky') {
      return;
    }

    const rect = header.getBoundingClientRect();
    const top = Number.parseFloat(style.top);
    const stickyTop = Number.isFinite(top) ? top : 0;

    if (rect.height > 0 && rect.bottom > 0 && rect.top <= stickyTop + 1) {
      offset = Math.max(offset, rect.height + Math.max(stickyTop, 0));
    }
  });

  return offset > 0 ? offset + HASH_SCROLL_ALIGNMENT_GAP : 0;
}

function scrollToAnchorTarget(target) {
  const top = target.getBoundingClientRect().top + window.scrollY - getAnchorScrollOffset();

  window.scrollTo({
    top: Math.max(top, 0),
    left: 0,
    behavior: 'smooth',
  });
}

function isAnchorTargetAligned(target) {
  const distanceFromAnchorTop = target.getBoundingClientRect().top - getAnchorScrollOffset();
  return Math.abs(distanceFromAnchorTop) <= 8;
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const timeoutIds = [];
    const frameIds = [];
    const cleanupCallbacks = [];

    const scheduleTimeout = (callback, delay) => {
      const timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, delay);
      timeoutIds.push(timeoutId);
    };

    const scheduleAfterPaint = (callback) => {
      const firstFrameId = window.requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }

        const secondFrameId = window.requestAnimationFrame(() => {
          if (!cancelled) {
            callback();
          }
        });
        frameIds.push(secondFrameId);
      });
      frameIds.push(firstFrameId);
    };

    const cleanup = () => {
      cancelled = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      frameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      cleanupCallbacks.forEach((cleanupCallback) => cleanupCallback());
    };

    const scrollToTop = () => {
      scheduleAfterPaint(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    };

    const scheduleAlignmentChecks = (targetId) => {
      [300, 800, 1400].forEach((delay) => {
        scheduleTimeout(() => {
          const target = document.getElementById(targetId);

          if (target && !isAnchorTargetAligned(target)) {
            scrollToAnchorTarget(target);
          }
        }, delay);
      });
    };

    const startHashScrollRetry = (targetId) => {
      const retryUntil = Date.now() + HASH_SCROLL_RETRY_MS;

      const tryScroll = () => {
        const target = document.getElementById(targetId);

        if (target) {
          scheduleAfterPaint(() => {
            scrollToAnchorTarget(target);
            scheduleAlignmentChecks(targetId);
          });
          return;
        }

        if (Date.now() < retryUntil) {
          scheduleTimeout(tryScroll, HASH_SCROLL_RETRY_INTERVAL_MS);
        }
      };

      scheduleAfterPaint(tryScroll);
    };

    const scrollToHash = (hash) => {
      const targetId = getHashTargetId(hash);

      if (!targetId) {
        return;
      }

      if (document.readyState === 'complete') {
        startHashScrollRetry(targetId);
      } else {
        const scrollAfterLoad = () => startHashScrollRetry(targetId);
        window.addEventListener('load', scrollAfterLoad, { once: true });
        cleanupCallbacks.push(() => window.removeEventListener('load', scrollAfterLoad));
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      } else {
        scrollToTop();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    cleanupCallbacks.push(() => window.removeEventListener('hashchange', handleHashChange));

    if (!location.hash) {
      scrollToTop();
      return cleanup;
    }

    scrollToHash(location.hash);

    return cleanup;
  }, [location.hash, location.key, location.pathname]);

  return null;
}

function SiteLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-8 pt-2">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AssistantWidget />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* ROUTES WITH NAVBAR/FOOTER */}
        <Route element={<SiteLayout />}>
          <Route path="/"                              element={<Home />} />
          <Route path="/bridal-blouse-bangalore"       element={<Bridal />} />
          <Route path="/designer-outfits-bangalore"    element={<Designer />} />
          <Route path="/kids-outfits-bangalore"        element={<Kids />} />
          <Route path="/about-shrusara-boutique"       element={<About />} />
          <Route path="/contact-shrusara-bangalore"    element={<Contact />} />
          <Route path="/bridal-fashion-blog-bangalore" element={<Blog />} />
          <Route path="/bridal-fashion-blog-bangalore/:slug" element={<BlogPost />} />
        </Route>

        {/* Landing Pages (NO navbar/footer layout) */}
        <Route path="/customized-bridal-blouse-bangalore"      element={<BridalLandingPage />} />
        <Route path="/customized-designer-outfits-bangalore"   element={<DesignerLandingPage />} />
        <Route path="/customized-occasion-wear-bangalore"      element={<OccasionWearLandingPage />} />
        <Route path="/saree-transformation-bangalore" element={<SareeLandingPage />} /> {/* ← NEW */}

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <BlogManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:type/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  useEffect(() => {
    const warmup = () => {
      void import('./pages/Bridal');
      void import('./pages/Designer');
      void import('./pages/Kids');
      void import('./pages/About');
      void import('./pages/Contact');
      void import('./pages/Blog');
      void import('./pages/BlogPost');
      void import('./admin/BlogManager');
      void import('./pages/BridalLandingPage');
      void import('./pages/designerLandingPage');
      void import('./pages/OccasionWearLandingPage');
      void import('./pages/SareeLandingPage'); // ← NEW
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warmup, { timeout: 1500 });
    } else {
      const timeoutId = window.setTimeout(warmup, 1200);
      return () => window.clearTimeout(timeoutId);
    }
    return () => {};
  }, []);

  return (
    <>
      <Analytics />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}
