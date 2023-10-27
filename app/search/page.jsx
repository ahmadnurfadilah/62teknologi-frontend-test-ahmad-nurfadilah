"use client";

import MapInSearch from "@/components/section/mapinsearch";
import Navbar from "@/components/section/navbar";
import { MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
	const [businesses, setBusinesses] = useState([]);
	const [region, setRegion] = useState();
	const [total, setTotal] = useState();

  useEffect(() => {
		getBusinesses();
	}, []);

  const getBusinesses = () => {
    fetch(`/api/search?location=NYC`)
      .then((res) => res.json())
      .then((res) => {
				setBusinesses(res?.data?.businesses || []);
				setRegion(res?.data?.region?.center);
				setTotal(res?.data?.total);
			})
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="fixed inset-x-0 z-10 top-0 bg-gray-900 shadow-md">
        <Navbar />
      </div>

      <div className="min-h-[92vh] w-1/2 mt-16 p-4 md:p-8">
				<div className="space-y-4">
					{businesses.map((i) => (
						<Link href={`/biz/${i.alias}`} key={i.id} className="flex gap-4 relative border-b pb-4 group items-center">
							<div className={`shrink-0 w-1/3 aspect-[3/1] relative transition-all duration-500 ${!i.is_closed && "group-hover:aspect-[5/3]"}`}>
								<Image src={i.image_url} alt={i.name} fill className="object-cover object-center rounded-md" />
								{i.is_closed && (
									<div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-md flex items-center justify-center">
										<span className="bg-amaranth px-2 py-1 rounded text-white text-xs font-bold">Closed</span>
									</div>
								)}
							</div>
							<div className="space-y-1">
								<h3 className="font-bold group-hover:underline group-hover:text-amaranth">{i.name}</h3>
								<div className="flex items-center gap-1">
									{i.categories.map((c) => (
										<span key={c.alias} className="text-xs px-1.5 py-px bg-gray-100 text-gray-500 rounded-full font-semibold">{c.title}</span>
									))}
								</div>
								<div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-900">
									<p className="flex items-center gap-1.5 text-sm"><Star className="w-4 h-4" /> {i.rating}</p>
									<p className="flex items-center gap-1.5 text-sm"><MessageSquare className="w-4 h-4" /> {i.review_count}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>

      <div className="fixed right-0 bottom-0 top-16 w-1/2">
        <MapInSearch region={region} />
      </div>
    </div>
  );
}
