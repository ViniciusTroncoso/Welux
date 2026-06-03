"use client";

import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";

const links = [
  { href: "#home", label: "Home" },
  { href: "#logos", label: "Parceiros" },
  { href: "#form", label: "Formulário" },
  { href: "#footer", label: "Contato" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="border-b border-white/10 text-white h-nav fixed top-0 left-0 w-full z-50"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.86) 0%, rgba(18,18,18,0.72) 100%)",
          backdropFilter: "blur(35px)",
          WebkitBackdropFilter: "blur(35px)",
        }}
      >
        <div className="section-px section-container flex h-full items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5" aria-label="Welux">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Welux" src="/shared/brand/welux-logo-white.svg" className="h-[30px] w-[30px]" />
            <span className="text-[15px] font-semibold uppercase tracking-[0.3em] leading-none pt-0.5">
              Welux
            </span>
          </a>
          <div className="items-center gap-6 hidden md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="cursor-pointer">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#form" className="btn-nav hidden md:block">Entre em contato</a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative flex items-center justify-center w-10 h-10 text-white"
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
              <CloseIcon className="lucide lucide-x" />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
              <MenuIcon className="lucide lucide-menu" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-40 h-full w-4/5 max-w-drawer bg-[#111] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col gap-6 px-6 pt-28">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white text-lg">
              {l.label}
            </a>
          ))}
          <a href="#form" onClick={() => setOpen(false)} className="btn-nav-mobile">Entre em contato</a>
        </div>
      </aside>
    </>
  );
}
