"use client";

import { useEffect, useRef, useState } from "react";
import { keepAlive, logoutIdle } from "@/modules/admin/actions";

const ACTIVITY_KEY = "tp_admin_activity";
const EVENTS = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart", "scroll"] as const;
const WARN_MS = 2 * 60 * 1000;
const PING_MS = 60 * 1000;

function readShared() {
  try {
    return Number(localStorage.getItem(ACTIVITY_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeShared(t: number) {
  try {
    localStorage.setItem(ACTIVITY_KEY, String(t));
  } catch {}
}

/**
 * Signs the admin out after `minutes` without activity in any admin tab, with a two-minute warning.
 * While the admin is active it pings the server once a minute, so the server-side idle expiry
 * keeps sliding even when they write for a long time without saving.
 */
export function IdleLogout({ minutes }: { minutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const last = useRef(0);
  const pinged = useRef(0);
  const leaving = useRef(false);

  useEffect(() => {
    const idleMs = minutes * 60 * 1000;
    last.current = pinged.current = Date.now();
    writeShared(last.current);

    const leave = () => {
      if (leaving.current) return;
      leaving.current = true;
      void logoutIdle(location.pathname + location.search);
    };

    const onActivity = () => {
      const now = Date.now();
      // Pointer moves fire constantly; a few seconds of precision is plenty.
      if (now - last.current < 5000) return;
      last.current = now;
      writeShared(now);
    };

    const tick = () => {
      const now = Date.now();
      const lastActive = Math.max(last.current, readShared());
      const left = idleMs - (now - lastActive);
      if (left <= 0) return leave();
      setSecondsLeft(left <= WARN_MS ? Math.ceil(left / 1000) : null);
      if (lastActive > pinged.current && now - pinged.current >= PING_MS) {
        pinged.current = now;
        void keepAlive().then((ok) => {
          if (!ok) leave();
        });
      }
    };

    for (const e of EVENTS) window.addEventListener(e, onActivity, { passive: true, capture: true });
    document.addEventListener("visibilitychange", tick);
    const timer = setInterval(tick, 1000);
    return () => {
      for (const e of EVENTS) window.removeEventListener(e, onActivity, { capture: true });
      document.removeEventListener("visibilitychange", tick);
      clearInterval(timer);
    };
  }, [minutes]);

  if (secondsLeft === null) return null;
  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return (
    <div className="adm-idle" role="alert">
      {/* The countdown changes every second, so screen readers get one fixed sentence instead. */}
      <p aria-hidden="true">
        Tidak ada aktivitas. Anda akan keluar otomatis dalam{" "}
        <b>
          {mm}:{ss}
        </b>
        .
      </p>
      <p className="sr-only">Tidak ada aktivitas. Anda akan keluar otomatis dalam 2 menit.</p>
      <button
        type="button"
        className="adm-btn gold sm"
        onClick={() => {
          last.current = pinged.current = Date.now();
          writeShared(last.current);
          setSecondsLeft(null);
          void keepAlive();
        }}
      >
        Tetap masuk
      </button>
    </div>
  );
}
