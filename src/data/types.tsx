// src/types/index.ts

// Tipe BARU untuk komponen Roadmap
export interface Roadmap {
  id: number;
  judulRoadmap: string;
  roadmap: string; // Akan berisi URL gambar
}

// Tipe untuk Mitra yang sudah bekerja sama
export interface Mitra {
  logoInstansi: string;
  namaInstansi: string;
  kategori: 'Institusi Pendidikan' | 'Swasta Dalam Negeri' | 'Swasta Luar Negeri' | 'BUMN' | 'Kolaboratif Lain';
  tipeKerjasama: string;
  tahunKerjasama: number;
  detailKerjasama: string;
}

// Tipe untuk Mitra Teknologi Potensial
export interface MitraPotensialTeknologi {
  logoInstansi: string;
  namaInstansi: string;
  detailPotensi: string;
}

// Tipe untuk Pasar Potensial
export interface PasarPotensial {
  namaInstansi: string;
  logoInstansi: string;
  potensiPasar: string;
}

// Tipe untuk Produk Unggulan
export interface ProdukUnggulan {
  id: number;
  documentId: string;
  programSlug: string;
  namaProduk: string;
  gambarProduk: string[];
  deskripsiProduk: string;
  spesifikasiTeknis: string;
  keunggulanKompetitif: string;
  linkInformasi: string;
  lampiran: string[]; 
}

// Tipe utama untuk Program
export interface Program {
  id: number;
  updatedAt: string;
  namaProgram: string;
  slug: string;
  PICProgram: string;
  statusProgram: 'Perencanaan' | 'R&D' | 'Prototipe' | 'Uji Coba' | 'Produksi Awal' | 'Selesai';
  gambarUtama: string;
  deskripsiLengkap: string;
  cakupanProgram: string;
  Roadmap: Roadmap[];
  daftarMitra: Mitra[];
  anggaran: number;
  sumberDana: string;
  daftarMitraPotensial: MitraPotensialTeknologi[];
  potentialMarket: PasarPotensial[];
  progressTindakLanjut: string;
  risikoDanHambatan: string;
  dokumenTerkait: { nama: string; url: string }[];
  produkUnggulan: ProdukUnggulan[];
}