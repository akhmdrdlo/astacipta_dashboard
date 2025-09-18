// src/components/PartnerAccordion.tsx
'use client';

import { useState } from 'react';
import { Mitra } from '../data/types';
import Image from 'next/image';

interface PartnerAccordionProps {
  mitraList: Mitra[];
}

export const PartnerAccordion = ({ mitraList }: PartnerAccordionProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>('Swasta Luar Negeri');

  const groupedMitra = mitraList.reduce((acc, mitra) => {
    (acc[mitra.kategori] = acc[mitra.kategori] || []).push(mitra);
    return acc;
  }, {} as Record<string, Mitra[]>);

  const categories: (keyof typeof groupedMitra)[] = [
    'Institusi Pendidikan',
    'Swasta Dalam Negeri',
    'Swasta Luar Negeri',
    'BUMN',
    'Kolaboratif Lain'
  ];

  const toggleCategory = (category: string) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  return (
    <div className="space-y-2">
      {categories.map(category => {
        const partners = groupedMitra[category];
        if (!partners) return null;
        const isOpen = openCategory === category;

        return (
          <div key={category} className="border-b-2 border-red-700">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex justify-between items-center py-4 text-left font-bold text-xl text-gray-800"
            >
              <span>{category}</span>
              <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
              <div className="p-4 space-y-6">
                {partners.map(partner => (
                  <div key={partner.namaInstansi} className="flex items-start space-x-6">
                    <Image src={partner.logoInstansi} alt={partner.namaInstansi} width={120} height={50} objectFit="contain" className="flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">{partner.namaInstansi}</h4>
                      <p className="text-sm text-gray-600"><strong>Status Kerjasama:</strong> {partner.tipeKerjasama}</p>
                      <p className="text-sm text-gray-600"><strong>Dimulai Tahun:</strong> {partner.tahunKerjasama}</p>
                      <p className="text-sm text-gray-600"><strong>Langkah Kerjasama:</strong> {partner.detailKerjasama}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
