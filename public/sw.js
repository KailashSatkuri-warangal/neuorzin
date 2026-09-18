/**
 * NEUORZIN CRM Enterprise Service Worker
 * Fully compliant with PWABuilder & PWA 2.0 specifications.
 * Supports Offline Caching, Push Notifications, Background Sync, Periodic Sync, and Navigation Fallbacks.
 */

const CACHE_NAME = 'neuorzin-crm-pwa-v2.2.0';
const STATIC_ASSETS = [
  '/',
  '/admin',
  '/manifest.json',
  '/assets/images/neuorzin-icon.png',
  '/assets/images/neuorzin-logo.png'
];

// 1. INSTALL & PRECACHE
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[PWA SW] Pre-caching non-fatal warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE & CLEAN
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH STRATEGY: STALE-WHILE-REVALIDATE WITH OFFLINE FALLBACK
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline Mode Active' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/') || caches.match('/index.html');
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. PUSH NOTIFICATIONS CAPABILITY
self.addEventListener('push', (event) => {
  let data = {
    title: '⚡ NeuOrzin CRM Alert',
    body: 'New inbound lead or SLA escalation notification received.',
    icon: '/assets/images/neuorzin-icon.png',
    badge: '/assets/images/neuorzin-icon.png',
    data: { url: '/admin/notifications' }
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/assets/images/neuorzin-icon.png',
    badge: data.badge || '/assets/images/neuorzin-icon.png',
    vibrate: [100, 50, 100],
    data: data.data || { url: '/admin/notifications' },
    actions: [
      { action: 'open', title: 'Open CRM' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/admin';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/admin') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// 5. BACKGROUND SYNC CAPABILITY
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-crm-data' || event.tag === 'sync-leads' || event.tag === 'sync-tasks') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CRM_BACKGROUND_SYNC_TRIGGER' });
        });
      })
    );
  }
});

// 6. PERIODIC BACKGROUND SYNC CAPABILITY
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'periodic-crm-sync' || event.tag === 'crm-hourly-refresh') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CRM_PERIODIC_SYNC_TRIGGER' });
        });
      })
    );
  }
});
