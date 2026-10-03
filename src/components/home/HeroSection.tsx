import { useRouter } from '../../context/RouterContext';
import { useGreenDay } from '../../context/GreenDayContext';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DateSproutVisual } from './DateSproutVisual';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { ArrowRight, BookOpen, ShieldCheck, Sprout } from '../common/Icons';

export function HeroSection() {
  const { openCalculator, navigate } = useRouter();
  const { savedDay, isToday, localPlantings, greenDayInfo } = useGreenDay();

  const handleHowItWorksClick = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPrimaryCta = () => {
    if (isToday) {
      return {
        label: 'Plant on My Green Day →',
        onClick: () => navigate('/participate'),
        icon: <Sprout className="w-4 h-4 text-white" />,
      };
    }
    if (localPlantings.length > 0) {
      return {
        label: 'Continue My Green Day →',
        onClick: () => navigate('/participate'),
        icon: <ArrowRight className="w-4 h-4" />,
      };
    }
    if (savedDay) {
      return {
        label: 'My Green Day →',
        onClick: () => {
          const el = document.getElementById('find-green-day');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigate('/participate');
          }
        },
        icon: <ArrowRight className="w-4 h-4" />,
      };
    }
    return {
      label: 'Find My Green Day →',
      onClick: () => openCalculator(),
      icon: <ArrowRight className="w-4 h-4" />,
    };
  };

  const primaryCta = getPrimaryCta();

  return (
    <section className="relative pt-3 pb-8 sm:pt-10 sm:pb-18 overflow-hidden">
      {/* Background Subconscious Atmosphere: Very soft radial gradient lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[340px] bg-gradient-to-b from-[#DDE9D8]/40 via-[#F7F3E8]/20 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Typography & Conversion Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-1">
            {/* Subtle Personalized Return Card (Section 22) */}
            {savedDay && greenDayInfo && (
              <div className="mb-3 inline-flex items-center flex-wrap gap-1.5 px-3 py-1 rounded-full bg-[#DDE9D8]/70 border border-[#6F9F73]/30 text-[11px] sm:text-xs text-[#1F4D38] shadow-2xs">
                <span className="font-bold uppercase tracking-wider text-[9px] text-[#6F9F73]">
                  YOUR GREEN DAY
                </span>
                <span className="font-extrabold text-[#1F4D38]">
                  {getOrdinalSuffix(savedDay)}
                </span>
                <span className="text-[#4D6153]">
                  · Next: {greenDayInfo.formattedNextDate}
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/participate')}
                  className="font-bold text-[#1F4D38] hover:underline cursor-pointer flex items-center gap-0.5 ml-0.5"
                >
                  <span>View My Green Day →</span>
                </button>
              </div>
            )}

            {/* Eyebrow: THE BIRTHDAY GREEN INITIATIVE */}
            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#6F9F73] uppercase mb-2">
              THE BIRTHDAY GREEN INITIATIVE
            </div>

            {/* Headline (Mobile ~70% scale: text-2xl sm:text-4xl lg:text-5xl) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F4D38] tracking-tight leading-[1.16] [text-wrap:balance]">
              Your birthday gave you a date.{' '}
              <span className="text-[#6F9F73] block sm:inline">
                Give that date a purpose.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#4D6153] leading-relaxed max-w-xl">
              Turn your birth date into a monthly Green Day — plant something living, nurture it, and keep the cycle growing.
            </p>

            {/* CTAs with compact mobile spacing */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                icon={primaryCta.icon}
                onClick={primaryCta.onClick}
              >
                {primaryCta.label}
              </Button>

              <Button
                variant="secondary"
                size="md"
                href="/how-it-works"
                icon={<BookOpen className="w-4 h-4" />}
                iconPosition="left"
              >
                How It Works
              </Button>
            </div>

            {/* Subtle trust notice */}
            <div className="mt-3.5 sm:mt-5 flex items-center gap-2 text-[10px] sm:text-xs text-[#7A8E80]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
              <span>No sign-ups or payments required</span>
              <span aria-hidden="true">·</span>
              <span>100% private in-browser calculations</span>
            </div>
          </div>

          {/* Right Column: Signature Date Composition */}
          <div className="lg:col-span-5 flex justify-center order-2">
            <DateSproutVisual
              initialDay={16}
              interactive={true}
              onSelectDay={(day) => openCalculator(day)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
