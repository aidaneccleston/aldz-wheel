const C="aldz-wheel-v1";
const ASSETS=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))))});
self.addEventListener("fetch",e=>{
  if(e.request.url.includes("api.anthropic.com"))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});