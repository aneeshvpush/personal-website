"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// A silent video that plays from the start while the carousel is hovered, or while the visitor has
// asked for the full animation, and rests on its thumbnail frame otherwise. thumb is that frame's
// time in seconds, for videos whose first frame is black.
function VideoSlide({
  src,
  thumb,
  active,
  hovered,
  forced,
  request,
  onEnded,
}: {
  src: string;
  thumb: number;
  active: boolean;
  hovered: boolean;
  forced: boolean;
  request: number;
  onEnded: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wasPlaying = useRef(false);
  const shouldPlay = active && (hovered || forced);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (shouldPlay) {
      if (!wasPlaying.current) video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = thumb;
    }
    wasPlaying.current = shouldPlay;
  }, [shouldPlay, thumb]);

  // Each press of "Play Animation" restarts the video, even if hovering had already started it.
  useEffect(() => {
    const video = ref.current;
    if (!request || !video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [request]);

  return (
    <video
      ref={ref}
      // #t makes the browser paint the thumbnail frame; 0.1 stands in for the first frame.
      src={`${basePath}${src}#t=${thumb || 0.1}`}
      preload="metadata"
      muted
      // Looping while hovered; a requested play runs once so that it can end and move on.
      loop={!forced}
      playsInline
      onEnded={onEnded}
      className="absolute inset-0 w-full h-full object-cover bg-black"
    />
  );
}

// Crossfading gallery of images and videos that fills its (aspect-ratio) parent.
// Auto-advances, but pauses while hovered; hovering also plays the video slide.
// "Play Animation" jumps to the video, plays it once in full, then tours the remaining slides
// on the usual timing even while the pointer stays on the card.
export default function ImageCarousel({ images, interval = 3500 }: { images: MediaItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [forced, setForced] = useState(false);
  const [touring, setTouring] = useState(false);
  const [request, setRequest] = useState(0);

  const videoIndex = images.findIndex((item) => typeof item !== "string");

  useEffect(() => {
    if (forced || images.length < 2 || (hovered && !touring)) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [hovered, forced, touring, images.length, interval]);

  // Leaving the video slide cancels a pending play; coming back to it ends the tour.
  useEffect(() => {
    if (index !== videoIndex) setForced(false);
    else setTouring(false);
  }, [index, videoIndex]);

  const playAnimation = () => {
    setTouring(false);
    setForced(true);
    setRequest((r) => r + 1);
    setIndex(videoIndex);
  };

  const finishAnimation = () => {
    if (!forced) return;
    setForced(false);
    setTouring(true);
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div
      className="absolute inset-0 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTouring(false);
      }}
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
            <VideoSlide
              src={item.video}
              thumb={item.thumb ?? 0}
              active={shown}
              hovered={hovered}
              forced={forced}
              request={request}
              onEnded={finishAnimation}
            />
          </div>
        );
      })}
      {videoIndex >= 0 && !forced && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            playAnimation();
          }}
          className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-Poppins text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play Animation
        </button>
      )}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show item ${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setForced(false);
                setTouring(false);
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
