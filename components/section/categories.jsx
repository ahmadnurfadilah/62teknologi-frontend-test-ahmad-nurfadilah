"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import { CarFront, SmilePlus, Sparkles, Store, Target, Utensils, Warehouse } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: 1, name: "Restaurants", slug: "restaurants" ,icon: <Utensils className="w-5 h-5" /> },
  { id: 2, name: "Shoppings", slug: "shoppings" ,icon: <Store className="w-5 h-5" /> },
  { id: 3, name: "Nightlife", slug: "nightlife" ,icon: <Sparkles className="w-5 h-5" /> },
  { id: 4, name: "Active Life", slug: "active" ,icon: <Target className="w-5 h-5" /> },
  { id: 5, name: "Beauty & Spas", slug: "beautysvc" ,icon: <SmilePlus className="w-5 h-5" /> },
  { id: 6, name: "Automotive", slug: "auto" ,icon: <CarFront className="w-5 h-5" /> },
  { id: 7, name: "Home Services", slug: "services" ,icon: <Warehouse className="w-5 h-5" /> },
];

export default function Categories() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true })]);

  return (
    <>
      <p className="text-white mb-4">or browse by category</p>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container gap-4">
          {categories.map((i) => (
            <Link
              href="/search?cflt=nightlife"
              className="embla__slide bg-white flex flex-col items-center justify-center gap-2 p-4 rounded bg-white/10 border border-white/20 text-white text-xs hover:bg-amaranth/20 hover:backdrop-blur transition-all hover:shadow-xl hover:border-amaranth"
              key={i.id}
            >
              {i.icon}
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
