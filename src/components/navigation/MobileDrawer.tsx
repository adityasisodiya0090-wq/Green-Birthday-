import { useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Button } from '../common/Button';
import { RoutePath } from '../../types';
import { X, ArrowRight, Sprout } from '../common/Icons';
import { Logo } from '../common/Logo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { label: string; href: RoutePath }[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Participate', href: '/participate' },
  { label: 'Impact', href: '/impact' },
  { label: 'Community', href: '/community' },
  { label: 'Partners', href: '/partners' },
  { label: 'About', href: '/about' },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { currentPath, openCalculator, navigate } = useRouter();
  const { savedDay, isToday } = useGreenDay();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Dimmed backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#1C2821]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer surface with tactile elevation & safe-area awareness */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[270px] sm:max-w-xs h-[100dvh] bg-[#FFFDF7] border-l border-[#DDE9D8] shadow-2xl p-3.5 sm:p-5 pt-[max(0.75rem,var(--sat))] pb-[max(0.75rem,var(--sab))] flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#DDE9D8]">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-2 min-w-[44px] min-h-[44px] -mr-1 flex items-center justify-center text-[#4D6153] hover:text-[#1F4D38] hover:bg-[#DDE9D8]/50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-3 flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`px-3 py-2.5 rounded-xl font-display text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? 'surface-active'
                      : 'text-[#1C2821] hover:bg-[#DDE9D8]/60 hover:text-[#1F4D38]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8EB892]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA container */}
        <div className="pt-3.5 border-t border-[#DDE9D8] flex flex-col gap-2">
          <Button
            variant="primary"
            size="md"
            fullWidth
            icon={isToday ? <Sprout className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            onClick={() => {
              onClose();
              if (isToday || savedDay) {
                navigate('/participate');
              } else {
                openCalculator();
              }
            }}
          >
            {isToday ? 'Plant Today 🌱' : savedDay ? `My Green Day (${getOrdinalSuffix(savedDay)})` : 'Find My Green Day'}
          </Button>

          <p className="text-center text-[11px] text-[#4D6153] font-medium">
            Plant. Nurture. Repeat.
          </p>
        </div>
      </div>
    </div>
  );
}
