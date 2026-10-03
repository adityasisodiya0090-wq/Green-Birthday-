import { useState, useEffect, useRef } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { useRouter } from '../../context/RouterContext';
import { Button } from './Button';
import { ShareModal } from '../share/ShareModal';
import {
  X,
  Droplets,
  Shield,
  Shovel,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Heart,
  Compass,
  Share2,
} from './Icons';

export function HowToNurtureModal() {
  const { isNurtureModalOpen, closeNurtureModal } = useGreenDay();
  const { navigate } = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNurtureModalOpen && !isShareModalOpen) {
        closeNurtureModal();
      }
    };

    if (isNurtureModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNurtureModalOpen, isShareModalOpen, closeNurtureModal]);

  if (!isNurtureModalOpen) return null;

  const nurturePrinciples = [
    {
      icon: <Droplets className="w-5 h-5 text-[#1F4D38]" />,
      title: 'Water by Soil Need, Not Rigid Formula',
      desc: 'Test the soil an inch below the surface with your finger. If it feels dry, provide deep, slow watering around the drip line. Avoid waterlogging roots, and adapt naturally to rainy or dry seasons.',
    },
    {
      icon: <Shield className="w-5 h-5 text-[#1F4D38]" />,
      title: 'Shield the Young Stem',
      desc: 'Young saplings are fragile. Install simple bamboo stakes, tree guards, or stones to shield them from trampling, stray cattle, lawnmowers, or fierce direct afternoon heat.',
    },
    {
      icon: <Shovel className="w-5 h-5 text-[#1F4D38]" />,
      title: 'Loosen the Surface Soil & Mulch',
      desc: 'Periodically loosen crusted topsoil so rain and aeration reach roots easily. Place a light ring of dry leaves or organic mulch around the base to preserve moisture and suppress weeds.',
    },
    {
      icon: <Eye className="w-5 h-5 text-[#1F4D38]" />,
      title: 'Observe Seasonal Shifts Monthly',
      desc: 'Look closely at leaf color, new shoots, and soil dampness each month. A Green Day is a recurring opportunity to listen to what your plant needs, whether shade, support, or patience.',
    },
  ];

  const seasonalRhythms = [
    {
      season: 'Monsoon / Wet Season',
      action: 'Check drainage, clear waterlogging around stems, and let rain take over deep watering duties.',
    },
    {
      season: 'Winter / Mild Season',
      action: 'Water in early morning, loosen surface crusts, and prune dead twigs gently.',
    },
    {
      season: 'Summer / Hot Dry Season',
      action: 'Mulch generously with dry leaves, water deeply at dusk, and construct simple afternoon shade screens.',
    },
  ];

  const handleOpenGuidelines = () => {
    closeNurtureModal();
    navigate('/guidelines');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nurture-modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-2xl relative animate-hero-center my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#DDE9D8] flex items-center justify-center text-[#1F4D38]">
              <Heart className="w-5 h-5 text-[#1F4D38]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6F9F73] block">
                STEWARDSHIP GUIDE
              </span>
              <h3 id="nurture-modal-title" className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38]">
                How to Nurture What You Plant
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={closeNurtureModal}
            className="w-8 h-8 rounded-full bg-[#DDE9D8]/50 hover:bg-[#DDE9D8] text-[#1F4D38] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close nurture guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Philosophy Callout */}
        <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] mb-6 text-xs sm:text-sm text-[#1F4D38] italic text-center font-medium leading-relaxed">
          «Planting creates the beginning. Nurturing gives it continuity.»
        </div>

        {/* 4 Practical Principles */}
        <div className="space-y-4 mb-8">
          <h4 className="font-display font-bold text-sm text-[#1F4D38] uppercase tracking-wider">
            Essential Care Principles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {nurturePrinciples.map((p) => (
              <div
                key={p.title}
                className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] space-y-2 shadow-2xs hover:border-[#6F9F73] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#DDE9D8]/60">
                    {p.icon}
                  </div>
                  <h5 className="font-display font-bold text-xs text-[#1F4D38]">
                    {p.title}
                  </h5>
                </div>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Rhythms */}
        <div className="space-y-3 mb-8">
          <h4 className="font-display font-bold text-sm text-[#1F4D38] uppercase tracking-wider">
            Seasonal Adaptations
          </h4>
          {seasonalRhythms.map((item) => (
            <div
              key={item.season}
              className="p-3.5 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] flex items-start gap-3 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1F4D38] block font-bold mb-0.5">
                  {item.season}
                </strong>
                <p className="text-[#4D6153] leading-relaxed">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Planting Standards */}
        <div className="p-5 rounded-2xl bg-[#EEF5EC] border border-[#8EB892]/40 mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D38]">
            <Compass className="w-4 h-4 text-[#6F9F73]" />
            <span>Responsible Planting Standards</span>
          </div>
          <p className="text-xs text-[#4D6153] leading-relaxed">
            Stewardship begins before roots touch the soil. Always select native species, seek appropriate permissions for community or public land, avoid invasive varieties, and only plant where regular access and watering are genuinely possible.
          </p>
          <button
            type="button"
            onClick={handleOpenGuidelines}
            className="text-xs font-bold text-[#1F4D38] hover:text-[#6F9F73] flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Read complete Participation Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DDE9D8]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            icon={<Share2 className="w-3.5 h-3.5" />}
            className="bg-white/80"
          >
            Share Nurture Philosophy
          </Button>

          <Button variant="primary" size="md" onClick={closeNurtureModal}>
            Got it, I’ll nurture! 🌱
          </Button>
        </div>
      </div>

      {/* Share Modal Integration (Section 10) */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        contentType="NURTURE"
        title="Share Nurture Philosophy"
      />
    </div>
  );
}
