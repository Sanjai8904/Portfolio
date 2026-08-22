"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The site's signature element.
 *
 * Thesis: raw signal (noisy line) resolving into a clean one —
 * the same move as turning ambiguous data into insight.
 *
 * Two overlaid paths:
 * - A jittery "noise" trace
 * - A smooth amber "signal" trace
 *
 * Pointer movement subtly changes the amplitude, making the
 * waveform feel like a live instrument reading.
 */

const WIDTH = 960;
const HEIGHT = 220;
const POINTS = 64;

function buildPath(amplitude: number, noise: number, seed: number) {
  const step = WIDTH / (POINTS - 1);
  let d = "";

  for (let i = 0; i < POINTS; i++) {
    const x = i * step;
    const t = i / POINTS;

    const base =
      Math.sin(t * Math.PI * 3 + seed) * amplitude;

    const jitter = noise
      ? Math.sin(t * 47 + seed * 3) * noise
      : 0;

    const y = HEIGHT / 2 + base + jitter;

    d += i === 0
      ? `M ${x},${y}`
      : ` L ${x},${y}`;
  }

  return d;
}

export function SignalWaveform({
  className,
}: {
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);

  const [resolved, setResolved] = useState(false);

  /*
   * Pointer-driven amplitude.
   */
  const pointerX = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, {
    stiffness: 60,
    damping: 20,
  });

  const amplitude = useTransform(
    smoothX,
    [0, 1],
    [26, 46]
  );

  const [amp, setAmp] = useState(34);

  useEffect(() => {
    const unsubscribe = amplitude.on("change", (value) => {
      setAmp(value);
    });

    return unsubscribe;
  }, [amplitude]);

  /*
   * Resolve the noisy waveform when it enters the viewport.
   */
  useEffect(() => {
    if (reducedMotion) {
      setResolved(true);
      return;
    }

    const element = containerRef.current;

    if (!element) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // IntersectionObserver can theoretically provide an empty array,
        // so explicitly check before accessing the first entry.
        if (entries.length === 0) {
          return;
        }

        const entry = entries[0];

        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => {
            setResolved(true);
          }, 500);

          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [reducedMotion]);

  /*
   * Pointer interaction.
   */
  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    if (rect.width === 0) {
      return;
    }

    const position =
      (event.clientX - rect.left) / rect.width;

    // Keep the value safely between 0 and 1.
    const normalizedPosition = Math.min(
      1,
      Math.max(0, position)
    );

    pointerX.set(normalizedPosition);
  }

  /*
   * Generate the two waveform paths.
   */
  const noisePath = buildPath(
    amp * 0.6,
    resolved ? 0 : 10,
    0.4
  );

  const signalPath = buildPath(
    amp,
    0,
    0.4
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={
        reducedMotion
          ? undefined
          : handlePointerMove
      }
      className={className}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Faint raw trace that disappears as the signal resolves */}
        <motion.path
          d={noisePath}
          fill="none"
          stroke="rgb(var(--c-ink-faint))"
          strokeWidth={1.25}
          strokeLinecap="round"
          initial={{ opacity: 0.7 }}
          animate={{
            opacity: resolved ? 0 : 0.7,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Clean amber signal trace */}
        <motion.path
          d={signalPath}
          fill="none"
          stroke="rgb(var(--c-amber))"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={
            resolved
              ? {
                  pathLength: 1,
                  opacity: 1,
                }
              : {
                  pathLength: 0,
                  opacity: 0,
                }
          }
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>
    </div>
  );
}
