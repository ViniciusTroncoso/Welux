'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = ['AI Services', 'Technology', 'Work', 'Hire', 'About'];

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
              <img
                alt="SpeedMVPS Logo"
                className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14"
                src="/logo-32.png"
              />
              <div className="flex flex-col items-start notranslate">
                <span
                  className={cn(
                    'text-xl md:text-2xl font-medium leading-tight tracking-[0.03em]',
                    textColor
                  )}
                  title="SpeedMVPs – AI MVP Development Agency"
                >
                  SpeedMVPs
                </span>
                <span
                  className={cn(
                    'w-full text-end text-[18px] sm:text-[18px] md:text-[18px] font-normal mt-0.6 hidden md:flex md:mt-[-4px]',
                    textColor
                  )}
                >
                  Powered by Speed AI Labs
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center space-x-8 ml-auto">
              {NAV_LINKS.map((label) => (
                <button
                  key={label}
                  className={cn(
                    'group text-base font-medium transition-all duration-200 tracking-wide hover:text-[#05d664]',
                    textColor
                  )}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 lg:ml-8">
              <div className="hidden lg:block">
                <button className="inline-flex items-center justify-center bg-[#05d664] hover:bg-transparent hover:border-[#05d664] border-2 border-[#05d664] text-black hover:text-[#05d664] uppercase font-medium text-[18px] sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-300">
                  Book A Call
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
                className="text-left text-base font-medium tracking-wide text-gray-900 transition-all duration-200 hover:text-[#05d664]"
              >
                {label}
              </button>
            ))}
            <button className="inline-flex items-center justify-center bg-[#05d664] hover:bg-transparent hover:border-[#05d664] border-2 border-[#05d664] text-black hover:text-[#05d664] uppercase font-medium text-sm px-6 py-2.5 rounded-lg transition-all duration-300">
              Book A Call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
