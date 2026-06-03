type Card = {
  heading: string;
  bullets: string[];
};

const cards: Card[] = [
  {
    heading: "End-to-end AI MVP Design & Architecture",
    bullets: [
      "Strategic planning and technical architecture for AI products",
      "Technology stack selection optimized for your use case",
      "Scalable infrastructure design for future growth",
      "Security and compliance considerations built-in",
    ],
  },
  {
    heading: "Custom ML Model Development & Fine-tuning",
    bullets: [
      "Train custom models tailored to your specific requirements",
      "Fine-tune pre-trained models for optimal performance",
      "Implement state-of-the-art machine learning algorithms",
      "Continuous model improvement and optimization",
    ],
  },
  {
    heading: "Data Pipeline & MLOps Setup",
    bullets: [
      "Automated data collection and preprocessing workflows",
      "Model training and deployment pipelines",
      "Real-time monitoring and performance tracking",
      "Version control for models and datasets",
    ],
  },
  {
    heading: "Generative AI and LLM Integrations",
    bullets: [
      "Integration with GPT-4, Claude, and other leading LLMs",
      "Custom prompt engineering for optimal results",
      "RAG (Retrieval Augmented Generation) implementations",
      "Fine-tuned models for domain-specific applications",
    ],
  },
  {
    heading: "Conversational AI & Chatbot Solutions",
    bullets: [
      "Intelligent chatbots with natural language understanding",
      "Multi-turn conversation management",
      "Integration with messaging platforms and websites",
      "Context-aware responses and personalization",
    ],
  },
  {
    heading: "Computer Vision & Predictive Analytics",
    bullets: [
      "Image and video analysis with deep learning",
      "Object detection and classification systems",
      "Predictive analytics dashboards with real-time insights",
      "Automated reporting and data visualization",
    ],
  },
  {
    heading: "LLM-Native MVPs & AI Copilots",
    bullets: [
      "Design and build AI copilots that live inside your product (not just in a chat window)",
      "Use Retrieval Augmented Generation (RAG) to ground ChatGPT, Claude, or Gemini on your private data",
      "Implement guardrails, evaluations, and safety checks so LLMs behave predictably in production",
      "Optimize prompts, context windows, and caching to keep latency low and API costs under control",
    ],
  },
  {
    heading: "AI Evaluation, Observability & Governance",
    bullets: [
      "Define evaluation datasets and metrics to keep model quality high over time",
      "Set up logging and monitoring for prompts, outputs, and user feedback",
      "Detect regressions, hallucinations, and edge cases before they impact users",
      "Establish lightweight governance practices for responsible AI and compliance",
    ],
  },
];

export default function TransformSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-medium text-gray-900 mb-8 sm:mb-12 text-center max-w-4xl mx-auto leading-tight">
          Transform Your Vision into AI-Powered Reality
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={card.heading}
              className="bg-white border border-gray-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#05d664] flex items-center justify-center">
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
                      className="w-5 h-5 text-[#05d664] flex-shrink-0 mt-0.5"
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
