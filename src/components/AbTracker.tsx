"use client";

import { useEffect } from "react";

function getVariant(): "a" | "b" {
  const m = document.cookie.match(/(?:^|;\s*)ab-variant=(a|b)/);
  return (m?.[1] as "a" | "b") ?? "b";
}

function send(event: "exposure" | "conversion") {
  const variant = getVariant();
  const payload = JSON.stringify({ variant, event });
  // keepalive so the request survives navigation on CTA click
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

/** Fires an exposure once per session and a conversion when a [data-ab-cta] element is clicked. */
export default function AbTracker() {
  useEffect(() => {
    // Only track the A/B homepage (variant B). Utility pages like /ab-stats must not log exposures.
    if (window.location.pathname !== "/") return;
    try {
      if (!sessionStorage.getItem("ab-exposed")) {
        sessionStorage.setItem("ab-exposed", "1");
        send("exposure");
      }
    } catch {
      send("exposure");
    }

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest("[data-ab-cta]")) {
        send("conversion");
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
