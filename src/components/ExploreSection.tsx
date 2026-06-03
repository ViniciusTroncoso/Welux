import { ArrowRight } from "lucide-react";

type RelatedContent = {
  tag: string;
  title: string;
  description: string;
  href: string;
};

const relatedContent: RelatedContent[] = [
  {
    tag: "Serviço",
    title: "Integre IA em Software Existente",
    description:
      "Integre recursos de IA aos seus sistemas de software existentes sem complicações. Aprimoramos suas aplicações atuais com funcionalidades inteligentes, automação e insights baseados em IA, mantendo a estabilidade do sistema.",
    href: "/services/integrate-ai-existing-software",
  },
  {
    tag: "Serviço",
    title: "Design para Código",
    description:
      "Transforme designs do Figma, Sketch ou Adobe XD em código pronto para produção e pixel-perfect. Conectamos design e engenharia, entregando código front-end responsivo, acessível e performático que sua equipe pode publicar imediatamente.",
    href: "/services/design-to-code",
  },
];

export default function ExploreSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2 font-general-sans">
          Explore Conteúdos Relacionados
        </h2>
        <p className="text-gray-600 mb-8 font-general-sans">
          Descubra mais serviços, tecnologias, cases e recursos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedContent.map((item) => (
            <a
              key={item.href}
              className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-black hover:shadow-md transition-all"
              href={item.href}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-black mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors mb-2 font-general-sans">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 font-general-sans">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors flex-shrink-0 ml-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
