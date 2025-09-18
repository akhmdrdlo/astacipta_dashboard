// src/app/program/[slug]/page.tsx
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Impor Komponen & Data
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PartnerAccordion } from '@/components/PartnerAccordion';
import { ScopeSection } from '@/components/ScopeSection';
import { mockPrograms } from '@/data/mockData';
import type { Program } from '@/data/types';

// Komponen kecil untuk item "Cakupan Program"
const ScopeItem = ({ image, title }: { image: string, title: string }) => (
  <div className="relative h-40 rounded-lg overflow-hidden group shadow-md">
    <Image 
      src={image} 
      alt={title} 
      layout="fill" 
      objectFit="cover" 
      className="transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-2">
        <h4 className="text-white font-bold text-lg text-center">{title}</h4>
    </div>
  </div>
);

export default function ProgramDetailPage() {
  const params = useParams<{ slug: string }>();
  const program: Program | undefined = mockPrograms.find((p) => p.slug === params.slug);
  
  if (!program) {
    notFound();
  }

  return (
    <main className="bg-gray-100">
      <Header />
      
      {/* Hero Section Baru */}
      <section className="relative h-72 flex items-center justify-center text-center p-4 bg-gray-800">
          <Image 
              src={program.gambarUtama} 
              alt={`Latar belakang ${program.namaProgram}`} 
              layout="fill" 
              objectFit="cover" 
              className="opacity-20" 
              priority 
          />
          <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  {/* Ikon untuk Deskripsi Program */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider leading-tight">
                  {program.namaProgram}
              </h1>
          </div>
      </section>
      
      {/* Kontainer Konten Utama dengan Layout Baru */}
      <div className="container mx-auto px-6 py-8 -mt-16">
        {/* Konten Utama */}
        <div className="relative bg-white rounded-lg shadow-xl p-8 space-y-12">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Deskripsi Program</h2>
                    <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: program.deskripsiLengkap }} />
                </div>
                <div className="text-center">
                    <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-gray-500 text-sm">Foto PIC</span>
                    </div>
                    <p className="font-bold text-lg">{program.PICProgram}</p>
                    <p className="text-sm text-gray-500">Penanggung Jawab Proyek</p>
                </div>
            </section>
            <ScopeSection>
            </ScopeSection>
            
            <section className="mb-16 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Telah Bekerja Sama dengan...</h2>
                <PartnerAccordion mitraList={program.daftarMitra} />
            </section>

            <Link href={`/program/${program.slug}/penjajakan`} className="max-w-xl mx-auto">
                <section className="text-center">
                    <button className="bg-red-700 text-white font-bold py-4 px-12 rounded-lg hover:bg-red-800 transition-colors text-xl shadow-lg transform hover:scale-105">
                        Penjajakan Program Pada Pasar
                    </button>
                </section>            
            </Link>
  
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

