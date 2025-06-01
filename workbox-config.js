module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{js,css,html,png,jpg,jpeg,svg,ico,json}'
	],
	swDest: 'dist/sw.js',
	skipWaiting: true,
	clientsClaim: true,
	maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
	dontCacheBustURLsMatching: /\.\w{8}\./,
	cleanupOutdatedCaches: true,
	navigationPreload: true,
	runtimeCaching: [
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
			handler: 'CacheFirst',
			options: {
				cacheName: 'images',
				expiration: {
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
				}
			}
		},
		{
			urlPattern: /^https:\/\/.*\/.*$/,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'dynamic-content',
				networkTimeoutSeconds: 3,
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 24 * 60 * 60 // 24 hours
				}
			}
		}
	]
};