// src/components/RoadmapCarousel.tsx
'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import type { Program, Roadmap } from '@/data/types';
import { UniversalModal } from './UniversalModal'; // <-- 1. Impor komponen modal universal

interface RoadmapCarouselProps {
  program: Program;
}

export const RoadmapCarousel = ({ program }: RoadmapCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [roadmaps, setRoadmaps] = useState(program.Roadmap || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- 2. Tambahkan state untuk mengelola modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    setRoadmaps(program.Roadmap || []);
  }, [program]);

  const handleOpenModal = (roadmap: Roadmap) => {
    setSelectedRoadmap(roadmap);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoadmap(null);
  };
  // ---------------------------------------------

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (container) {
        const index = Math.round(container.scrollLeft / container.clientWidth);
        setCurrentIndex(index);
      }
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section>
          <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Penjajakan Pasar</h2>
              <p className="text-gray-500">Rencana Jangka Panjang / Roadmap</p>
              <span className="block w-36 h-1 bg-red-600 mx-auto mt-2"></span>          
          </div>
          <div className="relative mt-8 group">
              {roadmaps.length > 0 ? (
                  <div 
                      ref={scrollContainerRef}
                      className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-xl shadow-2xl"
                  >
                      {roadmaps.map((roadmap) => (
                          <button 
                            key={roadmap.id} 
                            className="relative flex-shrink-0 w-full snap-center h-[500px] focus:outline-none"
                            onClick={() => handleOpenModal(roadmap)}
                          >
                              <Image
                                  src={roadmap.roadmap || '/assets-web/placeholder.jpg'}
                                  alt={roadmap.judulRoadmap || 'Roadmap Program'}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 text-white text-left">
                                  <h3 className="text-2xl font-bold">{roadmap.judulRoadmap}</h3>
                              </div>
                          </button>
                          // --------------------------------------------------------
                      ))}
                  </div>
              ) : (
                  <div className="text-center p-8 bg-gray-100 rounded-lg">
                      <p className="text-gray-500">Informasi roadmap belum tersedia.</p>
                  </div>
              )}
              {roadmaps.length > 1 && (
                   <>
                      <button onClick={() => scroll('left')} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg z-10 hover:bg-white focus:outline-none ring-2 ring-white/50 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Geser ke kiri">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={() => scroll('right')} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg z-10 hover:bg-white focus:outline-none ring-2 ring-white/50 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Geser ke kanan">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {roadmaps.map((_, index) => (
                              <div key={index} className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}></div>
                          ))}
                      </div>
                   </>
              )}
          </div>
      </section>

      <UniversalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRoadmap?.judulRoadmap || 'Detail Roadmap'}
      >
        {selectedRoadmap && (
          <div>
            <Image
              src={selectedRoadmap.roadmap || '/assets-web/placeholder.jpg'}
              alt={selectedRoadmap.judulRoadmap || 'Roadmap Program'}
              width={1920}
              height={1080}
              className="w-full h-auto object-contain rounded-md"
            />
            <div className="flex justify-end mt-4">
              <a 
                href={selectedRoadmap.roadmap || '#'} 
                download 
                className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition-colors"
              >
                Unduh Gambar
              </a>
            </div>
          </div>
        )}
      </UniversalModal>
      {/* ----------------------------------------- */}
    </>
  );
};

