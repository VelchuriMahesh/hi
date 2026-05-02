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
const Login             = lazy(() => import('./admin/Login'));
const Dashboard         = lazy(() => import('./admin/Dashboard'));
const Upload            = lazy(() => import('./admin/Upload'));
const Edit              = lazy(() => import('./admin/Edit'));

// Landing Pages — MUST be PascalCase variable names
const BridalLandingPage   = lazy(() => import('./pages/BridalLandingPage'));
const DesignerLandingPage = lazy(() => import('./pages/designerLandingPage')); // ← PascalCase variable

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
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
        </Route>

        {/* Landing Pages (NO navbar/footer layout) */}
        <Route path="/bridal-blouse-bangalore/consultation"   element={<BridalLandingPage />} />
        <Route path="/designer-outfits-bangalore/consultation" element={<DesignerLandingPage />} /> {/* ← PascalCase */}

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
      void import('./pages/BridalLandingPage');
      void import('./pages/designerLandingPage');
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