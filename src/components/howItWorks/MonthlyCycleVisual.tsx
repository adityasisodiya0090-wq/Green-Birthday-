import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Calendar, Sprout, Heart, RotateCw, ArrowRight } from '../common/Icons';

export function MonthlyCycleVisual() {
  const cycleNodes = [
    {
      label: 'GREEN DAY',
      sub: 'Your date arrives',
      icon: <Calendar className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      label: 'PLANT',
      sub: 'Put life into soil',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      label: 'NURTURE',
      sub: 'Water, weed & inspect',
      icon: <Heart className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      label: 'NEXT GREEN DAY',
      sub: 'One month later',
      icon: <Calendar className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      label: 'REPEAT',
      sub: 'Cycle continues',
      icon: <RotateCw className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-y border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Continuous Rhythm"
              title="The Monthly Stewardship Cycle"
              description="Environmental care is not a once-a-year event. It operates as a living, repeating rhythm with every calendar turn."
            />
          </div>
        </ScrollReveal>

        {/* Circular / Horizontal Cycle Ribbon */}
        <ScrollReveal delayMs={150}>
          <div className="max-w-5xl mx-auto surface-glass rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-sm border border-white/90">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
              {cycleNodes.map((node, i) => (
                <div key={node.label} className="flex flex-col items-center text-center group">
                  {/* Node icon with soft tactile styling */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FFFDF7] border-2 border-[#DDE9D8] group-hover:border-[#1F4D38] shadow-xs flex items-center justify-center mb-3 transition-all duration-200 group-hover:scale-105">
                    {node.icon}
                  </div>
                  <span className="font-display font-extrabold text-sm text-[#1F4D38] tracking-tight">
                    {node.label}
                  </span>
                  <span className="text-[11px] text-[#7A8E80] mt-0.5">
                    {node.sub}
                  </span>

                  {/* Arrow for mobile view */}
                  {i < cycleNodes.length - 1 && (
                    <div className="md:hidden my-2 text-[#6F9F73]">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#DDE9D8] text-center">
              <span className="text-xs sm:text-sm font-semibold text-[#1F4D38] bg-[#DDE9D8]/50 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-[#6F9F73]" />
                12 recurring cycles every year · Lifelong compound growth
              </span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
