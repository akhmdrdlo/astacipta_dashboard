// src/components/PartnerAccordion.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Mitra } from '@/data/types';
import { UniversalModal } from './UniversalModal'; // Impor modal universal

interface PartnerAccordionProps {
  mitraList: Mitra[];
}

// Fungsi helper untuk memformat tanggal ke "Bulan Tahun"
const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
};

// Fungsi helper untuk mengubah format Rich Text JSON dari Strapi menjadi HTML.
const convertRichTextToHtml = (nodes: any[] | undefined): string => {
    if (!Array.isArray(nodes)) return '';
    return nodes.map(node => `<p>${node.children.map((child: any) => child.text).join('')}</p>`).join('');
};

const AccordionItem = ({ category, mitra, onMitraClick, isOpen, onToggle }: { category: string; mitra: Mitra[]; onMitraClick: (m: Mitra) => void; isOpen: boolean; onToggle: () => void; }) => {
  return (
    <div className="border-b-2 border-red-600 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
      >
        <h3 className="text-2xl font-bold text-gray-800">{category}</h3>
        <span className={`transform transition-transform duration-300 text-gray-700 text-2xl ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>
      
      {/* ==== PERBAIKAN ANIMASI DI SINI ==== */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className="pb-6 pt-2 space-y-4">
          {mitra.map((m) => (
            // Setiap item mitra sekarang adalah tombol untuk membuka modal
            <button 
              key={m.id || m.namaInstansi} 
              onClick={() => onMitraClick(m)}
              className="w-full text-left p-4 rounded-lg hover:bg-gray-100 transition-colors flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-32 h-20 relative">
                <Image 
                  src={m.logoInstansi || '/images/logo-placeholder.png'} 
                  alt={m.namaInstansi} 
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-lg text-gray-800">{m.namaInstansi}</h4>
                <p className="text-sm text-gray-500">Klik untuk melihat detail</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* ==================================== */}

    </div>
  );
};

export const PartnerAccordion = ({ mitraList }: PartnerAccordionProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedMitra, setSelectedMitra] = useState<Mitra | null>(null);

  const handleToggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleOpenMitraModal = (mitra: Mitra) => {
    setSelectedMitra(mitra);
  };

  const handleCloseMitraModal = () => {
    setSelectedMitra(null);
  };

  const groupedMitra = (mitraList || []).reduce((acc, mitra) => {
    const category = mitra.kategori || 'Lainnya';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(mitra);
    return acc;
  }, {} as Record<string, Mitra[]>);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Telah Bekerja Sama dengan...
          <span className="block w-24 h-1 bg-red-600 mx-auto mt-2"></span>
        </h2>
        <div className="pt-4">
          {Object.entries(groupedMitra).map(([category, mitra]) => (
            <AccordionItem
              key={category}
              category={category}
              mitra={mitra}
              isOpen={openCategory === category}
              onToggle={() => handleToggleCategory(category)}
              onMitraClick={handleOpenMitraModal}
            />
          ))}
        </div>
      </div>

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

