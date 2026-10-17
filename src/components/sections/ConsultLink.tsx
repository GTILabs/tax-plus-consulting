"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { consultationHref, DEFAULT_TOPIC, TOPIC_EVENT, type TopicSlug } from "@/modules/consultations/topics";

/**
 * Link to the consultation form with a topic pre-selected. On the homepage it
 * scrolls to the form and selects the topic in place instead of navigating.
 */
export function ConsultLink({
  topic = DEFAULT_TOPIC,
  className,
  children,
}: {
  topic?: TopicSlug;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const form = document.getElementById("kontak");
    if (!form) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(TOPIC_EVENT, { detail: topic }));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", consultationHref(topic));
  }

  return (
    <Link href={consultationHref(topic)} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
