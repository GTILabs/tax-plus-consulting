export type Faq = { question: string; answer: string };
export type FaqCategory = { id: string; title: string; faqs: Faq[] };

/** Questions about working with TaxPlus; also shown on the homepage. */
export const homeFaqs: Faq[] = [
  {
    question: "Saya menerima SP2DK. Apakah itu berarti saya diperiksa?",
    answer:
      "Belum tentu. SP2DK adalah permintaan penjelasan atas data yang berbeda dengan SPT Anda, dan masih berada di tahap pengawasan — bukan pemeriksaan. Tetapi tanggapan yang keliru atau terlambat dapat membuatnya berlanjut menjadi pemeriksaan. Karena itu tanggapan pertama sangat menentukan.",
  },
  {
    question: "Berapa biaya jasa konsultan pajak, dan apakah sepadan?",
    answer:
      "Biaya disesuaikan dengan jumlah entitas, jenis pajak, dan volume transaksi. Sebagai pembanding: denda keterlambatan lapor SPT Badan saja Rp1.000.000 per SPT, sementara kurang bayar yang ditemukan lewat pemeriksaan dikenai bunga hingga 24 bulan. Kami sampaikan estimasi biaya di konsultasi awal, sebelum ada komitmen apa pun.",
  },
  {
    question: "Pajak saya sudah dipotong kantor. Kenapa masih muncul kurang bayar?",
    answer:
      "Karena pemberi kerja hanya menghitung penghasilan yang ia bayarkan sendiri. Bila Anda punya penghasilan lain — usaha sampingan, honor, sewa, royalti — seluruhnya wajib digabung di SPT Tahunan dan dihitung ulang dengan tarif progresif hingga 35%. Selisihnya menjadi PPh Pasal 29 yang harus disetor sendiri sebelum SPT dilaporkan.",
  },
  {
    question: "Apakah TaxPlus bisa mewakili saya di Pengadilan Pajak?",
    answer:
      "Bisa. Managing Partner kami memegang Izin Kuasa Hukum Pengadilan Pajak No. 1507/PP/IKH/2023 dan Kartu Advokat PERADI, sehingga dapat bertindak sebagai kuasa hukum untuk keberatan, banding, maupun gugatan.",
  },
  {
    question: "Klien saya di luar Bandung. Apakah tetap bisa dilayani?",
    answer:
      "Bisa. Kantor kami di Bandung, tetapi klien kami tersebar di berbagai kota. Seluruh administrasi perpajakan kini berjalan lewat Coretax, dan koordinasi dilakukan daring dengan laporan status berkala.",
  },
];

