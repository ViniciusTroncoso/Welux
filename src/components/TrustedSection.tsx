type Logo = {
  src: string;
  alt: string;
  scale?: boolean;
};

const logos: Logo[] = [
  { src: "/clients/uneecops-logo.png", alt: "Uneecops logo", scale: true },
  { src: "/clients/uniqueside-logo.png", alt: "UniqueSide logo" },
  { src: "/clients/vaga-logo.png", alt: "Vaga AI logo" },
  { src: "/clients/listnrai-logo.png", alt: "Listnr AI logo" },
  { src: "/clients/statshub-logo.png", alt: "Statshub logo" },
  { src: "/clients/crework-logo.png", alt: "Crework Labs logo", scale: true },
  { src: "/clients/agenthi-app-logo.png", alt: "AgentHi logo" },
  { src: "/clients/quickmail-logo.png", alt: "Quickmail logo" },
  { src: "/clients/superstatz-logo.png", alt: "SuperStatz logo" },
  { src: "/clients/startupgrow-logo.png", alt: "Startupgrow logo" },
  { src: "/clients/typefast-logo.png", alt: "Typefast AI logo" },
];

export default function TrustedSection() {
  const track = [...logos, ...logos];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 overflow-hidden px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-10 sm:mb-16">
          <h3 className="text-[32px] sm:text-[36px] md:text-[40px] font-medium text-gray-900 mb-2 font-general-sans">
            Trusted by Global Companies Building AI Products
          </h3>
          <p className="text-[18px] sm:text-lg md:text-xl font-normal text-gray-600 max-w-4xl font-general-sans">
            We&apos;ve helped startups and enterprises worldwide transform their AI
            ideas into production-ready MVPs in 2–3 weeks. From fintech platforms
            to AI assistants, our global MVP development services have launched
            18+ AI products serving users across the US, Europe, and Asia.
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-logos">
            {track.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex items-center justify-center flex-shrink-0 px-4 sm:px-6 md:px-8"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={logo.alt}
                  className={`${
                    logo.scale ? "scale-125 " : ""
                  }block object-contain h-[75px] sm:h-[88px] w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[220px] opacity-100`}
                  src={logo.src}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
