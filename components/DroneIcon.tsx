// Simple quadcopter clip-art: X-frame, central body and four rotors.
export default function DroneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M8 8l8 8M16 8l-8 8" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="5.5" r="3" />
      <circle cx="18.5" cy="5.5" r="3" />
      <circle cx="5.5" cy="18.5" r="3" />
      <circle cx="18.5" cy="18.5" r="3" />
    </svg>
  );
}
