// src/components/ProgramCard.tsx
import { Program } from '../data/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProgramCardProps {
  program: Program;
}

// const statusColorMap: { [key in Program['statusProgram']]: string } = {
//   'Perencanaan': 'bg-gray-500',
//   'R&D': 'bg-blue-500',
//   'Prototipe': 'bg-purple-500',
//   'Uji Coba': 'bg-yellow-500 text-black',
//   'Produksi Awal': 'bg-orange-500',
//   'Selesai': 'bg-green-500',
// };

export const ProgramCard = ({ program }: ProgramCardProps) => {
  // const color = statusColorMap[program.statusProgram] || 'bg-gray-500';

  return (
    <Link href={`/program/${program.slug}`}>
      <div className="relative h-64 w-full rounded-lg overflow-hidden group shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
        {/* Gambar Latar */}
        <Image
          src={program.gambarUtama}
          alt={`Gambar untuk ${program.namaProgram}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Konten Teks */}
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="font-bold text-lg leading-tight">{program.namaProgram}</h3>
          <p className="text-sm text-gray-300 mt-1">Baca Selengkapnya...</p>
        </div>
      </div>
    </Link>
  );
};
