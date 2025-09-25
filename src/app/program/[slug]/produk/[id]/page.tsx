// src/app/program/[slug]/produk/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Impor Komponen & API
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UniversalModal } from '@/components/UniversalModal';
import { fetchProductByDocumentId } from '@/lib/api';
import type { ProdukUnggulan } from '@/types';
import Loading from '@/app/loading';

// Helper untuk memformat teks
const processRichText = (htmlString: string): string => {
    if (!htmlString) return '<p>Informasi tidak tersedia.</p>';
    if (/<[a-z][\s\S]*>/i.test(htmlString)) return htmlString;
    const lines = htmlString.split('\n').filter(line => line.trim() !== '');
    const isKeyValue = lines.length > 0 && lines.every(line => line.includes(':'));
    if (isKeyValue) {
      let tableHtml = '<div class="space-y-3">';
      lines.forEach(line => {
        const parts = line.split(':');
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        tableHtml += `<div class="flex flex-col sm:flex-row py-3 border-b border-gray-200 last:border-b-0"><dt class="w-full sm:w-1/3 font-semibold text-gray-800 flex-shrink-0">${key}</dt><dd class="w-full sm:w-2/3 text-gray-600 mt-1 sm:mt-0">${value}</dd></div>`;
      });
      return tableHtml + '</div>';
    }
    if (lines.length > 1) return `<ul class="list-disc list-inside space-y-1">${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
    return `<p>${htmlString}</p>`;
};

// Sub-komponen untuk kartu lampiran (diubah menjadi tombol)
const AttachmentCard = ({ fileUrl, index, onClick }: { fileUrl: string; index: number; onClick: (index: number) => void; }) => {
    const fileName = decodeURI(fileUrl.split('/').pop() || 'Lampiran');
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExtension);

    const renderIcon = () => {
        if (isImage) {
            return <Image src={fileUrl} alt={fileName} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-300" />;
        }
        return (
            <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                <span className="mt-2 text-xs font-bold uppercase">{fileExtension}</span>
            </div>
        );
    };

    return (
        <button 
          onClick={() => onClick(index)}
          className="group flex-shrink-0 w-48 block bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden text-left"
        >
            <div className="relative h-32">
                {renderIcon()}
            </div>
            <div className="p-3">
                <p className="text-xs font-semibold text-gray-700 truncate group-hover:text-red-600">{fileName}</p>
                <p className="text-xs text-red-600 font-bold mt-1">Lihat Pratinjau</p>
            </div>
        </button>
    );
};


// Komponen Halaman Detail Produk
export default function ProdukDetailPage() {
  const params = useParams<{ slug: string, id: string }>();
  const [product, setProduct] = useState<ProdukUnggulan | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk Carousel Gambar Produk & Modal
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // State untuk Modal & Carousel Lampiran
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const productData = await fetchProductByDocumentId(params.id as string);
        if (productData) setProduct(productData);
        else notFound();
        setLoading(false);
      }
    };
    loadProduct();
  }, [params.id]);

  // Handlers untuk Modal Lampiran
  const handleOpenAttachmentModal = (index: number) => {
    setSelectedAttachmentIndex(index);
    setIsAttachmentModalOpen(true);
  };
  const handleCloseAttachmentModal = () => setIsAttachmentModalOpen(false);
  
  // Handlers untuk Carousel Lampiran di dalam modal
  const goToNextAttachment = () => product && setSelectedAttachmentIndex(prev => (prev + 1) % product.lampiran.length);
  const goToPrevAttachment = () => product && setSelectedAttachmentIndex(prev => (prev - 1 + product.lampiran.length) % product.lampiran.length);


  if (loading || !product) return <Loading />;

  const backLink = `/program/${params.slug}/penjajakan`;
  const mainImage = product.gambarProduk?.[activeImageIndex] || '/images/placeholder-produk.png';
  const selectedAttachment = product.lampiran?.[selectedAttachmentIndex];

  return (
    <>
      <main className="bg-white">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            {/* Header Konten */}
            <div className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-200 pb-8">
                <div className="flex-shrink-0 w-full md:w-1/3">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src={mainImage} 
                            alt={product.namaProduk} 
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                    <Link href={backLink} className="text-red-600 hover:text-red-800 font-semibold inline-flex items-center group mb-4">
                      <span className="transform transition-transform duration-200 group-hover:-translate-x-1 mr-2">&lt;</span> Kembali
                    </Link>
                    <h2 className="text-sm uppercase text-gray-500 tracking-widest">Spesifikasi Produk</h2>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-1">{product.namaProduk}</h1>
                </div>
            </div>

            {/* Konten Spesifikasi Dua Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
              
              <div className="border-t-4 border-red-700 pt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Spesifikasi Teknis</h2>
                <div 
                  className="prose-custom max-w-none text-gray-600" 
                  dangerouslySetInnerHTML={{ __html: processRichText(product.spesifikasiTeknis) }} 
                />
              </div>

              <div className="border-t-4 border-red-700 pt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Keunggulan Kompetitif</h2>
                <div 
                  className="prose-custom max-w-none text-gray-600" 
                  dangerouslySetInnerHTML={{ __html: processRichText(product.keunggulanKompetitif) }} 
                />
              </div>
            </div>
              
              {/* === BAGIAN BARU: LAMPIRAN & TAUTAN === */}
              <div className="mt-12 space-y-12">
                {product.lampiran && product.lampiran.length > 0 && (
                  <div className="border-t-4 border-red-700 pt-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Lampiran & Dokumen</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {product.lampiran.map((fileUrl, index) => (
                        <AttachmentCard key={index} fileUrl={fileUrl} index={index} onClick={handleOpenAttachmentModal} />
                      ))}
                    </div>
                  </div>
                )}
                {product.linkInformasi && (
                   <div className="border-t-4 border-red-700 pt-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Tautan Referensi</h2>
                    <div className="prose max-w-none text-gray-600 prose-a:text-red-600 hover:prose-a:underline" dangerouslySetInnerHTML={{ __html: processRichText(product.linkInformasi) }} />
                  </div>
                )}
              </div>
          </div>
        </div>
        <Footer />
      </main>

      {/* Modal untuk Lampiran */}
      <UniversalModal isOpen={isAttachmentModalOpen} onClose={handleCloseAttachmentModal} title="Pratinjau Lampiran">
        {selectedAttachment && (
          <div className="relative">
            <div className="w-full h-[60vh] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                { ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(selectedAttachment.split('.').pop()?.toLowerCase() || '') ? (
                    <Image src={selectedAttachment} alt="Pratinjau Lampiran"
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-contain rounded-md"/>
                ) : (
                    <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <p className="mt-2 font-semibold">Pratinjau tidak tersedia untuk tipe file ini.</p>
                    </div>
                )}
            </div>
            {product.lampiran.length > 1 && (
                <>
                    <button onClick={goToPrevAttachment} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">&lt;</button>
                    <button onClick={goToNextAttachment} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">&gt;</button>
                </>
            )}
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-700 font-semibold truncate pr-4">{decodeURI(selectedAttachment.split('/').pop() || 'Lampiran')}</p>
                <a href={selectedAttachment} download className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition-colors">Unduh</a>
            </div>
          </div>
        )}
      </UniversalModal>
    </>
  );
}

