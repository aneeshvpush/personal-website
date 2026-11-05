"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// A silent video that plays from the start while the carousel is hovered and rests on its thumbnail
// frame otherwise. thumb is that frame's time in seconds, for videos whose first frame is black.
function VideoSlide({ src, thumb, active, hovered }: { src: string; thumb: number; active: boolean; hovered: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && hovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = thumb;
    }
  }, [active, hovered, thumb]);

  return (
    <video
      ref={ref}
      // #t makes the browser paint the thumbnail frame; 0.1 stands in for the first frame.
      src={`${basePath}${src}#t=${thumb || 0.1}`}
      preload="metadata"
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover bg-black"
    />
  );
}

// Crossfading gallery of images and videos that fills its (aspect-ratio) parent.
// Auto-advances, but pauses while hovered; hovering also plays the video slide.
export default function ImageCarousel({ images, interval = 3500 }: { images: MediaItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [hovered, images.length, interval]);

  return (
    <div
      className="absolute inset-0 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((item, i) => {
        const shown = i === index;
        const layer = `absolute inset-0 transition-opacity duration-700 ${
          shown ? "opacity-100" : "opacity-0 pointer-events-none"
        }`;
        return typeof item === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item}
            src={`${basePath}${item}`}
            alt=""
            className={`${layer} w-full h-full object-cover`}
          />
        ) : (
          <div key={item.video} className={layer}>
            <VideoSlide src={item.video} thumb={item.thumb ?? 0} active={shown} hovered={hovered} />
          </div>
        );
      })}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show item ${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
