// src/lib/api.ts

import { Program,ProdukUnggulan} from '@/data/types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// --- Tipe Data Internal ---
// Tipe ini sekarang mencerminkan struktur "datar" dari API Anda, TANPA 'attributes'
interface RawApiProgram {
  id: number;
  updatedAt: string;
  namaProgram: string;
  slug: string;
  PICProgram: string;
  statusProgram?: string;
  deskripsiProgram?: any[];
  cakupanProgram?: any[];
  progressTindakLanjut?: any[];
  risikoDanHambatan?: any[];
  prediksiAnggaran?: number | string;
  sumberDana?: string;
  gambarUtama?: {
    url: string;
    [key: string]: any;
  };
  // Properti relasional akan ditambahkan oleh populate=deep
  [key: string]: any;
}

// --- Fungsi Helper ---

const convertRichTextToHtml = (nodes: any[] | undefined): string => {
  if (!Array.isArray(nodes)) return '';
  
  return nodes.map(node => {
    if (node.type === 'paragraph') {
      // Menggabungkan semua anak paragraf menjadi satu string HTML
      const innerHtml = node.children.map((child: any) => {
        const text = child.text.replace(/\n/g, '<br>'); // Ganti baris baru dengan <br>
        if (child.bold) {
          // Jika teksnya bold, bungkus dengan <strong>
          return `<strong>${text}</strong>`;
        }
        return text;
      }).join('');
      // Jika paragraf hanya berisi teks bold, anggap sebagai judul
      if (node.children.length === 1 && node.children[0].bold) {
        return `<h4 class="text-lg font-semibold text-gray-800 mt-4">${node.children[0].text}</h4>`;
      }
      return `<p class="text-gray-600">${innerHtml}</p>`;
    }
    if (node.type === 'list') {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      const listItems = node.children.map((li: any) => {
        const itemHtml = li.children.map((child: any) => child.text).join('');
        return `<li>${itemHtml}</li>`;
      }).join('');
      return `<${tag} class="list-disc list-inside space-y-1 text-gray-600">${listItems}</${tag}>`;
    }
    return '';
  }).join('');
};


const getImageUrl = (imageObject: { url: string } | undefined): string => {
  if (imageObject?.url) {
    // Jika URL sudah lengkap, gunakan langsung. Jika tidak, tambahkan API_URL.
    return imageObject.url.startsWith('http') ? imageObject.url : API_URL + imageObject.url;
  }
  return '/images/placeholder.png'; // Fallback
};


/**
 * Fungsi utama untuk memformat data dari API Strapi menjadi format frontend.
 */
const formatProgramData = (item: RawApiProgram | null): Program | null => {
  if (!item) {
    return null;
  }

  // Sekarang kita mengakses properti langsung dari 'item', bukan 'item.attributes'
  return {
    id: item.id,
    updatedAt: item.updatedAt,
    namaProgram: item.namaProgram,
    slug: item.slug,
    PICProgram: item.PICProgram,
    statusProgram: item.statusProgram || 'Perencanaan',
    gambarUtama: getImageUrl(item.gambarUtama),
    deskripsiLengkap: convertRichTextToHtml(item.deskripsiProgram),
    cakupanProgram: convertRichTextToHtml(item.cakupanProgram),
    progressTindakLanjut: convertRichTextToHtml(item.progressTindakLanjut),
    risikoDanHambatan: convertRichTextToHtml(item.risikoDanHambatan),
    anggaran: Number(item.prediksiAnggaran) || 0,
    sumberDana: item.sumberDana || '-',
    Roadmap: (item.Roadmap || []).map((roadmap: any) => ({
      id: roadmap.id,
      judulRoadmap: roadmap.judulRoadmap,
      roadmap: getImageUrl(roadmap.roadmap)
    })),
    daftarMitra: (item.Mitra || []).map((mitra: any) => ({
      ...mitra,
      logoInstansi: getImageUrl(mitra.logoInstansi)
    })),
    daftarMitraPotensial: (item.daftarMitraPotensial || []).map((mitra: any) => ({
      ...mitra,
      logoInstansi: getImageUrl(mitra.logoInstansi)
    })),
    potentialMarket: (item.PasarPotensial || []).map((market: any) => ({
      ...market,
      logoInstansi: getImageUrl(market.logoInstansi),
    })),
    dokumenTerkait: (item.dokumenTerkait || []).map((doc: any) => ({
        nama: doc.name,
        url: getImageUrl(doc)
    })),
    produkUnggulan: (item.produks || []).map((prod: any) => ({
      ...prod,
      id: prod.id,
      documentId: prod.documentId,
      deskripsiProduk: convertRichTextToHtml(prod.deskripsiProduk),
      gambarProduk: (prod.gambarProduk || []).map(getImageUrl).filter(Boolean) as string[],
    })),
  } as Program;
};

