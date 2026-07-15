import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SuitIcon from "./SuitIcon";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1Hbwl4z2b-dfB8OoWJUfebJrYEvtwE1ah?usp=drive_link";

const qrSrc = `${import.meta.env.BASE_URL}qr-code.png`;

export default function PhotoUpload() {
  const { t } = useTranslation();

  return (
    <section
      id="photos"
      className="felt-bg relative flex items-center justify-center px-4 py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl text-center"
      >
        <h2 className="font-display text-3xl font-extrabold text-gold-shimmer sm:text-4xl">
          {t("photos.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-sm text-cream/80 sm:text-base">
          {t("photos.subtitle")}
        </p>

        {/* QR card */}
        <a
          href={DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto mt-10 block w-fit"
        >
          <div className="relative rounded-3xl border-2 border-gold/60 bg-cream p-5 shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:shadow-cardhover animate-pulseGold sm:p-6">
            {/* Corner pips */}
            <div className="card-corner left-3 top-3 text-cardred">
              <SuitIcon suit="heart" className="h-4 w-4" />
            </div>
            <div className="card-corner bottom-3 right-3 rotate-180 text-cardred">
              <SuitIcon suit="heart" className="h-4 w-4" />
            </div>

            <img
              src={qrSrc}
              alt="Scan to upload your wedding photos"
              className="mx-auto h-56 w-56 rounded-lg sm:h-64 sm:w-64"
            />
          </div>
          <p className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-widest text-gold">
            <SuitIcon suit="diamond" className="h-4 w-4 text-cardred" />
            {t("photos.instruction")}
          </p>
        </a>

        <div className="mt-6">
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cardred px-6 py-3 font-body text-sm font-semibold text-cream shadow-card transition hover:bg-cardred-dark hover:shadow-cardhover"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2l3 6 6 .5-4.5 4 1.5 6L12 15l-6 3.5 1.5-6L3 8.5 9 8z" />
            </svg>
            {t("photos.button")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
