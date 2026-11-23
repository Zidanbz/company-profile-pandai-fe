import { contentFields } from "./catalog";

export type ContentBlock = {
  id: string;
  title: string;
  description: string;
  keys: string[];
};
export type ContentSection = {
  title: string;
  description: string;
  anchor: string;
  blocks: ContentBlock[];
  related?: { href: string; label: string; description: string };
};
export const editorLabels: Record<string, string> = {};
const block = (
  group: string,
  id: string,
  title: string,
  description: string,
  numbers: number[],
  labels: string[],
): ContentBlock => {
  const keys = numbers.map(
    (n) => `pandai_${group}_${String(n).padStart(3, "0")}`,
  );
  keys.forEach((key, i) => {
    editorLabels[key] = labels[i];
  });
  return { id, title, description, keys };
};
const named = (
  id: string,
  title: string,
  description: string,
  entries: [string, string][],
): ContentBlock => {
  entries.forEach(([key, label]) => {
    editorLabels[key] = label;
  });
  return { id, title, description, keys: entries.map(([key]) => key) };
};
export const editorSections: Record<string, ContentSection> = {
  hero: {
    title: "Halaman pembuka",
    description: "Pesan pertama yang dilihat pengunjung saat membuka website.",
    anchor: "hero",
    blocks: [
      block(
        "hero",
        "message",
        "Pesan utama",
        "Mulai dari judul, deskripsi, dan ajakan yang paling penting.",
        [3, 4, 5],
        ["Label di atas judul", "Judul utama", "Deskripsi singkat"],
      ),
      block(
        "hero",
        "actions",
        "Tombol & kepercayaan",
        "Atur dua tombol utama dan tiga poin pendukung.",
        [7, 6, 9, 8, 10, 11, 12],
        [
          "Teks tombol utama",
          "Tujuan tombol utama",
          "Teks tombol kedua",
          "Tujuan tombol kedua",
          "Poin kepercayaan 1",
          "Poin kepercayaan 2",
          "Poin kepercayaan 3",
        ],
      ),
      block(
        "hero",
        "image",
        "Gambar latar",
        "Gambar dan deskripsi alternatif untuk aksesibilitas.",
        [1, 2],
        ["Gambar latar pembuka", "Deskripsi gambar"],
      ),
      block(
        "hero",
        "stats",
        "Statistik ringkas",
        "Angka dan keterangan pada diagram pembuka.",
        [13, 14, 15, 16],
        [
          "Angka statistik 1",
          "Keterangan statistik 1",
          "Angka statistik 2",
          "Keterangan statistik 2",
        ],
      ),
      block(
        "hero",
        "diagram",
        "Label diagram",
        "Teks pada ilustrasi ekosistem layanan.",
        [17, 18, 19, 20, 21, 22],
        [
          "Nama di tengah diagram",
          "Label konsultasi",
          "Label jaringan",
          "Label cloud",
          "Label data center",
          "Label software",
        ],
      ),
      ...[0, 1, 2, 3].map((i) =>
        block(
          "hero",
          `benefit-${i}`,
          `Keunggulan ${i + 1}`,
          "Nomor, judul, dan keterangan singkat.",
          [23 + i * 3, 24 + i * 3, 25 + i * 3],
          ["Nomor urut", "Judul keunggulan", "Keterangan"],
        ),
      ),
    ],
  },
  about: {
    title: "Tentang perusahaan",
    description: "Perkenalkan perusahaan, kompetensi, dan pencapaiannya.",
    anchor: "tentang",
    blocks: [
      block(
        "about",
        "message",
        "Profil perusahaan",
        "Informasi utama tentang Pandai.",
        [5, 6, 7],
        ["Label bagian", "Nama / judul perusahaan", "Deskripsi perusahaan"],
      ),
      block(
        "about",
        "image",
        "Foto & lokasi kantor",
        "Foto pendukung beserta keterangan yang tampil.",
        [1, 2, 3, 4],
        ["Foto kantor", "Deskripsi gambar", "Nama kantor", "Kota / lokasi"],
      ),
      block(
        "about",
        "highlights",
        "Kompetensi utama",
        "Empat layanan atau kompetensi yang ingin ditonjolkan.",
        [8, 9, 10, 11],
        ["Kompetensi 1", "Kompetensi 2", "Kompetensi 3", "Kompetensi 4"],
      ),
      block(
        "about",
        "stats",
        "Statistik perusahaan",
        "Gunakan angka yang dapat dipertanggungjawabkan.",
        [12, 13, 14, 15, 16, 17, 18, 19],
        [
          "Angka klien",
          "Keterangan klien",
          "Angka proyek",
          "Keterangan proyek",
          "Angka mitra",
          "Keterangan mitra",
          "Angka tim",
          "Keterangan tim",
        ],
      ),
    ],
  },
  services: {
    title: "Pengantar layanan",
    description:
      "Edit pengantar bagian layanan. Kartu layanan dikelola di menu tersendiri.",
    anchor: "layanan",
    related: {
      href: "/admin/services",
      label: "Kelola layanan",
      description: "Tambah, urutkan, atau ubah isi kartu layanan.",
    },
    blocks: [
      block(
        "services",
        "message",
        "Judul & deskripsi",
        "Judul terdiri dari dua bagian untuk penekanan visual.",
        [33, 34, 35, 36],
        [
          "Label bagian",
          "Judul utama",
          "Judul yang disorot",
          "Deskripsi layanan",
        ],
      ),
      block(
        "services",
        "actions",
        "Tombol & poin pendukung",
        "Ajakan konsultasi dan alasan memilih layanan.",
        [38, 37, 39, 40, 41],
        [
          "Teks tombol konsultasi",
          "Tujuan tombol",
          "Poin pendukung 1",
          "Poin pendukung 2",
          "Poin pendukung 3",
        ],
      ),
      block(
        "services",
        "image",
        "Gambar latar",
        "Foto yang digunakan sebagai latar bagian layanan.",
        [32],
        ["Gambar latar layanan"],
      ),
      named(
        "detail",
        "Teks halaman detail",
        "Label umum pada halaman detail setiap layanan.",
        [
          ["service_detail_label", "Tombol detail layanan"],
          ["service_back_label", "Tombol kembali"],
          ["service_contact_label", "Tombol konsultasi"],
          ["service_features_label", "Judul daftar fitur"],
        ],
      ),
    ],
  },
  process: {
    title: "Proses kerja",
    description: "Jelaskan tahapan kerja sama dengan calon klien.",
    anchor: "proses",
    blocks: [
      block(
        "process",
        "message",
        "Pengantar proses",
        "Judul yang menjelaskan alur kerja.",
        [9, 10],
        ["Label bagian", "Judul bagian"],
      ),
      ...[0, 1, 2, 3].map((i) =>
        block(
          "process",
          `step-${i}`,
          `Tahap ${i + 1}`,
          "Nama tahap dan penjelasan singkat.",
          [1 + i * 2, 2 + i * 2],
          ["Nama tahap", "Penjelasan tahap"],
        ),
      ),
    ],
  },
  gallery: {
    title: "Galeri kegiatan",
    description: "Tampilkan kantor, tim, dan dokumentasi pekerjaan.",
    anchor: "galeri",
    blocks: [
      block(
        "gallery",
        "message",
        "Pengantar galeri",
        "Judul dan deskripsi di atas foto.",
        [1, 2, 3],
        ["Label bagian", "Judul galeri", "Deskripsi galeri"],
      ),
      ...["Kantor", "Tim", "Data center", "Jaringan", "Pengembangan"].map(
        (title, i) =>
          block(
            "gallery",
            `photo-${i}`,
            `Foto: ${title}`,
            "Gambar, deskripsi aksesibilitas, kategori, dan keterangan.",
            [4 + i * 4, 5 + i * 4, 6 + i * 4, 7 + i * 4],
            ["Foto", "Deskripsi gambar", "Kategori foto", "Keterangan foto"],
          ),
      ),
    ],
  },
  partners: {
    title: "Mitra & klien",
    description: "Atur pengantar dan pesan kepercayaan pada bagian kolaborasi.",
    anchor: "mitra",
    related: {
      href: "/admin/partners",
      label: "Kelola logo mitra",
      description:
        "Logo, urutan, dan status tampil dikelola melalui menu Mitra & Client.",
    },
    blocks: [
      block(
        "partners",
        "message",
        "Judul & deskripsi",
        "Pesan utama bagian kolaborasi.",
        [1, 2, 3, 4],
        [
          "Label bagian",
          "Judul baris pertama",
          "Judul baris kedua",
          "Deskripsi kolaborasi",
        ],
      ),
      block(
        "partners",
        "categories",
        "Kategori kolaborasi",
        "Label pada dua kelompok logo.",
        [5, 6, 7, 10, 11, 12, 13],
        [
          "Judul kelompok mitra",
          "Kategori mitra",
          "Keterangan mitra",
          "Teks pemisah kelompok",
          "Judul kelompok klien",
          "Kategori klien",
          "Keterangan klien",
        ],
      ),
      block(
        "partners",
        "trust",
        "Pesan kepercayaan",
        "Tiga pernyataan di bawah daftar logo.",
        [16, 17, 18],
        ["Pesan kepercayaan 1", "Pesan kepercayaan 2", "Pesan kepercayaan 3"],
      ),
    ],
  },
  blog: {
    title: "Pengantar artikel",
    description: "Sesuaikan judul bagian artikel di halaman utama.",
    anchor: "blog",
    related: {
      href: "/admin/posts",
      label: "Kelola artikel",
      description: "Tulis dan terbitkan artikel melalui menu Blog.",
    },
    blocks: [
      block(
        "blog",
        "message",
        "Judul & deskripsi",
        "Pengantar untuk artikel terbaru.",
        [13, 14, 15],
        ["Label bagian", "Judul artikel beranda", "Deskripsi bagian"],
      ),
      block(
        "blog",
        "actions",
        "Label tombol",
        "Teks navigasi menuju daftar dan detail artikel.",
        [16, 17],
        ["Tombol semua artikel", "Tombol baca artikel"],
      ),
    ],
  },
  faq: {
    title: "Pengantar FAQ",
    description: "Atur judul FAQ dan ajakan untuk menghubungi tim.",
    anchor: "faq",
    blocks: [
      block(
        "faq",
        "message",
        "Judul & deskripsi",
        "Bagian ini mengubah pengantar, bukan daftar pertanyaan FAQ.",
        [1, 2, 3],
        ["Label bagian", "Judul FAQ", "Deskripsi bantuan"],
      ),
      block(
        "faq",
        "actions",
        "Tombol bantuan",
        "Arahkan pengunjung untuk menghubungi tim.",
        [5, 4],
        ["Teks tombol bantuan", "Tujuan tombol"],
      ),
    ],
  },
  cta: {
    title: "Ajakan konsultasi",
    description: "Pesan singkat yang mengajak pengunjung menghubungi Pandai.",
    anchor: "cta",
    blocks: [
      block(
        "cta",
        "message",
        "Pesan & tombol",
        "Satu ajakan yang singkat, jelas, dan mudah ditindaklanjuti.",
        [1, 2, 4, 3],
        ["Judul ajakan", "Deskripsi pendukung", "Teks tombol", "Tujuan tombol"],
      ),
    ],
  },
  contact: {
    title: "Kontak & formulir",
    description:
      "Informasi untuk menghubungi perusahaan dan teks formulir pesan.",
    anchor: "kontak",
    related: {
      href: "/admin/contact",
      label: "Buka kotak masuk",
      description:
        "Baca dan kelola pesan yang dikirim melalui formulir kontak website.",
    },
    blocks: [
      named(
        "details",
        "Informasi kontak",
        "Pastikan email, telepon, dan alamat selalu dapat dihubungi.",
        [
          ["contact_email", "Email perusahaan"],
          ["contact_phone", "Nomor telepon"],
          ["contact_hours", "Jam operasional"],
          ["contact_city", "Kota / wilayah"],
          ["contact_address", "Alamat lengkap"],
          ["contact_maps_url", "Tautan Google Maps"],
        ],
      ),
      block(
        "contact",
        "message",
        "Pengantar kontak",
        "Judul dan deskripsi bagian kontak.",
        [1, 2, 3],
        ["Label bagian", "Judul kontak", "Deskripsi kontak"],
      ),
      block(
        "contact",
        "labels",
        "Label informasi & peta",
        "Teks kecil di sekitar detail kontak.",
        [4, 6, 8, 10, 12, 15, 16],
        [
          "Label email",
          "Label telepon",
          "Label jam operasional",
          "Label lokasi",
          "Label alamat",
          "Tombol Google Maps",
          "Nama kantor pada peta",
        ],
      ),
      block(
        "contact",
        "form",
        "Label formulir",
        "Nama field serta contoh isian. Tidak mengubah struktur formulir.",
        [21, 22, 23, 24, 25, 26, 27, 28, 34, 35],
        [
          "Label nama",
          "Contoh nama",
          "Label perusahaan",
          "Contoh perusahaan",
          "Label email",
          "Contoh email",
          "Label pilihan layanan",
          "Placeholder pilihan layanan",
          "Label kebutuhan",
          "Contoh deskripsi kebutuhan",
        ],
      ),
      block(
        "contact",
        "options",
        "Pilihan layanan",
        "Teks opsi layanan pada formulir pesan.",
        [29, 30, 31, 32, 33],
        [
          "Pilihan layanan 1",
          "Pilihan layanan 2",
          "Pilihan layanan 3",
          "Pilihan layanan 4",
          "Pilihan layanan 5",
        ],
      ),
      block(
        "contact",
        "success",
        "Tombol & pesan berhasil",
        "Teks ketika mengirim dan setelah pesan diterima.",
        [17, 18, 19, 20],
        [
          "Tombol kirim",
          "Judul pesan berhasil",
          "Penjelasan pesan berhasil",
          "Tombol kirim pesan lain",
        ],
      ),
    ],
  },
  navigation: {
    title: "Menu navigasi",
    description: "Nama menu dan tombol pada header website.",
    anchor: "hero",
    blocks: [
      block(
        "navigation",
        "menu",
        "Nama menu utama",
        "Teks menu; tujuan bagian mengikuti struktur website.",
        [1, 2, 3, 4, 5],
        [
          "Menu tentang",
          "Menu layanan",
          "Menu proses",
          "Menu mitra",
          "Menu blog",
        ],
      ),
      block(
        "navigation",
        "actions",
        "Tombol kontak",
        "Label dan tujuan tombol desktop serta mobile.",
        [10, 9, 13, 12],
        [
          "Teks tombol desktop",
          "Tujuan tombol desktop",
          "Teks tombol mobile",
          "Tujuan tombol mobile",
        ],
      ),
      block(
        "navigation",
        "accessibility",
        "Aksesibilitas navigasi",
        "Deskripsi logo dan kontrol untuk pembaca layar.",
        [6, 8, 11],
        ["Nama tautan beranda", "Deskripsi logo", "Label tombol buka menu"],
      ),
    ],
  },
  settings: {
    title: "Identitas & SEO",
    description:
      "Identitas perusahaan, logo, dan informasi untuk mesin pencari.",
    anchor: "hero",
    blocks: [
      named(
        "identity",
        "Identitas perusahaan",
        "Nama dan tagline yang mewakili perusahaan.",
        [
          ["site_name", "Nama perusahaan"],
          ["site_tagline", "Tagline"],
          ["copyright_text", "Teks hak cipta"],
        ],
      ),
      named(
        "brand",
        "Logo & ikon website",
        "Gunakan gambar yang tetap jelas pada ukuran kecil.",
        [
          ["site_logo", "Logo perusahaan"],
          ["site_favicon", "Ikon tab browser (favicon)"],
        ],
      ),
      named(
        "seo",
        "Mesin pencari",
        "Judul dan deskripsi yang digunakan sebagai metadata website.",
        [
          ["seo_meta_title", "Judul SEO"],
          ["seo_meta_description", "Deskripsi SEO"],
        ],
      ),
      named(
        "social",
        "Media sosial",
        "Kosongkan tautan yang belum dimiliki perusahaan.",
        [
          ["social_instagram", "Instagram"],
          ["social_linkedin", "LinkedIn"],
          ["social_facebook", "Facebook"],
        ],
      ),
    ],
  },
  footer: {
    title: "Footer website",
    description: "Deskripsi perusahaan dan navigasi pada bagian bawah website.",
    anchor: "footer",
    blocks: [
      block(
        "footer",
        "message",
        "Profil singkat",
        "Deskripsi dan identitas pada footer.",
        [3, 31, 2],
        [
          "Deskripsi singkat perusahaan",
          "Nama perusahaan di footer",
          "Deskripsi logo",
        ],
      ),
      block(
        "footer",
        "headings",
        "Judul kolom",
        "Nama kelompok tautan di footer.",
        [4, 17, 26],
        ["Judul kolom perusahaan", "Judul kolom layanan", "Judul kolom kontak"],
      ),
      block(
        "footer",
        "company",
        "Tautan perusahaan",
        "Nama tautan dan halaman atau bagian tujuannya.",
        [6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15],
        [
          "Teks tentang",
          "Tujuan tentang",
          "Teks proses",
          "Tujuan proses",
          "Teks galeri",
          "Tujuan galeri",
          "Teks mitra",
          "Tujuan mitra",
          "Teks blog",
          "Tujuan blog",
          "Teks FAQ",
          "Tujuan FAQ",
        ],
      ),
      block(
        "footer",
        "services",
        "Tautan layanan",
        "Tautan menuju penawaran layanan perusahaan.",
        [19, 18, 21, 20, 23, 22, 25, 24],
        [
          "Teks konsultasi",
          "Tujuan konsultasi",
          "Teks jaringan",
          "Tujuan jaringan",
          "Teks software",
          "Tujuan software",
          "Teks cloud",
          "Tujuan cloud",
        ],
      ),
    ],
  },
};

// Keep newly added catalogue fields reachable even before an editorial layout is assigned.
export function getEditorBlocks(group: string): ContentBlock[] {
  const blocks = editorSections[group]?.blocks ?? [];
  const assigned = new Set(blocks.flatMap((b) => b.keys));
  const additional = contentFields.filter(
    (f) => f.group === group && !assigned.has(f.key),
  );
  return additional.length
    ? [
        ...blocks,
        {
          id: "additional",
          title: "Konten tambahan",
          description: "Pengaturan lain pada bagian ini.",
          keys: additional.map((f) => f.key),
        },
      ]
    : blocks;
}
