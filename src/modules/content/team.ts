import type { CarouselPhoto } from "@/components/ui/PhotoCarousel";

const photo = (n: string, alt: string): CarouselPhoto => ({
  src: `/images/photos/team/team-${n}.jpg`,
  alt,
  width: 1500,
  height: 1000,
});

/* Team photos from the TaxPlus Google Drive (TEAM folder), cropped to 3:2. */
export const teamPhotos: CarouselPhoto[] = [
  photo("01", "Tim TaxPlus Consulting berfoto bersama di ruang tunggu kantor, Bandung."),
  photo("02", "Tim meninjau pekerjaan klien bersama di meja kerja."),
  photo("03", "Tim TaxPlus di ruang kerja kantor."),
  photo("04", "Diskusi tim di depan laptop sebelum laporan dikirim."),
  photo("05", "Rekan tim memeriksa ulang dokumen bersama."),
  photo("06", "Managing Partner mendampingi tim di meja kerja."),
  photo("07", "Sesi diskusi tim di depan papan tulis."),
  photo("08", "Pembahasan kasus klien di ruang rapat."),
  photo("09", "Tim membahas berkas di ruang rapat."),
  photo("10", "Pembahasan SPT Tahunan orang pribadi di papan tulis."),
];
