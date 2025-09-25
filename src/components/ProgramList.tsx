// src/components/ProgramList.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Program } from '@/data/types';
import { ProgramCard } from './ProgramCard';

// Komponen ini menerima daftar program awal sebagai "prop"
interface ProgramListProps {
  initialPrograms: Program[];
}

export const ProgramList = ({ initialPrograms }: ProgramListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Gunakan useMemo untuk memfilter program hanya saat searchQuery berubah
  const filteredPrograms = useMemo(() => {
    if (!searchQuery) {
      return initialPrograms;
    }
    return initialPrograms.filter(program =>
      program.namaProgram.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, initialPrograms]);

  return (
    <div>
      {/* Search Bar */}
      <form className="max-w-2xl mx-auto mb-12 flex items-center border-2 border-gray-300 rounded-full overflow-hidden focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-300">
        <input 
          type="text" 
          placeholder="Cari Informasi Terkait Program..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-3 text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
        />
        <button 
            type="submit" 
            onClick={(e) => e.preventDefault()} // Mencegah reload halaman
            className="bg-red-600 text-white font-semibold px-6 py-3 hover:bg-red-700 transition-colors"
        >
          Cari
        </button>
      </form>
      
      {/* Grid Program */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};

