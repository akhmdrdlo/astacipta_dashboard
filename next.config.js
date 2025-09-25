/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi untuk Next.js Image Component
  images: {
    // Daftarkan domain dari mana gambar akan dimuat.
    // Dalam kasus pengembangan lokal, domainnya adalah 'localhost'.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Port tempat Strapi berjalan
        pathname: '/uploads/**', // Izinkan semua gambar dari folder uploads
      },
    ],
  },
};

module.exports = nextConfig;

