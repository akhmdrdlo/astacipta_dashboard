// src/app/program/[slug]/penjajakan/page.tsx
'use client';

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Impor Komponen & Data
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RoadmapCarousel } from '@/components/RoadmapCarousel';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { OfftakerMarquee } from '@/components/OfftakerMarquee'; // <-- 1. Impor komponen Offtaker
import { mockPrograms } from '@/data/mockData';
import type { Program, ProdukUnggulan } from '@/data/types';

// NOTE: Anda perlu membuat komponen ini untuk carousel logo otomatis
// import { OfftakerMarquee } from '@/components/OfftakerMarquee'; 

// Komponen Tab Tindak Lanjut
const TindakLanjutTabs = ({ program }: { program: Program }) => {
    const [activeTab, setActiveTab] = useState('risiko');

    return (
        <div>
            <div className="flex justify-center mb-8">
                <button 
                    onClick={() => setActiveTab('risiko')}
                    className={`px-8 py-3 font-bold text-lg transition-colors duration-300 rounded-l-lg ${activeTab === 'risiko' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                    Potensi Risiko
                </button>
                <button 
                    onClick={() => setActiveTab('kendala')}
                    className={`px-8 py-3 font-bold text-lg transition-colors duration-300 rounded-r-lg ${activeTab === 'kendala' ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                    Kendala & Hambatan
                </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg min-h-[200px]">
                {activeTab === 'risiko' && (
                    <div className="prose" dangerouslySetInnerHTML={{ __html: program.risikoDanHambatan }}></div>
                )}
                {activeTab === 'kendala' && (
                    <div className="prose" dangerouslySetInnerHTML={{ __html: program.progressTindakLanjut }}></div>
                )}
            </div>
        </div>
    );
};


export default function PenjajakanPage() {
  const params = useParams<{ slug: string }>(); 
  
  const program: Program | undefined = mockPrograms.find((p) => p.slug === params.slug);
  
  if (!program) {
    notFound();
  }

  return (
    <main className="bg-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-72 flex items-center justify-center text-center p-4 bg-gray-800">
          <Image src={program.gambarUtama} alt={`Latar belakang ${program.namaProgram}`} layout="fill" objectFit="cover" className="opacity-20" priority />
          <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider leading-tight">{program.namaProgram}</h1>
          </div>
      </section>
      
      {/* Kontainer Konten Utama */}
      <div className="container mx-auto px-6 py-8 -mt-16">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          
          <div className="p-8 space-y-16">
            <Link href={`/program/${program.slug}`} className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center group -mb-8"><span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&lt;</span> Kembali</Link>
            <RoadmapCarousel />
          </div>

          <div className="mt-16"><PartnerCarousel /></div>

          <div className="p-8 mt-16 space-y-16">
            {/* Bagian Produk Program */}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Produk Program</h2>
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-700"></span>
              <div className="space-y-8 max-w-4xl mx-auto">
                {program.produkUnggulan.map((produk: ProdukUnggulan) => (
                  <div key={produk.id} className="flex flex-col md:flex-row items-center gap-8 p-6 border-2 border-red-100 rounded-lg bg-red-50/50">
                    <div className="flex-shrink-0">
                      <Image src={produk.gambarProduk} alt={produk.namaProduk} width={150} height={150} objectFit="cover" className="rounded-md shadow-lg" />
                    </div>
                    <div className="flex flex-col self-stretch">
                      <h3 className="text-2xl font-bold text-red-800">{produk.namaProduk}</h3>
                      <div className="prose prose-sm mt-2 text-gray-600 flex-grow" dangerouslySetInnerHTML={{ __html: produk.deskripsiProduk }} />
                      
                      <div className="mt-4">
                        <Link href={`/produk/${produk.id}`} className="inline-block bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-md hover:bg-red-800 transition-colors shadow-md transform hover:scale-105">
                          Lihat Spesifikasi
                        </Link>
                      </div>
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-700"></span>
                      {/* ============================= */}

                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* ==== PERUBAHAN DI SINI ==== */}
            <section>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Potensi Offtaker</h2>
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-700"></span>
                {/* Mengganti placeholder dengan komponen asli */}
                <OfftakerMarquee program={program} />
            </section>
            {/* ============================= */}


            {/* Bagian Tindak Lanjut */}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Tindak Lanjut</h2>
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-700"></span>
              <TindakLanjutTabs program={program} />
            </section>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

