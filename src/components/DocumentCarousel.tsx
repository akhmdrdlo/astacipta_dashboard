// src/components/DocumentCarousel.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Program } from '@/data/types';
import { UniversalModal } from './UniversalModal';

interface DocumentCarouselProps {
  program: Program;
}

// Sub-komponen untuk satu kartu dokumen
const DocumentCard = ({ file, onClick }: { file: { url: string, nama: string }, onClick: () => void }) => {
    const fileExtension = file.nama.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExtension);

    return (
        <button 
          onClick={onClick}
          className="group flex-shrink-0 w-48 block bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden text-left"
        >
            <div className="relative h-32">
                {isImage ? (
                    <Image src={file.url} alt={file.nama} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-300" />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span className="mt-2 text-xs font-bold uppercase">{fileExtension}</span>
                    </div>
                )}
            </div>
            <div className="p-3">
                <p className="text-xs font-semibold text-gray-700 truncate group-hover:text-red-600" title={file.nama}>
                    {file.nama}
                </p>
                <p className="text-xs text-red-600 font-bold mt-1">Lihat Pratinjau</p>
            </div>
        </button>
    );
};

export const DocumentCarousel = ({ program }: DocumentCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const documents = program.dokumenTerkait || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ url: string, nama: string } | null>(null);

  const handleOpenModal = (doc: { url: string, nama: string }) => {
    setSelectedDocument(doc);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 300;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (documents.length === 0) {
    return null; // Jangan tampilkan apa-apa jika tidak ada dokumen
  }

  // Menentukan apakah perlu rata tengah atau tidak
  const justifyClass = documents.length <= 5 ? 'justify-center' : '';

  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Dokumen Terkait</h2>
        <div className="relative max-w-5xl mx-auto">
          <div 
            ref={scrollContainerRef}
            className={`flex items-stretch gap-6 overflow-x-auto p-2 scrollbar-hide ${justifyClass}`}
          >
            {documents.map((doc, index) => (
              <DocumentCard key={index} file={doc} onClick={() => handleOpenModal(doc)} />
            ))}
          </div>
          
          {documents.length > 5 && (
            <>
              <button onClick={() => scroll('left')} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none ring-2 ring-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scroll('right')} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 focus:outline-none ring-2 ring-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
        </div>
      </section>

      <UniversalModal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedDocument?.nama || 'Pratinjau Dokumen'}>
        {selectedDocument && (
           <div className="relative flex flex-col">
            <div className="relative flex-grow w-full h-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                { ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(selectedDocument.nama.split('.').pop()?.toLowerCase() || '') ? (
                    <Image src={selectedDocument.url} alt={selectedDocument.nama}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-contain rounded-md"
                    />
                ) : (
                    <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <p className="mt-2 font-semibold">Pratinjau tidak tersedia untuk tipe file ini.</p>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center mt-4 flex-shrink-0">
                <p className="text-sm text-gray-700 font-semibold truncate pr-4">{selectedDocument.nama}</p>
                <a href={selectedDocument.url} download className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition-colors">Unduh</a>
            </div>
          </div>
        )}
      </UniversalModal>
    </>
  );
};

