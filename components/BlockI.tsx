// Illinois Block I (orange with white outline), traced as inline SVG from the supplied logo image.
export default function BlockI({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 502 725" className={className} aria-hidden="true">
      <polygon
        fill="#fff"
        points="0,0 502,0 502,194 391,194 391,529 502,529 502,725 0,725 0,529 111,529 111,194 0,194"
      />
      <path
        fill="#E84A27"
        d="M28 28H473V166H391Q362 166 362 194V529Q362 556 391 556H473V697H28V556H111Q139 556 139 529V194Q139 166 111 166H28Z"
      />
    </svg>
  );
}
