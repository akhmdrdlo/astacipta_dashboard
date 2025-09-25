// src/app/program/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Impor Komponen & API
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PartnerAccordion } from '@/components/PartnerAccordion';
import { ScopeCarousel } from '@/components/ScopeCarousel'; // <-- 1. Impor komponen baru
import { fetchProgramBySlug } from '@/lib/api'; 

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await fetchProgramBySlug(params.slug);
  
  if (!program) {
    notFound();
  }

  return (
    <main className="bg-gray-100">
      <Header />
      
      <section className="relative h-72 flex items-center justify-center text-center p-4 bg-gray-800">
          <Image 
              src={program.gambarUtama || '/assets-web/placeholder.jpg'} 
              alt={`Latar belakang ${program.namaProgram}`} 
              layout="fill" 
              objectFit="cover" 
              className="opacity-20" 
              priority 
          />
          <div className="relative z-10">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider leading-tight">
                  {program.namaProgram}
              </h1>
          </div>
      </section>
      
      <div className="container mx-auto px-6 py-8 -mt-16">
        <div className="relative bg-white rounded-lg shadow-xl p-8 space-y-16">
            
            <Link href="/" className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center group">
              <span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&lt;</span> Kembali ke Dasbor
            </Link>
            
            <section>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Deskripsi Program</h2>
                    <p className="text-gray-500 text-3l font-bold mt-1">PIC: {program.PICProgram}</p>
                    <span className="block w-24 h-1 bg-red-600 mx-auto mt-2"></span>
                </div>
                <div className="prose max-w-4xl mx-auto text-gray-600" dangerouslySetInnerHTML={{ __html: program.deskripsiLengkap }} />
            </section>
            
            <section 
              className="relative py-16 bg-cover bg-center bg-fixed" 
              style={{ backgroundImage: "url('/assets-web/lenbg2.png')" }} 
            >
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="relative container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block pb-2">
                    Cakupan Program
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-red-600"></span>
                  </h2>
                </div>
                <ScopeCarousel cakupanProgramHtml={program.cakupanProgram} />
              </div>
            </section>
            {program.daftarMitra && program.daftarMitra.length > 0 && (
              <section className="max-w-4xl mx-auto">
                  <PartnerAccordion mitraList={program.daftarMitra} />
              </section>
            )}

            <section className="text-center pt-8 border-t border-gray-200">
                <Link href={`/program/${program.slug}/penjajakan`} className="inline-block bg-red-700 text-white font-bold py-4 px-12 rounded-lg hover:bg-red-800 transition-colors text-xl shadow-lg transform hover:scale-105">
                    Lihat Penjajakan Pasar
                </Link>
            </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

