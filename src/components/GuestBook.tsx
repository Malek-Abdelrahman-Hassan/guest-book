import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import BookPage from "./BookPage";
import SuitIcon from "./SuitIcon";
import { useMessages } from "../hooks/useMessages";
import type { GuestMessage } from "../lib/supabase";

type Status = "idle" | "submitting" | "success" | "error" | "invalid";

const suitCycle = ["heart", "diamond", "club", "spade"] as const;

function formatDate(iso: string, lang: string): string {
  try {
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export default function GuestBook() {
  const { t, i18n } = useTranslation();
  const { messages, loading, addMessage, isConfigured } = useMessages();
  const bookRef = useRef<any>(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("submitting");
    const res = await addMessage(name.trim(), message.trim());
    if (res.ok) {
      setStatus("success");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setErrorDetail(res.error ?? "");
      setStatus("error");
    }
  };

  // Re-mount the book when the number of messages changes so react-pageflip
  // picks up the new pages reliably.
  const bookKey = messages.length;

  const pages = useMemo(() => messages, [messages]);

  const flipNext = () => bookRef.current?.pageFlip?.()?.flipNext?.();
  const flipPrev = () => bookRef.current?.pageFlip?.()?.flipPrev?.();

  return (
    <section
      id="guestbook"
      className="felt-bg suit-pattern relative px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold text-gold-shimmer sm:text-4xl">
            {t("guestbook.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm text-cream/80 sm:text-base">
            {t("guestbook.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          {/* Sign the book form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border-2 border-gold/50 bg-ink/70 p-6 shadow-card backdrop-blur-sm sm:p-8"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="text-cardred">
                <SuitIcon suit="heart" className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-bold text-cream">
                {t("guestbook.formTitle")}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("guestbook.namePlaceholder")}
                maxLength={60}
                className="w-full rounded-lg border border-gold/40 bg-cream/95 px-4 py-3 font-body text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("guestbook.messagePlaceholder")}
                rows={5}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-gold/40 bg-cream/95 px-4 py-3 font-body text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
              />

              <button
                type="submit"
                disabled={status === "submitting" || !isConfigured}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cardred px-6 py-3 font-body text-sm font-bold uppercase tracking-widest text-cream shadow-card transition hover:bg-cardred-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SuitIcon
                  suit="heart"
                  className="h-4 w-4 transition group-hover:scale-125"
                />
                {status === "submitting"
                  ? t("guestbook.submitting")
                  : t("guestbook.submit")}
              </button>

              {status === "success" && (
                <p className="text-center font-body text-sm font-semibold text-gold">
                  {t("guestbook.success")}
                </p>
              )}
              {status === "error" && (
                <div className="text-center">
                  <p className="font-body text-sm font-semibold text-cardred-light">
                    {t("guestbook.error")}
                  </p>
                  {errorDetail && (
                    <p className="mt-1 break-words font-body text-xs text-cream/60">
                      {errorDetail}
                    </p>
                  )}
                </div>
              )}
              {status === "invalid" && (
                <p className="text-center font-body text-sm font-semibold text-cardred-light">
                  {t("guestbook.validation")}
                </p>
              )}
              {!isConfigured && (
                <p className="text-center font-body text-xs text-cream/60">
                  {t("guestbook.notConfigured")}
                </p>
              )}
            </form>
          </motion.div>

          {/* The flip book */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {loading ? (
              <div className="flex h-[460px] items-center justify-center font-body text-cream/70">
                {t("guestbook.loading")}
              </div>
            ) : pages.length === 0 ? (
              <div className="flex h-[460px] w-full max-w-sm flex-col items-center justify-center rounded-2xl border-2 border-gold/50 bg-cream/95 p-8 text-center text-ink shadow-card">
                <SuitIcon suit="heart" className="h-10 w-10 text-cardred" />
                <p className="mt-4 font-display text-lg font-semibold">
                  {t("guestbook.empty")}
                </p>
              </div>
            ) : (
              <div dir="ltr" className="flex w-full flex-col items-center">
                <HTMLFlipBook
                  key={bookKey}
                  ref={bookRef}
                  width={340}
                  height={460}
                  size="stretch"
                  minWidth={280}
                  maxWidth={420}
                  minHeight={380}
                  maxHeight={520}
                  maxShadowOpacity={0.4}
                  showCover={true}
                  mobileScrollSupport={true}
                  drawShadow={true}
                  className="guestbook-flipbook"
                  style={{}}
                  startPage={0}
                  flippingTime={800}
                  usePortrait={true}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {/* Cover */}
                  <BookPage className="!bg-ink">
                    <div className="flex h-full flex-col items-center justify-center text-center text-cream">
                      <div className="mb-4 flex gap-2 text-gold">
                        <SuitIcon suit="spade" className="h-6 w-6" />
                        <SuitIcon suit="heart" className="h-6 w-6 text-cardred" />
                        <SuitIcon suit="club" className="h-6 w-6" />
                      </div>
                      <h3 className="py-2 font-script text-4xl leading-relaxed text-gold-shimmer sm:text-5xl">
                        {t("guestbook.bookTitle")}
                      </h3>
                      <p className="mt-3 font-display text-lg text-cream/90">
                        {t("guestbook.bookSubtitle")}
                      </p>
                      <span className="mt-10 animate-pulse font-body text-xs uppercase tracking-widest text-gold/80">
                        {t("guestbook.coverHint")} →
                      </span>
                    </div>
                  </BookPage>

                  {/* One page per message */}
                  {pages.map((m: GuestMessage, idx: number) => {
                    const suit = suitCycle[idx % suitCycle.length];
                    const isRed = suit === "heart" || suit === "diamond";
                    return (
                      <BookPage key={m.id}>
                        <div className="flex h-full flex-col">
                          <div
                            className={`flex items-center justify-between ${
                              isRed ? "text-cardred" : "text-ink"
                            }`}
                          >
                            <SuitIcon suit={suit} className="h-6 w-6" />
                            <span className="font-body text-[11px] uppercase tracking-widest text-ink/40">
                              {t("guestbook.page")} {idx + 1}
                            </span>
                          </div>

                          <div className="flex flex-1 flex-col justify-center py-4">
                            <p
                              dir="auto"
                              className="whitespace-pre-wrap break-words font-body text-base leading-relaxed text-ink/90"
                            >
                              &ldquo;{m.message}&rdquo;
                            </p>
                          </div>

                          <div className="border-t border-gold/30 pt-3 text-center">
                            <p dir="auto" className="font-script text-2xl text-cardred">
                              {m.name}
                            </p>
                            <p className="mt-1 font-body text-[11px] text-ink/50">
                              {formatDate(m.created_at, i18n.language)}
                            </p>
                          </div>
                        </div>
                      </BookPage>
                    );
                  })}

                  {/* The End */}
                  <BookPage className="!bg-ink">
                    <div className="flex h-full flex-col items-center justify-center text-center text-cream">
                      <SuitIcon suit="heart" className="h-10 w-10 text-cardred" />
                      <h3 className="mt-4 py-2 font-script text-3xl leading-relaxed text-gold-shimmer">
                        {t("guestbook.theEnd")}
                      </h3>
                      <p className="mt-3 max-w-[16rem] font-body text-sm text-cream/80">
                        {t("guestbook.theEndHint")}
                      </p>
                    </div>
                  </BookPage>
                </HTMLFlipBook>

                {/* Flip controls */}
                <div className="mt-6 flex items-center gap-4">
                  <button
                    onClick={flipPrev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition hover:bg-gold hover:text-ink"
                    aria-label="Previous page"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span className="font-body text-xs uppercase tracking-widest text-cream/60">
                    {messages.length}
                  </span>
                  <button
                    onClick={flipNext}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition hover:bg-gold hover:text-ink"
                    aria-label="Next page"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
