import type { SVGProps } from "react";

/** SpeedMVPs lightning-bolt mark (green). */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M36 6 L14 28 L26 28 L14 56 L36 34 L26 34 Z"
        fill="none"
        opacity="0.15"
        stroke="#00D664"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        d="M36 6 L14 28 L26 28 L14 56 L36 34 L26 34 Z"
        fill="#00D664"
        stroke="#00D664"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
