import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.57V8.43L15.82 12l-6.07 3.57z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89a11.83 11.83 0 0 0 1.59 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.43zM12.07 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.66-.23-.38a9.87 9.87 0 0 1-1.51-5.26c0-5.46 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.46-4.44 9.9-9.91 9.9zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/** Decorative glowing pause-glyph orb fixed at bottom-right on desktop */
export function FloatingOrb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="80" viewBox="0 0 416 428" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70" {...props}>
      <g filter="url(#filter0_ii_1255_70)">
        <circle cx="209.715" cy="217.397" r="153.021" fill="black" fillOpacity="0.01" />
      </g>
      <circle cx="209.715" cy="217.397" r="152.521" stroke="white" strokeOpacity="0.5" />
      <g filter="url(#filter1_f_1255_70)" style={{ mixBlendMode: "screen" }}>
        <path d="M161.273 219.711C132.561 227.415 122.056 279.938 118.554 290.442C140.964 345.767 170.377 290.442 189.986 249.824C209.595 209.206 218.699 242.821 272.622 229.515C326.546 216.21 285.928 195.901 290.13 141.977C294.332 88.0528 242.509 115.365 224.301 150.38C206.093 185.396 189.986 212.008 161.273 219.711Z" fill="#FFFFFF" />
      </g>
      <g filter="url(#filter2_f_1255_70)" style={{ mixBlendMode: "screen" }}>
        <path d="M272.165 183.654C237.333 215.873 179.643 184.379 155.152 164.605C135.42 145.824 98.0479 122.566 106.42 179.779C116.886 251.294 272.165 323.525 299.378 292.503C326.59 261.481 315.705 143.379 272.165 183.654Z" fill="#CFCFCF" />
      </g>
      <g filter="url(#filter3_f_1255_70)" style={{ mixBlendMode: "screen" }}>
        <path d="M285.115 125.815C262.84 106.213 213.277 125.444 191.28 137.51C165.385 151.153 198.241 169.252 251.702 169.809C305.163 170.366 312.959 150.318 285.115 125.815Z" fill="#FFFFFF" />
      </g>
      <rect x="164.083" y="173.153" width="14.54" height="78.9861" rx="7.27" fill="white" />
      <rect x="240.811" y="173.153" width="14.5374" height="78.9861" rx="7.26868" fill="white" />
      <defs>
        <filter id="filter0_ii_1255_70" x="56.6946" y="64.3761" width="306.042" height="306.042" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="31.55" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1255_70" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="7.7" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_1255_70" result="effect2_innerShadow_1255_70" />
        </filter>
        <filter id="filter1_f_1255_70" x="50.4542" y="43.4481" width="318.523" height="338.396" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="34.05" result="effect1_foregroundBlur_1255_70" />
        </filter>
        <filter id="filter2_f_1255_70" x="24.9173" y="63.315" width="369.596" height="316.878" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40.15" result="effect1_foregroundBlur_1255_70" />
        </filter>
        <filter id="filter3_f_1255_70" x="137.36" y="72.5101" width="208.416" height="142.21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="22.45" result="effect1_foregroundBlur_1255_70" />
        </filter>
      </defs>
    </svg>
  );
}
