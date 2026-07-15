type Suit = "heart" | "diamond" | "spade" | "club";

type Props = {
  suit: Suit;
  className?: string;
};

const paths: Record<Suit, string> = {
  heart:
    "M12 21s-7.5-4.9-10-9.3C.7 9.1 1.6 5.9 4.4 4.9 6.4 4.2 8.4 5 9.4 6.6L12 10l2.6-3.4C15.6 5 17.6 4.2 19.6 4.9c2.8 1 3.7 4.2 2.4 6.8C19.5 16.1 12 21 12 21z",
  diamond: "M12 2 21 12 12 22 3 12z",
  spade:
    "M12 2C10 6 3 8.5 3 13.5 3 16.5 5.2 18 7.4 18c1.1 0 2.1-.4 2.8-1.1-.2 1.6-.9 3-2.2 4.1h8c-1.3-1.1-2-2.5-2.2-4.1.7.7 1.7 1.1 2.8 1.1 2.2 0 4.4-1.5 4.4-4.5C21 8.5 14 6 12 2z",
  club:
    "M12 2a3.4 3.4 0 0 0-3 5.1A3.4 3.4 0 1 0 8.6 13c.5 0 1-.1 1.4-.3-.2 1.7-1 3.2-2.4 4.3h8.8c-1.4-1.1-2.2-2.6-2.4-4.3.4.2.9.3 1.4.3A3.4 3.4 0 1 0 15 7.1 3.4 3.4 0 0 0 12 2z",
};

export default function SuitIcon({ suit, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={paths[suit]} />
    </svg>
  );
}
