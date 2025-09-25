// src/app/loading.tsx
'use client';
export default function Loading() {
  return (
    // Kontainer utama dengan latar belakang putih
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
      
      {/* Definisi animasi yang disempurnakan */}
      <style jsx global>{`
        @keyframes text-slide-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-text-slide-up {
          animation: text-slide-up 3.5s ease-in-out infinite;
        }
        .animate-loading-bar {
          animation: loading-bar 2s linear infinite;
        }
      `}</style>
      
      <div className="text-center">
        {/* Kontainer untuk teks agar animasi tidak "melompat" */}
        <div className="h-12 overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wider animate-text-slide-up">
            Dashboard Asta Cipta...
          </h1>
        </div>
        
        {/* Kontainer untuk loading bar dengan warna yang disesuaikan */}
        <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-red-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
}

