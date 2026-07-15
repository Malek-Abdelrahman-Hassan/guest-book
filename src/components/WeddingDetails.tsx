import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SuitIcon from "./SuitIcon";

const MAPS_URL = "https://maps.app.goo.gl/ncjhCLmiNdAGzXxa9";

function Divider() {
  return (
    <div className="my-6 flex items-center justify-center gap-3 text-gold/70">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <SuitIcon suit="spade" className="h-4 w-4" />
      <SuitIcon suit="heart" className="h-4 w-4 text-cardred" />
      <SuitIcon suit="club" className="h-4 w-4" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export default function WeddingDetails() {
  const { t } = useTranslation();

  return (
    <section
      id="details"
      className="felt-bg relative flex items-center justify-center px-4 py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-2xl rounded-3xl border-2 border-gold/60 bg-cream text-ink shadow-card"
      >
        {/* Corner pips */}
        <div className="card-corner left-4 top-4 text-cardred">
          <span className="text-2xl font-black">A</span>
          <SuitIcon suit="heart" className="h-5 w-5" />
        </div>
        <div className="card-corner bottom-4 right-4 rotate-180 text-cardred">
          <span className="text-2xl font-black">A</span>
          <SuitIcon suit="heart" className="h-5 w-5" />
        </div>

        <div className="px-6 py-12 text-center sm:px-14">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {t("details.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-sm text-ink/70 sm:text-base">
            {t("details.subtitle")}
          </p>

          <Divider />

          <div className="grid gap-8 sm:grid-cols-2">
            {/* When */}
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/60 text-cardred">
                <SuitIcon suit="diamond" className="h-6 w-6" />
              </div>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
                {t("details.when")}
              </h3>
              <p className="mt-2 font-display text-lg font-bold text-ink">
                {t("details.date")}
              </p>
              <p className="mt-1 font-body text-base text-ink/80">
                {t("details.time")}
              </p>
            </div>

            {/* Where */}
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/60 text-ink">
                <SuitIcon suit="spade" className="h-6 w-6" />
              </div>
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
                {t("details.where")}
              </h3>
              <p className="mt-2 font-display text-lg font-bold text-ink">
                {t("details.venue")}
              </p>
              <p className="mt-1 font-body text-base text-ink/80">
                {t("details.venueDetails")}
              </p>
            </div>
          </div>

          <Divider />

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cardred px-6 py-3 font-body text-sm font-semibold text-cream shadow-card transition hover:bg-cardred-dark hover:shadow-cardhover"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            {t("details.mapButton")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
