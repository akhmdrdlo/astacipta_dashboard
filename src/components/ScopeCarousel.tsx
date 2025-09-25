// src/components/ScopeCarousel.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

// Fungsi untuk mengubah string HTML dari Rich Text menjadi array teks yang bersih
const parseScopeHtml = (htmlString: string): string[] => {
  // Hanya berjalan di sisi klien (browser)
  if (typeof window === 'undefined' || !htmlString || typeof htmlString !== 'string') {
    return [];
  }
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  const items: string[] = [];
  // Mencari elemen list `<li>` atau paragraf `<p>`
  doc.querySelectorAll('li, p').forEach(el => {
    const text = el.textContent?.trim();
    // Membersihkan nomor otomatis dari list item (misal: "1. Teks" -> "Teks")
    const cleanText = text?.replace(/^\d+\.\s*/, '');
    if (cleanText && cleanText !== '-') {
        items.push(cleanText);
    }
  });

  return items;
};

export const ScopeCarousel = ({ cakupanProgramHtml }: { cakupanProgramHtml: string }) => {
  const [scopeItems, setScopeItems] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parsing HTML dilakukan di dalam useEffect untuk memastikan hanya berjalan di client
    setScopeItems(parseScopeHtml(cakupanProgramHtml));
  }, [cakupanProgramHtml]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const cardWidth = container.children[0]?.clientWidth || 300; // Lebar satu kartu
      const scrollAmount = cardWidth + 24; // Lebar kartu + spasi (gap-6)

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (scopeItems.length === 0) {
    return <p className="text-center text-gray-500">Informasi cakupan program belum tersedia.</p>;
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      <div 
        ref={scrollContainerRef}
        // Tailwind CSS class untuk menyembunyikan scrollbar
        className="flex items-stretch gap-6 overflow-x-auto p-2 scrollbar-hide"
      >
        {scopeItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-72 p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col justify-center transform hover:-translate-y-1 transition-transform duration-300">
            <span className="text-red-600 font-bold text-lg mb-2">Cakupan #{index + 1}</span>
            <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
      
      {/* Tombol navigasi hanya akan muncul jika jumlah item lebih dari 3 */}
      {scopeItems.length > 3 && (
        <>
          <button 
            onClick={() => scroll('left')} 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            aria-label="Geser ke kiri"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
            aria-label="Geser ke kanan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}
    </div>
  );
};