/*
 * General tax questions migrated from the old site's FAQ page. Time-sensitive
 * answers (deadlines, rates, retired DJP applications, PP 23/2018, amnesty)
 * were left out until the consultant reviews them.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "tentang-taxplus",
    title: "Bekerja dengan TaxPlus",
    faqs: [
      ...homeFaqs,
      {
        question: "Apa manfaat menggunakan jasa konsultan pajak?",
        answer:
          "Konsultan pajak membantu Wajib Pajak mengelola kewajiban perpajakan secara tepat dan efisien, memastikan kepatuhan terhadap aturan yang berlaku, serta memberikan solusi atas masalah pajak yang kompleks. Dengan begitu, perusahaan atau individu dapat fokus pada kegiatan usaha utamanya tanpa khawatir salah langkah di urusan pajak.",
      },
      {
        question: "Bagaimana cara menghubungi TaxPlus untuk konsultasi?",
        answer:
          "Lewat WhatsApp di +62 821-2935-0026, email info.taxplusconsulting@gmail.com, atau formulir konsultasi di halaman Beranda. Konsultasi awal 15 menit tanpa biaya, dan kami membalas di hari kerja yang sama.",
      },
    ],
  },
  {
    id: "dasar-perpajakan",
    title: "Dasar perpajakan",
    faqs: [
      {
        question: "Apa itu NPWP dan siapa yang wajib memilikinya?",
        answer:
          "Nomor Pokok Wajib Pajak (NPWP) adalah identitas resmi yang dikeluarkan Direktorat Jenderal Pajak untuk setiap Wajib Pajak. Semua individu maupun badan usaha yang memperoleh penghasilan di Indonesia wajib memiliki NPWP, baik perorangan, perusahaan, maupun organisasi.",
      },
      {
        question: "Apa yang dimaksud dengan SPT (Surat Pemberitahuan)?",
        answer:
          "SPT adalah laporan yang disampaikan Wajib Pajak kepada Direktorat Jenderal Pajak mengenai perhitungan dan/atau pembayaran pajak, objek pajak dan/atau bukan objek pajak, serta harta dan kewajiban.",
      },
      {
        question: "Apa itu objek pajak?",
        answer:
          "Objek pajak adalah segala sesuatu yang dikenakan pajak, seperti penghasilan, barang, jasa, atau transaksi tertentu. Contohnya gaji, laba usaha, atau penyerahan barang/jasa yang dikenai PPN.",
      },
      {
        question: "Bagaimana cara menghitung Pajak Penghasilan (PPh)?",
        answer:
          "PPh dihitung dari penghasilan kena pajak dalam satu tahun. Untuk orang pribadi, tarifnya progresif mulai 5% hingga 35% tergantung besaran penghasilan. Untuk badan usaha, tarif umum PPh Badan adalah 22% dari penghasilan kena pajak.",
      },
      {
        question: "Apa itu Penghasilan Tidak Kena Pajak (PTKP)?",
        answer:
          "PTKP adalah batas penghasilan yang tidak dikenakan pajak. Untuk Wajib Pajak orang pribadi berstatus tidak kawin tanpa tanggungan, PTKP-nya Rp54 juta per tahun. Penghasilan di atas PTKP dikenai pajak dengan tarif progresif PPh orang pribadi.",
      },
      {
        question: "Apa perbedaan PPh 21, PPh 23, dan PPh 25?",
        answer:
          "PPh 21 dikenakan atas gaji, upah, honorarium, tunjangan, dan pembayaran lain yang diterima karyawan atau individu. PPh 23 dikenakan atas penghasilan dari jasa, sewa, dan penghasilan lain selain yang telah dikenakan PPh 21. PPh 25 adalah angsuran pajak yang dibayar setiap bulan selama tahun berjalan.",
      },
      {
        question: "Apakah PPh 23 dikenakan pada semua jenis jasa?",
        answer:
          "Tidak. Hanya jasa-jasa tertentu, seperti jasa konsultasi, jasa teknik, dan sewa harta selain tanah dan bangunan, yang dikenakan PPh 23 dengan tarif 2% dari nilai transaksi.",
      },
      {
        question: "Apa itu withholding tax (pajak potong/pungut)?",
        answer:
          "Withholding tax adalah mekanisme di mana pajak dipotong atau dipungut oleh pihak ketiga — pemberi kerja, penyewa, dan lainnya — atas penghasilan yang dibayarkan kepada Wajib Pajak, lalu disetorkan ke negara.",
      },
      {
        question: "Siapa yang wajib memotong PPh 21?",
        answer:
          "Pemberi kerja, baik individu maupun perusahaan, wajib memotong PPh 21 dari gaji, upah, dan pembayaran lain yang diberikan kepada karyawan atau pekerja lepas.",
      },
      {
        question: "Bagaimana cara mendaftar sebagai Pengusaha Kena Pajak (PKP)?",
        answer:
          "Pengusaha mendaftarkan diri ke kantor pajak untuk dikukuhkan sebagai PKP. Pengusaha dengan omzet di atas Rp4,8 miliar per tahun wajib dikukuhkan sebagai PKP.",
      },
      {
        question: "Apa itu PBB (Pajak Bumi dan Bangunan)?",
        answer:
          "PBB adalah pajak atas kepemilikan, penguasaan, dan/atau pemanfaatan tanah dan/atau bangunan. Besarnya bergantung pada Nilai Jual Objek Pajak (NJOP) tanah dan bangunan.",
      },
      {
        question: "Apa itu BPHTB?",
        answer:
          "Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB) adalah pajak atas perolehan hak atas tanah dan bangunan, misalnya karena pembelian, hibah, atau warisan. Tarifnya paling tinggi 5% dari Nilai Perolehan Objek Pajak (NPOP), sesuai peraturan daerah setempat.",
      },
      {
        question: "Apa itu tax treaty?",
        answer:
          "Tax treaty adalah perjanjian antara dua negara untuk menghindari pengenaan pajak berganda atas penghasilan yang sama. Indonesia memiliki tax treaty dengan banyak negara untuk melindungi Wajib Pajak dari pemajakan ganda.",
      },
    ],
  },
  {
    id: "kewajiban-dan-sanksi",
    title: "Kewajiban & sanksi",
    faqs: [
      {
        question: "Apa kewajiban pajak bagi perusahaan?",
        answer:
          "Perusahaan yang beroperasi di Indonesia wajib membayar beberapa jenis pajak, termasuk Pajak Penghasilan (PPh), Pajak Pertambahan Nilai (PPN), dan Pajak Bumi dan Bangunan (PBB). Jenis pajaknya bergantung pada jenis usaha dan penghasilan perusahaan.",
      },
      {
        question: "Apakah perusahaan baru wajib langsung membayar pajak?",
        answer:
          "Perusahaan yang baru berdiri wajib mendaftarkan NPWP dan mematuhi ketentuan perpajakan sejak pertama kali beroperasi. Perusahaan yang masih merugi tetap melaporkan rugi tersebut dalam SPT Tahunan.",
      },
      {
        question: "Apa sanksi jika terlambat melaporkan SPT Tahunan?",
        answer:
          "Keterlambatan pelaporan SPT Tahunan dikenai denda Rp100.000 untuk Wajib Pajak orang pribadi dan Rp1.000.000 untuk Wajib Pajak badan, di luar sanksi atas pajak yang terlambat dibayar.",
      },
      {
        question: "Bagaimana cara menghindari denda keterlambatan pajak?",
        answer:
          "Pastikan pajak disetor dan dilaporkan sebelum tenggatnya. Kalender tenggat dan pengingat rutin — atau pendampingan Tax Compliance — membantu memastikan tidak ada masa pajak yang terlewat.",
      },
      {
        question: "Bagaimana cara memanfaatkan kredit pajak yang sudah dibayarkan?",
        answer:
          "Kredit pajak adalah pajak yang telah dibayar di muka, misalnya yang dipotong pihak lain. Kredit pajak ini mengurangi jumlah pajak yang terutang di SPT Tahunan Anda.",
      },
      {
        question: "Apa fungsi e-Billing dalam perpajakan?",
        answer:
          "e-Billing adalah sistem pembayaran pajak elektronik: Anda membuat kode billing, lalu menyetor pajak secara daring melalui bank atau kanal pembayaran resmi. Bukti setornya tercatat dengan Nomor Transaksi Penerimaan Negara (NTPN).",
      },
      {
        question: "Apa yang dimaksud dengan tax clearance?",
        answer:
          "Tax clearance adalah surat keterangan dari Direktorat Jenderal Pajak yang menyatakan bahwa Wajib Pajak telah memenuhi kewajiban perpajakannya. Surat ini biasanya dibutuhkan untuk transaksi bisnis atau kegiatan tertentu.",
      },
      {
        question: "Apa itu penagihan pajak dengan surat paksa?",
        answer:
          "Penagihan dengan surat paksa adalah langkah yang ditempuh Direktorat Jenderal Pajak bila Wajib Pajak tidak melunasi utang pajaknya meskipun sudah ditegur. Langkah ini dapat berlanjut hingga penyitaan aset Wajib Pajak.",
      },
    ],
  },
  {
    id: "pemeriksaan-dan-sengketa",
    title: "Pemeriksaan & sengketa",
    faqs: [
      {
        question: "Apa itu SKP (Surat Ketetapan Pajak)?",
        answer:
          "SKP adalah surat yang diterbitkan Direktorat Jenderal Pajak yang menetapkan besarnya pajak terutang — kurang bayar, lebih bayar, atau nihil — berdasarkan hasil pemeriksaan.",
      },
      {
        question: "Bagaimana cara mengajukan banding atas hasil pemeriksaan pajak?",
        answer:
          "Jika tidak setuju dengan hasil pemeriksaan, Wajib Pajak lebih dulu mengajukan keberatan ke Direktorat Jenderal Pajak. Bila keberatan ditolak, Wajib Pajak dapat mengajukan banding ke Pengadilan Pajak, dan setelahnya Peninjauan Kembali ke Mahkamah Agung.",
      },
    ],
  },
  {
    id: "perencanaan-pajak",
    title: "Perencanaan pajak",
    faqs: [
      {
        question: "Apa itu tax planning?",
        answer:
          "Tax planning adalah perencanaan perpajakan untuk menekan beban pajak secara legal sesuai ketentuan yang berlaku, melalui pemanfaatan insentif atau pengaturan transaksi sebelum transaksi itu terjadi.",
      },
      {
        question: "Bagaimana cara memanfaatkan insentif pajak dari pemerintah?",
        answer:
          "Insentif pajak diberikan untuk mendorong pertumbuhan ekonomi dan investasi di bidang tertentu. Wajib Pajak yang memenuhi syarat dapat memanfaatkannya — misalnya berupa pembebasan atau pengurangan pajak — sesuai prosedur yang ditetapkan untuk insentif tersebut.",
      },
      {
        question: "Apa beda tax avoidance dan tax evasion?",
        answer:
          "Tax avoidance adalah upaya legal menekan pajak dengan memanfaatkan ketentuan yang ada. Tax evasion adalah tindakan ilegal menghindari pajak, misalnya dengan tidak melaporkan penghasilan atau memanipulasi laporan pajak.",
      },
    ],
  },
];
