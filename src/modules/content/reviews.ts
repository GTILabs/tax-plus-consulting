export type GoogleReview = { author: string; text: string; context: string };

/*
 * Copied from the TAXPLUS CONSULTING Google Business Profile, shown as first
 * name + initial. Keep wording verbatim; refresh from the listing when needed.
 */
export const featuredReviews: GoogleReview[] = [
  {
    author: "Naufal R. H.",
    context: "Pelaporan & laporan keuangan",
    text: "Pelayanan yang sangat profesional, Timnya sangat menguasai regulasi perpajakan terbaru, sehingga kami merasa aman dan tenang menyerahkan laporan keuangan kami ke sini.",
  },
  {
    author: "Naura S. A.",
    context: "Pendampingan pemeriksaan",
    text: "pendampingan saat pemeriksaan pajaknya sangat membantu sehingga berjalan dengan lancar",
  },
  {
    author: "Agil F.",
    context: "Konsultasi",
    text: "sangat profesional dan dapat mengerti client dengan cepat dan tepat. highly recommended",
  },
];