const formatProductData = (item: RawApiProgram | null): ProdukUnggulan | null => {
    if (!item) return null;
    return {
        id: item.id,
        documentId: item.documentId,
        programSlug: item.program?.slug || '',
        namaProduk: item.namaProduk,
        gambarProduk: (item.gambarProduk || []).map(getImageUrl).filter(Boolean) as string[],
        lampiran: (item.lampiran || []).map(getImageUrl).filter(Boolean) as string[],
        deskripsiProduk: convertRichTextToHtml(item.deskripsiProduk),
        spesifikasiTeknis: convertRichTextToHtml(item.spesifikasiTeknis),
        keunggulanKompetitif: convertRichTextToHtml(item.keunggulanKompetitif),
        linkInformasi: item.linkInformasi || '',
    } as ProdukUnggulan;
}

// --- FUNGSI UNTUK AI ASSISTANT (YANG DIPERBARUI) ---

/**
 * Mengubah array objek program menjadi satu string teks yang SANGAT DETAIL
 * sebagai konteks untuk Gemini.
 */
export const formatProgramsToTextContext = (programs: Program[]): string => {
    let context = "Berikut adalah data lengkap dari semua program monitoring Asta Cipta:\n\n";

    programs.forEach(p => {
        const cleanText = (html: string) => html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();

        context += `--- PROGRAM ---\n`;
        context += `Nama Program: ${p.namaProgram}\n`;
        context += `ID: ${p.id}\n`;
        context += `Slug URL: ${p.slug}\n`;
        context += `Penanggung Jawab (PIC): ${p.PICProgram}\n`;
        context += `Status: ${p.statusProgram}\n`;
        context += `Deskripsi: ${cleanText(p.deskripsiLengkap)}\n`;
        context += `Cakupan: ${cleanText(p.cakupanProgram)}\n`;
        context += `Anggaran: ${p.anggaran}\n`;
        context += `Sumber Dana: ${p.sumberDana}\n`;
        context += `Progress & Tindak Lanjut: ${cleanText(p.progressTindakLanjut)}\n`;
        context += `Risiko & Hambatan: ${cleanText(p.risikoDanHambatan)}\n`;
        
        if (p.daftarMitra && p.daftarMitra.length > 0) {
            context += `Mitra Kerjasama:\n`;
            p.daftarMitra.forEach(m => {
                context += `  - ${m.namaInstansi} (Kategori: ${m.kategori}, Tipe: ${m.tipeKerjasama}, Sejak: ${new Date(m.tahunKerjasama).getFullYear()})\n`;
            });
        }
        
        if (p.potentialMarket && p.potentialMarket.length > 0) {
            context += `Potensi Pasar (Offtaker):\n`;
            p.potentialMarket.forEach(market => {
                context += `  - ${market.namaInstansi}\n`;
            });
        }

        if (p.produkUnggulan && p.produkUnggulan.length > 0) {
            context += `Produk Unggulan:\n`;
            p.produkUnggulan.forEach(prod => {
                context += `  - Nama Produk: ${prod.namaProduk}, Deskripsi: ${cleanText(prod.deskripsiProduk)}\n`;
            });
        }
        context += `\n`;
    });

    return context;
};

