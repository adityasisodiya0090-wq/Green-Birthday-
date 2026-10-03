import { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { Button } from '../common/Button';
import { shareService } from '../../services/shareService';
import { Copy, Check, Share2, MessageSquare, Send, Sprout } from '../common/Icons';

export function ReadyToShareSection() {
  const [copiedIntro, setCopiedIntro] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const websiteUrl = shareService.getBaseUrl();

  const longIntroduction =
    `Birthday Green turns your birth date into a monthly Green Day. On that day, plant a tree or sapling where it is appropriate and continue caring for what you've already planted. Your birthday happens once a year; your Green Day gives that date a purpose every month.\n\nDiscover your Green Day in 5 seconds (100% free, zero accounts):\n${websiteUrl}`;

  const shortAnnouncement =
    `Hi everyone! 🌱 We are introducing Birthday Green. Your birth date becomes your recurring monthly Green Day to plant living roots and nurture them. Discover your date here (free, no sign-ups):\n${websiteUrl}\n\nPlant. Nurture. Return. Repeat.`;

  const handleCopy = async (text: string, isShort: boolean) => {
    const success = await shareService.copyToClipboard(text);
    if (success) {
      if (isShort) {
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2500);
      } else {
        setCopiedIntro(true);
        setTimeout(() => setCopiedIntro(false), 2500);
      }
    }
  };

  const handleNativeShare = async () => {
    const res = await shareService.share({
      title: 'Birthday Green — My Green Day',
      text: shortAnnouncement,
      url: websiteUrl,
    });

    if (res.status === 'shared') {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    } else if (res.status === 'unsupported' || res.status === 'failed') {
      handleCopy(shortAnnouncement, true);
    }
  };

  return (
    <section className="py-18 sm:py-26 surface-base relative border-b border-[#DDE9D8]/80">
      <Container>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeading
              eyebrow="Ready to Share"
              title="Spread the Green Day Idea"
              description="Pre-crafted text and visual explanations you can copy into community message boards, student circulars, or family groups."
            />
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shareable Text Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Full Coordinator Introduction */}
            <ScrollReveal delayMs={100}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDE9D8] flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D38] flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#6F9F73]" />
                    <span>General Community Introduction</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#7A8E80] bg-[#F7F3E8] px-2.5 py-0.5 rounded-full border border-[#DDE9D8]">
                    For newsletters & circulars
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8]/80 text-xs sm:text-sm text-[#1C2821] font-mono leading-relaxed whitespace-pre-wrap select-all">
                  {longIntroduction}
                </div>

                <div className="pt-1 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-[11px] text-[#7A8E80]">
                    Click to select or use the copy button
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopy(longIntroduction, false)}
                    icon={copiedIntro ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copiedIntro ? 'Copied to Clipboard!' : 'Copy Introduction'}
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Short Message for WhatsApp & Group Chats */}
            <ScrollReveal delayMs={200}>
              <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDE9D8] flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F4D38] flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-[#6F9F73]" />
                    <span>Quick Group Message</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#7A8E80] bg-[#F7F3E8] px-2.5 py-0.5 rounded-full border border-[#DDE9D8]">
                    For WhatsApp & messaging apps
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8]/80 text-xs sm:text-sm text-[#1C2821] font-mono leading-relaxed whitespace-pre-wrap select-all">
                  {shortAnnouncement}
                </div>

                <div className="pt-1 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-[11px] text-[#7A8E80]">
                    Neutral, privacy-first, zero spam
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(shortAnnouncement, true)}
                      icon={copiedShort ? <Check className="w-3.5 h-3.5 text-[#6F9F73]" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedShort ? 'Copied!' : 'Copy Message'}
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNativeShare}
                      icon={<Share2 className="w-3.5 h-3.5" />}
                    >
                      {shareSuccess ? 'Shared!' : 'Share'}
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Shareable Visual Card (4 cols) */}
          <div className="lg:col-span-4">
            <ScrollReveal delayMs={150}>
              <div className="surface-glass rounded-3xl p-6 sm:p-7 border border-white/90 shadow-md text-center space-y-5 sticky top-24">
                <div className="w-10 h-10 rounded-xl bg-[#DDE9D8] text-[#1F4D38] flex items-center justify-center mx-auto">
                  <Sprout className="w-5 h-5 text-[#1F4D38]" />
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#6F9F73] uppercase block mb-1">
                    EXPLAINER CARD
                  </span>
                  <h4 className="font-display font-black text-lg text-[#1F4D38]">
                    WHAT IS A GREEN DAY?
                  </h4>
                  <p className="text-xs text-[#7A8E80] mt-1">
                    Your birth-date number becomes your recurring monthly Green Day.
                  </p>
                </div>

                {/* Vertical Visual Flow */}
                <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] space-y-2 text-xs font-bold text-[#1F4D38]">
                  <div className="p-2 rounded-xl bg-[#EEF5EC] border border-[#6F9F73]/50">
                    Born on 16th
                  </div>
                  <span className="text-[#6F9F73] text-xs">↓</span>
                  <div className="p-2 rounded-xl bg-[#EEF5EC] border border-[#6F9F73]/50">
                    Every 16th
                  </div>
                  <span className="text-[#6F9F73] text-xs">↓</span>
                  <div className="p-2 rounded-xl surface-active shadow-2xs">
                    Plant → Nurture → Return
                  </div>
                </div>

                <p className="text-[11px] text-[#7A8E80] leading-relaxed">
                  Notice: Only the day number is used. Full birth date, month, and year are never collected.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
