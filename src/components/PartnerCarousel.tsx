// src/components/PartnerCarousel.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Program, Mitra } from '@/data/types';
import { UniversalModal } from './UniversalModal'; // Impor modal universal

interface PartnerCarouselProps {
  program: Program;
}

// Fungsi helper dari PartnerAccordion
const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
};

const convertRichTextToHtml = (nodes: any[] | undefined): string => {
    if (!Array.isArray(nodes)) return '';
    return nodes.map(node => `<p>${node.children.map((child: any) => child.text).join('')}</p>`).join('');
};

// Sub-komponen untuk tombol panah
const Arrow = ({ direction, onClick, disabled }: { direction: 'left' | 'right', onClick: () => void, disabled: boolean }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed ${direction === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {direction === 'left' 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            }
        </svg>
    </button>
);

// Sub-komponen untuk satu item logo yang bisa diklik
const PartnerItem = ({ partner, onMitraClick }: { partner: Mitra, onMitraClick: (m: Mitra) => void }) => (
    <button 
        onClick={() => onMitraClick(partner)}
        className="flex flex-col items-center text-center w-full group focus:outline-none"
    >
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-2 border-white/30 flex items-center justify-center p-2 backdrop-blur-sm shadow-lg transition-transform group-hover:scale-105">
            <Image 
                src={partner.logoInstansi || '/images/logo-placeholder.png'} 
                alt={partner.namaInstansi} 
                width={100} 
                height={100} 
                objectFit="contain" 
            />
        </div>
        <p className="text-white font-semibold mt-3 text-sm">{partner.namaInstansi}</p>
    </button>
);


export const PartnerCarousel = ({ program }: PartnerCarouselProps) => {
    const partners = program.daftarMitra || [];
    const logosPerPage = 5;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null);

    const totalPages = Math.ceil(partners.length / logosPerPage);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < totalPages - 1;

    const prevPage = () => canGoPrev && setCurrentIndex(prev => prev - 1);
    const nextPage = () => canGoNext && setCurrentIndex(prev => prev + 1);

    const handleOpenMitraModal = (mitra: Mitra) => {
        setSelectedMitra(mitra);
    };

    const handleCloseMitraModal = () => {
        setSelectedMitra(null);
    };

    return (
        <>
            <section className="relative py-16 bg-cover bg-center bg-gray-700" style={{ backgroundImage: "url('/assets-web/lenbg.png')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-white">Partner K/L & Industri</h2>
                    <span className="block w-24 h-1 bg-red-600 mx-auto mt-2 mb-10"></span>
                    {partners.length <= logosPerPage ? (
                        <div className="flex justify-center items-start gap-x-8 gap-y-4">
                            {partners.map((partner) => (
                                <PartnerItem key={partner.id} partner={partner} onMitraClick={handleOpenMitraModal} />
                            ))}
                        </div>
                    ) : (
                        <div className="relative px-12">
                            <div className="overflow-hidden">
                                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                        <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-4 items-start justify-items-center">
                                            {partners.slice(pageIndex * logosPerPage, (pageIndex + 1) * logosPerPage).map((partner) => (
                                                <PartnerItem key={partner.id} partner={partner} onMitraClick={handleOpenMitraModal} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {totalPages > 1 && (
                                <>
                                    <Arrow direction="left" onClick={prevPage} disabled={!canGoPrev} />
                                    <Arrow direction="right" onClick={nextPage} disabled={!canGoNext} />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <UniversalModal
                isOpen={!!selectedMitra}
                onClose={handleCloseMitraModal}
                title="Detail Mitra Kerjasama"
            >
                {selectedMitra && (
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 w-full md:w-1/3 p-4 border rounded-lg flex items-center justify-center">
                      <Image 
                        src={selectedMitra.logoInstansi || '/images/logo-placeholder.png'} 
                        alt={selectedMitra.namaInstansi} 
                        width={200} 
                        height={100} 
                        objectFit="contain" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-3xl font-bold text-gray-900">{selectedMitra.namaInstansi}</h2>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-600 border-b pb-4">
                        <div>
                          <span className="font-semibold text-gray-800 block">Tahun Kerjasama</span>
                          {formatDate(selectedMitra.tahunKerjasama)}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 block">Tipe Kerjasama</span>
                          {selectedMitra.tipeKerjasama}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Deskripsi Kerjasama</h4>
                        <div 
                          className="prose prose-sm text-gray-600" 
                          dangerouslySetInnerHTML={{ __html: convertRichTextToHtml(selectedMitra.detailKerjasama) }} 
                        />
                      </div>
                    </div>
                  </div>
                )}
            </UniversalModal>
        </>
    );
};

