// components/sections/CombinedPackages.tsx
"use client";

import Image from "next/image";
import * as React from "react";

/* ------------------------- types -------------------------- */
export type Pkg = {
  image: string;
  title: string;
  duration: string;
  airline?: string;
  hotelConditions?: string;
  description: string;
  stars: number;
  exclusive?: boolean;
};

/* ------------------------- main section -------------------------- */
export default function CombinedPackages({
  items,
  className = "",
}: {
  items: Pkg[];
  className?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);

  // compute how many “pages” exist (container width chunks)
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
      setPageCount(pages);
      setCurrentPage(Math.round(el.scrollLeft / el.clientWidth));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  // update active dot while user scrolls
  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    if (page !== currentPage) setCurrentPage(page);
  }

  // jump to a page smoothly
  function scrollToPage(i: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <section className={`px-[20px] md:px-[40px] lg:px-[85px] py-16 ${className}`}>
      <h2 className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2e2e2e] text-[28px] leading-[35px] mb-4">
        Combinez vos voyages, multipliez vos émotions !
      </h2>
      <p className="[font-family:'Open_Sans',Helvetica] font-normal text-[#2e2e2e] text-base leading-[30px] mb-8">
        Avec Go-Makkah, offrez-vous l'art de combiner vos voyages pour vivre
        deux fois plus d'expériences, deux fois plus de découvertes et deux fois
        plus de bonheur. Parce qu'un voyage ne suffit pas, vivez l'émotion au
        pluriel.
      </p>

      {/* horizontal scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {items.map((pkg, i) => (
            <article
              key={`${pkg.title}-${i}`}
              className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[32%] snap-start bg-white rounded-[28px] overflow-hidden border border-[#e9e9e9] hover:shadow-md transition-shadow"
            >
              {/* image */}
              <div className="relative w-full h-[240px] sm:h-[280px] md:h-[328px]">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 33vw"
                  priority={i < 3}
                />
                {pkg.exclusive && (
                  <div className="absolute bottom-0 left-0 right-0 bg-[#be9e4ad1] h-[47px] flex items-center justify-center">
                    <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-white text-sm">
                      En exclusivité GO-MAKKAH
                    </span>
                  </div>
                )}
              </div>

              {/* body */}
              <div className="p-6 md:p-8">
                <h3 className="[font-family:'Open_Sans',Helvetica] font-semibold text-[#2e2e2e] text-lg md:text-xl leading-[28px] mb-4 line-clamp-2">
                  {pkg.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <Stars n={pkg.stars} />
                  {pkg.hotelConditions && (
                    <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-[#2e2e2e] text-xs md:text-sm ml-2">
                      {pkg.hotelConditions}
                    </span>
                  )}
                </div>

                <Hr className="my-3" />

                <Row label="Durée de séjour">{pkg.duration}</Row>
                {pkg.airline && <Row label="Vols avec">{pkg.airline}</Row>}

                <ExpandableText className="mt-3" collapsedLines={3}>
                  {pkg.description}
                </ExpandableText>
              </div>
            </article>
          ))}
        </div>

        {/* dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToPage(i)}
              aria-label={`Aller à la page ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentPage ? "bg-[#2163ae]" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between text-sm text-[#2e2e2e]">
      <span className="font-semibold">{label}</span>
      <span className="font-normal">{children}</span>
    </div>
  );
}

function Hr({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[#e9e9e9] ${className}`} />;
}

function ExpandableText({
  children,
  collapsedLines = 3,
  className,
}: {
  children: string;
  collapsedLines?: number;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={className}>
      <p className={`text-sm text-[#2e2e2e] ${open ? "" : `line-clamp-${collapsedLines}`}`}>
        {children}
      </p>
      <button
        type="button"
        className="font-semibold text-[#2163ae] text-[11px] underline mt-1"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "afficher moins" : "afficher plus ?"}
      </button>
    </div>
  );
}

/* Hide scrollbar but still scrollable (add this file) */
import "@/styles/scrollbar-hide.css";
