// src/app/page.tsx
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgramList } from '@/components/ProgramList'; // Impor komponen daftar program
import { fetchPrograms } from '@/lib/api';

// Fungsi helper untuk memformat string tanggal ke "DD NAMA BULAN YYYY"
const formatUpdateDate = (dateString: string): string => {
  if (!dateString) return 'Data belum tersedia';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// Halaman ini sekarang menjadi Server Component untuk mengambil data
export default async function Home() {
  const programsFromApi = await fetchPrograms();
  const lastUpdateDate = programsFromApi.length > 0 ? programsFromApi[0].updatedAt : null;
  const programsForDisplay = [...programsFromApi].sort((a, b) => a.id - b.id);

  return (
    <main className="bg-white">
      <Header />
      
      <section 
        className="relative h-[50vh] flex flex-col justify-center items-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/assets-web/hero-bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        {lastUpdateDate && (
          <div className="absolute top-0 left-0 bg-red-700 text-white text-sm font-semibold px-4 py-2 shadow-lg">
            Terakhir di Update: {formatUpdateDate(lastUpdateDate)}
          </div>
        )}
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

      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block pb-2">
            8 Program Utama Asta Cipta
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-red-600"></span>
          </h2>
        </div>

        {/* Gunakan komponen ProgramList dan berikan data dari API */}
        <ProgramList initialPrograms={programsForDisplay} />

      </section>

      
      <Footer />
    </main>
  );
}

