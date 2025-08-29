// components/sections/AsiaShowcase.tsx
"use client";

import Image from "next/image";
import * as React from "react";

/* ------------------------- types -------------------------- */
export type AsiaDestination = {
  image: string;
  title: string;
  description: string;
  price: string;
  currency: string;
};

export default function AsiaShowcase({
  featured, // the big showcase card
  items,    // exactly 2 items for the right column
  className = "",
}: {
  featured: {
    image: string;
    title: string;
    subtitle: string;
    price: string;
    currency: string;
  };
  items: AsiaDestination[];
  className?: string;
}) {
  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="px-[20px] md:px-[40px] lg:px-[85px]">
        <h2 className="[font-family:'Open_Sans',Helvetica] font-bold text-[#2e2e2e] text-[28px] leading-[35px] mb-4">
          Découvrez l&apos;infini, découvrez l&apos;Asie !
        </h2>
        <p className="[font-family:'Open_Sans',Helvetica] font-normal text-[#2e2e2e] text-base leading-[30px] mb-12">
          un voyage où chaque destination révèle une nouvelle émotion, une
          culture unique et des paysages à couper le souffle. Laissez-vous
          envoûter par l&apos;immensité d&apos;un continent aux mille visages et vivez
          l&apos;émerveillement sans limite.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* big featured left card */}
          <div className="lg:col-span-2 relative">
            <div className="relative w-full h-[400px] sm:h-[560px] lg:h-[728px] rounded-lg overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white max-w-[80%]">
                <h3 className="[font-family:'Open_Sans',Helvetica] font-bold text-2xl sm:text-3xl leading-[36px] mb-2">
                  {featured.title}
                </h3>
                <p className="[font-family:'Open_Sans',Helvetica] font-normal text-base leading-[30px] mb-4">
                  {featured.subtitle}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-base">à partir de</span>
                  <span className="font-bold text-[#e1cc95] text-3xl sm:text-4xl">
                    {featured.price}
                  </span>
                  <span className="font-bold text-[#e1cc95] text-base">
                    {featured.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right column with 2 stacked smaller cards */}
          <div className="space-y-8">
            {items.slice(0, 2).map((dest, i) => (
              <div key={i} className="relative w-full h-[260px] sm:h-[300px] lg:h-[348px] rounded-lg overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-bold text-2xl leading-[30px] mb-2">
                    {dest.title}
                  </h3>
                  <p className="text-base mb-3">{dest.description}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-base">à partir de</span>
                    <span className="font-bold text-[#e1cc95] text-2xl sm:text-3xl">
                      {dest.price}
                    </span>
                    <span className="font-bold text-[#e1cc95] text-base">
                      {dest.currency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
