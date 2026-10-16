"use client";

import { useId, useState } from "react";

type Item = { question: string; answer: React.ReactNode };

/**
 * Single-open FAQ list. Class names are passed in because the homepage and the
 * service pages style the same pattern with different design classes.
 */
export function Accordion({
  items,
  itemClassName,
  buttonClassName,
  answerClassName,
}: {
  items: Item[];
  itemClassName: string;
  buttonClassName?: string;
  answerClassName: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <>
      {items.map((item, i) => {
        const isOpen = open === i;
        const answerId = `${baseId}-${i}`;
        return (
          <div key={item.question} className={isOpen ? `${itemClassName} open` : itemClassName}>
            <button
              type="button"
              className={buttonClassName}
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.question}
              <span className="pm" aria-hidden="true" />
            </button>
            <div id={answerId} className={answerClassName}>
              {item.answer}
            </div>
          </div>
        );
      })}
    </>
  );
}
