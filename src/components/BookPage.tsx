import { forwardRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * A single page inside the flip book. react-pageflip requires each page to
 * forward a ref to its root DOM node.
 */
const BookPage = forwardRef<HTMLDivElement, Props>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`flip-page ${className}`}>
        <div className="relative flex h-full w-full flex-col p-6 sm:p-8">
          {/* Decorative inner border */}
          <div className="pointer-events-none absolute inset-3 rounded-lg border border-gold/30" />
          {children}
        </div>
      </div>
    );
  }
);

BookPage.displayName = "BookPage";

export default BookPage;
