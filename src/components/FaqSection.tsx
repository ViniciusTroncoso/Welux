'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How long does it take to build an AI MVP?',
    answer:
      'We can deliver a production-ready AI MVP in 2-3 weeks. The timeline depends on the complexity of your AI features, data requirements, and integration needs. We follow an agile approach to ensure rapid delivery without compromising quality.',
  },
  {
    question: 'What AI technologies do you work with?',
    answer:
      'We specialize in modern AI technologies including OpenAI GPT, Claude, custom LLMs, TensorFlow, PyTorch, Hugging Face, LangChain, and various machine learning frameworks. We select the best technology stack based on your specific requirements.',
  },
  {
    question: 'Do I need my own data to build an AI MVP?',
    answer:
      'Not necessarily. We can work with pre-trained models, public datasets, or synthetic data for initial prototypes. However, having domain-specific data will significantly improve the AI’s performance and accuracy for your use case.',
  },
  {
    question: 'How much does AI MVP development cost?',
    answer:
      'Costs vary based on complexity, features, and AI model requirements. A typical AI MVP ranges from $15,000 to $50,000. We offer transparent pricing and can provide a detailed estimate after understanding your specific needs.',
  },
  {
    question: 'Will I own the AI models and code?',
    answer:
      'Yes, you will have full ownership of all custom code, models, and intellectual property we develop for your project. We provide complete source code, documentation, and deployment instructions.',
  },
  {
    question:
      'How is SpeedMVPs different from freelancers, generic agencies, or no-code tools?',
    answer:
      'Freelancers and generic agencies can write code, but they rarely specialize in AI/LLMs end-to-end—from data and models to UX, evaluation, and MLOps. No-code tools are fantastic for quick experiments but often break down when you need scale, complex workflows, or deep integrations. SpeedMVPs is an AI-native team: we ship production-ready AI MVPs in 2–3 weeks using modern stacks (Next.js, Node/Python, Vercel/AWS, OpenAI/Claude/Gemini, and open-source models), with clean architecture that your own engineers can extend later.',
  },
  {
    question: 'Can you integrate models like ChatGPT, Claude, or Gemini into my MVP?',
    answer:
      'Yes. We work daily with leading LLM providers including OpenAI (ChatGPT/GPT‑4), Anthropic (Claude), and Google (Gemini), as well as open‑source models when appropriate. We help you choose the right model for your use case, implement Retrieval Augmented Generation (RAG) over your private data, and design prompts, caching, and evaluation so your AI features are fast, safe, and cost‑effective.',
  },
  {
    question: 'Will the AI MVP be ready for real users or just a demo?',
    answer:
      'Our goal is always a production‑ready MVP, not a throwaway demo. That means real authentication, basic role management, deployment pipelines, monitoring, and error handling in place. You should be comfortable inviting design partners, early customers, or internal teams to use the product as soon as we hand it over, while still having a clear roadmap for future iterations.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-4 sm:px-6" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-3 sm:mb-4 text-[32px] sm:text-[36px] md:text-[40px] leading-snug font-general-sans font-medium text-gray-900">
          AI MVP Development FAQ
        </h2>
        <p className="text-gray-600 text-[18px] sm:text-lg mb-8 sm:mb-10 font-normal font-general-sans leading-7" />
        <div className="w-full max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const isLast = index === faqs.length - 1;
            return (
              <div key={index} className="max-w-4xl mx-auto">
                <div className="border-0">
                  <h3 className="flex">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="text-left text-lg sm:text-xl font-medium text-gray-900 py-6 px-0 flex items-start justify-between w-full gap-4 group font-general-sans"
                    >
                      <span className="flex-1 text-left">{faq.question}</span>
                      <div className="flex-shrink-0 ml-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center transition-colors duration-200">
                          {open ? (
                            <Minus
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              strokeWidth={2.5}
                            />
                          ) : (
                            <Plus
                              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                              strokeWidth={2.5}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  </h3>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="text-gray-600 text-base sm:text-lg leading-7 pb-6 pr-12 font-general-sans">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                {!isLast && <div className="h-[1px] bg-gray-200" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
