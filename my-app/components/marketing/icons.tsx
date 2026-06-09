import React from 'react';

/* Inline Lucide-style icons used across the marketing surfaces. */
const mkIcon =
  (paths: React.ReactNode, sw = 1.75) =>
  // eslint-disable-next-line react/display-name
  ({ size = 24 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );

export const IcCalendar = mkIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>,
);
export const IcLayers = mkIcon(
  <>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </>,
);
export const IcClock = mkIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const IcShield = mkIcon(
  <>
    <path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
export const IcCheck = mkIcon(<path d="M20 6 9 17l-5-5" />, 2.4);
export const IcArrow = mkIcon(<path d="M5 12h14M13 6l6 6-6 6" />, 2);
