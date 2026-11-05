// Simple robotic-arm clip-art: a base, two jointed links and a small gripper.
export default function RobotArmIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="19.5" width="11" height="2.5" rx="1" fill="currentColor" stroke="none" />
      <path d="M9.5 19.5L7.5 11L16.5 6.5" strokeWidth="2.2" />
      <circle cx="7.5" cy="11" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="6.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16.5 6.5L20 9.5M20 9.5L18.6 12.2M20 9.5L22 11.5" />
    </svg>
  );
}
