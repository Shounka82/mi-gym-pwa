const CACHE='mi-gym-v5-final-20261019';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png',"./ejercicios/press.svg","./ejercicios/incline.svg","./ejercicios/shoulder.svg","./ejercicios/raise.svg","./ejercicios/curl.svg","./ejercicios/row.svg","./ejercicios/hip.svg","./ejercicios/squat.svg","./ejercicios/deadlift.svg","./ejercicios/floor.svg","./ejercicios/plank.svg","./ejercicios/calf.svg","./ejercicios/generic.svg"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mi-gym-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{let req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;
if(req.mode==='navigate')event.respondWith(fetch(req).then(res=>{if(res.ok){let copy=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy))}return res}).catch(()=>caches.match('./index.html')));
else event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){let copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res})));});
