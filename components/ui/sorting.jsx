"use client";

import { Menu, Transition } from "@headlessui/react";
import { MessagesSquare, SortDesc, Star, ThumbsUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback } from "react";

export default function Sorting() {
	const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    <Menu as="div">
      <Menu.Button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-r flex items-center gap-1 text-xs">
        <SortDesc className="w-5 h-5" />
        {(searchParams.get("sortby") === "best_match" || !searchParams.get("sortby")) && "Recommended"}
        {searchParams.get("sortby") === "rating" && "Highest Rated"}
        {searchParams.get("sortby") === "review_count" && "Most Reviewed"}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute w-48 bg-white right-0 border rounded-md shadow-xl p-2 text-gray-600 text-sm">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`p-2 rounded w-full flex items-center gap-2 ${
                  (active || searchParams.get("sortby") === "best_match" || !searchParams.get("sortby")) && "bg-amaranth-200 text-amaranth-900"
                }`}
                onClick={() => router.push(pathname + "?" + createQueryString("sortby", "best_match"))}
              >
                <ThumbsUp className="w-4 h-4" />
                Recommended
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`p-2 rounded w-full flex items-center gap-2 ${
                  (active || searchParams.get("sortby") === "rating") && "bg-amaranth-200 text-amaranth-900"
                }`}
                onClick={() => router.push(pathname + "?" + createQueryString("sortby", "rating"))}
              >
                <Star className="w-4 h-4" />
                Highest Rated
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`p-2 rounded w-full flex items-center gap-2 ${
                  (active || searchParams.get("sortby") === "review_count") && "bg-amaranth-200 text-amaranth-900"
                }`}
                onClick={() => router.push(pathname + "?" + createQueryString("sortby", "review_count"))}
              >
                <MessagesSquare className="w-4 h-4" />
                Most Reviewed
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
