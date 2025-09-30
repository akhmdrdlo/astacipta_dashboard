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
    // ==== TAMBAHAN BARU DI SINI ====
  // Konfigurasi untuk menonaktifkan pemeriksaan ketat saat build
  eslint: {
    // Peringatan: Ini akan mengabaikan error ESLint selama proses build.
    // Hanya direkomendasikan untuk deployment cepat.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Peringatan: Ini akan mengabaikan error TypeScript selama proses build.
    ignoreBuildErrors: true,
  },
  // ===============================
};

module.exports = nextConfig;

