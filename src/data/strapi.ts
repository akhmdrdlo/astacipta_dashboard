// src/types/strapi.ts

// Tipe untuk data media mentah dari Strapi
export interface StrapiMediaData {
  attributes: {
    url: string;
  };
}

export interface StrapiMedia {
  data: StrapiMediaData | null;
}

// Tipe untuk format Rich Text JSON dari Strapi
export interface StrapiRichTextNode {
  type: 'paragraph' | 'list';
  format?: 'ordered' | 'unordered';
  children: {
    type: 'list-item' | 'text';
    children: {
      type: 'text';
      text: string;
    }[];
  }[];
}

// Tipe untuk relasi (one-to-many, many-to-many, etc.)
export interface StrapiRelation<T> {
  data: {
    id: number;
    attributes: T;
  }[];
}

// Tipe untuk komponen yang bisa diulang
export type StrapiComponent<T> = T & { id: number };

// Tipe untuk atribut mentah dari produk unggulan (termasuk media)
export interface RawProdukAttributes {
  galeriProduk: StrapiMedia;
  [key: string]: any;
}

// Tipe utama untuk atribut mentah dari program yang diterima dari API
export interface RawProgramAttributes {
  namaProgram: string;
  slug: string;
  PICProgram: string;
  statusProgram: string;
  deskripsiLengkap: StrapiRichTextNode[];
  cakupanProgram: StrapiRichTextNode[];
  judulRoadmap: string;
  anggaran: number;
  sumberDana: string;
  progressTindakLanjut: StrapiRichTextNode[];
  risikoDanHambatan: StrapiRichTextNode[];
  gambarUtama: StrapiMedia;
  visualisasiCakupan: StrapiMedia;
  gambarRoadmap: StrapiMedia;
  daftarMitra?: StrapiComponent<any>[];
  daftarMitraPotensial?: StrapiComponent<any>[];
  potentialMarket?: StrapiComponent<any>[];
  produk_unggulans?: StrapiRelation<RawProdukAttributes>;
}

// Tipe untuk respons API Strapi secara keseluruhan
export interface StrapiApiResponse {
  data: ({
    id: number;
    attributes: RawProgramAttributes;
  } | null) [];
}
