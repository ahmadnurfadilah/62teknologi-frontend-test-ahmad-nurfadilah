"use client";

import { Menu, Popover, Transition } from "@headlessui/react";
import { MessagesSquare, FilterIcon, Star, ThumbsUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback } from "react";

export default function Filter() {
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
    <Popover>
      <Popover.Button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-l">
        <FilterIcon className="w-5 h-5" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute w-1/2 bg-white right-0 border rounded-md shadow-xl p-2 text-gray-600 text-sm">
          Filter
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
