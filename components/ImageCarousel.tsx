"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/lib/content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// A video slide that never autoplays: the visitor presses the play button.
function VideoSlide({
  src,
  active,
  onStart,
  onEnded,
}: {
  src: string;
  active: boolean;
  onStart: () => void;
  onEnded: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  return (
    <div className="absolute inset-0 bg-black">
      <video
        ref={ref}
        // #t=6 paints a mid-deployment frame as the thumbnail (the first frame is black).
        // It is reset to 0:00 when the visitor presses play.
        src={`${basePath}${src}#t=6`}
        preload="metadata"
        playsInline
        controls={started}
        className="w-full h-full object-cover"
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          onStart();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          onEnded();
        }}
      />
      {!playing && (
        <button
          type="button"
          aria-label="Play video"
          onClick={() => {
            const video = ref.current;
            if (!video) return;
            if (!started) video.currentTime = 0;
            video.play();
          }}
          // Leave the native control bar clickable once the video has started.
          className={`absolute inset-x-0 top-0 flex items-center justify-center group/play ${
            started ? "bottom-12" : "bottom-0"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-200 group-hover/play:scale-110">
            <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

// Crossfading gallery of images and videos that fills its (aspect-ratio) parent.
// Auto-advances, but pauses while hovered and while a video the visitor started is on screen.
export default function ImageCarousel({ images, interval = 3500 }: { images: MediaItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => setEngaged(false), [index]);

  useEffect(() => {
    if (paused || engaged || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [paused, engaged, images.length, interval]);

  const onVideo = typeof images[index] !== "string";

  return (
    <div
      className="absolute inset-0 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
              active={shown}
              onStart={() => setEngaged(true)}
              onEnded={() => setIndex((n) => (n + 1) % images.length)}
            />
          </div>
        );
      })}
      {images.length > 1 && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm transition-all ${
            onVideo && engaged ? "bottom-14" : "bottom-2"
          }`}
        >
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
