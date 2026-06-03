'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    name: 'UseArticle',
    description:
      'Plataforma de criação e gestão de conteúdo com IA que ajuda equipes a produzir artigos de alta qualidade em escala.',
    image: '/products/usearticle-product.webp',
  },
  {
    name: 'AgentHi',
    description:
      'Assistente virtual inteligente que agiliza o suporte ao cliente e automatiza tarefas rotineiras do negócio.',
    image: '/products/agenthi-app.webp',
  },
  {
    name: 'StatsHub',
    description:
      'Dashboard de análise completo que oferece insights em tempo real e visualização de dados para empresas.',
    image: '/products/statshub-product.webp',
  },
  {
    name: 'Harimaxx',
    description:
      'Companheiro pessoal de fitness com planos de treino guiados por IA e acompanhamento nutricional para uma saúde ideal.',
    image: '/products/harimaxx-app.webp',
  },
  {
    name: 'Vaga',
    description:
      'App inteligente de planejamento de viagens que monta roteiros personalizados e experiências locais.',
    image: '/products/vaga-product.webp',
  },
  {
    name: 'FoodScan',
    description:
      'App de análise nutricional que escaneia alimentos e fornece informações nutricionais detalhadas instantaneamente.',
    image: '/products/foodscan-app.webp',
  },
  {
    name: 'MyJobReach',
    description:
      'Plataforma de match de vagas que conecta profissionais talentosos às oportunidades dos seus sonhos.',
    image: '/products/myjobreach-product.webp',
  },
  {
    name: 'TravelGram',
    description:
      'Plataforma social para viajantes compartilharem experiências, descobrirem destinos e se conectarem pelo mundo.',
    image: '/products/travelgram-app.webp',
  },
  {
    name: 'SuperStatz',
    description:
      'Plataforma avançada de estatísticas esportivas que entrega análises aprofundadas e métricas de desempenho.',
    image: '/products/superstatz-product.webp',
  },
  {
    name: 'Cashbook',
    description:
      'App simples de controle de despesas e orçamento que ajuda os usuários a gerenciar suas finanças sem esforço.',
    image: '/products/cashbook-app.webp',
  },
  {
    name: 'TypeFast',
    description:
      'Plataforma para melhorar a velocidade de digitação com lições gamificadas e acompanhamento de desempenho em tempo real.',
    image: '/products/typefast-product.webp',
  },
  {
    name: 'Easy Loan',
    description:
      'Sistema simplificado de gestão de empréstimos que descomplica os processos de tomada e concessão de crédito.',
    image: '/products/loanbook-app.webp',
  },
];

export default function PortfolioSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="bg-gray-50 py-24 px-4 sm:px-6 font-general-sans"
      id="products"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-10 sm:mb-16">
          <div>
            <h2 className="text-[32px] sm:text-[36px] md:text-[40px] font-medium text-gray-900 mb-2 font-general-sans">
              Portfólio: Produtos de IA Construídos para Startups Globais
            </h2>
            <p className="text-[18px] sm:text-lg md:text-xl font-normal text-gray-600 font-general-sans">
              De plataformas de conteúdo e assistentes de IA a dashboards de
              análise e soluções fintech—veja como transformamos ideias em MVPs
              prontos para produção em 2 a 3 semanas nos mais diversos setores.
              Cada produto foi lançado com sucesso, atendendo usuários no mundo
              todo.
            </p>
          </div>
          <button className="hidden sm:inline-flex items-center px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 font-medium rounded-lg whitespace-nowrap font-general-sans">
            Ver Todos os Projetos
          </button>
        </div>

        <div className="mt-12 space-y-10">
          <div className="overflow-hidden pb-3">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="w-full min-w-full flex-shrink-0"
                >
                  <div className="w-full rounded-2xl overflow-hidden bg-white mb-6 flex justify-center px-0 sm:px-8 py-0 sm:py-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full sm:w-[88%] md:w-[70%] lg:w-[60%] h-auto object-contain"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <h3 className="text-2xl lg:text-3xl text-gray-900 mb-3 font-general-sans font-medium">
                    {product.name}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed font-general-sans">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex-1 flex flex-wrap justify-center gap-1.5 sm:gap-3">
              {products.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to product ${i + 1}`}
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300"
                  onClick={() => setActive(i)}
                >
                  <span
                    className={cn(
                      'rounded-full transition-all duration-300',
                      i === active ? 'w-6 h-2 bg-black' : 'w-2 h-2 bg-gray-300'
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous product"
                type="button"
                className="h-11 w-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                onClick={() => setActive((a) => Math.max(0, a - 1))}
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                aria-label="Next product"
                type="button"
                className="h-11 w-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                onClick={() =>
                  setActive((a) => Math.min(products.length - 1, a + 1))
                }
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
