import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Wedding: Saturday, August 8, 2026, 7:00 PM (Cairo / UTC+3 -> use +03:00 offset).
const TARGET = new Date("2026-08-08T19:00:00+03:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(): TimeLeft {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function CountdownTimer() {
  const { t } = useTranslation();
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.done) {
    return (
      <div className="text-center">
        <p className="font-script text-4xl text-gold-shimmer sm:text-6xl">
          {t("countdown.married")}
        </p>
      </div>
    );
  }

  const units = [
    { value: time.days, label: t("countdown.days") },
    { value: time.hours, label: t("countdown.hours") },
    { value: time.minutes, label: t("countdown.minutes") },
    { value: time.seconds, label: t("countdown.seconds") },
  ];

  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-4">
      {units.map((u, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative flex h-16 w-14 items-center justify-center rounded-lg border border-gold/50 bg-ink/80 shadow-card backdrop-blur-sm sm:h-24 sm:w-20">
            <span className="font-display text-2xl font-bold tabular-nums text-cream sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="absolute left-0 right-0 top-1/2 h-px bg-gold/20" />
          </div>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-gold sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
