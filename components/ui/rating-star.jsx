import Star from "../icon/star";

export default function RatingStar({ rate }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center relative ${rate >= 1 ? "bg-amber-500" : "bg-white/20"}`}>
        <Star className="w-5 h-5 relative" />
      </div>
      <div className={`w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center relative ${rate >= 2 ? "bg-amber-500" : "bg-white/20"}`}>
        <Star className="w-5 h-5 relative" />
      </div>
      <div className={`w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center relative ${rate >= 3 ? "bg-amber-500" : "bg-white/20"}`}>
        <Star className="w-5 h-5 relative" />
      </div>
      <div className={`w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center relative ${rate >= 4 ? "bg-amber-500" : "bg-white/20"}`}>
        <Star className="w-5 h-5 relative" />
      </div>
      <div className={`w-8 h-8 rounded-md bg-white/20 text-white flex items-center justify-center relative ${rate >= 5 ? "bg-amber-500" : "bg-white/20"}`}>
        <Star className="w-5 h-5 relative" />
      </div>
      <p className="font-bold text-lg text-white">{rate}</p>
    </div>
  );
}
