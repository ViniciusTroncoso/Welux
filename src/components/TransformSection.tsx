type Card = {
  heading: string;
  bullets: string[];
};

const cards: Card[] = [
  {
    heading: "Design e Arquitetura de MVP de IA Ponta a Ponta",
    bullets: [
      "Planejamento estratégico e arquitetura técnica para produtos de IA",
      "Seleção da stack de tecnologia otimizada para o seu caso de uso",
      "Design de infraestrutura escalável para crescimento futuro",
      "Considerações de segurança e conformidade já integradas",
    ],
  },
  {
    heading: "Desenvolvimento e Fine-tuning de Modelos de ML Customizados",
    bullets: [
      "Treine modelos customizados sob medida para os seus requisitos específicos",
      "Faça fine-tuning de modelos pré-treinados para desempenho ideal",
      "Implemente algoritmos de ML de última geração",
      "Melhoria e otimização contínua dos modelos",
    ],
  },
  {
    heading: "Pipeline de Dados e Configuração de MLOps",
    bullets: [
      "Fluxos automatizados de coleta e pré-processamento de dados",
      "Pipelines de treinamento e deploy de modelos",
      "Monitoramento em tempo real e acompanhamento de desempenho",
      "Controle de versão para modelos e datasets",
    ],
  },
  {
    heading: "IA Generativa e Integrações com LLMs",
    bullets: [
      "Integração com GPT-4, Claude e outros LLMs líderes de mercado",
      "Engenharia de prompts customizada para resultados ideais",
      "Implementações de RAG (Retrieval Augmented Generation)",
      "Modelos com fine-tuning para aplicações específicas de domínio",
    ],
  },
  {
    heading: "IA Conversacional e Soluções de Chatbot",
    bullets: [
      "Chatbots inteligentes com compreensão de linguagem natural",
      "Gerenciamento de conversas com múltiplas interações",
      "Integração com plataformas de mensagens e sites",
      "Respostas contextuais e personalização",
    ],
  },
  {
    heading: "Visão Computacional e Análise Preditiva",
    bullets: [
      "Análise de imagens e vídeos com deep learning",
      "Sistemas de detecção e classificação de objetos",
      "Dashboards de análise preditiva com insights em tempo real",
      "Relatórios automatizados e visualização de dados",
    ],
  },
  {
    heading: "MVPs Nativos de LLM e Copilotos de IA",
    bullets: [
      "Projete e construa copilotos de IA que vivem dentro do seu produto (não apenas em uma janela de chat)",
      "Use Retrieval Augmented Generation (RAG) para fundamentar ChatGPT, Claude ou Gemini nos seus dados privados",
      "Implemente guardrails, avaliações e checagens de segurança para que os LLMs se comportem de forma previsível em produção",
      "Otimize prompts, janelas de contexto e caching para manter a latência baixa e os custos de API sob controle",
    ],
  },
  {
    heading: "Avaliação, Observabilidade e Governança de IA",
    bullets: [
      "Defina datasets e métricas de avaliação para manter a qualidade do modelo alta ao longo do tempo",
      "Configure logging e monitoramento de prompts, saídas e feedback dos usuários",
      "Detecte regressões, alucinações e casos extremos antes que impactem os usuários",
      "Estabeleça práticas de governança enxutas para IA responsável e conformidade",
    ],
  },
];

export default function TransformSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-medium text-gray-900 mb-8 sm:mb-12 text-center max-w-4xl mx-auto leading-tight">
          Transforme sua Visão em Realidade com IA
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={card.heading}
              className="bg-white border border-gray-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-black flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight pt-1">
                  {card.heading}
                </h3>
              </div>
              <ul className="space-y-3">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-base text-gray-700 leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
