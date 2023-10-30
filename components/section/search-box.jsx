"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef();
  const locationRef = useRef();
  const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams.get("location")) {
			router.push(pathname + "?location=Paris");
		}
	}, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.set("search", searchRef.current.value);
    params.set("location", locationRef.current.value);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <form className="flex-1 flex items-center gap-px" onSubmit={onSubmit}>
      <input
        ref={searchRef}
        type="text"
				defaultValue={searchParams.get("search")}
        className="w-full bg-gray-700 px-3 py-2 placeholder:text-white/60 text-white border-none rounded-l"
        placeholder="Search..."
      />
      <input
        ref={locationRef}
        type="text"
				defaultValue={searchParams.get("location")}
        className="w-full bg-gray-700 px-3 py-2 placeholder:text-white/60 text-white border-none"
        placeholder="Location..."
      />
      <button className="shrink-0 bg-amaranth w-14 h-10 flex items-center justify-center rounded-r">
        <Search className="w-5 h-5 text-white" />
      </button>
    </form>
  );
}
