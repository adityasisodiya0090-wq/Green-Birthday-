import { ScrollReveal } from './ScrollReveal';
import { ShieldCheck, Check, HeartHandshake } from './Icons';

export function WhatWePromise() {
  const promises = [
    {
      title: 'No fabricated impact',
      desc: 'All counters are dynamically calculated from real, community-submitted reports. We never pad numbers or invent synthetic baselines.',
    },
    {
      title: 'No unnecessary public personal information',
      desc: 'Zero names, telephone numbers, home addresses, exact coordinates, or full birth dates are ever published or requested.',
    },
    {
      title: 'No fake partnerships',
      desc: 'We never display fictional partner counts, artificial corporate sponsors, or unconfirmed institutional logos.',
    },
    {
      title: 'No fake verification',
      desc: 'We transparently state that numbers are community-reported, not audited or verified by government authorities.',
    },
    {
      title: 'No invented environmental claims',
      desc: 'We do not promise guaranteed tree survival rates, exaggerated carbon offset figures, or simplistic fixes to climate change.',
    },
    {
      title: 'No unnecessary account requirement',
      desc: 'Anyone can calculate their date, participate in planting, and access the open community ledger without passwords or profiles.',
    },
  ];

  return (
    <div className="surface-elevated rounded-3xl p-7 sm:p-12 border border-[#DDE9D8] shadow-xs">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6F9F73] flex items-center justify-center gap-1.5 mb-1.5">
          <HeartHandshake className="w-4 h-4 text-[#1F4D38]" />
          <span>CIVIC TRANSPARENCY</span>
        </span>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1F4D38]">
          What we promise.
        </h3>
        <p className="text-xs sm:text-sm text-[#4D6153] mt-2">
          «Birthday Green promises only what our architecture and principles can actually deliver.»
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {promises.map((p, idx) => (
          <div
            key={p.title}
            className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] flex items-start gap-3.5 shadow-2xs"
          >
            <div className="w-7 h-7 rounded-lg bg-[#DDE9D8]/70 flex items-center justify-center text-[#1F4D38] shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-[#1F4D38]" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-[#1F4D38] mb-1">
                {p.title}
              </h4>
              <p className="text-xs text-[#4D6153] leading-relaxed">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#DDE9D8] text-center">
        <p className="text-xs font-semibold text-[#1F4D38] italic">
          «Our credibility comes from transparency, not from manufactured authority.»
        </p>
      </div>
    </div>
  );
}
