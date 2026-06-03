import {
  Lightbulb,
  CodeXml,
  CircleCheckBig,
  BrainCircuit,
  Wrench,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const services: Service[] = [
  {
    icon: Lightbulb,
    title: "Estratégia e Consultoria em IA",
    description:
      "Defina a visão do seu produto de IA, identifique casos de uso e crie um roadmap alinhado aos objetivos de negócio",
    href: "/services/ai-strategy-&-consultation",
  },
  {
    icon: CodeXml,
    title: "Desenvolvimento de IA Sob Medida",
    description:
      "Construa soluções de IA personalizadas com modelos de machine learning, integrações de LLM e automação inteligente",
    href: "/services/custom-ai-development",
  },
  {
    icon: CircleCheckBig,
    title: "Prototipagem Rápida de MVP",
    description:
      "Valide rapidamente seu conceito de IA com um protótipo funcional para testar o encaixe no mercado e coletar feedback",
    href: "/services/rapid-mvp-prototyping",
  },
  {
    icon: BrainCircuit,
    title: "LLM e IA Generativa",
    description:
      "Integre GPT, Claude e LLMs personalizados para chatbots, geração de conteúdo e assistentes inteligentes",
    href: "/services/llm-&-generative-ai",
  },
  {
    icon: Wrench,
    title: "MLOps e Deploy",
    description:
      "Configure pipelines automatizados, monitoramento de modelos e infraestrutura escalável para sistemas de IA em produção",
    href: "/services/mlops-&-deployment",
  },
  {
    icon: RefreshCw,
    title: "Fine-tuning de Modelos de IA",
    description:
      "Otimize modelos pré-treinados para o seu caso de uso específico, melhorando a precisão e a performance",
    href: "/services/ai-model-fine-tuning",
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-label="AI Development Services"
      className="bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-12 sm:mb-16">
          <div>
            <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-medium text-gray-900 mb-2 font-general-sans">
              Nossos Serviços de Desenvolvimento de MVP com IA
            </h2>
            <p className="text-[18px] sm:text-lg md:text-xl font-normal text-gray-600 font-general-sans">
              Soluções completas de IA para dar vida à sua visão
            </p>
          </div>
          <a
            aria-label="View All Services - View all AI development services"
            className="inline-flex items-center justify-center px-4 sm:px-6 h-12 sm:h-auto sm:py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 text-base sm:text-lg font-medium rounded-lg mt-2 whitespace-nowrap w-full sm:w-auto font-general-sans"
            href="/services"
          >
            Ver Todos os Serviços
          </a>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          role="list"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="service-card group flex flex-col h-full transition-all duration-500"
                role="listitem"
              >
                <a
                  aria-label={`Learn more about ${service.title}`}
                  className="flex flex-col h-full"
                  href={service.href}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      aria-hidden="true"
                      className="flex-shrink-0 scale-110 sm:scale-100 group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-12 h-12 text-black" />
                    </div>
                    <h3 className="text-[24px] sm:text-xl font-medium text-gray-900 group-hover:text-black transition-colors duration-300 font-general-sans">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[18px] sm:text-base text-gray-600 leading-relaxed font-normal flex-grow mb-6 font-general-sans">
                    {service.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="w-full h-[1px] bg-gray-200 relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 w-full h-full bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
