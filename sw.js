var appCacheName = 'CurrencyXchange';
var appCacheAssets = [
	'https://adisco4420.github.io/CurrencyXchange/',
	'https://adisco4420.github.io/CurrencyXchange/css/main.css',
	'https://adisco4420.github.io/CurrencyXchange/script/main.js',
	'https://adisco4420.github.io/CurrencyXchange/img/icon.png',
	'https://adisco4420.github.io/CurrencyXchange/package.json',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
	'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js',
	'https://free.currencyconverterapi.com/api/v5/currencies',
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(appCacheName).then(function(cache){
			return cache.addAll(appCacheAssets);
		})
	);
});

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
					return cacheName.startsWith('wnes-') && cacheName !== appCacheName;
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event){

	event.respondWith(
		caches.match(event.request).then(function(response){
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});
self.addEventListener('message', function(event){
	if(event.data.action == 'skipWaiting'){
		self.skipWaiting();
	}
});
