export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Amber glow — top left */}
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber/[0.12] blur-[100px] animate-drift-a" />

      {/* Teal glow — right */}
      <div className="absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-teal/[0.10] blur-[100px] animate-drift-b" />

      {/* Amber glow — bottom center */}
      <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-amber/[0.08] blur-[110px] animate-drift-b" />

      {/* Subtle central glow */}
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/[0.04] blur-[120px]" />

      {/* Grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.025] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="signal-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>

        <rect
          width="100%"
          height="100%"
          filter="url(#signal-grain)"
        />
      </svg>
    </div>
  );
}
