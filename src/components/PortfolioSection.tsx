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
      'AI-powered content creation and management platform that helps teams produce high-quality articles at scale.',
    image: '/products/usearticle-product.webp',
  },
  {
    name: 'AgentHi',
    description:
      'Intelligent virtual assistant that streamlines customer support and automates routine business tasks.',
    image: '/products/agenthi-app.webp',
  },
  {
    name: 'StatsHub',
    description:
      'Comprehensive analytics dashboard providing real-time insights and data visualization for businesses.',
    image: '/products/statshub-product.webp',
  },
  {
    name: 'Harimaxx',
    description:
      'Personal fitness companion with AI-driven workout plans and nutrition tracking for optimal health.',
    image: '/products/harimaxx-app.webp',
  },
  {
    name: 'Vaga',
    description:
      'Smart travel planning app that curates personalized itineraries and local experiences.',
    image: '/products/vaga-product.webp',
  },
  {
    name: 'FoodScan',
    description:
      'Nutrition analysis app that scans food items and provides detailed nutritional information instantly.',
    image: '/products/foodscan-app.webp',
  },
  {
    name: 'MyJobReach',
    description:
      'Job matching platform connecting talented professionals with their dream opportunities.',
    image: '/products/myjobreach-product.webp',
  },
  {
    name: 'TravelGram',
    description:
      'Social platform for travelers to share experiences, discover destinations, and connect globally.',
    image: '/products/travelgram-app.webp',
  },
  {
    name: 'SuperStatz',
    description:
      'Advanced sports statistics platform delivering in-depth analysis and performance metrics.',
    image: '/products/superstatz-product.webp',
  },
  {
    name: 'Cashbook',
    description:
      'Simple expense tracking and budgeting app that helps users manage their finances effortlessly.',
    image: '/products/cashbook-app.webp',
  },
  {
    name: 'TypeFast',
    description:
      'Typing speed improvement platform with gamified lessons and real-time performance tracking.',
    image: '/products/typefast-product.webp',
  },
  {
    name: 'Easy Loan',
    description:
      'Streamlined loan management system that simplifies borrowing and lending processes.',
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
              Portfolio: AI Products Built for Global Startups
            </h2>
            <p className="text-[18px] sm:text-lg md:text-xl font-normal text-gray-600 font-general-sans">
              From content platforms and AI assistants to analytics dashboards and
              fintech solutions—see how we&apos;ve transformed ideas into
              production-ready MVPs in 2-3 weeks across diverse industries. Each
              product launched successfully, serving users globally.
            </p>
          </div>
          <button className="hidden sm:inline-flex items-center px-6 py-3 bg-black border border-black text-white font-medium rounded-lg hover:bg-transparent hover:border-[#05d664] hover:text-[#05d664] transition-colors duration-300 whitespace-nowrap font-general-sans">
            View All Work
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
            <div className="flex-1 flex justify-center gap-3">
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
                      i === active ? 'w-6 h-2 bg-[#05d664]' : 'w-2 h-2 bg-gray-300'
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
