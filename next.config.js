/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    env: {
        MAPBOX_TOKEN: process.env.MAPBOX,
    },
    async rewrites() {
        return [
          {
            source: '/',
            destination: 'https://api.mapbox.com/*',
          },
        ]
      },
};
