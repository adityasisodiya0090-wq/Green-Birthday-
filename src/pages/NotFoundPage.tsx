import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { useRouter } from '../context/RouterContext';
import { Sprout, Home, ArrowRight } from '../components/common/Icons';

export function NotFoundPage() {
  const { navigate, openCalculator } = useRouter();

  return (
    <div className="py-20 sm:py-32 surface-base min-h-[70vh] flex items-center justify-center text-center">
      <Container size="narrow">
        <ScrollReveal>
          <div className="surface-glass rounded-3xl p-8 sm:p-14 border border-white/80 shadow-xl max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#DDE9D8]/70 text-[#1F4D38] flex items-center justify-center mx-auto shadow-2xs">
              <Sprout className="w-8 h-8 text-[#1F4D38]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73]">
                404 · Uncharted Territory
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38]">
                Looks like this path hasn't grown yet. 🌱
              </h1>
              <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed max-w-md mx-auto">
                The page you are looking for does not exist or has been relocated to another part of the garden.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/')}
                icon={<Home className="w-4 h-4" />}
                iconPosition="left"
              >
                Return Home
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={() => openCalculator()}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Find My Green Day
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
