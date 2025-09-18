// src/data/mockData.ts
import type { Program, ProdukUnggulan } from '@/data/types';

// ========================================================
// BAGIAN 1: DAFTAR PRODUK UNGGULAN (TERPISAH)
// ========================================================
export const allMockProducts: ProdukUnggulan[] = [
  {
    id: 'prod-001',
    programSlug: 'electrooptic-sensor-technology',
    namaProduk: 'Night Vision Monocular NETRA M-1',
    gambarProduk: '/assets-web/product.png',
    deskripsiProduk: '<p>Perangkat night vision monocular canggih yang dirancang untuk operasi malam hari. Dilengkapi dengan sensor generasi terbaru untuk visibilitas superior dalam kondisi minim cahaya dan kegelapan total.</p>',
    spesifikasiTeknis: `
      Sensor: Generasi 3 High-Performance
      Magnifikasi: 1x (opsional 3x, 5x)
      Jarak Deteksi: > 300 meter
      Berat: < 350 gram
      Daya Tahan Baterai: > 40 jam
    `,
    keunggulanKompetitif: `
      - Kualitas gambar superior di kondisi cahaya sangat rendah.
      - Desain ergonomis dan ringan untuk penggunaan jangka panjang.
      - Kompatibel dengan berbagai aksesoris helm dan senjata.
    `,
  },
  {
    id: 'prod-002',
    programSlug: 'electrooptic-sensor-technology',
    namaProduk: 'Thermal Imager TN-KS/2',
    gambarProduk: '/assets-web/tnks2.png',
    deskripsiProduk: '<p>Thermal imager genggam dengan kemampuan deteksi panas jarak jauh, ideal untuk pengawasan, navigasi, dan operasi taktis dalam berbagai kondisi cuaca, termasuk kabut dan asap tebal.</p>',
    spesifikasiTeknis: '<table><thead><tr><th>Fitur</th><th>Spesifikasi</th></tr></thead><tbody><tr><td>Resolusi Sensor</td><td>640x480 pixels</td></tr><tr><td>Jarak Deteksi</td><td>> 1.5 km (target manusia)</td></tr><tr><td>Zoom Digital</td><td>2x, 4x</td></tr><tr><td>Palette Warna</td><td>White Hot, Black Hot, Rainbow</td></tr></tbody></table>',
    keunggulanKompetitif: '<p>Kemampuan deteksi yang andal dalam berbagai kondisi cuaca, termasuk kabut, asap, dan kamuflase.</p>',
  },
  {
    id: 'prod-003',
    programSlug: 'tactical-communication-ncw',
    namaProduk: 'Radio Taktis Alkom HF',
    gambarProduk: '/assets-web/placeholder-produk.png',
    deskripsiProduk: '<p>Radio komunikasi taktis dengan jangkauan luas dan enkripsi canggih untuk memastikan komunikasi yang aman di medan perang.</p>',
    spesifikasiTeknis: 'Spesifikasi detail untuk Radio Taktis Alkom HF.',
    keunggulanKompetitif: 'Keunggulan kompetitif untuk Radio Taktis Alkom HF.',
  }
];

