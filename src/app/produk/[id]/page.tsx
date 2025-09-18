// src/app/produk/[id]/page.tsx
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
// Kita perlu mengimpor daftar produk mentah dari mockData
import { allMockProducts } from '@/data/mockData';
import type { ProdukUnggulan } from '@/data/types';

// ==============================================================================
// FUNGSI HELPER UNTUK MEMFORMAT TEKS DARI API
// ==============================================================================
const processRichText = (content: string): string => {
  // Jika konten kosong, kembalikan string kosong
  if (!content) return '';

  // Cek apakah konten sudah berisi tag HTML (seperti <p>, <ul>, <table>)
  // Jika ya, kembalikan apa adanya karena sudah diformat dari CMS
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(content);
  if (hasHtmlTags) {
    return content;
  }

  // Jika tidak ada tag HTML, proses sebagai teks biasa
  // 1. Pisahkan berdasarkan baris baru
  // 2. Hapus spasi di awal/akhir setiap baris
  // 3. Hapus baris yang kosong
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // Jika hanya ada satu baris (atau kurang), bungkus dengan tag paragraf
  if (lines.length <= 1) {
    return `<p>${content}</p>`;
  }

  // Jika lebih dari satu baris, ubah menjadi daftar berpoin (bullet list)
  return `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
};
// ==============================================================================


export default function ProdukDetailPage() {
  const params = useParams<{ id: string }>();
  
  const product: ProdukUnggulan | undefined = allMockProducts.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const backLink = `/program/${product.programSlug}/penjajakan`;

  return (
    <main className="bg-white">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Link href={backLink} className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center group mb-8">
          <span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&lt;</span> Kembali
        </Link>
        
        <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                    <Image 
                        src={product.gambarProduk} 
                        alt={product.namaProduk} 
                        width={400} 
                        height={400}
                        objectFit="contain"
                        className="transform transition-transform duration-500 hover:scale-105"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-sm font-bold text-red-700 uppercase tracking-widest relative inline-block pb-2">
                        Spesifikasi Produk
                        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-700"></span>
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-4 leading-tight">
                        {product.namaProduk}
                    </h1>
                </div>
            </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kolom Kiri */}
          <div className="border-t-4 border-red-700 pt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Spesifikasi Teknis</h2>
            <div 
              className="prose max-w-none text-gray-600" 
              // Gunakan fungsi helper di sini
              dangerouslySetInnerHTML={{ __html: processRichText(product.spesifikasiTeknis) }} 
            />
          </div>

          {/* Kolom Kanan */}
          <div className="border-t-4 border-red-700 pt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Keunggulan Kompetitif</h2>
            <div 
              className="prose max-w-none text-gray-600" 
              // Gunakan fungsi helper di sini juga
              dangerouslySetInnerHTML={{ __html: processRichText(product.keunggulanKompetitif) }} 
            />
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}

