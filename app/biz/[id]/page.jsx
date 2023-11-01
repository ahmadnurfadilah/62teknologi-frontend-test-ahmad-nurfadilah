"use client";

import Navbar from "@/components/section/navbar";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RatingStar from "@/components/ui/rating-star";
import Image from "next/image";
import Location from "@/components/section/location";

export default function Page() {
  const params = useParams();
  const [business, setBusiness] = useState();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true })]);

  useEffect(() => {
    getBusinessDetails();
  }, []);

  const getBusinessDetails = () => {
    fetch(`/api/biz/${params.id}`)
      .then((res) => res.json())
      .then((res) => setBusiness(res?.data))
      .catch((err) => toast.error("Failed to get business details"));
  };

  console.log(business);

  return (
    <>
      <div className="bg-amaranth-500">
        <Navbar />
        <div className="container px-4 mx-auto py-12">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4">{business?.name}</h1>
          <RatingStar rate={business?.rating} />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-amaranth-500 to-amaranth-700"></div>
        <div className="container px-4 mx-auto relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {business?.photos?.map((i) => (
                <div key={i} className="embla__slide_details mx-2">
                  <div className="w-full object-cover aspect-video rounded-xl relative">
                    <Image src={i} alt="Photo" fill className="w-full object-cover aspect-video rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-bold text-2xl mb-4">Location</h2>
            <Location business={business} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
