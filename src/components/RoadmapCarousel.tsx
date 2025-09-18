// src/components/RoadmapCarousel.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

// NOTE: Data ini bersifat sementara untuk demonstrasi.
// Nantinya, data ini akan diambil dari properti program (props).
const roadmapItems = [
  {
    id: 1,
    image: '/assets-web/roadmapexample.png',
    title: 'Fase 1: Riset & Pengembangan Awal',
    description: 'Fokus pada pengembangan teknologi inti dan validasi konsep dasar. Pengujian laboratorium untuk komponen sensor utama.',
  },
  {
    id: 2,
    image: '/assets-web/roadmapexample.png',
    title: 'Fase 2: Pembuatan Prototipe & Integrasi',
    description: 'Membangun prototipe fungsional pertama dan mengintegrasikan semua subsistem. Pengujian lapangan terbatas.',
  },
  {
    id: 3,
    image: '/images/roadmap-3.png',
    title: 'Fase 3: Uji Coba Lapangan & Sertifikasi',
    description: 'Melakukan serangkaian uji coba komprehensif di berbagai kondisi untuk mendapatkan sertifikasi kelaikan.',
  },
];

const Arrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors ${direction === 'left' ? 'left-4' : 'right-4'}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {direction === 'left' 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            }
        </svg>
    </button>
);


export const RoadmapCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? roadmapItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === roadmapItems.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentItem = roadmapItems[currentIndex];

  return (
    <section>
        <h2 className="text-3xl font-bold text-center text-gray-800">Penjajakan Pasar</h2>
        <p className="text-center text-gray-500 mb-8">Rencana Jangka Panjang / Roadmap</p>
        
        <div className="relative w-full h-[450px] bg-gray-200 rounded-lg overflow-hidden shadow-inner">
            <Image
                src={currentItem.image}
                alt={currentItem.title}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-500"
                key={currentItem.id} // Kunci untuk memicu transisi
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <Arrow direction="left" onClick={prevSlide} />
            <Arrow direction="right" onClick={nextSlide} />

            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-bold">{currentItem.title}</h3>
                <p className="mt-2 text-gray-200 max-w-2xl">{currentItem.description}</p>
            </div>
             <div className="absolute bottom-4 right-4 flex space-x-2">
                {roadmapItems.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                    ></div>
                ))}
            </div>
        </div>
    </section>
  );
};
