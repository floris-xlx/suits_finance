/** @type {import('next').NextConfig} */
import i18nConfig from './next-i18next.config.js';
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
  i18n: i18nConfig.i18n,
};

export default nextConfig;
