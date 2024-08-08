/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xylex.ams3.cdn.digitaloceanspaces.com', 'nextuipro.nyc3.cdn.digitaloceanspaces.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
