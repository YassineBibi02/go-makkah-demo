"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Accueil", href: "/acceuil" },
    { label: "Omra", href: "/omra" },
    { label: "Omra combinée", href: "/omra-combinee" },
    { label: "Hajj", href: "/hajj" },
    { label: "Voyages Monde", href: "/" },
    { label: "Notre réseau", href: "/reseau" },
  ];

  return (
    <header className="w-full">
      <div className="bg-red-800 text-white">
        <div className="container h-20 mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-xs sm:text-sm">
          <div className="flex flex-col">
            <span className="text-4xl">GO-MAKKAH</span>
            <span className="font-light">
              Quand foi et prestige se rencontrent
            </span>
          </div>
          <div className="flex flex-col items-end ">
            <span className="text-2xl font-semibold">01 49 87 70 21</span>
            <span className="hidden sm:inline opacity-90">
              32 avenue Pierre Semarde, 94200
            </span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 border-b bg-white backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-black font-medium p-4 hover:text-red-700 hover:border-b-2 hover:border-red-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="mMon-compte"
              className="rounded-full border border-white hover:border-black px-4 py-2 text-sm text-black hover:bg-slate-50 flex flex-row  gap-2"
            >
             <UserIcon className="h-5 w-5" />
              Mon compte
            </Link>
            <Link
              href="/espace-client"
              className="rounded-full border border-white hover:border-black px-4 py-2 text-sm text-black hover:bg-slate-50 flex flex-row  gap-2"
            >
             <UserIcon className="h-5 w-5" />
              Espace client
            </Link>
            
          </div>

          <button
            aria-label="Ouvrir le menu"
            className="md:hidden inline-flex items-center justify-center rounded-md border p-2 border-black "
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerIcon open={open} />
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 grid gap-2 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-2 py-2 text-black hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/espace-client"
                className="rounded-md border px-3 py-2 text-black text-center hover:bg-slate-50"
              >
                Espace client
              </Link>
              <Link
              href="/mon-compte"
              className="rounded-md border px-3 py-2 text-black text-center hover:bg-slate-50 "
            >
              Mon compte
            </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}



function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-black stroke-black"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6l-12 12" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A9.969 9.969 0 0112 15c2.21 0 4.236.72 5.879 1.929M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}