export async function askGemini(konteks: string, pertanyaan: string): Promise<string> {
    if (!GEMINI_API_KEY) {
        return "Error: Kunci API Gemini belum dikonfigurasi.";
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
    const systemPrompt = "Anda adalah AI Assistant untuk Dasbor Monitoring Program Asta Cipta. Jawab pertanyaan HANYA berdasarkan konteks data program yang diberikan. Jangan gunakan informasi lain. Jawab dengan ringkas dan profesional dalam Bahasa Indonesia.";
    const payload = {
        contents: [{ parts: [{ text: `KONTEKS:\n${konteks}\n\nPERTANYAAN:\n${pertanyaan}` }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorBody = await response.json();
            return `Maaf, terjadi kesalahan dari API: ${errorBody.error.message}`;
        }
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat menemukan jawaban.";
    } catch (error) {
        return "Maaf, terjadi masalah koneksi dengan AI Assistant.";
    }
}


// --- Fungsi API Publik ---
// Tipe data baru untuk link navigasi
export interface NavLink {
    namaProgram: string;
    slug: string;
}

export async function fetchNavLinks(): Promise<NavLink[]> {
    try {
        // Hanya meminta field namaProgram dan slug untuk efisiensi
        const res = await fetch(`${API_URL}/api/programs?fields[0]=namaProgram&fields[1]=slug`);
        if (!res.ok) throw new Error('Gagal mengambil data navigasi');
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        if (!Array.isArray(data)) return [];
        // Cukup mengembalikan data yang sudah minimal
        return data;
    } catch (error) {
        console.error("Error saat mengambil link navigasi:", error);
        return [];
    }
}

export async function fetchPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API_URL}/api/programs?populate=gambarUtama&sort=updatedAt:desc`);
    if (!res.ok) throw new Error('Gagal mengambil data program');
    const json = await res.json();
    // Memastikan kita menangani kedua kemungkinan format respons API
    const data = Array.isArray(json) ? json : json.data;
    if (!Array.isArray(data)) return [];
    return data.map(formatProgramData).filter((p): p is Program => p !== null);
  } catch (error) {
    console.error("Error saat mengambil daftar program:", error);
    return [];
  }
}

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const populateQuery = new URLSearchParams({
        'populate[gambarUtama]': 'true',
        'populate[Roadmap][populate]':'roadmap',
        'populate[Mitra][populate]': 'logoInstansi',
        'populate[MitraPotensial][populate]': 'logoInstansi', 
        'populate[PasarPotensial][populate]': 'logoInstansi',
        'populate[produks][populate]': '*',
        'populate[dokumenTerkait]': 'true',
    }).toString();
    
    const res = await fetch(`${API_URL}/api/programs?filters[slug][$eq]=${slug}&${populateQuery}`);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`Gagal mengambil program dengan slug: ${slug}. Status: ${res.status}`);
    }

    const json = await res.json();
    const data = Array.isArray(json) ? json : json.data;
    if (!Array.isArray(data) || data.length === 0) return null;
    return formatProgramData(data[0]); 
  } catch (error) {
    console.error("Error saat mengambil program berdasarkan slug:", error);
    return null;
  }
}

export async function fetchProductByDocumentId(documentId: string): Promise<ProdukUnggulan | null> {
    try {
        const populateQuery = new URLSearchParams({
            'populate[gambarProduk]': 'true',
            'populate[lampiran]': 'true',
            'populate[program][populate]': '*',
        }).toString();
        const res = await fetch(`${API_URL}/api/produks?filters[documentId][$eq]=${documentId}&${populateQuery}`);
        if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(`Gagal mengambil produk: ${errorBody}`);
        }
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        if (!Array.isArray(data) || data.length === 0) return null;
        return formatProductData(data[0]);
    } catch (error) {
        console.error(`Error saat mengambil produk by documentId:`, error);
        return null;
    }
}