// ========================================================
// BAGIAN 2: DATA PROGRAM INTI
// ========================================================
const programsBaseData: Omit<Program, 'produkUnggulan'>[] = [
  // 1. Electrooptic & Sensor Technology
  {
    id: 1,
    namaProgram: 'Electrooptic & Sensor Technology',
    slug: 'electrooptic-sensor-technology',
    PICProgram: 'Dr. Arini Santoso, S.T., M.Eng.',
    statusProgram: 'Prototipe',
    gambarUtama: '/assets-web/electrooptic.jpg',
    deskripsiLengkap: '<p>Program ini berfokus pada riset dan pengembangan teknologi sensor optoelektronik canggih untuk menciptakan superioritas dalam penginderaan, pengawasan, dan akuisisi target.</p>',
    cakupanProgram: '<p>Pengembangan sensor optik, sistem pencitraan termal, dan teknologi laser.</p>',
    visualisasiCakupan: '/assets-web/scope-1.jpg',
    daftarMitra: [
      { namaInstansi: 'Theon International - Yunani', logoInstansi: '/assets-web/mitra/theon.png', kategori: 'Swasta Luar Negeri', tipeKerjasama: 'Alih Teknologi', tahunKerjasama: 2022, detailKerjasama: 'Teknologi night vision.' },
      { namaInstansi: 'Institut Teknologi Bandung', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'Institusi Pendidikan', tipeKerjasama: 'Riset Akademis', tahunKerjasama: 2022, detailKerjasama: 'Riset material sensor.' },
    ],
    judulRoadmap: 'Roadmap Pengembangan Teknologi Sensor 2023-2027',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 50000000000,
    sumberDana: 'APBN & Investasi Internal',
    daftarMitraPotensial: [
        { namaInstansi: 'Hensoldt - Jerman', logoInstansi: '/assets-web/mitra/logo-placeholder.png', detailPotensi: 'Potensi kerjasama dalam teknologi radar dan sensor spektrum.'},
    ],
    potentialMarket: [
        { namaPasar: 'Mabes TNI', potensiPendapatan: 50000000000, logoPasar: '/assets-web/offtaker/mabes-tni.png' },
        { namaPasar: 'Kementerian Pertahanan', potensiPendapatan: 60000000000, logoPasar: '/assets-web/offtaker/kemenhan.png' },
        { namaPasar: 'Badan Intelijen Negara', potensiPendapatan: 35000000000, logoPasar: '/assets-web/offtaker/bin.png' },
        { namaPasar: 'TNI Angkatan Darat', potensiPendapatan: 75000000000, logoPasar: '/assets-web/offtaker/logo-tniad.png' },
    ],
    progressTindakLanjut: '<ul><li>Pengujian prototipe Alpha telah selesai.</li></ul>',
    risikoDanHambatan: '<ul><li>Ketergantungan pada beberapa komponen kunci impor.</li></ul>',
    dokumenTerkait: [{ nama: 'Proposal Teknis Program.pdf', url: '#' }],
  },
  // 2. Tactical Communication & NCW
  {
    id: 2,
    namaProgram: 'Tactical Communication & NCW',
    slug: 'tactical-communication-ncw',
    gambarUtama: '/assets-web/taccom.jpg',
    PICProgram: 'Budi Hartono, M.T.',
    statusProgram: 'R&D',
    deskripsiLengkap: '<p>Mengembangkan sistem komunikasi taktis yang andal, aman, dan terintegrasi untuk mendukung Network Centric Warfare (NCW).</p>',
    cakupanProgram: '<p>Software Defined Radio (SDR), enkripsi, dan jaringan ad-hoc.</p>',
    visualisasiCakupan: '/assets-web/scope-2.jpg',
    daftarMitra: [
        { namaInstansi: 'PT. Telkom Indonesia', logoInstansi: '/assets-web/logo-placeholder.png', kategori: 'BUMN', tipeKerjasama: 'Pengembangan Infrastruktur', tahunKerjasama: 2023, detailKerjasama: 'Penyediaan backbone jaringan.'},
        { namaInstansi: 'Rohde & Schwarz - Jerman', logoInstansi: '/assets-web/logo-placeholder.png', kategori: 'Swasta Luar Negeri', tipeKerjasama: 'Alih Teknologi', tahunKerjasama: 2022, detailKerjasama: 'Teknologi enkripsi radio.'},
    ],
    judulRoadmap: 'Roadmap Komunikasi Taktis',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 75000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'TNI Angkatan Darat', potensiPendapatan: 80000000000, logoPasar: '/assets-web/offtaker/logo-tniad.png' },
        { namaPasar: 'TNI Angkatan Laut', potensiPendapatan: 65000000000, logoPasar: '/assets-web/offtaker/Lambang_TNI_AL.png' },
        { namaPasar: 'Kepolisian RI', potensiPendapatan: 50000000000, logoPasar: '/assets-web/offtaker/Kepolisian-Negara-Republik-Indonesia.png' },
        { namaPasar: 'Mabes TNI', potensiPendapatan: 40000000000, logoPasar: '/assets-web/offtaker/mabes-tni.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 3. Artificial Intelligence
  {
    id: 3,
    namaProgram: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    gambarUtama: '/assets-web/aimilitary.png',
    PICProgram: 'Dr. Rini Wulandari',
    statusProgram: 'Perencanaan',
    deskripsiLengkap: '<p>Penerapan kecerdasan buatan untuk analisis data intelijen, sistem komando & kendali, serta sistem otonom.</p>',
    cakupanProgram: '<p>Machine learning, computer vision, dan predictive analysis.</p>',
    visualisasiCakupan: '/assets-web/scope-3.jpg',
    daftarMitra: [
        { namaInstansi: 'Universitas Gadjah Mada', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'Institusi Pendidikan', tipeKerjasama: 'Riset Bersama', tahunKerjasama: 2024, detailKerjasama: 'Pengembangan algoritma machine learning.' },
    ],
    judulRoadmap: 'Roadmap AI Militer',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 120000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'Badan Intelijen Negara', potensiPendapatan: 90000000000, logoPasar: '/assets-web/offtaker/bin.png' },
        { namaPasar: 'BSSN', potensiPendapatan: 70000000000, logoPasar: '/assets-web/offtaker/Logo_BSSN_new.png' },
        { namaPasar: 'Kementerian Pertahanan', potensiPendapatan: 110000000000, logoPasar: '/assets-web/offtaker/kemenhan.png' },
        { namaPasar: 'Mabes TNI', potensiPendapatan: 100000000000, logoPasar: '/assets-web/offtaker/mabes-tni.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 4. Semi Conductor
  {
    id: 4,
    namaProgram: 'Semi Conductor',
    slug: 'semi-conductor',
    gambarUtama: '/assets-web/semiconductor.jpg',
    PICProgram: 'Ahmad Prasetyo, S.T.',
    statusProgram: 'Perencanaan',
    deskripsiLengkap: '<p>Membangun kemandirian nasional dalam industri semikonduktor untuk aplikasi strategis pertahanan.</p>',
    cakupanProgram: '<p>Desain chip, fabrikasi wafer, dan packaging.</p>',
    visualisasiCakupan: '/assets-web/scope-4.jpg',
    daftarMitra: [
        { namaInstansi: 'PT. INTI', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'BUMN', tipeKerjasama: 'Studi Kelayakan', tahunKerjasama: 2023, detailKerjasama: 'Analisis teknis dan pasar.' },
    ],
    judulRoadmap: 'Roadmap Industri Semikonduktor',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 250000000000,
    sumberDana: 'Penyertaan Modal Negara',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'Kementerian Pertahanan', potensiPendapatan: 200000000000, logoPasar: '/assets-web/offtaker/kemenhan.png' },
        { namaPasar: 'BSSN', potensiPendapatan: 150000000000, logoPasar: '/assets-web/offtaker/Logo_BSSN_new.png' },
        // Fictional placeholders for industry partners
        { namaPasar: 'Industri Elektronik Nasional', potensiPendapatan: 300000000000, logoPasar: '/assets-web/offtaker/logo-placeholder.png' },
        { namaPasar: 'Industri Otomotif Nasional', potensiPendapatan: 250000000000, logoPasar: '/assets-web/offtaker/logo-placeholder.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 5. Robotic, Automation Electronic, & Unmanned Autonomous System
  {
    id: 5,
    namaProgram: 'Robotic, Automation Electronic, & Unmanned Autonomous System',
    slug: 'robotic-automation-unmanned',
    gambarUtama: '/assets-web/lenUAV.webp',
    PICProgram: 'Prof. Dr. Ir. Hermawan',
    statusProgram: 'Uji Coba',
    deskripsiLengkap: '<p>Pengembangan platform robotik dan otonom (UAV, UGV, USV) untuk berbagai misi, mulai dari pengawasan hingga logistik.</p>',
    cakupanProgram: '<p>Sistem navigasi, kontrol aktuator, dan integrasi sensor.</p>',
    visualisasiCakupan: '/assets-web/scope-5.jpg',
    daftarMitra: [
        { namaInstansi: 'Institut Teknologi Sepuluh Nopember', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'Institusi Pendidikan', tipeKerjasama: 'Riset Platform', tahunKerjasama: 2022, detailKerjasama: 'Riset desain Unmanned Surface Vehicle (USV).'},
    ],
    judulRoadmap: 'Roadmap Sistem Otonom',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 95000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'TNI Angkatan Laut', potensiPendapatan: 80000000000, logoPasar: '/assets-web/offtaker/Lambang_TNI_AL.png' },
        { namaPasar: 'Basarnas', potensiPendapatan: 45000000000, logoPasar: '/assets-web/offtaker/basarnas.png' },
        { namaPasar: 'TNI Angkatan Darat', potensiPendapatan: 90000000000, logoPasar: '/assets-web/offtaker/logo-tniad.png' },
        { namaPasar: 'Kementerian Kelautan dan Perikanan', potensiPendapatan: 30000000000, logoPasar: '/assets-web/offtaker/kemenkel.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 6. Radar & Electronic Warfare System
  {
    id: 6,
    namaProgram: 'Radar & Electronic Warfare System',
    slug: 'radar-electronic-warfare',
    gambarUtama: '/assets-web/Radar LEN.jpeg',
    PICProgram: 'Kol. (Purn) Susilo Bambang',
    statusProgram: 'Prototipe',
    deskripsiLengkap: '<p>Pengembangan teknologi radar canggih dan sistem peperangan elektronika (EW) untuk deteksi, pelacakan, dan jamming.</p>',
    cakupanProgram: '<p>Radar AESA, sistem ESM/ECM, dan SIGINT.</p>',
    visualisasiCakupan: '/assets-web/scope-1.jpg',
    daftarMitra: [
        { namaInstansi: 'PT. Pindad', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'BUMN', tipeKerjasama: 'Integrasi Platform', tahunKerjasama: 2023, detailKerjasama: 'Integrasi radar pada kendaraan tempur.'},
    ],
    judulRoadmap: 'Roadmap Radar & EW',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 150000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'Mabes TNI', potensiPendapatan: 120000000000, logoPasar: '/assets-web/offtaker/mabes-tni.png' },
        { namaPasar: 'Kementerian Pertahanan', potensiPendapatan: 140000000000, logoPasar: '/assets-web/offtaker/kemenhan.png' },
        { namaPasar: 'TNI Angkatan Laut', potensiPendapatan: 100000000000, logoPasar: '/assets-web/offtaker/Lambang_TNI_AL.png' },
        { namaPasar: 'BSSN', potensiPendapatan: 60000000000, logoPasar: '/assets-web/offtaker/Logo_BSSN_new.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 7. Satellite & Remote Sensing Technology
  {
    id: 7,
    namaProgram: 'Satellite & Remote Sensing Technology',
    slug: 'satellite-remote-sensing',
    gambarUtama: '/assets-web/remotesensing.jpg',
    PICProgram: 'Dr. Siti Nurhaliza',
    statusProgram: 'R&D',
    deskripsiLengkap: '<p>Pengembangan satelit observasi bumi dan teknologi penginderaan jauh untuk pemantauan wilayah nasional.</p>',
    cakupanProgram: '<p>Satelit mikro, sensor multispektral, dan analisis citra satelit.</p>',
    visualisasiCakupan: '/assets-web/scope-2.jpg',
    daftarMitra: [
        { namaInstansi: 'BRIN', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'Kolaboratif Lain', tipeKerjasama: 'Riset & Peluncuran', tahunKerjasama: 2022, detailKerjasama: 'Riset bersama dan pemanfaatan fasilitas.'},
    ],
    judulRoadmap: 'Roadmap Teknologi Satelit',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 300000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'Kementerian Kelautan dan Perikanan', potensiPendapatan: 80000000000, logoPasar: '/assets-web/offtaker/kemenkel.png' },
        { namaPasar: 'Basarnas', potensiPendapatan: 50000000000, logoPasar: '/assets-web/offtaker/basarnas.png' },
        { namaPasar: 'Badan Intelijen Negara', potensiPendapatan: 120000000000, logoPasar: '/assets-web/offtaker/bin.png' },
        { namaPasar: 'Kementerian Pertahanan', potensiPendapatan: 150000000000, logoPasar: '/assets-web/offtaker/kemenhan.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  },
  // 8. Cyber Security
  {
    id: 8,
    namaProgram: 'Cyber Security',
    slug: 'cyber-security',
    gambarUtama: '/assets-web/cybersec.png',
    PICProgram: 'Bayu Skak, S.Kom.',
    statusProgram: 'Produksi Awal',
    deskripsiLengkap: '<p>Membangun solusi keamanan siber end-to-end untuk melindungi infrastruktur kritis nasional dari ancaman siber.</p>',
    cakupanProgram: '<p>Enkripsi, firewall, Intrusion Detection System (IDS), dan forensik digital.</p>',
    visualisasiCakupan: '/assets-web/scope-3.jpg',
    daftarMitra: [
        { namaInstansi: 'Telkom University', logoInstansi: '/assets-web/mitra/logo-placeholder.png', kategori: 'Institusi Pendidikan', tipeKerjasama: 'Pengembangan Talenta', tahunKerjasama: 2023, detailKerjasama: 'Program magang dan riset keamanan siber.'},
    ],
    judulRoadmap: 'Roadmap Keamanan Siber',
    gambarRoadmap: '/assets-web/roadmapnew.png',
    anggaran: 180000000000,
    sumberDana: 'APBN',
    daftarMitraPotensial: [],
    potentialMarket: [
        { namaPasar: 'BSSN', potensiPendapatan: 200000000000, logoPasar: '/assets-web/offtaker/Logo_BSSN_new.png' },
        { namaPasar: 'Kepolisian RI', potensiPendapatan: 150000000000, logoPasar: '/assets-web/offtaker/Kepolisian-Negara-Republik-Indonesia.png' },
        { namaPasar: 'Badan Intelijen Negara', potensiPendapatan: 100000000000, logoPasar: '/assets-web/offtaker/bin.png' },
        { namaPasar: 'Mabes TNI', potensiPendapatan: 120000000000, logoPasar: '/assets-web/offtaker/mabes-tni.png' },
    ],
    progressTindakLanjut: '',
    risikoDanHambatan: '',
    dokumenTerkait: [],
  }
];

// ========================================================
// BAGIAN 3: GABUNGKAN DATA PROGRAM DENGAN PRODUKNYA
// ========================================================
export const mockPrograms: Program[] = programsBaseData.map(program => ({
  ...program,
  produkUnggulan: allMockProducts.filter(product => product.programSlug === program.slug),
}));

