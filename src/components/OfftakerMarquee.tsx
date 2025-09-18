// src/components/OfftakerMarquee.tsx
'use client';

import Image from 'next/image';
import { mockPrograms } from '@/data/mockData';
import type { PasarPotensial } from '@/data/types';

// Ambil data offtaker dari program pertama sebagai contoh
const offtakerList: PasarPotensial[] = mockPrograms[0]?.potentialMarket || [];

// Untuk efek looping yang mulus, kita duplikasi daftar logo
const duplicatedOfftakers = [...offtakerList, ...offtakerList];

export const OfftakerMarquee = () => {
    // Pastikan ada data untuk ditampilkan
    if (!offtakerList || offtakerList.length === 0) {
        return (
            <div className="text-center text-gray-500">
                Data Potensi Offtaker belum tersedia.
            </div>
        );
    }

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 py-8 rounded-lg shadow-inner">
      {/* Baris Pertama (bergerak ke kiri) */}
      <div className="flex w-max animate-marquee-left">
        {duplicatedOfftakers.map((offtaker, index) => (
          <div key={`left-${index}`} className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center">
            <Image 
              src={offtaker.logoPasar} 
              alt={offtaker.namaPasar} 
              width={150} 
              height={60} 
              objectFit="contain"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
      
      {/* Baris Kedua (bergerak ke kanan) */}
      <div className="flex w-max animate-marquee-right mt-8">
        {duplicatedOfftakers.map((offtaker, index) => (
          <div key={`right-${index}`} className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center">
            <Image 
              src={offtaker.logoPasar} 
              alt={offtaker.namaPasar} 
              width={150} 
              height={60} 
              objectFit="contain"
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      {/* Gradien di sisi kiri dan kanan untuk efek fade */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-100 to-transparent"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-100 to-transparent"></div>
    </div>
  );
};
