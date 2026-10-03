import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { CheckCircle2, Calendar, Sprout, Heart, ShieldCheck, ArrowRight } from '../common/Icons';

export function CommunityLaunchChecklistSection() {
  const stages = [
    {
      stage: '01. BEFORE LAUNCH',
      title: 'Preparation & Local Permissions',
      color: 'border-[#6F9F73]',
      items: [
        'Introduce Birthday Green across community boards or announcements.',
        'Explain the core concept: turning individual birth dates into monthly Green Days.',
        'Decide how members will access the website (share link via message or flyer).',
        'Identify suitable, safe locations for potted saplings or ground planting.',
        'Establish necessary local landowner/campus permissions and water access.',
      ],
    },
    {
      stage: '02. DURING PARTICIPATION',
      title: 'Quiet Individual Stewardship',
      color: 'border-[#1F4D38]',
      items: [
        'Members discover their personal Green Day using the free in-browser calculator.',
        'Participants select appropriate native plants adapted to the local environment.',
        'Members plant responsibly without disturbing walkways or utility lines.',
        'Each steward provides initial deep watering and young stem shielding.',
        'Participation can be voluntarily reported on the website without creating accounts.',
      ],
    },
    {
      stage: '03. AFTER PARTICIPATION',
      title: 'Continuous Monthly Nurturing',
      color: 'border-[#8EB892]',
      items: [
        'Encourage members to return on their recurring monthly Green Day.',
        'Focus on ongoing plant care: soil aeration, weeding, and moisture checks.',
        'Share updates internally within the community without social media pressure.',
        'Keep the monthly rhythm alive year-round as part of community culture.',
      ],
    },
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Practical Roadmap"
              title="Community Launch Checklist"
              description="A simple, non-bureaucratic guide for schools, housing societies, and NGOs introducing recurring Green Days to their members."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((st, idx) => (
            <ScrollReveal key={st.stage} delayMs={idx * 100}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-7 border border-[#DDE9D8] shadow-2xs h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#6F9F73] uppercase tracking-wider block mb-1">
                    {st.stage}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1F4D38] mb-5">
                    {st.title}
                  </h3>

                  <ul className="space-y-3">
                    {st.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#4D6153] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DDE9D8]/60 text-[11px] text-[#7A8E80]">
                  No administrative dashboards or software installations needed.
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
