import { useMemo } from "react";
import SuitIcon from "./SuitIcon";

type Suit = "heart" | "diamond" | "spade" | "club";

const suits: Suit[] = ["heart", "diamond", "spade", "club"];

/**
 * Ambient card-suit symbols that gently float in the background.
 */
export default function FloatingParticles({ count = 14 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const suit = suits[i % suits.length];
        return {
          suit,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: 16 + Math.random() * 34,
          delay: Math.random() * 6,
          duration: 5 + Math.random() * 6,
          isRed: suit === "heart" || suit === "diamond",
        };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute animate-float ${
            p.isRed ? "text-cardred/20" : "text-white/10"
          }`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <SuitIcon suit={p.suit} className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
