"use client";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import MapInSearch from "@/components/section/map-in-search";
import Navbar from "@/components/section/navbar";
import { ChevronLeft, ChevronRight, Loader, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  // state for business data
  const [businesses, setBusinesses] = useState([]);
  const [region, setRegion] = useState();
  const [total, setTotal] = useState();

  // state for pagination
  const [page, setPage] = useState(parseInt(searchParams.get("page") ?? 1));
  const [limit, setLimit] = useState(10);

  // set page when search params changed
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") ?? 1));
  }, [searchParams]);

  // get businesses when page is changed
  useEffect(() => {
    getBusinesses(page);
  }, [page, searchParams]);

  // get businesses
  const getBusinesses = (page) => {
    setLoading(true);
    fetch(`/api/search?location=${searchParams.get("location")}&term=${searchParams.get("search") || ""}&limit=${limit}&offset=${page === 1 ? 0 : (page - 1) * limit}`)
      .then((res) => res.json())
      .then((res) => {
        setBusinesses(res?.data?.businesses || []);
        setRegion(res?.data?.region?.center);
        setTotal(res?.data?.total);
        setLoading(false);
      })
      .catch((err) => toast.error("Failed to fetch data"));
  };

  // Get a new searchParams string by merging the current searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div>
      <div className="fixed inset-x-0 z-10 top-0 bg-gray-900 shadow-md">
        <Navbar />
      </div>

      <div className="min-h-[92vh] w-1/2 mt-16 px-4 md:px-8 pb-16 relative">
        <div className="space-y-2">
          {loading ? (
            <Skeleton width={`100%`} count={10} className="h-28 mb-2" />
          ) : (
            <>
              {businesses.map((i) => (
                <Link
                  href={`/biz/${i.alias}`}
                  key={i.id}
                  className="flex gap-4 p-2 rounded-md relative group items-center bg-gradient-to-l from-black/5 border border-white hover:border-black transition-all duration-500"
                >
                  <div
                    className={`shrink-0 w-1/4 aspect-[5/3] relative transition-all duration-500 overflow-hidden ${!i.is_closed && "group-hover:aspect-[5/3]"}`}
                  >
                    <Image
                      src={i.image_url}
                      alt={i.name}
                      fill
                      className="object-cover object-center rounded-md group-hover:scale-110 transition-all duration-500"
                    />
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
                        <span key={c.alias} className="text-xs px-1.5 py-px bg-gray-100 text-gray-500 rounded-full font-semibold">
                          {c.title}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-900 font-mono">
                      <p className="flex items-center gap-1.5 text-sm">
                        <Star className="w-4 h-4" /> {i.rating}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm">
                        <MessageSquare className="w-4 h-4" /> {i.review_count}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="fixed z-10 bottom-4 left-4 md:left-8">
          <div className="flex shadow-xl bg-amaranth rounded-md text-white divide-x divide-amaranth-700 border border-amaranth-700">
            <button
              onClick={() => {
                if (page > 1) {
                  router.push(pathname + "?" + createQueryString("page", page - 1));
                }
              }}
              disabled={loading || page === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-l-md hover:bg-amaranth-600 disabled:cursor-not-allowed disabled:bg-amaranth-400 disabled:text-amaranth-800"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <p className="w-10 flex items-center justify-center py-2 font-mono">{loading ? <Loader className="w-4 h-4 animate-spin"/> : page}</p>
            <button
              onClick={() => {
                router.push(pathname + "?" + createQueryString("page", page + 1));
              }}
              disabled={loading}
              className="flex items-center gap-1 px-4 py-2 rounded-r-md hover:bg-amaranth-600 disabled:cursor-not-allowed disabled:bg-amaranth-400 disabled:text-amaranth-800"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed right-0 bottom-0 top-16 w-1/2">
        <MapInSearch region={region} businesses={businesses} />
      </div>
    </div>
  );
}
