import type { SVGProps } from "react";

// MyIR logo mark. The lettering is converted to outlines (Montserrat ExtraBold,
// SIL OFL) so the mark looks identical on every device; the same artwork lives in
// public/brand/myir-logo-mark.svg for use outside the app (social, print, email).
// Pass `title` when the mark stands alone; leave it out when the brand name is
// already written next to it, so screen readers don't announce it twice.
export function LogoMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })} {...props}>
      <rect width="64" height="64" rx="14" fill="#173352" />
      <g transform="translate(6.07 32.95)">
        {/* "My" */}
        <path fill="#FFFFFF" d="M1.36 0V-13.65H4.54L10.2 -4.37H8.52L14.02 -13.65H17.2L17.24 0H13.69L13.65 -8.25H14.25L10.14 -1.35H8.42L4.19 -8.25H4.93V0ZM21.36 3.96Q20.52 3.96 19.67 3.7Q18.82 3.43 18.29 3L19.58 0.41Q19.91 0.7 20.35 0.87Q20.79 1.03 21.22 1.03Q21.82 1.03 22.18 0.76Q22.53 0.49 22.78 -0.1L23.27 -1.33L23.56 -1.7L27.15 -10.57H30.68L26.11 0.43Q25.57 1.79 24.86 2.56Q24.14 3.33 23.28 3.65Q22.41 3.96 21.36 3.96ZM22.8 0.45 18.14 -10.57H21.94L25.37 -2.03Z" />
        {/* "IR" */}
        <path fill="#D9B46E" d="M31.56 0V-13.65H35.42V0ZM37.92 0V-13.65H44.02Q47.01 -13.65 48.61 -12.29Q50.22 -10.94 50.22 -8.6Q50.22 -7.06 49.48 -5.94Q48.74 -4.82 47.39 -4.22Q46.03 -3.63 44.16 -3.63H40.06L41.78 -5.25V0ZM46.36 0 42.97 -4.97H47.08L50.5 0ZM41.78 -4.84 40.06 -6.61H43.92Q45.13 -6.61 45.73 -7.14Q46.32 -7.66 46.32 -8.6Q46.32 -9.55 45.73 -10.08Q45.13 -10.61 43.92 -10.61H40.06L41.78 -12.38Z" />
      </g>
      <rect x="24.5" y="42.1" width="15" height="2.6" rx="1.3" fill="#D9B46E" />
    </svg>
  );
}
