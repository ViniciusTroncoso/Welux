import { Mail, Phone } from 'lucide-react';
import { LogoMark } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 bg-white">
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-8 mb-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <LogoMark
                  aria-label="Welux Logo"
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 text-gray-900"
                />
                <div className="flex flex-col items-start notranslate">
                  <span
                    className="text-gray-900 text-xl md:text-2xl font-medium leading-tight tracking-[0.03em]"
                    title="Welux – Sites médicos de alta conversão"
                  >
                    Welux
                  </span>
                  <span className="text-gray-500 w-full text-end text-[13px] font-normal tracking-[0.16em] uppercase mt-0.6 hidden md:flex md:mt-[-2px]">
                    Software House · Sites Médicos
                  </span>
                </div>
              </div>
              <p className="text-black text-lg md:text-xl font-normal leading-8 mb-4">
                Sites médicos de alta conversão em 2-3 semanas.
              </p>
            </div>
            <div className="w-full lg:max-w-lg">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      alt="US Flag"
                      className="w-11 h-[29px] flex-shrink-0 object-cover rounded-sm"
                      decoding="async"
                      height="29"
                      loading="lazy"
                      src="/us_flag.png"
                      style={{ color: 'transparent' }}
                      width="44"
                    />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Escritório EUA
                    </span>
                  </div>
                  <p className="text-black text-sm leading-6 mb-4">
                    Sede
                    <br />
                    Loxahatchee, FL 33470, USA
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      data-analytics-explicit="true"
                      href="mailto:diyanshu@speedmvps.com"
                    >
                      <Mail className="w-4 h-4 text-green-700 flex-shrink-0" />
                      <span className="text-sm">diyanshu@speedmvps.com</span>
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      alt="India Flag"
                      className="w-11 h-[29px] flex-shrink-0 object-contain rounded-sm"
                      decoding="async"
                      height="29"
                      loading="lazy"
                      src="/india_flag.jpg"
                      style={{ color: 'transparent' }}
                      width="44"
                    />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Escritório Índia
                    </span>
                  </div>
                  <p className="text-black text-sm leading-6 mb-4">
                    Speed AI Labs LLP
                    <br />
                    JB Tower, Thaltej, Ahmedabad, GJ 380054
                  </p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      data-analytics-explicit="true"
                      href="mailto:nirav@speedmvps.com"
                    >
                      <Mail className="w-4 h-4 text-green-700 flex-shrink-0" />
                      <span className="text-sm">nirav@speedmvps.com</span>
                    </a>
                    <a
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                      data-analytics-explicit="true"
                      href="tel:+917383935292"
                    >
                      <Phone className="w-4 h-4 text-green-700 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">+91 73839 35292</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-transparent md:bg-gray-50 py-0 md:py-6 px-0 md:px-8 mb-16">
            <span className="hidden md:block text-gray-900 font-medium text-lg">
              Siga-nos nas Redes Sociais
            </span>
            <div className="flex items-center gap-2 md:gap-4">
              <a
                aria-label="LinkedIn"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://www.linkedin.com/company/speed-mvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="LinkedIn"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/linkedin.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="Twitter"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://x.com/speedmvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Twitter"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="50"
                  loading="lazy"
                  src="/social/twitterx.png"
                  style={{ color: 'transparent' }}
                  width="50"
                />
              </a>
              <a
                aria-label="Instagram"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://www.instagram.com/speedmvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Instagram"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/instagram.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="YouTube"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://www.youtube.com/@speedailabs"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="YouTube"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/youtube.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="Facebook"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://www.facebook.com/speedmvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Facebook"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/facebook.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="DEV Community"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://dev.to/speedmvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="DEV Community"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/devto.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="Medium"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://medium.com/@speedmvps-com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Medium"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="64"
                  loading="lazy"
                  src="/social/medium.png"
                  style={{ color: 'transparent' }}
                  width="64"
                />
              </a>
              <a
                aria-label="Hashnode"
                className="transition-all duration-200 hover:opacity-80"
                data-analytics-explicit="true"
                href="https://hashnode.com/@speedmvps"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="Hashnode"
                  className="w-6 h-6 md:w-7 md:h-7"
                  decoding="async"
                  height="48"
                  loading="lazy"
                  src="/social/hashnode.png"
                  style={{ color: 'transparent' }}
                  width="48"
                />
              </a>
              <a
                aria-label="Email"
                className="transition-all duration-200"
                data-analytics-explicit="true"
                href="mailto:diyanshu@speedmvps.com"
              >
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-gray-600 hover:text-green-600" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-gray-900 font-medium text-base mb-6">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services"
                  >
                    Serviços
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <button className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group">
                    Nosso Processo
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <button className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group">
                    Portfólio
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/technologies"
                  >
                    Tecnologias
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/industries"
                  >
                    Setores
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <button className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group">
                    Depoimentos
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </button>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/about"
                  >
                    Sobre nós
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/frequently-asked-questions"
                  >
                    FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/contact"
                  >
                    Fale conosco
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-base mb-6">Central de Conhecimento</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/blog"
                  >
                    Blog
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/resources"
                  >
                    Recursos
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/case-studies"
                  >
                    Cases
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/technical-deep-dives"
                  >
                    Análises Técnicas Aprofundadas
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/compare"
                  >
                    Comparações
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/industry-use-cases"
                  >
                    Casos de Uso por Setor
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/ai-mvp-development"
                  >
                    Agência Global de Desenvolvimento de MVP com IA
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/ai-mvp-development"
                  >
                    Serviços de Desenvolvimento de MVP com IA
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/ai-product-development"
                  >
                    Desenvolvimento de Produtos com IA
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-base mb-6">Serviços Digitais</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/ai-mvp-development"
                  >
                    Desenvolvimento de MVP com IA
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/high-converting-landing-pages"
                  >
                    Landing Pages de Alta Conversão
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/ai-powered-app-development"
                  >
                    Desenvolvimento de Apps com IA
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/custom-ai-tools"
                  >
                    Desenvolvimento de Ferramentas de IA Personalizadas
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/services/integrate-ai-existing-software"
                  >
                    Integre IA em Software Existente
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-medium text-base mb-6">Outros</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/media-coverage"
                  >
                    Destaques
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/security"
                  >
                    Segurança e Conformidade
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/privacy"
                  >
                    Política de Privacidade
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/terms"
                  >
                    Termos e Condições
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/refund"
                  >
                    Política de Reembolso
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/fair-use-policy"
                  >
                    Política de Uso Justo
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-black hover:text-black transition-colors duration-200 text-base leading-6 text-left relative group"
                    href="/ethics-safety"
                  >
                    Ética e Segurança
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 ease-in-out group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-base text-center">
              © 2026 Welux. Software house de sites médicos de alta conversão.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
