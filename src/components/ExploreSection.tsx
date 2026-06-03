import { ArrowRight } from "lucide-react";

type RelatedContent = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

const relatedContent: RelatedContent[] = [
  {
    tag: "Service",
    title: "Integrate AI into Existing Software",
    description:
      "Seamlessly integrate AI capabilities into your existing software systems. We enhance your current applications with intelligent features, automation, and AI-powered insights while maintaining system stability.",
    href: "/services/integrate-ai-existing-software",
  },
  {
    tag: "Service",
    title: "Design to Code",
    description:
      "Turn Figma, Sketch, or Adobe XD designs into production-ready, pixel-perfect code. We bridge the gap between design and engineering — delivering responsive, accessible, and performant front-end code your team can ship immediately.",
    href: "/services/design-to-code",
  },
];

export default function ExploreSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2 font-general-sans">
          Explore Related Content
        </h2>
        <p className="text-gray-600 mb-8 font-general-sans">
          Discover more services, technologies, case studies, and resources
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedContent.map((item) => (
            <a
              key={item.href}
              className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-[#05d664] hover:shadow-md transition-all"
              href={item.href}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-green-50 text-green-700 mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#05d664] transition-colors mb-2 font-general-sans">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 font-general-sans">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#05d664] transition-colors flex-shrink-0 ml-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
