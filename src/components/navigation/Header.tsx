import { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { MobileDrawer } from './MobileDrawer';
import { RoutePath } from '../../types';
import { Menu, ArrowRight, Sprout } from '../common/Icons';

const NAV_ITEMS: { label: string; href: RoutePath }[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Participate', href: '/participate' },
  { label: 'Impact', href: '/impact' },
  { label: 'Community', href: '/community' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const { currentPath, openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full h-13 sm:h-16 lg:h-18 transition-all duration-200 ${
          isScrolled
            ? 'surface-glass shadow-xs border-b border-[#DDE9D8]/90 backdrop-blur-md'
            : 'bg-[#FFFDF7]/90 backdrop-blur-xs border-b border-[#DDE9D8]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand wordmark (compact on mobile) */}
          <div className="flex items-center">
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:inline-flex" />
          </div>

          {/* Zone 2: Clean text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#4D6153]">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors hover:text-[#1F4D38] whitespace-nowrap ${
                    isActive ? 'text-[#1F4D38] font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1F4D38] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex whitespace-nowrap"
              icon={isToday ? <Sprout className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => {
                if (isToday || savedDay) {
                  navigate('/participate');
                } else {
                  openCalculator();
                }
              }}
            >
              {isToday ? 'Plant Today 🌱' : savedDay ? `My Green Day (${getOrdinalSuffix(savedDay)})` : 'Find My Green Day'}
            </Button>

            {/* Mobile / Tablet menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1F4D38] hover:bg-[#DDE9D8]/60 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
