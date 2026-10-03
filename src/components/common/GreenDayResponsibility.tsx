import { Sprout, Heart, RotateCcw } from './Icons';

interface GreenDayResponsibilityProps {
  className?: string;
}

export function GreenDayResponsibility({ className = '' }: GreenDayResponsibilityProps) {
  const steps = [
    {
      step: '01',
      action: 'Plant',
      title: 'Plant Something Living',
      desc: 'Plant a tree sapling, native shrub, or balcony planter on your monthly Green Day.',
      icon: <Sprout className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '02',
      action: 'Nurture',
      title: 'Care for What You Planted',
      desc: 'Water, loosen soil, check growth, and protect your living plants across the seasons.',
      icon: <Heart className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      step: '03',
      action: 'Repeat',
      title: 'Return Next Month',
      desc: 'Come back on your next Green Day. The rhythm of stewardship never ends.',
      icon: <RotateCcw className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <div className={`surface-elevated rounded-3xl p-6 sm:p-10 border border-[#DDE9D8] shadow-xs ${className}`}>
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73] block mb-2">
          Your Green Day Responsibility
        </span>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38] tracking-tight">
          Plant. Nurture. Repeat.
        </h3>
        <p className="text-sm text-[#4D6153] mt-2 leading-relaxed">
          Celebrate your birth month the way you celebrate your birthday. Planting is an action. Nurturing is a responsibility.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {steps.map((item) => (
          <div
            key={item.action}
            className="surface-canvas rounded-2xl p-5 border border-[#DDE9D8]/80 flex flex-col justify-between space-y-4 hover:border-[#6F9F73]/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-xs font-bold font-mono text-[#6F9F73]">
                  {item.step}
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-[#1F4D38]">
                {item.action}
              </h4>
              <p className="text-xs font-semibold text-[#4D6153] mt-0.5 mb-2">
                {item.title}
              </p>
              <p className="text-xs text-[#7A8E80] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
