"use client";
import Image from "next/image";
import TravelSearchBar from "../molecule/travelSearchBar";

export default function HeroExact() {
  return (
    <section className="relative">
      {/* Background */}
      <div className="relative h-[360px] sm:h-[400px] lg:h-[440px] overflow-hidden">
        {/* Wider background image */}
        <div className="absolute inset-0 w-full left-1/2 -translate-x-1/2 -z-10">
          <Image
            src="/hero.png"
            alt="Ciel"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* left headline */}
        <div className="absolute inset-0">
          <div className="container mx-auto h-full px-[28px] sm:px-[54px] lg:px-[85px]">
            <div className="flex h-full flex-col justify-center max-w-2xl translate-y-[-20%]">
              <h1 className="font-bold text-white text-[28px] sm:text-[36px] lg:text-[40px] leading-tight">
                Voyagez plus loin, vivez plus grand
              </h1>
              <p className="mt-2 sm:mt-3 font-semibold text-white text-[16px] sm:text-[20px] lg:text-[22px] leading-snug">
                GO-MAKKAH Le luxe, sans frontières.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar (overlaps bottom) */}
      <div className="absolute inset-x-0 -bottom-10 z-20">
        <div className="mx-auto w-[87%]">
          <TravelSearchBar />
        </div>
      </div>
    </section>
  );
}


