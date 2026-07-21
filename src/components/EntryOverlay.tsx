import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SuitIcon from "./SuitIcon";

type Suit = "spade" | "heart" | "club" | "diamond";

// A fanned poker "hand" shown on the splash.
const fan: { suit: Suit; rank: string }[] = [
  { suit: "spade", rank: "A" },
  { suit: "diamond", rank: "K" },
  { suit: "heart", rank: "Q" },
  { suit: "club", rank: "J" },
  { suit: "heart", rank: "10" },
];

/**
 * Full-screen playing-cards splash. Tapping anywhere starts the background
 * music (the tap satisfies mobile autoplay rules) and reveals the site.
 */
export default function EntryOverlay({ onEnter }: { onEnter: () => void }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleEnter = () => {
    onEnter();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry"
          onClick={handleEnter}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          role="button"
          tabIndex={0}
          aria-label={t("entry.enter")}
          className="felt-bg suit-pattern fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
          {/* Fanned hand of cards */}
          <div className="relative mb-10 flex items-end justify-center">
            {fan.map((card, i) => {
              const offset = i - (fan.length - 1) / 2;
              const isRed = card.suit === "heart" || card.suit === "diamond";
              return (
                <motion.div
                  key={i}
                  initial={{ y: 80, opacity: 0, rotate: 0 }}
                  animate={{ y: 0, opacity: 1, rotate: offset * 10 }}
                  transition={{
                    delay: 0.12 * i,
                    type: "spring",
                    stiffness: 70,
                    damping: 12,
                  }}
                  style={{ transformOrigin: "bottom center" }}
                  className="relative -mx-2 h-24 w-16 rounded-lg border-2 border-gold/70 bg-cream shadow-card sm:-mx-2 sm:h-36 sm:w-24"
                >
                  <span
                    className={`absolute left-1 top-1 text-[10px] font-black sm:left-1.5 sm:top-1.5 sm:text-sm ${
                      isRed ? "text-cardred" : "text-ink"
                    }`}
                  >
                    {card.rank}
                  </span>
                  <div
                    className={`flex h-full items-center justify-center ${
                      isRed ? "text-cardred" : "text-ink"
                    }`}
                  >
                    <SuitIcon suit={card.suit} className="h-7 w-7 sm:h-10 sm:w-10" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-gold sm:text-sm"
          >
            {t("entry.kicker")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-3 py-2 font-script text-5xl leading-relaxed text-gold-shimmer sm:text-7xl"
          >
            {t("footer.names")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-1 font-display text-base text-cream sm:text-xl"
          >
            {t("hero.date")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <span className="inline-flex animate-pulseGold items-center gap-2 rounded-full bg-cardred px-8 py-3.5 font-body text-sm font-bold uppercase tracking-widest text-cream shadow-card">
              <SuitIcon suit="heart" className="h-4 w-4" />
              {t("entry.enter")}
            </span>
            <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-cream/60">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                <path d="M4 9v6h4l5 5V4L8 9H4z" />
                <path
                  d="M16 9a4 4 0 0 1 0 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {t("entry.withSound")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
