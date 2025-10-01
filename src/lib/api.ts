import { Program, ProdukUnggulan, NavLink } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// --- Tipe Data Internal (disesuaikan untuk struktur 'attributes') ---
interface StrapiDataItem<T> {
  id: number;
  attributes: T;
}

interface StrapiApiResponse<T> {
  data: StrapiDataItem<T>[] | StrapiDataItem<T> | null;
}

// --- Fungsi Helper ---

const convertRichTextToHtml = (nodes: any[] | undefined): string => {
  if (!Array.isArray(nodes)) return '';
  return nodes.map(node => {
    if (node.type === 'paragraph') {
      const innerHtml = node.children.map((child: any) => child.bold ? `<strong>${child.text}</strong>` : child.text).join('');
      if (node.children.length === 1 && node.children[0].bold) {
        return `<h4 class="text-lg font-semibold text-gray-800 mt-4">${node.children[0].text}</h4>`;
      }
      return `<p class="text-gray-600">${innerHtml}</p>`;
    }
    if (node.type === 'list') {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      const listItems = node.children.map((li: any) => `<li>${li.children.map((child: any) => child.text).join('')}</li>`).join('');
      return `<${tag} class="list-disc list-inside space-y-1 text-gray-600">${listItems}</${tag}>`;
    }
    return '';
  }).join('');
};

const getImageUrl = (imageObject: any): string | null => {
  const url = imageObject?.data?.attributes?.url;
  if (url) {
    return url.startsWith('http') ? url : API_URL + url;
  }
  return null;
};

const getMultipleImageUrls = (mediaField: any): string[] => {
    if (!mediaField?.data || !Array.isArray(mediaField.data)) return [];
    return mediaField.data.map((img: any) => getImageUrl({ data: img })).filter((url): url is string => url !== null);
}

const formatProgramData = (item: StrapiDataItem<any> | null): Program | null => {
  if (!item || !item.attributes) return null;

  const { id, attributes } = item;

  return {
    id,
    updatedAt: attributes.updatedAt,
    namaProgram: attributes.namaProgram,
    slug: attributes.slug,
    PICProgram: attributes.PICProgram,
    statusProgram: attributes.statusProgram || 'Perencanaan',
    gambarUtama: getImageUrl(attributes.gambarUtama) || '/images/placeholder.png',
    deskripsiLengkap: convertRichTextToHtml(attributes.deskripsiLengkap || attributes.deskripsiProgram),
    cakupanProgram: convertRichTextToHtml(attributes.cakupanProgram),
    progressTindakLanjut: convertRichTextToHtml(attributes.progressTindakLanjut),
    risikoDanHambatan: convertRichTextToHtml(attributes.risikoDanHambatan),
    anggaran: Number(attributes.anggaran || attributes.prediksiAnggaran) || 0,
    sumberDana: attributes.sumberDana || '-',
    Roadmap: (attributes.Roadmap || []).map((roadmap: any) => ({ ...roadmap, roadmap: getImageUrl(roadmap.roadmap) })),
    daftarMitra: (attributes.Mitra || attributes.daftarMitra || []).map((mitra: any) => ({ ...mitra, logoInstansi: getImageUrl(mitra.logoInstansi || mitra.logo) })),
    daftarMitraPotensial: (attributes.MitraPotensial || attributes.daftarMitraPotensial || []).map((mitra: any) => ({ ...mitra, logoInstansi: getImageUrl(mitra.logoInstansi || mitra.logo) })),
    potentialMarket: (attributes.PasarPotensial || attributes.potentialMarket || []).map((market: any) => ({ ...market, logoInstansi: getImageUrl(market.logoInstansi) })),
    produkUnggulan: (attributes.produks?.data || []).map((prod: StrapiDataItem<any>) => ({
      ...prod.attributes,
      id: prod.id.toString(),
      documentId: prod.attributes.documentId,
      gambarProduk: getMultipleImageUrls(prod.attributes.gambarProduk),
      deskripsiProduk: convertRichTextToHtml(prod.attributes.deskripsiProduk),
    })),
    dokumenTerkait: (attributes.dokumenTerkait?.data || []).map((doc: any) => ({
        nama: doc.attributes.name,
        url: getImageUrl({ data: doc }) || ''
    })),
  } as Program;
};

