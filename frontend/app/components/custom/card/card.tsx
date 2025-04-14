import type { Card_Interface } from "~/lib/interfaces/card";
export default function Card({ img, title }: Card_Interface) {
  return (
    <div className="relative w-full cursor-pointer sm:w-72 h-72 rounded-xl overflow-hidden shadow-lg group">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
