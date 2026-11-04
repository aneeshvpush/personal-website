import Reveal from "./Reveal";
import { photoColors } from "@/lib/content";

const tilts = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-3"];

export default function PhotoStrip() {
  return (
    <Reveal>
      <div className="flex justify-center items-center mt-4 md:mt-8 overflow-hidden w-full sm:overflow-visible">
        {photoColors.map((c, i) => (
          <div
            key={i}
            className={`${tilts[i]} rounded-xl -mx-4 mt-4 p-1 bg-neutral-800 border border-neutral-700 shrink-0 overflow-hidden hover:scale-105 hover:z-10 transition-transform duration-300`}
          >
            {/* Placeholder: swap each div for <img src="/your-photo.jpg" ... /> */}
            <div
              className="rounded-lg h-32 w-28 sm:h-40 sm:w-32 md:h-52 md:w-40 lg:h-64 lg:w-52 shrink-0"
              style={{ backgroundColor: c }}
            />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
