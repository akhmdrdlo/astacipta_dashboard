// src/components/PartnerCarousel.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

// NOTE: Data ini sementara. Nantinya akan diambil dari props.
// Pastikan gambar-gambar ini ada di folder public/images/
const partners = [
    { name: 'THEON', logo: '/assets-web/theon-logo.png' },
    { name: 'ASELSAN', logo: '/assets-web/aselsan-logo.png' },
    { name: 'SAFRAN', logo: '/assets-web/safran-logo.png' },
    { name: 'MITRA 4', logo: '/assets-web/mitra-logo-4.png' },
    { name: 'MITRA 5', logo: '/assets-web/mitra-logo-5.png' },
    { name: 'MITRA 6', logo: '/assets-web/mitra-logo-6.png' },
    { name: 'MITRA 7', logo: '/assets-web/mitra-logo-7.png' },
];

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

export const PartnerCarousel = () => {
    const logosPerPage = 5;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Hitung berapa banyak "halaman" atau slide yang ada
    const totalPages = Math.ceil(partners.length / logosPerPage);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < totalPages - 1;

    const prevPage = () => canGoPrev && setCurrentIndex(prev => prev - 1);
    const nextPage = () => canGoNext && setCurrentIndex(prev => prev + 1);

    return (
        <section className="relative py-16 bg-cover bg-center bg-gray-700" style={{ backgroundImage: "url('/assets-web/lenbg.png')" }}>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-10">Partner K/L & Industri</h2>
                <div className="relative px-12">
                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {/* Membuat halaman-halaman untuk carousel */}
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <div key={pageIndex} className="flex-shrink-0 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-4 items-start justify-items-center">
                                    {partners.slice(pageIndex * logosPerPage, (pageIndex + 1) * logosPerPage).map((partner) => (
                                        <div key={partner.name} className="flex flex-col items-center text-center w-full">
                                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center p-2 backdrop-blur-sm shadow-lg">
                                                <Image src={partner.logo} alt={partner.name} width={100} height={100} objectFit="contain" />
                                            </div>
                                            {/* Nama bisa ditampilkan jika perlu */}
                                            <p className="text-white font-semibold mt-3 text-sm">{partner.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tombol navigasi hanya muncul jika ada lebih dari 1 halaman */}
                    {totalPages > 1 && (
                        <>
                            <Arrow direction="left" onClick={prevPage} disabled={!canGoPrev} />
                            <Arrow direction="right" onClick={nextPage} disabled={!canGoNext} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
