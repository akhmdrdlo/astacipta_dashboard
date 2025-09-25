// src/components/OfftakerMarquee.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Program, PasarPotensial } from '@/data/types';
import { UniversalModal } from './UniversalModal'; // Impor modal universal

interface OfftakerMarqueeProps {
  program: Program;
}

// Fungsi helper untuk mengubah format Rich Text JSON dari Strapi menjadi HTML.
const convertRichTextToHtml = (nodes: any[] | undefined): string => {
    if (!Array.isArray(nodes)) return '';
    return nodes.map(node => `<p>${node.children.map((child: any) => child.text).join('')}</p>`).join('');
};

// Sub-komponen untuk satu item logo offtaker yang bisa diklik
const OfftakerItem = ({ offtaker, onOfftakerClick }: { offtaker: PasarPotensial, onOfftakerClick: (o: PasarPotensial) => void }) => (
    <button
      onClick={() => onOfftakerClick(offtaker)}
      className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center focus:outline-none group"
    >
        <Image 
            src={offtaker.logoInstansi || '/images/logo-placeholder.png'} 
            alt={offtaker.namaInstansi} 
            width={150} 
            height={60} 
            objectFit="contain"
            className="grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
        />
    </button>
);


export const OfftakerMarquee = ({ program }: OfftakerMarqueeProps) => {
    const offtakerList = program.potentialMarket || [];
    const [selectedOfftaker, setSelectedOfftaker] = useState<PasarPotensial | null>(null);

    const handleOpenModal = (offtaker: PasarPotensial) => {
        setSelectedOfftaker(offtaker);
    };

    const handleCloseModal = () => {
        setSelectedOfftaker(null);
    };

    if (offtakerList.length === 0) {
        return (
            <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg">
                Data Potensi Offtaker untuk program ini belum tersedia.
            </div>
        );
    }

  const duplicatedOfftakers = [...offtakerList, ...offtakerList];

  return (
    <>
      <div className="relative w-full overflow-hidden bg-gray-100 py-8 rounded-lg shadow-inner">
        {/* Definisi animasi yang benar untuk loop mulus */}
        <style jsx global>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 60s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 60s linear infinite;
          }
        `}</style>
        <br/><br/>
        {/* Baris Pertama (bergerak ke kiri) */}
        <div className="flex w-max animate-marquee-left">
          {duplicatedOfftakers.map((offtaker, index) => (
            <OfftakerItem key={`left-${index}`} offtaker={offtaker} onOfftakerClick={handleOpenModal} />
          ))}
        </div>
        <br/><br/><br/>
        {/* Baris Kedua (bergerak ke kanan) dengan jarak lebih besar */}
        <div className="flex w-max animate-marquee-right mt-12">
          {duplicatedOfftakers.map((offtaker, index) => (
            <OfftakerItem key={`right-${index}`} offtaker={offtaker} onOfftakerClick={handleOpenModal} />
          ))}
        </div>
        <br/><br/>
        {/* Gradien di sisi kiri dan kanan untuk efek fade-out */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-100 to-transparent"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>

      <UniversalModal
        isOpen={!!selectedOfftaker}
        onClose={handleCloseModal}
        title="Potensi Offtaker"
      >
        {selectedOfftaker && (
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-full md:w-1/3 p-4 border rounded-lg flex items-center justify-center">
                    <Image 
                        src={selectedOfftaker.logoInstansi || '/images/logo-placeholder.png'} 
                        alt={selectedOfftaker.namaInstansi} 
                        width={200} 
                        height={100} 
                        objectFit="contain" 
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedOfftaker.namaInstansi}</h2>
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Potensi Pasar</h4>
                        <div 
                            className="proses proses-sm text-gray-600" 
                            dangerouslySetInnerHTML={{ __html: convertRichTextToHtml(selectedOfftaker.potensiPasar as any) }} 
                        />
                    </div>
                </div>
            </div>
        )}
      </UniversalModal>
    </>
  );
};

