self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('spotify')
        .then(function (cache) {
            cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/playlist-cover.png',
                '/playlist-icon.png',
                '/offline.html'
            ])
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch',event=>{
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                if(res){
                    return res;
                }
                else{
                    return caches.match('/offline.html');
                }
            })
    );
});