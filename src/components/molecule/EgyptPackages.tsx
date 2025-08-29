// components/sections/EgyptPackages.tsx
"use client";

import Image from "next/image";
import * as React from "react";

/* ------------------------- main section -------------------------- */
export default function EgyptPackages({
  image,
  title,
  subtitle,
  items,
  className = "",
}: {
  image: string;
  title: string;
  subtitle: string;
  items: Pkg[];
  className?: string;
}) {
  return (
    <section className={`px-[20px] md:px-[40px] lg:px-[100px] py-16 ${className}`}>
      <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* left big image */}
          <div className="relative w-full lg:w-[402px] h-[320px] lg:h-[796px] shrink-0">
            <Image
              src={image}
              alt="Egypt"
              fill
              className="object-cover rounded-t-[20px] lg:rounded-[20px_0_0_20px]"
              sizes="(max-width: 1024px) 100vw, 402px"
              priority
            />
            {/* optional gradient overlay */}
            <div className="absolute inset-0 rounded-t-[20px] lg:rounded-[20px_0_0_20px] bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* right content */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="font-bold text-[#2163ae] text-[24px] md:text-[28px] leading-[35px] mb-4">
              {title}
            </h2>
            <p className="text-[#2e2e2e] text-base leading-[30px] mb-10">
              {subtitle}
            </p>

            <div className="space-y-8">
              {items.map((pkg, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6">
                  {/* package thumbnail */}
                  <div className="relative w-full sm:w-[226px] h-[160px] rounded-[10px] overflow-hidden shrink-0">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 226px"
                    />
                  </div>

                  {/* package details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-[#2e2e2e] text-lg md:text-xl leading-[30px] mb-2">
                          {pkg.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-[#2e2e2e]">{pkg.duration}</span>
                          <span className="font-semibold text-sm text-[#2e2e2e] ml-3">
                            {pkg.hotelConditions}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(pkg.stars)].map((_, i) => (
                            <Star key={i} filled />
                          ))}
                        </div>
                      </div>

                      {/* price block */}
                      <div className="text-right">
                        <div className="text-sm text-[#2e2e2e]">à partir de</div>
                        <div className="flex items-end gap-1">
                          <span className="font-bold text-[#2163ae] text-2xl md:text-4xl">
                            {pkg.price}
                          </span>
                          <span className="font-bold text-[#2163ae] text-sm md:text-base">
                            {pkg.currency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Hr className="mb-3" />

                    <p className="text-sm text-[#2e2e2e] leading-6 text-justify">
                      <span>{pkg.description}</span>{" "}
                      <button className="font-bold text-[#2163ae] text-[11px] underline ml-1">
                        afficher plus ?
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- helpers -------------------------- */
type Pkg = {
  image: string;
  title: string;
  duration: string;
  hotelConditions: string;
  description: string;
  price: string;
  currency: string;
  stars: number;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[13px] w-[13px]"
      fill={filled ? "#F4B400" : "none"}
      stroke={filled ? "#F4B400" : "#C7C7C7"}
      strokeWidth="1.5"
    >
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
    </svg>
  );
}

function Hr({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-[#e9e9e9] ${className}`} />;
}
