import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { Printer, FileText, CheckCircle2, ShieldAlert, Sprout } from '../common/Icons';

export function PrintableGuideSection() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 surface-canvas relative border-b border-[#DDE9D8]/80">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-12">
            <SectionHeading
              eyebrow="Printable Summary"
              title="One-Page Community Handout"
              description="A clean, concise summary suitable for notice boards, classroom hand-outs, or saving as a PDF via your browser's native print menu."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <div className="surface-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-[#DDE9D8] shadow-xs space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDE9D8] flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1F4D38]" />
                <span className="font-display font-bold text-base text-[#1F4D38]">
                  Birthday Green — Essential Handout
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                icon={<Printer className="w-3.5 h-3.5" />}
                className="bg-white"
              >
                Print / Save as PDF
              </Button>
            </div>

            {/* Print Document Preview Canvas */}
            <div
              id="printable-handout-preview"
              className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] space-y-5 text-[#1C2821] shadow-2xs"
            >
              {/* Header */}
              <div className="text-center pb-4 border-b border-[#DDE9D8]/80 space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#1F4D38]">
                  <Sprout className="w-4 h-4 text-[#6F9F73]" />
                  <span>BIRTHDAY GREEN</span>
                </div>
                <h4 className="font-display font-extrabold text-xl text-[#1F4D38]">
                  Your birthday gave you a date. Give that date a purpose.
                </h4>
                <p className="text-xs text-[#7A8E80]">
                  A recurring monthly rhythm of environmental care · Free · Zero accounts
                </p>
              </div>

              {/* Core Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] space-y-1">
                  <strong className="text-[#1F4D38] block font-bold">What is a Green Day?</strong>
                  <p className="text-[#4D6153]">
                    One recurring day each month based on your birth-date number. Born on the 16th? Every 16th is your Green Day.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F3E8] border border-[#DDE9D8] space-y-1">
                  <strong className="text-[#1F4D38] block font-bold">The Four-Step Rhythm:</strong>
                  <p className="text-[#4D6153]">
                    1. Find Date → 2. Plant Living Roots → 3. Nurture Continuously → 4. Return Every Month.
                  </p>
                </div>
              </div>

              {/* What Participants Do */}
              <div className="space-y-2 text-xs text-[#4D6153]">
                <strong className="text-[#1F4D38] block font-bold">What Participants Do:</strong>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6F9F73] shrink-0 mt-0.5" />
                    <span><strong>Plant responsibly:</strong> Select native species suited to the local environment and available space.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6F9F73] shrink-0 mt-0.5" />
                    <span><strong>Nurture what you start:</strong> Provide water according to soil moisture, protect young stems, and aerate soil.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6F9F73] shrink-0 mt-0.5" />
                    <span><strong>Return on your Green Day:</strong> Come back each month to observe, care, or plant anew.</span>
                  </li>
                </ul>
              </div>

              {/* Critical Guidelines Box */}
              <div className="p-3.5 rounded-xl bg-[#FFF5F5] border border-[#B87070]/30 text-[11px] text-[#9B2C2C] space-y-1">
                <strong className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Important Participation Reminders:</span>
                </strong>
                <p>
                  Always obtain local property or campus permissions before planting. Never plant in unauthorized public zones or block walkways. Only plant where ongoing watering and maintenance are genuinely possible.
                </p>
              </div>

              {/* Footer URL */}
              <div className="pt-3 border-t border-[#DDE9D8]/60 text-center text-[11px] text-[#7A8E80]">
                Discover your date & learn more at: <strong>birthdaygreen.org</strong>
              </div>
            </div>

            <p className="text-center text-xs text-[#7A8E80]">
              Uses your browser's native print engine · Zero external tracking or paid PDF tools
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
