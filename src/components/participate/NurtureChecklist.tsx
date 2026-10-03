import { useState } from 'react';
import { Heart, CheckCircle2, Circle } from '../common/Icons';

export function NurtureChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    {
      id: 1,
      title: 'Water appropriately',
      desc: 'Keep soil moist around root zone without waterlogging or eroding the topsoil.',
    },
    {
      id: 2,
      title: 'Protect the young plant',
      desc: 'Guard against extreme direct noon heat, heavy trampling, or stray animals.',
    },
    {
      id: 3,
      title: 'Check its condition',
      desc: 'Inspect weekly for wilting leaves, soil dryness, or weed growth competing for nutrients.',
    },
    {
      id: 4,
      title: 'Continue caring for it',
      desc: 'Nurturing is a sustained habit over months, not a single weekend gesture.',
    },
    {
      id: 5,
      title: 'Return on your next Green Day',
      desc: 'Mark your calendar to check in, loosen soil, and renew your monthly commitment.',
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="surface-elevated rounded-3xl p-6 sm:p-9 border border-[#DDE9D8] shadow-xs">
      <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#DDE9D8]">
        <Heart className="w-5 h-5 text-[#1F4D38]" />
        <div>
          <h3 className="font-display font-bold text-lg text-[#1F4D38]">
            Planting starts the story. Nurturing keeps it alive.
          </h3>
          <p className="text-xs text-[#7A8E80]">
            A simple checklist for your monthly stewardship
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {checklist.map((item) => {
          const isDone = !!checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isDone
                  ? 'bg-[#EEF5EC] border-[#8EB892]'
                  : 'surface-canvas border-[#DDE9D8] hover:border-[#6F9F73]'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-[#1F4D38] focus:outline-none"
                aria-label={`Toggle ${item.title}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-[#6F9F73]" />
                ) : (
                  <Circle className="w-5 h-5 text-[#7A8E80]" />
                )}
              </button>

              <div className="space-y-0.5">
                <h4 className={`text-xs sm:text-sm font-bold ${isDone ? 'text-[#1F4D38] line-through opacity-80' : 'text-[#1C2821]'}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-[#4D6153] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
