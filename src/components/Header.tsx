// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchNavLinks, NavLink } from '@/lib/api'; // Impor fungsi dan tipe data baru

export const Header = () => {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mengambil data link navigasi saat komponen pertama kali dimuat
  useEffect(() => {
    const loadNavLinks = async () => {
      const links = await fetchNavLinks();
      setNavLinks(links);
    };
    loadNavLinks();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-red-700 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <Image 
            src="/assets-web/Logo Danantara White.png" 
            alt="Logo Danantara Indonesia" 
            width={150} 
            height={40} 
            priority
          />
        </Link>
        
        {/* Menu Navigasi Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="hover:text-gray-200 transition-colors flex items-center"
            >
              Program Utama
              <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-20 py-2">
                {navLinks.map(link => (
                  <Link 
                    key={link.slug} 
                    href={`/program/${link.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.namaProgram}
                  </Link>
                ))}
              </div>
            )}
          </div>
           <Link 
            href="/" 
            className="bg-white text-red-700 font-bold text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Dashboard
          </Link>
        </div>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Buka menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </nav>

      {/* Menu Overlay untuk Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-red-700 shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <h3 className="font-bold border-b border-white/20 pb-2">Program Utama</h3>
            {navLinks.map(link => (
                <Link 
                    key={link.slug} 
                    href={`/program/${link.slug}`}
                    className="hover:text-gray-200"
                    onClick={toggleMobileMenu}
                >
                    {link.namaProgram}
                </Link>
            ))}
             <Link 
                href="/" 
                className="bg-white text-red-700 font-bold text-sm px-4 py-2 rounded-md hover:bg-gray-200 text-center"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};

