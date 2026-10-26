/**
 * Latest posts from @taxplus.consulting, newest first. Instagram offers no
 * public feed without an API token, so this is a snapshot: images (480×640)
 * live in public/images/instagram/<code>.webp and titles are the post headlines.
 * To refresh, replace the list and the images with the newest posts.
 */
export type InstagramPost = { code: string; title: string; date: string };

export const instagramPosts: InstagramPost[] = [
  { code: "De8A_jrgUVv", title: "Tipe-Tipe Sakit Kepalamu", date: "2026-10-25" },
  { code: "De0zfjrAWwE", title: "Ekspektasi vs Realita Saat Mengurus Pajak", date: "2026-10-22" },
  { code: "DeyL7sPgQtc", title: "Gaji di Bawah Rp10 Juta Berpotensi Bebas Potongan PPh 21 pada 2027", date: "2026-10-21" },
  { code: "Devrv9RgXj_", title: "Pajak Minimum Global 15%: Perusahaan Multinasional Wajib Bersiap", date: "2026-10-20" },
  { code: "DetFM8igSNM", title: "Coretax Ubah Cara Pembetulan SPT Mulai Oktober 2026", date: "2026-10-19" },
  { code: "DeqRev_AW5Y", title: "Transaksi Digital Luar Negeri Kini Bisa Dipotong PPN Otomatis", date: "2026-10-18" },
  { code: "DeiSqhDgVj3", title: "Pembayaran Utang Pajak Kini Dahulukan Pokoknya", date: "2026-10-15" },
  { code: "Def3yC8gT_0", title: "Pajak Berantakan, Bisnis Keteteran", date: "2026-10-14" },
  { code: "DedKr9tgeVd", title: "Kalau Cuma Boleh Pilih Satu", date: "2026-10-13" },
  { code: "Dea5vhSgd4U", title: "2,5% Pajak Rokok Dialokasikan untuk Bea Cukai", date: "2026-10-12" },
  { code: "DeYT6cFgeNh", title: "Sebelum dan Sesudah Kenal TaxPlus", date: "2026-10-11" },
  { code: "DeQXih1AZEe", title: "Ini Semua Gara-Gara TaxPlus", date: "2026-10-08" },
];
