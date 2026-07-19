import type { ReactNode } from "react";
import SuitIcon from "./SuitIcon";

type Props = {
  rank: string;
  suit: "heart" | "diamond" | "spade" | "club";
  name: string;
  role: string;
  center: ReactNode;
  className?: string;
};

/**
 * A stylized face playing card used for the bride and groom on the hero.
 */
export default function PlayingCard({
  rank,
  suit,
  name,
  role,
  center,
  className = "",
}: Props) {
  const suitColor =
    suit === "heart" || suit === "diamond" ? "text-cardred" : "text-ink";

  return (
    <div
      className={`relative aspect-[5/7] w-full select-none rounded-2xl border-2 border-gold/70 bg-cream text-ink shadow-card ring-1 ring-black/10 ${className}`}
    >
      {/* Inner gold frame */}
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/40" />

      {/* Top-left corner index */}
      <div className={`card-corner left-1.5 top-1.5 sm:left-3 sm:top-3 ${suitColor}`}>
        <span className="text-sm font-black sm:text-2xl">{rank}</span>
        <SuitIcon suit={suit} className="h-3 w-3 sm:h-5 sm:w-5" />
      </div>

      {/* Bottom-right corner index (rotated) */}
      <div
        className={`card-corner bottom-1.5 right-1.5 rotate-180 sm:bottom-3 sm:right-3 ${suitColor}`}
      >
        <span className="text-sm font-black sm:text-2xl">{rank}</span>
        <SuitIcon suit={suit} className="h-3 w-3 sm:h-5 sm:w-5" />
      </div>

      {/* Center portrait area */}
      <div className="flex h-full flex-col items-center justify-center px-2 py-5 text-center sm:px-3 sm:py-8">
        <div
          className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-cream to-cream-dark sm:h-28 sm:w-28 ${suitColor}`}
        >
          {center}
        </div>
        <p className="font-display text-base font-extrabold tracking-wide sm:text-3xl">
          {name}
        </p>
        <p
          className={`mt-1 max-w-[4.5rem] text-center font-body text-[8px] font-semibold uppercase leading-tight tracking-[0.15em] sm:max-w-none sm:text-xs sm:tracking-[0.2em] ${suitColor}`}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
