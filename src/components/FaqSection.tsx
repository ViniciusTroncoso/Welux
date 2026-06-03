'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Quanto tempo leva para construir um MVP com IA?',
    answer:
      'Conseguimos entregar um MVP com IA pronto para produção em 2 a 3 semanas. O prazo depende da complexidade dos seus recursos de IA, dos requisitos de dados e das necessidades de integração. Seguimos uma abordagem ágil para garantir entrega rápida sem abrir mão da qualidade.',
  },
  {
    question: 'Com quais tecnologias de IA vocês trabalham?',
    answer:
      'Somos especializados em tecnologias modernas de IA, incluindo OpenAI GPT, Claude, LLMs personalizados, TensorFlow, PyTorch, Hugging Face, LangChain e diversos frameworks de machine learning. Selecionamos a melhor stack de tecnologia com base nos seus requisitos específicos.',
  },
  {
    question: 'Preciso ter meus próprios dados para construir um MVP com IA?',
    answer:
      'Não necessariamente. Podemos trabalhar com modelos pré-treinados, datasets públicos ou dados sintéticos para os protótipos iniciais. No entanto, ter dados específicos do seu domínio vai melhorar significativamente o desempenho e a precisão da IA para o seu caso de uso.',
  },
  {
    question: 'Quanto custa o desenvolvimento de um MVP com IA?',
    answer:
      'Os custos variam conforme a complexidade, os recursos e os requisitos do modelo de IA. Um MVP com IA típico fica entre $15,000 e $50,000. Oferecemos preços transparentes e podemos fornecer uma estimativa detalhada depois de entender as suas necessidades específicas.',
  },
  {
    question: 'Serei o dono dos modelos de IA e do código?',
    answer:
      'Sim, você terá propriedade total de todo o código personalizado, modelos e propriedade intelectual que desenvolvermos para o seu projeto. Entregamos o código-fonte completo, a documentação e as instruções de deploy.',
  },
  {
    question:
      'Como a Welux se diferencia de freelancers, agências genéricas ou ferramentas no-code?',
    answer:
      'Freelancers e agências genéricas sabem escrever código, mas raramente são especializados em IA/LLMs de ponta a ponta — dos dados e modelos à UX, avaliação e MLOps. Ferramentas no-code são ótimas para experimentos rápidos, mas costumam falhar quando você precisa de escala, fluxos de trabalho complexos ou integrações profundas. A Welux é um time AI-native: entregamos MVPs com IA prontos para produção em 2 a 3 semanas usando stacks modernas (Next.js, Node/Python, Vercel/AWS, OpenAI/Claude/Gemini e modelos open-source), com uma arquitetura limpa que os seus próprios engenheiros podem expandir depois.',
  },
  {
    question: 'Vocês conseguem integrar modelos como ChatGPT, Claude ou Gemini no meu MVP?',
    answer:
      'Sim. Trabalhamos diariamente com os principais provedores de LLM, incluindo OpenAI (ChatGPT/GPT‑4), Anthropic (Claude) e Google (Gemini), além de modelos open‑source quando faz sentido. Ajudamos você a escolher o modelo certo para o seu caso de uso, implementar Retrieval Augmented Generation (RAG) sobre os seus dados privados e projetar prompts, caching e avaliação para que os seus recursos de IA sejam rápidos, seguros e econômicos.',
  },
  {
    question: 'O MVP com IA estará pronto para usuários reais ou será só uma demo?',
    answer:
      'Nosso objetivo é sempre um MVP pronto para produção, não uma demo descartável. Isso significa autenticação real, gestão básica de permissões, pipelines de deploy, monitoramento e tratamento de erros em funcionamento. Você deve se sentir à vontade para convidar parceiros de design, primeiros clientes ou times internos a usar o produto assim que o entregarmos, mantendo ainda um roadmap claro para as próximas iterações.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-4 sm:px-6" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-3 sm:mb-4 text-[32px] sm:text-[36px] md:text-[40px] leading-snug font-general-sans font-medium text-gray-900">
          Perguntas Frequentes sobre Desenvolvimento de MVP com IA
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
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center transition-colors duration-200">
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
