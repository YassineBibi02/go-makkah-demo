// components/sections/Destinations2025.tsx
"use client";

import Image from "next/image";
import * as React from "react";

/* ------------------------- types -------------------------- */
export type Destination2025 = {
  image: string;
  title: string;
  description: string;
  duration: string;
  hotelConditions: string;
  price: string;        // e.g. "1 490" or "Sur devis"
  currency: string;     // "EUR" or "" if "Sur devis"
  stars: number;        // 0..5
  href?: string;        // optional click-through
};

/* ------------------------- section -------------------------- */
export default function Destinations2025({
  items,
  className = "",
  heading = "Explorez Nos Meilleures Destinations 2025",
  intro = "Découvrez dès maintenant les destinations incontournables de 2025 ! Des plages paradisiaques aux villes historiques, en passant par des aventures uniques et des paysages à couper le souffle, préparez votre voyage de rêve et laissez-vous inspirer par nos meilleures suggestions pour l'année à venir",
}: {
  items: Destination2025[];
  className?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className={`px-[20px] md:px-[40px] lg:px-[85px] py-16 ${className}`}>
      <h2 className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2e2e2e] text-[28px] tracking-[0] leading-[35px] mb-4">
        {heading}
      </h2>
      <p className="[font-family:'Open_Sans',Helvetica] font-normal text-[#2e2e2e] text-base tracking-[0] leading-[30px] mb-12">
        {intro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((dest, index) => (
          <article
            key={`${dest.title}-${index}`}
            className="bg-white rounded-[20px] overflow-hidden border border-[#e9e9e9] hover:shadow-md transition-shadow flex"
          >
            {/* thumbnail */}
            <div className="relative w-[234px] h-full hidden sm:block shrink-0">
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                className="object-cover rounded-l-[20px]"
                sizes="234px"
                priority={index < 2}
              />
            </div>

            {/* body */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="min-w-0">
                  <h3 className="[font-family:'Open_Sans',Helvetica] font-semibold text-[#2e2e2e] text-xl tracking-[0] leading-[30px] mb-2 line-clamp-2">
                    {dest.title}
                  </h3>
                  <p className="[font-family:'Open_Sans',Helvetica] font-normal text-[#2e2e2e] text-sm text-justify tracking-[0] leading-6 mb-2">
                    {dest.description}
                  </p>

                  <Hr className="mb-2" />

                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="[font-family:'Open_Sans',Helvetica] text-[#2e2e2e] text-sm leading-[30px]">
                      {dest.duration}
                    </span>
                    <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-[#2e2e2e] text-sm leading-[30px] ml-2">
                      {dest.hotelConditions}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Stars n={dest.stars} />
                  </div>
                </div>

                {/* price */}
                <div className="text-right shrink-0">
                  {dest.price !== "Sur devis" ? (
                    <>
                      <div className="[font-family:'Open_Sans',Helvetica] text-[#2e2e2e] text-sm leading-[30px]">
                        à partir de
                      </div>
                      <div className="flex items-end gap-1 justify-end">
                        <span className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2163ae] text-3xl md:text-4xl leading-[30px] tracking-[0]">
                          {dest.price}
                        </span>
                        <span className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2163ae] text-sm md:text-base leading-[30px] tracking-[0]">
                          {dest.currency}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2163ae] text-sm md:text-base leading-[30px] underline">
                      {dest.price}
                    </div>
                  )}
                </div>
              </div>

              {/* optional CTA */}
              {dest.href && (
                <a
                  href={dest.href}
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm hover:bg-slate-50"
                >
                  Voir l’offre
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------- helpers -------------------------- */

function Stars({ n = 0 }: { n?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < n} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill={filled ? "#F4B400" : "none"}
      stroke={filled ? "#F4B400" : "#C7C7C7"}
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    </svg>
  );
}

function Hr({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[#e9e9e9] ${className}`} />;
}
