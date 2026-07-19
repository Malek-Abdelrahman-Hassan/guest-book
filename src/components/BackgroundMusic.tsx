import { useEffect, useRef, useState } from "react";

const SONG_URL = `${import.meta.env.BASE_URL}wedding-song.mp3`;

/**
 * Plays the wedding song softly on a loop in the background.
 * - Low volume so it stays a subtle backdrop.
 * - Pauses automatically when the tab is hidden, resumes when it's visible.
 * - Respects browser autoplay rules: if autoplay is blocked, it starts on the
 *   visitor's first interaction. A floating button lets them mute/unmute.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);

  const setIntent = (value: boolean) => {
    enabledRef.current = value;
    setEnabled(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.18;

    const start = () => {
      if (!enabledRef.current) return;
      audio.play().catch(() => {
        /* autoplay blocked - will retry on interaction */
      });
    };

    // Try immediately; if blocked, start on the first user gesture.
    start();
    const onFirstInteract = () => start();
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });

    const onVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else if (enabledRef.current) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabledRef.current) {
      audio.pause();
      setIntent(false);
    } else {
      audio.play().catch(() => {});
      setIntent(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={enabled ? "Mute music" : "Play music"}
        title={enabled ? "Mute music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-ink/80 text-gold shadow-card backdrop-blur-md transition hover:bg-gold hover:text-ink"
      >
        {enabled ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M4 9v6h4l5 5V4L8 9H4z" />
            <path
              d="M16 8.5a4 4 0 0 1 0 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M18.5 6a7 7 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M4 9v6h4l5 5V4L8 9H4z" />
            <path
              d="M16 9l5 6M21 9l-5 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
