// components/sections/GallerySection.tsx
"use client";

import Image from "next/image";

import * as React from "react";

/* ------------------------- section -------------------------- */
export default function GallerySection({
  images,
  className = "",
  heading = "Les instants précieux de nos voyageurs",
  intro = "Chaque voyage est une mosaïque d'émotions et de découvertes. Nos voyageurs partagent leurs plus beaux instants, entre sourires, rencontres et paysages inoubliables. Ces moments capturés reflètent l'essence même du voyage : vivre pleinement l'instant présent.",
  perPage = 8, // shows 2 rows x 4 cols on large screens
}: {
  images: string[];
  className?: string;
  heading?: string;
  intro?: string;
  perPage?: number;
}) {
  const [page, setPage] = React.useState(0);
  const totalPages = Math.max(1, Math.ceil(images.length / perPage));
  const start = page * perPage;
  const visible = images.slice(start, start + perPage);

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  function openLightbox(i: number) {
    setLightboxIndex(start + i);
  }
  // stable callbacks
  const closeLightbox = React.useCallback(() => {
    setLightboxIndex(null);
  }, []);
  const nextImage = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // keyboard navigation for lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section
      className={`px-[20px] md:px-[40px] lg:px-[89px] py-16 ${className}`}
    >
      <div className="bg-white rounded-[20px] overflow-hidden">
        <div className="p-6 md:p-10 lg:p-12">
          <h2 className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2163ae] text-[28px] tracking-[0] leading-[35px] mb-4">
            {heading}
          </h2>
          <p className="[font-family:'Open_Sans',Helvetica] font-normal text-[#2e2e2e] text-base tracking-[0] leading-[30px] mb-12">
            {intro}
          </p>

          <div className="relative">
            {/* grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
              {visible.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className="relative w-full h-40 sm:h-48 md:h-52 rounded-[20px] overflow-hidden group"
                  onClick={() => openLightbox(i)}
                  aria-label={`Ouvrir l’image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Gallery ${start + i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={i < 4 && page === 0}
                  />
                  {/* subtle bottom shade for legibility if you overlay text later */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </button>
              ))}
            </div>

            {/* dots (show only if multiple pages) */}
            {totalPages > 1 ? (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Aller à la page ${i + 1}`}
                    className={`rounded-full transition-all ${
                      i === page
                        ? "w-5 h-5 bg-[#bfbfbf]"
                        : "w-4 h-4 bg-[#f1f1f1] hover:bg-[#e6e6e6]"
                    }`}
                  />
                ))}
              </div>
            ) : (
              // if only one page, you can keep your decorative three shapes
              <div className="flex justify-center gap-2">
                <div className="w-4 h-4 bg-[#f1f1f1] rounded-lg" />
                <div className="w-5 h-5 bg-[#bfbfbf] rounded-[10px]" />
                <div className="w-3.5 h-4 bg-[#cbcbcb47] rounded-[7px/8px]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl aspect-[16/10] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {/* close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Fermer"
              className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
            >
              ✕
            </button>

            {/* prev/next */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Précédente"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Suivante"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
