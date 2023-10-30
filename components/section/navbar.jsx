"use client";

import Link from "next/link";
import LogoIpsum from "../logo/logo-ipsum";
import { usePathname } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import SearchBox from "./search-box";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="h-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-12">
          <Link href="/">
            <LogoIpsum className="h-10 text-white" />
          </Link>
          <div className="flex-1">{pathname === "/search" && <SearchBox />}</div>
          <ul className="flex items-center gap-10 font-semibold text-white/70">
            <li>
              <Link href="/" className={`${pathname === "/" ? "underline font-bold text-white" : "hover:text-white"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className={`flex items-end gap-1 hover:text-white`}>
                Category
                <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link href="/about" className={`${pathname === "/about" ? "underline font-bold text-white" : "hover:text-white"}`}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
