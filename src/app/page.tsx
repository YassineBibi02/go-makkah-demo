import AsiaShowcase, {
  AsiaDestination,
} from "@/components/molecule/asiaShowcase";
import CombinedPackages from "@/components/molecule/combinedPackages";
import Destinations2025, { Destination2025 } from "@/components/molecule/destination2025";
import EgyptPackages from "@/components/molecule/EgyptPackages";
import GallerySection from "@/components/molecule/gallerySection";
import Hero from "@/components/organism/Hero";

const combinedPackages = [
  {
    image: "/example1.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  {
    image: "/example2.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  {
    image: "/example3.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  {
    image: "/example1.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  {
    image: "/example2.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  {
    image: "/example3.png",
    title: "Omra combinée Istanbul",
    duration: "9 Nuits / 10 Jours",
    airline: "Saudi airlines",
    hotelConditions: "Conditions hôtels",
    description:
      "Vivez une expérience spirituelle unique en combinant l'Omra...",
    stars: 4,
    exclusive: false,
    href: "/offres/omra-istanbul",
  },
  // ...the rest
];

const destinations2025: Destination2025[] = [
  {
    image: "/gallery1.png",
    title: "Antalya et Istanbul",
    description: "Très recommandé pour les voyages de noces",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 490",
    currency: "EUR",
    stars: 4,
  },
  {
    image: "/gallery2.png",
    title: "Ouzbékistan",
    description: "Ouzbékistan, joyau de la Route de la Soie",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 350",
    currency: "EUR",
    stars: 4,
  },
  // ...
  {
    image: "/gallery3.png",
    title: "Antalya et Istanbul",
    description: "Très recommandé pour les voyages de noces",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 490",
    currency: "EUR",
    stars: 4,
  },
  {
    image: "/gallery4.png",
    title: "Ouzbékistan",
    description: "Ouzbékistan, joyau de la Route de la Soie",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 350",
    currency: "EUR",
    stars: 4,
  },
  // ...
  {
    image: "/gallery5.png",
    title: "Antalya et Istanbul",
    description: "Très recommandé pour les voyages de noces",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 490",
    currency: "EUR",
    stars: 4,
  },
  {
    image: "/gallery6.png",
    title: "Ouzbékistan",
    description: "Ouzbékistan, joyau de la Route de la Soie",
    duration: "9 Nuits / 10 Jours",
    hotelConditions: "Conditions hôtels",
    price: "1 350",
    currency: "EUR",
    stars: 4,
  },
  // ...
];

const galleryImages = [
  "/f1.png",
  "/f2.png",
  "/f3.png",
  "/f4.png",
  // add more images if you want pagination dots
];

export default function Home() {
  return (
    <main className="">
      <Hero />
      <CombinedPackages items={combinedPackages} className="bg-[#FAFAFA]" />
      <AsiaShowcase
        featured={{
          image: "/asia1.png",
          title: "Bali, l'Île des Dieux",
          subtitle: "Offrez-vous 8 jours inoubliables à Bali",
          price: "1 870",
          currency: "EUR",
        }}
        items={[
          {
            image: "/asia2.png",
            title: "Kuala Lumpur",
            description: "Séjour pour 9 Nuits - 8 Jours",
            price: "1 870",
            currency: "EUR",
          },
          {
            image: "/asia3.png",
            title: "Thailand",
            description: "Une semaine à thailand inoubliable !",
            price: "1 870",
            currency: "EUR",
          },
        ]}
      />
      <EgyptPackages
        className="bg-[#FAFAFA]"
        image="/egypt1.png"
        title="Égypte : quand l'Histoire défie le temps"
        subtitle="GO-Makkah vous propose nos destinations en Égypte : Louxor, Le Caire, Charm el-Cheikh, avec des voyages combinés pour découvrir le meilleur du pays en un seul séjour."
        items={[
          {
            image: "/egypt2.png",
            title: "Egypte : Le Caire et Luxor",
            duration: "9 Nuits / 10 Jours",
            hotelConditions: "Conditions hôtels",
            description:
              "Le Caire et Louxor, deux villes emblématiques pour un voyage inoubliable...",
            price: "1 870",
            currency: "EUR",
            stars: 4,
          },
          {
            image: "/egypt3.png",
            title: "Egypte : Le Caire et Sharm El Sheikh",
            duration: "9 Nuits / 10 Jours",
            hotelConditions: "Conditions hôtels",
            description:
              "Égypte : explorez Le Caire et détendez-vous à Sharm El Sheikh...",
            price: "1 550",
            currency: "EUR",
            stars: 4,
          },
          {
            image: "/egypt4.png",
            title: "Croisière sur le Nil",
            duration: "9 Nuits / 10 Jours",
            hotelConditions: "Conditions hôtels",
            description:
              "La magie du Nil : pyramides, temples et couchers de soleil inoubliables...",
            price: "2 280",
            currency: "EUR",
            stars: 4,
          },
        ]}
      />
      <Destinations2025 className="bg-[#FAFAFA]" items={destinations2025} />
      <GallerySection className="bg-[#FAFAFA]"  images={galleryImages} />

    </main>
  );
}
