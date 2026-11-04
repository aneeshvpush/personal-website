// Simple satellite clip-art: a body flanked by two solar panels, tilted.
export default function SatelliteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform="rotate(-45 12 12)">
        <rect x="9.5" y="9" width="5" height="6" rx="1" fill="currentColor" stroke="none" />
        <rect x="1.5" y="9.5" width="6" height="5" rx="0.5" />
        <rect x="16.5" y="9.5" width="6" height="5" rx="0.5" />
        <path d="M7.5 12h2M14.5 12h2M12 9V6.5" />
      </g>
      <path d="M17 19.5a5 5 0 0 0 2.5-2.5" />
    </svg>
  );
}
