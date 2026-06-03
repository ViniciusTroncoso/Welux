'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/icons';

const NAV_LINKS = ['Serviços', 'Tecnologia', 'Projetos', 'Contratar', 'Sobre'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled ? 'text-gray-900' : 'text-white';

  return (
    <header
      className={cn(
        'left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'fixed top-0 bg-white shadow-md'
          : 'absolute top-0 bg-transparent'
      )}
    >
      <div className="w-full py-3 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between w-full">
            <button
              aria-label="Go to home and scroll to top"
              className="flex items-center gap-3 focus:outline-none"
            >
              <LogoMark
                aria-label="Welux Logo"
                className={cn('flex-shrink-0 w-11 h-11 md:w-12 md:h-12', textColor)}
              />
              <div className="flex flex-col items-start notranslate">
                <span
                  className={cn(
                    'text-xl md:text-2xl font-medium leading-tight tracking-[0.03em]',
                    textColor
                  )}
                  title="Welux – Software House"
                >
                  Welux
                </span>
                <span
                  className={cn(
                    'w-full text-end text-[13px] font-normal tracking-[0.16em] uppercase mt-0.6 hidden md:flex md:mt-[-2px]',
                    scrolled ? 'text-gray-500' : 'text-white/60'
                  )}
                >
                  Software House
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-8 ml-auto">
              {NAV_LINKS.map((label) => (
                <button
                  key={label}
                  className={cn(
                    'group text-base font-medium transition-all duration-200 tracking-wide hover:opacity-70',
                    textColor
                  )}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 lg:ml-8">
              <div className="hidden lg:block">
                <button data-ab-cta="book-call" className="inline-flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 uppercase font-medium text-[18px] sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg">
                  Agende uma Call
                </button>
              </div>

              <button
                aria-label="Open navigation menu"
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  'lg:hidden p-2 transition-colors duration-200',
                  textColor
                )}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-3">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={() => setMobileOpen(false)}
                className="text-left text-base font-medium tracking-wide text-gray-900 transition-all duration-200 hover:opacity-70"
              >
                {label}
              </button>
            ))}
            <button data-ab-cta="book-call" className="inline-flex items-center justify-center bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 uppercase font-medium text-sm px-6 py-2.5 rounded-lg">
              Agende uma Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
