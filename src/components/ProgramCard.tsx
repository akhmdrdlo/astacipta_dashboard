// src/components/ProgramCard.tsx
import type { Program } from '@/data/types'; // <-- PERBAIKAN: Menggunakan path alias '@/' yang benar
import Image from 'next/image';
import Link from 'next/link';

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  // Menambahkan gambar fallback untuk mencegah error jika 'gambarUtama' tidak ada
  const imageUrl = program.gambarUtama || '/images/placeholder.png';

  return (
    <Link href={`/program/${program.slug}`}>
      <div className="relative h-80 w-full rounded-xl overflow-hidden group shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
        {/* Gambar Latar */}
        <Image
          src={imageUrl}
          alt={`Gambar untuk ${program.namaProgram}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
        
        {/* Konten Teks */}
        <div className="absolute bottom-0 left-0 p-5 text-white">
          <h3 className="font-bold text-xl leading-tight group-hover:text-red-400 transition-colors">
            {program.namaProgram}
          </h3>
          <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Baca Selengkapnya...
          </p>
        </div>
      </div>
    </Link>
  );
};

