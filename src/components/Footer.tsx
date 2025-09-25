// src/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Garis Merah Dekoratif */}
      <div className="bg-red-700 py-1 w-full"></div>
      
      {/* Konten Utama Footer */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Kolom Kiri: Info Perusahaan */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image 
            src="/assets-web/logo Len White.png" 
            alt="Logo PT. Len Industri" 
            width={100} 
            height={40} 
            className="flex-shrink-0"
          />
          <div>
            <h4 className="font-bold text-sm">PT. Len Industri (Persero)</h4>
            <p className="text-xs text-gray-400 mt-1">
              Jl. Soekarno-Hatta No. 442, Pasirluyu, Kec. Regol, Kota Bandung, Jawa Barat 40254
            </p>
          </div>
        </div>
        
        {/* Kolom Tengah: Logo Kemitraan */}
        <div className="flex justify-center items-center space-x-6">
          <Image src="/assets-web/Logo Danantara White.png" alt="Logo Danantara" width={120} height={30} />
        </div>

        {/* Kolom Kanan: Media Sosial */}
        <div className="md:text-right">
          <h4 className="font-bold mb-2">Media Sosial</h4>
          <div className="flex justify-center md:justify-end space-x-4">
            <Link href="https://www.instagram.com/lenindustri?igsh=MXY2d3pwZ3B0c3dwag==" className="text-gray-400 hover:text-white transition-colors">Instagram</Link>
            <Link href="https://www.linkedin.com/company/lenindustri/" className="text-gray-400 hover:text-white transition-colors">LinkedIn</Link>
            <Link href="https://youtube.com/@lenindustriofficial?si=h63ik5aFiC9uWn37" className="text-gray-400 hover:text-white transition-colors">Youtube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

