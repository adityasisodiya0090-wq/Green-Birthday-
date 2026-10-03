import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { useRouter } from '../../context/RouterContext';
import {
  GraduationCap,
  Home,
  TreePine,
  Building2,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from '../common/Icons';

type AudienceType =
  | 'school_college'
  | 'housing_society'
  | 'ngo_environmental'
  | 'community_org'
  | 'informal_group'
  | 'exploring';

export function InteractiveAudienceFilter() {
  const { openCalculator } = useRouter();
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('school_college');

  const audienceOptions: { id: AudienceType; label: string; icon: any }[] = [
    { id: 'school_college', label: 'School / College', icon: GraduationCap },
    { id: 'housing_society', label: 'Housing Society', icon: Home },
    { id: 'ngo_environmental', label: 'NGO / Environmental Group', icon: TreePine },
    { id: 'community_org', label: 'Community Organization', icon: Building2 },
    { id: 'informal_group', label: 'Informal Group / Friends', icon: Users },
    { id: 'exploring', label: 'Just Exploring', icon: Compass },
  ];

  const guidanceMap: Record<
    AudienceType,
    {
      title: string;
      focus: string;
      tips: string[];
      example: string;
    }
  > = {
    school_college: {
      title: 'Guidance for Schools & Colleges',
      focus: 'Distributed Student Rhythm without One-Day Bottlenecks',
      tips: [
        'Avoid trying to make all students plant on the same date. Their individual birth dates create a distributed monthly calendar (Student A on 5th, Student B on 16th, Student C on 28th).',
        'Consider container planters on classroom balconies or a dedicated perimeter strip on campus.',
        'Use Green Day as an experiential biology and civic stewardship lesson.',
        'Remind students that care and watering between months is where learning happens.',
      ],
      example: 'Class 8 introduces the concept: each student finds their date and receives guidance on native potted herbs or campus saplings.',
    },
    housing_society: {
      title: 'Guidance for Housing Societies & Apartments',
      focus: 'Balcony Planting & Permitted Shared Courtyards',
      tips: [
        'Respect common area rules: identify designated perimeter flowerbeds or recommend balcony containers.',
        'Encourage neighbors to pair up for watering during travel or dry spells.',
        'Share the ready-to-share message in your society WhatsApp group or notice board.',
        'Never plant trees with invasive root structures near underground plumbing or foundation walls.',
      ],
      example: 'A residential apartment complex uses the society notice board to invite residents to green their balconies on their monthly birth dates.',
    },
    ngo_environmental: {
      title: 'Guidance for NGOs & Environmental Groups',
      focus: 'Complementing Existing Conservation Initiatives',
      tips: [
        'Use Birthday Green as a recurring engagement layer alongside your established tree drives.',
        'Focus on native species suited to your local bio-region (Neem, Peepal, Jamun, Pongamia).',
        'Help volunteers build a personal rhythm of returning to saplings they already planted.',
        'Integrate Green Day reminders into your volunteer newsletter.',
      ],
      example: 'An environmental NGO introduces the monthly Green Day concept to volunteer cohorts so tree-care continues after weekend drives.',
    },
    community_org: {
      title: 'Guidance for Community Organizations & Workplaces',
      focus: 'Turning Member Birthdays into Civic Purpose',
      tips: [
        'Instead of giving disposable physical gifts, encourage members to celebrate with a living sapling.',
        'Keep participation voluntary and free from competitive leaderboards or pressure.',
        'Share member planting stories informally to inspire others without vanity metrics.',
      ],
      example: 'A local rotary club or civic circle features monthly Green Day reminders in their regular newsletter.',
    },
    informal_group: {
      title: 'Guidance for Informal Circles & Friend Groups',
      focus: 'Shared Habits Among Friends & Families',
      tips: [
        'Start with a family group or circle of close friends.',
        'Compare your Green Day dates (e.g. 3rd, 14th, 22nd) to see your monthly coverage.',
        'Send quiet encouraging reminders to each other on your respective Green Days.',
      ],
      example: 'A group of friends marks each other’s monthly Green Days to check in on their balcony plants.',
    },
    exploring: {
      title: 'General Exploration Guidance',
      focus: 'Understanding the Core Mechanism',
      tips: [
        'Birthday Green requires zero software installation, zero accounts, and zero commercial fees.',
        'The principle is simple: Your birth date becomes your monthly date to plant and nurture.',
        'Start with your own date first to experience the simplicity before introducing it to others.',
      ],
      example: 'Experience how finding your Green Day works in 5 seconds without entering private data.',
    },
  };

  const currentGuidance = guidanceMap[selectedAudience];

  return (
    <section className="py-18 sm:py-26 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionHeading
              eyebrow="Tailored Activation"
              title="Who are you introducing this to?"
              description="Select your setting to view focused tips. No profile is created and your choice stays private on this device."
            />
          </div>
        </ScrollReveal>

        {/* Audience Selector Pills */}
        <ScrollReveal delayMs={100}>
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {audienceOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedAudience === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedAudience(opt.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F4D38] text-white shadow-md scale-102'
                      : 'surface-elevated text-[#1C2821] border border-[#DDE9D8] hover:border-[#6F9F73]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#DDE9D8]' : 'text-[#6F9F73]'}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Guidance Card */}
        <ScrollReveal delayMs={150}>
          <div className="max-w-4xl mx-auto surface-elevated rounded-3xl p-7 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#DDE9D8]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6F9F73] block mb-1">
                  {currentGuidance.focus}
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1F4D38]">
                  {currentGuidance.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDE9D8]/60 text-xs font-semibold text-[#1F4D38] shrink-0 self-start sm:self-center">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practical Guidelines</span>
              </div>
            </div>

            {/* Tips List */}
            <div className="space-y-3">
              {currentGuidance.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#6F9F73] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* Illustrative Context Example */}
            <div className="p-4 rounded-2xl bg-[#F7F3E8] border border-[#DDE9D8] text-xs text-[#4D6153] leading-relaxed">
              <strong className="text-[#1F4D38] block font-bold mb-0.5">Illustrative Example:</strong>
              {currentGuidance.example}
            </div>

            {/* Grounding in Personal Date */}
            <div className="pt-4 border-t border-[#DDE9D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#7A8E80]">
                Before introducing Birthday Green to others, find your own personal Green Day.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openCalculator()}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Find My Green Day
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
