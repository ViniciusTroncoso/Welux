"use client";

import { useEffect } from "react";

function getVariant(): "a" | "b" {
  const m = document.cookie.match(/(?:^|;\s*)ab-variant=(a|b)/);
  return (m?.[1] as "a" | "b") ?? "b";
}

function send(event: "exposure" | "conversion") {
  const variant = getVariant();
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variant, event }),
    keepalive: true,
  }).catch(() => {});
}

/**
 * Fires an exposure once per session on the A/B homepage.
 * The conversion for variant B is fired by LeadModal on form submit (a real lead),
 * keeping it comparable to variant A (whose conversion is also the lead form submit).
 */
export default function AbTracker() {
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    try {
      if (!sessionStorage.getItem("ab-exposed")) {
        sessionStorage.setItem("ab-exposed", "1");
        send("exposure");
      }
    } catch {
      send("exposure");
    }
  }, []);

  return null;
}
