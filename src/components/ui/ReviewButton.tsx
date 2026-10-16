import { site } from "@/modules/content/site";

/** "Tulis ulasan Google" button; a plain label until the review link is configured. */
export function ReviewButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const label = "Tulis ulasan Google";
  if (!site.googleReviewUrl) {
    return (
      <span className={className} style={style}>
        {label}
      </span>
    );
  }
  return (
    <a className={className} style={style} href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
