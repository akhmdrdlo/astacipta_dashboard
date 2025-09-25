// src/components/UniversalModal.tsx
'use client';

import React, { useState } from 'react';

interface UniversalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; // Menerima konten apa pun sebagai 'children'
}

export const UniversalModal = ({ isOpen, onClose, title, children }: UniversalModalProps) => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Jika modal tidak terbuka, jangan render apa-apa untuk performa
  if (!isOpen) {
    return null;
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Kelas CSS dinamis berdasarkan state maximized
  const modalSizeClasses = isMaximized
    ? 'w-full h-full max-w-full max-h-full rounded-none' // Ukuran saat dimaksimalkan
    : 'w-full max-w-4xl max-h-[90vh] rounded-lg'; // Ukuran normal

  return (
    // Lapisan latar belakang gelap (overlay) dengan animasi fade-in
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose} // Menutup modal saat mengklik latar belakang
    >
      {/* Kontainer Modal dengan animasi scale-up */}
      <div 
        className={`relative bg-white shadow-2xl flex flex-col transform transition-all duration-300 animate-scale-up ${modalSizeClasses}`}
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik di dalam konten
      >
        {/* Header Modal dengan padding yang disesuaikan */}
        <div className="flex justify-between items-center border-b border-gray-200 p-6 flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-800 truncate pr-4">{title}</h3>
          <div className="flex items-center space-x-4">
            {/* Tombol Maximize/Minimize */}
            <button onClick={toggleMaximize} className="text-gray-500 hover:text-gray-800">
              {isMaximized ? (
                // Ikon Minimize
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20H4v-6M4 4h6v6M20 4h-6v6M14 20h6v-6" />
                </svg>
              ) : (
                // Ikon Maximize
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M4 4l5 5m11-1V4h-4M20 4l-5 5M4 16v4h4M4 20l5-5m11 1v4h-4M20 20l-5-5" />
                </svg>
              )}
            </button>
            {/* Tombol Tutup */}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
          </div>
        </div>

        {/* Konten Dinamis dengan padding vertikal dan horizontal */}
        <div className="flex-grow overflow-auto p-6">
            {children}
        </div>

        {/* Footer Modal dengan padding yang disesuaikan */}
        <div className="flex justify-end items-center border-t border-gray-200 p-6 flex-shrink-0">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

