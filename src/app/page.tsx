// src/app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgramCard } from '@/components/ProgramCard';
import { mockPrograms } from '@/data/mockData';
import type { Program } from '@/data/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>(mockPrograms);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setFilteredPrograms(mockPrograms);
    } else {
      const results = mockPrograms.filter(program =>
        program.namaProgram.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPrograms(results);
    }
  };

  return (
    <main className="bg-white">
      <Header />
      
      {/* Hero Section yang sudah ada */}
      <section 
        className="relative h-[50vh] flex flex-col justify-center items-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/assets-web/hero-bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center space-y-8 p-4 text-center">
          <h1 className="hero-title">
            Dashboard Monitoring <br/> Asta Cipta Len
          </h1>
          <div className="flex items-center space-x-4 md:space-x-8">
            <Image src="/assets-web/Logo Danantara White.png" alt="Danantara Logo" width={150} height={40} />
            <Image src="/assets-web/defendID.png" alt="Defend ID Logo" width={100} height={40} />
            <Image src="/assets-web/Logo Len White.png" alt="Len Logo" width={100} height={40} />
          </div>
        </div>
      </section>

      {/* Bagian Program Utama (Desain Baru) */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block pb-2">
            8 Program Utama Asta Cipta
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-red-600"></span>
          </h2>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 flex items-center border-2 border-gray-300 rounded-full overflow-hidden focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-300">
          <input 
            type="text" 
            placeholder="Cari Informasi Terkait Program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
          />
          <button type="submit" className="bg-red-600 text-white font-semibold px-6 py-3 hover:bg-red-700 transition-colors">
            Cari
          </button>
        </form>
        
        {/* Grid Program */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

