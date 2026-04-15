import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { ADMIN_TOKEN_KEY } from '../components/ProtectedRoute';
import { loginAdmin } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/admin/dashboard';

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(form);
      window.localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
      navigate(redirectPath, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageMeta
        title="Admin Login | Shrusara Fashion Boutique"
        description="Admin login for gallery and blog management."
        canonicalPath="/admin"
        robots="noindex,nofollow"
      />

      <main className="min-h-screen bg-ink px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
            <span className="eyebrow border-white/20 bg-white/10 text-white">Admin Panel</span>
            <h1 className="mt-6 font-heading text-4xl sm:text-5xl">
              Manage boutique galleries and blog content.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/70">
              Secure admin access for image uploads, gallery cleanup, and blog publishing. Replace
              the default credentials in your server environment before going live.
            </p>
          </section>

          <section className="rounded-[36px] border border-white/10 bg-white p-8 text-ink shadow-soft">
            <h2 className="font-heading text-3xl">Sign in</h2>
            <p className="mt-3 text-sm text-stone-600">
              Use the admin credentials configured on the server.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} autoComplete="off">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-stone-700">Email</span>
                <input
                  className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                  type="text" autoComplete="new-password"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-stone-700">Password</span>
                <input
                  className="w-full rounded-2xl border border-ink/10 bg-linen px-4 py-3 outline-none transition focus:border-cocoa"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, password: event.target.value }))
                  }
                  required
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              ) : null}

              <button className="button-primary w-full" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}