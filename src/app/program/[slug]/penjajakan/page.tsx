// src/app/program/[slug]/penjajakan/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Impor Komponen & API
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RoadmapCarousel } from '@/components/RoadmapCarousel';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { OfftakerMarquee } from '@/components/OfftakerMarquee';
import { DocumentCarousel } from '@/components/DocumentCarousel'; 
import { fetchProgramBySlug } from '@/lib/api';
import type { Program, ProdukUnggulan } from '@/data/types';

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
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgramData = async () => {
      if (params.slug) {
        const programData = await fetchProgramBySlug(params.slug as string);
        if (programData) {
          setProgram(programData);
        } else {
          notFound(); 
        }
        setLoading(false);
      }
    };
    loadProgramData();
  }, [params.slug]);

  if (loading || !program) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <style jsx global>{`
          @keyframes text-slide-up {
            0% { opacity: 0; transform: translateY(40px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-40px); }
          }
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-text-slide-up { animation: text-slide-up 3.5s ease-in-out infinite; }
          .animate-loading-bar { animation: loading-bar 2s linear infinite; }
        `}</style>
        <div className="text-center">
          <div className="h-12 overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wider animate-text-slide-up">
              Memuat Penjajakan Pasar...
            </h1>
          </div>
          <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-red-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <main className="bg-gray-100">
      <Header />
      
      <section className="relative h-72 flex items-center justify-center text-center p-4 bg-gray-800">
          <Image src={program.gambarUtama || '/assets-web/placeholder.jpg'} alt={`Latar belakang ${program.namaProgram}`} layout="fill" objectFit="cover" className="opacity-20" priority />
          <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider leading-tight">{program.namaProgram}</h1>
          </div>
      </section>
      
      <div className="container mx-auto px-6 py-8 -mt-16">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 space-y-16">
            <Link href={`/program/${program.slug}`} className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center group -mb-8"><span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&lt;</span> Kembali</Link>
            <RoadmapCarousel program={program}/>
          </div>
          {/* Bagian Carousel Partner */}
          <div className="mt-16"><PartnerCarousel program={program}/></div>
          <div className="p-8 space-y-16">
            {/* Bagian Produk Program */}
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Produk Program</h2>
              <div className="space-y-8 max-w-4xl mx-auto">
                {program.produkUnggulan && program.produkUnggulan.length > 0 ? (
                  program.produkUnggulan.map((produk: ProdukUnggulan) => (
                    <div key={produk.id} className="flex flex-col md:flex-row items-center gap-8 p-6 border-2 border-red-100 rounded-lg bg-red-50/50">
                      <div className="flex-shrink-0">
                        {/* Menampilkan gambar pertama dari galeri produk */}
                        <Image 
                          src={produk.gambarProduk[0] || '/images/placeholder-produk.png'} 
                          alt={produk.namaProduk} 
                          width={200} 
                          height={200} 
                          objectFit="cover" 
                          className="rounded-md shadow-lg" 
                        />
                      </div>
                      <div className="flex flex-col self-stretch">
                        <h3 className="text-2xl font-bold text-red-800">{produk.namaProduk}</h3>
                        <div className="prose prose-sm mt-2 text-gray-600 flex-grow" dangerouslySetInnerHTML={{ __html: produk.deskripsiProduk }} />
                        <div className="mt-4">
                          <Link href={`/program/${program.slug}/produk/${produk.documentId}`}  className="inline-block bg-red-700 text-white font-semibold text-sm px-5 py-2 rounded-md hover:bg-red-800 transition-colors shadow-md transform hover:scale-105">
                            Lihat Spesifikasi
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 bg-gray-100 p-8 rounded-lg">
                      <p>Belum ada produk unggulan untuk program ini.</p>
                  </div>
                )}
              </div>
            </section>
            {/* Bagian Offtaker & Tindak Lanjut */}
            <section>
                <h2 className="text-3xl font-bold text-center text-gray-800">Potensi Offtaker</h2>
                <span className="block w-24 h-1 bg-red-600 mx-auto mt-2 mb-10"></span>
                <OfftakerMarquee program={program} />
            </section>
            <section>
              <h2 className="text-3xl font-bold text-center text-gray-800">Tindak Lanjut</h2>
              <span className="block w-24 h-1 bg-red-600 mx-auto mt-2 mb-10"></span>
              <TindakLanjutTabs program={program} />
            </section>
            <DocumentCarousel program={program} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

