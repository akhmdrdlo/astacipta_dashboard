// src/components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-red-600 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo di sisi kiri */}
        <Link href="/">
          <Image 
            src="/assets-web/Logo Danantara White.png" 
            alt="Logo Danantara Indonesia" 
            width={150} 
            height={40} 
            priority // Penting untuk gambar LCP (Largest Contentful Paint) seperti logo
          />
        </Link>
        
        {/* Menu Navigasi di sisi kanan, disembunyikan di mobile */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-white hover:text-red-700 transition-colors">
            Program Utama ▼
          </Link>
          <Link href="#" className="text-white hover:text-red-700 transition-colors">
            Produk ▼
          </Link>
          <Link 
            href="/" 
            className="bg-red-700 text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-red-800 transition-colors"
          >
            DASHBOARD MONITORING ASTA CIPTA LEN
          </Link>
        </div>
      </nav>
    </header>
  );
};

