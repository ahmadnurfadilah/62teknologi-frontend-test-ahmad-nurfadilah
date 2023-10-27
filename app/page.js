import Categories from "@/components/section/categories";
import Navbar from "@/components/section/navbar";
import Button from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("/img/bakcground.webp")` }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/30"></div>
      <div className="relative h-full flex items-center justify-center">
        <div className="w-full max-w-4xl px-4">
          <h1 className="font-extrabold leading-normal md:leading-tight text-4xl sm:text-5xl md:text-6xl text-center text-white mb-12">Discover and Review the Best Local Businesses</h1>
          <div className="w-full bg-white rounded-md p-2 flex items-center gap-3">
            <div className="flex-1 border-r">
              <input type="text" className="w-full border-transparent" placeholder="What are you looking for" />
            </div>
            <div className="flex-1">
              <input type="text" className="w-full border-transparent" placeholder="Location" />
            </div>
            <Button>
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 w-full">
        <Navbar />
      </div>

      <div className="absolute bottom-[15%] w-full">
        <div className="w-full max-w-4xl px-4 mx-auto">
          <Categories />
        </div>
      </div>
    </div>
  );
}