const formatProductData = (item: StrapiDataItem<any> | null): ProdukUnggulan | null => {
    if (!item || !item.attributes) return null;
    const { id, attributes } = item;
    return {
        id: id.toString(),
        documentId: attributes.documentId,
        programSlug: attributes.program?.data?.attributes?.slug || '',
        namaProduk: attributes.namaProduk,
        gambarProduk: getMultipleImageUrls(attributes.gambarProduk),
        lampiran: getMultipleImageUrls(attributes.lampiran),
        deskripsiProduk: convertRichTextToHtml(attributes.deskripsiProduk),
        spesifikasiTeknis: convertRichTextToHtml(attributes.spesifikasiTeknis),
        keunggulanKompetitif: convertRichTextToHtml(attributes.keunggulanKompetitif),
        linkInformasi: attributes.linkInformasi || '',
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

// --- Fungsi API Publik ---

export async function fetchAllProgramsForSearch(): Promise<Program[]> {
    try {
        const res = await fetch(`${API_URL}/api/programs?populate=deep`);
        if (!res.ok) throw new Error('Gagal mengambil semua data program');
        const json: StrapiApiResponse<any> = await res.json();
        const data = json.data;
        if (!Array.isArray(data)) return [];
        return data.map(formatProgramData).filter((p): p is Program => p !== null);
    } catch (error) {
        console.error("Error saat mengambil semua program untuk pencarian:", error);
        return [];
    }
}

export async function fetchNavLinks(): Promise<NavLink[]> {
    try {
        const res = await fetch(`${API_URL}/api/programs?fields[0]=namaProgram&fields[1]=slug`);
        if (!res.ok) throw new Error('Gagal mengambil data navigasi');
        const json: StrapiApiResponse<{namaProgram: string, slug: string}> = await res.json();
        const data = json.data;
        if (!Array.isArray(data)) return [];
        return data.map(item => item.attributes);
    } catch (error) {
        console.error("Error saat mengambil link navigasi:", error);
        return [];
    }
}

export async function fetchPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API_URL}/api/programs?populate=gambarUtama&sort=updatedAt:desc`);
    if (!res.ok) throw new Error('Gagal mengambil data program');
    const json: StrapiApiResponse<any> = await res.json();
    const data = json.data;
    if (!Array.isArray(data)) return [];
    return data.map(formatProgramData).filter((p): p is Program => p !== null);
  } catch (error) {
    console.error("Error saat mengambil daftar program:", error);
    return [];
  }
}

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const res = await fetch(`${API_URL}/api/programs?filters[slug][$eq]=${slug}&populate=deep`);
    if (!res.ok) throw new Error(`Gagal mengambil program dengan slug: ${slug}`);
    const json: StrapiApiResponse<any> = await res.json();
    const data = json.data;
    if (!Array.isArray(data) || data.length === 0) return null;
    return formatProgramData(data[0]); 
  } catch (error) {
    console.error("Error saat mengambil program berdasarkan slug:", error);
    return null;
  }
}

export async function fetchProductByDocumentId(documentId: string): Promise<ProdukUnggulan | null> {
    try {
        const res = await fetch(`${API_URL}/api/produks?filters[documentId][$eq]=${documentId}&populate=deep`);
        if (!res.ok) throw new Error(`Gagal mengambil produk dengan documentId: ${documentId}`);
        const json: StrapiApiResponse<any> = await res.json();
        const data = json.data;
        if (!Array.isArray(data) || data.length === 0) return null;
        return formatProductData(data[0]);
    } catch (error) {
        console.error(`Error saat mengambil produk by documentId:`, error);
        return null;
    }
}
