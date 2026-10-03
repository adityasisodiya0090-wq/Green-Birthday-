import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Check, CheckSquare, Square, RotateCcw } from '../common/Icons';

export function CommunityLaunchChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const checklistStages = [
    {
      stage: 'Before Launch',
      items: [
        { id: 'b1', text: 'Understand the Green Day concept thoroughly' },
        { id: 'b2', text: 'Identify appropriate, safe planting locations (balconies, campus beds, permitted grounds)' },
        { id: 'b3', text: 'Check relevant school, college, society, or local authority rules' },
        { id: 'b4', text: 'Explain both planting and long-term nurturing principles to members' },
      ],
    },
    {
      stage: 'During Launch',
      items: [
        { id: 'l1', text: 'Share the Birthday Green introduction or WhatsApp announcement' },
        { id: 'l2', text: 'Direct participants to the free in-browser calculator to discover their Green Day' },
        { id: 'l3', text: 'Encourage responsible planting without blocking walkways or disturbing utilities' },
      ],
    },
    {
      stage: 'After Launch',
      items: [
        { id: 'a1', text: 'Encourage regular nurturing: watering according to soil need, stem shielding, weeding' },
        { id: 'a2', text: 'Remind participants to return each month on their personal Green Day' },
        { id: 'a3', text: 'Share the existing participation experience where members can voluntarily report acts' },
      ],
    },
  ];

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetChecklist = () => {
    setCheckedItems({});
  };

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionHeading
              eyebrow="Coordinator Checklist"
              title="Community Launch Checklist"
              description="A practical self-serve guide for preparing, launching, and sustaining Birthday Green. No scores or competitive rankings."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-[#7A8E80] px-2">
            <span>Tick items off as you progress through each stage</span>
            <button
              type="button"
              onClick={handleResetChecklist}
              className="text-[#1F4D38] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset list</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {checklistStages.map((stageGroup, groupIdx) => (
              <ScrollReveal key={stageGroup.stage} delayMs={groupIdx * 80}>
                <div className="surface-elevated rounded-3xl p-6 sm:p-7 border border-[#DDE9D8] shadow-2xs h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-base text-[#1F4D38] pb-3 mb-4 border-b border-[#DDE9D8]">
                      {stageGroup.stage}
                    </h3>

                    <div className="space-y-3">
                      {stageGroup.items.map((item) => {
                        const isDone = !!checkedItems[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs leading-relaxed ${
                              isDone
                                ? 'bg-[#EEF5EC] border-[#6F9F73] text-[#1F4D38]'
                                : 'bg-[#FFFDF7] border-[#DDE9D8] text-[#4D6153] hover:border-[#6F9F73]'
                            }`}
                            role="checkbox"
                            aria-checked={isDone}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                toggleItem(item.id);
                              }
                            }}
                          >
                            <span className="shrink-0 mt-0.5 text-[#1F4D38]">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-[#6F9F73]" />
                              ) : (
                                <Square className="w-4 h-4 text-[#7A8E80]" />
                              )}
                            </span>
                            <span className={isDone ? 'line-through text-[#7A8E80]' : ''}>
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#DDE9D8]/50 text-[10px] text-[#7A8E80]">
                    Local progress only · Never tracked or graded
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
