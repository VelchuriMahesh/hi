import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemapHandler from './api/sitemap.js';

function sitemapDevPlugin() {
  return {
    name: 'sitemap-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/sitemap.xml' || req.url?.startsWith('/sitemap.xml?')) {
          const mockRes = {
            setHeader(name, value) {
              res.setHeader(name, value);
            },
            status(code) {
              res.statusCode = code;
              return mockRes;
            },
            send(body) {
              res.end(body);
            }
          };
          try {
            await sitemapHandler(req, mockRes);
          } catch (err) {
            next(err);
          }
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), sitemapDevPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false
  }
});

