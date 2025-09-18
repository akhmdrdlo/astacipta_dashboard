// src/components/ScopeSection.tsx
'use client';

import Image from 'next/image';

// Data sementara untuk cakupan program
// Nanti kita bisa hubungkan ini dengan data mockData utama
const scopeItems = [
  { title: 'Scope - Soldier System', image: '/assets-web/scope-1.jpg' },
  { title: 'Scope - Static System', image: '/assets-web/scope-2.jpg' },
  { title: 'Scope - Moving System', image: '/assets-web/scope-3.jpg' },
  { title: 'Scope - Aerial System', image: '/assets-web/scope-4.jpg' }, // Item tambahan untuk tes scrolling
  { title: 'Scope - Naval System', image: '/assets-web/scope-5.jpg' }, // Item tambahan untuk tes scrolling
];

// Komponen untuk satu kartu cakupan
const ScopeCard = ({ title, image }: { title: string, image: string }) => (
  <div className="relative flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden group shadow-lg transform transition-transform duration-300 hover:-translate-y-1">
    <Image 
      src={image} 
      alt={title} 
      layout="fill" 
      objectFit="cover" 
      className="transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <h3 className="text-white font-bold text-xl text-center">{title}</h3>
    </div>
  </div>
);

export const ScopeSection = () => {
  return (
    <section 
      className="relative py-16 bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('/assets-web/lenbg2.png')" }} 
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block pb-2">
            Cakupan Program
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-red-600"></span>
          </h2>
        </div>

        {/* Container Carousel yang bisa di-scroll */}
        <div className="flex space-x-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
          {scopeItems.map((item, index) => (
            <ScopeCard key={index} title={item.title} image={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
};
