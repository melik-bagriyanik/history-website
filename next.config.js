/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['upload.wikimedia.org', 'ui-avatars.com', 'api.dicebear.com', 'commons.wikimedia.org'],
    unoptimized: true,
  },
};

module.exports = nextConfig; 