"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type CarouselPhoto = { src: string; alt: string; width: number; height: number };

/**
 * Scroll-snap carousel: swipe on touch, prev/next buttons, dot indicators and
 * arrow keys. No autoplay. Smooth scrolling is skipped for reduced motion.
 */
export function PhotoCarousel({ photos, label }: { photos: CarouselPhoto[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  // Slide we are scrolling to; lets rapid clicks queue up correctly while a smooth scroll is in flight.
  const target = useRef(0);
  const scrollingTimer = useRef<number | null>(null);

  // Derive the visible slide from the scroll position (swipe, buttons or keyboard).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setIndex(i);
        if (scrollingTimer.current === null) target.current = i; // user swiped
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + photos.length) % photos.length;
    target.current = next;
    if (scrollingTimer.current !== null) window.clearTimeout(scrollingTimer.current);
    scrollingTimer.current = window.setTimeout(() => (scrollingTimer.current = null), 700);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(target.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(target.current - 1);
    }
  }

  return (
    <section className="pcar" aria-roledescription="carousel" aria-label={label} onKeyDown={onKeyDown}>
      <div className="pcar-frame">
        <ul ref={trackRef} className="pcar-track" tabIndex={0} aria-live="polite">
          {photos.map((p, i) => (
            <li
              key={p.src}
              data-index={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${photos.length}`}
              aria-hidden={i !== index}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 1120px) 100vw, 1076px"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="pcar-btn prev"
          onClick={() => goTo(target.current - 1)}
          aria-label="Foto sebelumnya"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="pcar-btn next"
          onClick={() => goTo(target.current + 1)}
          aria-label="Foto berikutnya"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span className="pcar-count" aria-hidden="true">
          {index + 1} / {photos.length}
        </span>
      </div>
      <div className="pcar-foot">
        <p className="pcar-caption">{photos[index]?.alt}</p>
        <div className="pcar-dots" role="group" aria-label="Pilih foto">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className={i === index ? "on" : undefined}
              aria-label={`Foto ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
