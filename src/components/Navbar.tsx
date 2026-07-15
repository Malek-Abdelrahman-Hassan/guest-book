import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SuitIcon from "./SuitIcon";

const sections = [
  { id: "home", key: "nav.home" },
  { id: "details", key: "nav.details" },
  { id: "guestbook", key: "nav.guestbook" },
  { id: "photos", key: "nav.photos" },
] as const;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 shadow-lg shadow-black/30 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 font-display text-lg font-bold text-cream sm:text-xl"
        >
          <span className="flex items-center gap-0.5 text-cardred">
            <SuitIcon suit="heart" className="h-5 w-5" />
          </span>
          <span className="text-gold">M</span>
          <span className="text-cream/70">&amp;</span>
          <span className="text-gold">N</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="group relative font-body text-sm font-medium text-cream/90 transition hover:text-gold"
              >
                {t(s.key)}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="rounded-full border border-gold/60 px-3 py-1.5 font-body text-xs font-semibold text-gold transition hover:bg-gold hover:text-ink sm:text-sm"
          >
            {t("nav.langToggle")}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/40 text-cream md:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1">
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-gold/20 bg-ink/95 px-4 py-3 backdrop-blur-md md:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="w-full rounded-md px-3 py-2 text-start font-body text-sm font-medium text-cream/90 transition hover:bg-felt/60 hover:text-gold"
              >
                {t(s.key)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
