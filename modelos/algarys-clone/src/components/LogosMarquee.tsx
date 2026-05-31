import { partnerLogos } from "@/lib/content";

export default function LogosMarquee() {
  const loop = [...partnerLogos, ...partnerLogos];
  return (
    <section
      id="logos"
      className="relative text-white h-fit py-12 section-px flex flex-col items-center justify-center scroll-mt-25"
    >
      <div className="section-container relative overflow-hidden mask-fade-x">
        <div className="logos-marquee flex items-center gap-16 w-max">
          {loop.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              loading="lazy"
              decoding="async"
              alt={logo.alt}
              className="h-8 w-auto object-contain shrink-0"
              src={logo.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
