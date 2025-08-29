"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-0 border-t bg-blue-500 text-white">
      {/* Top: links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobile: accordions */}
        <div className="md:hidden space-y-4">
          <FooterColMobile
            title="Plan du site"
            links={[
              { label: "Accueil", href: "/" },
              { label: "Omra", href: "/omra" },
              { label: "Hajj", href: "/hajj" },
              { label: "Voyages Monde", href: "/voyages" },
              { label: "Notre réseau", href: "/reseau" },
            ]}
          />
          <FooterColMobile
            title="Liens utiles"
            links={[
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: "Assistance 24/7", href: "/assistance" },
              { label: "Avis clients", href: "/avis" },
            ]}
          />
          <FooterColMobile
            title="Hajj · Omra"
            links={[
              { label: "Packages Omra", href: "/omra#packages" },
              { label: "Omra combinée", href: "/omra-combinee" },
              { label: "Conseils & formalités", href: "/formalites" },
            ]}
          />
          <FooterColMobile
            title="Informations"
            links={[
              { label: "Conditions générales", href: "/cgv" },
              { label: "Politique de confidentialité", href: "/confidentialite" },
              { label: "Mentions légales", href: "/mentions-legales" },
            ]}
          />
          <FooterColMobile
            title="Nos agences"
            links={[
              { label: "GO-MAKKAH France", href: "/agences/fr" },
              { label: "GO-MAKKAH Maroc", href: "/agences/ma" },
              { label: "GO-MAKKAH Tunisie", href: "/agences/tn" },
              { label: "GO-MAKKAH Arabie Saoudite", href: "/agences/sa" },
            ]}
          />
        </div>

        {/* Desktop/tablet: grid */}
        <div className="hidden md:grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <FooterCol
            title="Plan du site"
            links={[
              { label: "Accueil", href: "/" },
              { label: "Omra", href: "/omra" },
              { label: "Hajj", href: "/hajj" },
              { label: "Voyages Monde", href: "/voyages" },
              { label: "Notre réseau", href: "/reseau" },
            ]}
          />
          <FooterCol
            title="Liens utiles"
            links={[
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: "Assistance 24/7", href: "/assistance" },
              { label: "Avis clients", href: "/avis" },
            ]}
          />
          <FooterCol
            title="Hajj · Omra"
            links={[
              { label: "Packages Omra", href: "/omra#packages" },
              { label: "Omra combinée", href: "/omra-combinee" },
              { label: "Conseils & formalités", href: "/formalites" },
            ]}
          />
          <FooterCol
            title="Informations"
            links={[
              { label: "Conditions générales", href: "/cgv" },
              { label: "Politique de confidentialité", href: "/confidentialite" },
              { label: "Mentions légales", href: "/mentions-legales" },
            ]}
          />
          <FooterCol
            title="Nos agences"
            links={[
              { label: "GO-MAKKAH France", href: "/agences/fr" },
              { label: "GO-MAKKAH Maroc", href: "/agences/ma" },
              { label: "GO-MAKKAH Tunisie", href: "/agences/tn" },
              { label: "GO-MAKKAH Arabie Saoudite", href: "/agences/sa" },
            ]}
          />
        </div>
      </div>

      {/* Bottom: flags / locales */}
      <div className="border-t bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 text-sm text-slate-700">
            <Flag code="fr" label="France" />
            <Flag code="dz" label="Algérie" />
            <Flag code="ma" label="Maroc" />
            <Flag code="sa" label="Arabie Saoudite" />
            <Flag code="tn" label="Tunisie" />
          </div>
        </div>
      </div>

      
    </footer>
  );
}

/* ---------- Shared column for md+ ---------- */
function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-white/80 hover:text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mobile accordion column ---------- */
function FooterColMobile({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const id = React.useId();
  return (
    <details className="group rounded-lg bg-white/5 ring-1 ring-white/10 open:bg-white/10 open:ring-white/20">
      <summary
        className="flex items-center justify-between cursor-pointer list-none px-4 py-3 sm:px-5 select-none"
        aria-controls={id}
      >
        <span className="text-sm font-semibold text-white/95">{title}</span>
        <svg
          className="h-4 w-4 transition-transform group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </summary>
      <ul id={id} className="px-4 pb-3 sm:px-5 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block py-1 text-white/85 hover:text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ---------- Flag row item ---------- */
function Flag({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <img
        src={`https://flagcdn.com/24x18/${code}.png`}
        width={24}
        height={18}
        alt={`Drapeau ${label}`}
        className="shrink-0"
      />
      <span className="font-medium truncate">GO-MAKKAH {label}</span>
    </div>
  );
}
