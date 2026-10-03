import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { Card } from '../common/Card';
import { ShieldCheck, Lock, EyeOff, UserX, Camera, UserCheck, ArrowRight } from '../common/Icons';

export function PrivacyReassuranceSection() {
  const points = [
    {
      title: 'Full DOB is not publicly displayed',
      desc: 'We only evaluate your birth day number (1–31). Your birth month, birth year, and full date of birth stay private.',
      icon: <EyeOff className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      title: 'No public profiles',
      desc: 'Birthday Green is a community action ritual, not a social network. There are no public user pages or member directories.',
      icon: <UserX className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      title: 'No public phone numbers',
      desc: 'We never request, display, or store your telephone number or private contact details.',
      icon: <Lock className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      title: 'No precise home locations',
      desc: 'Community reports only cite general broad districts (e.g. Pune). Specific addresses or coordinates are never collected.',
      icon: <ShieldCheck className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      title: 'Photos are not required',
      desc: 'Visual proof is purely optional. Participation is founded on personal integrity and voluntary stewardship.',
      icon: <Camera className="w-5 h-5 text-[#1F4D38]" />,
    },
    {
      title: 'No unnecessary account creation',
      desc: 'You never need to set passwords or register an account. Calculations and commitments run client-side in your browser.',
      icon: <UserCheck className="w-5 h-5 text-[#1F4D38]" />,
    },
  ];

  return (
    <section className="py-18 sm:py-26 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionHeading
              eyebrow="Privacy Guarantee"
              title="Your privacy stays yours."
              description="Participate fully in the movement without surrendering your personal identity or personal data."
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <ScrollReveal key={pt.title} delayMs={idx * 60}>
              <Card
                variant="standard"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#DDE9D8]/70 flex items-center justify-center mb-4">
                    {pt.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1F4D38] mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4D6153] leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delayMs={350}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-xs sm:text-sm text-[#4D6153]">
              Community impact relies entirely on voluntary, anonymized planting reports.
            </p>
            <Button variant="ghost" size="sm" href="/privacy" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Read Privacy Commitments
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
