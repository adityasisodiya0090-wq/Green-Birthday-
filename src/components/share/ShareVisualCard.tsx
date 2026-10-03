import { useState, useRef } from 'react';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Button } from '../common/Button';
import { Download, Check, Sparkles, Sprout, AlertCircle } from '../common/Icons';

interface ShareVisualCardProps {
  dayNumber: number;
  className?: string;
}

export function ShareVisualCard({ dayNumber, className = '' }: ShareVisualCardProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const cardElementRef = useRef<HTMLDivElement>(null);

  const ordinalDay = getOrdinalSuffix(dayNumber);

  /**
   * Client-side HTML5 Canvas rendering for saving as PNG.
   * Zero external dependencies, ₹0 cost, runs purely in-browser.
   */
  const handleSaveCard = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      // Create off-screen canvas at high DPR for crisp rendering
      const width = 800;
      const height = 800;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context unavailable');
      }

      // 1. Forest Green Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#153929');
      gradient.addColorStop(0.5, '#1F4D38');
      gradient.addColorStop(1, '#0F291E');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Organic Rings
      ctx.strokeStyle = 'rgba(111, 159, 115, 0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width * 0.85, height * 0.15, 240, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width * 0.15, height * 0.85, 260, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Card Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // 3. Header: BIRTHDAY GREEN
      ctx.textAlign = 'center';
      ctx.fillStyle = '#8EB892';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillText('🌱 BIRTHDAY GREEN', width / 2, 130);

      // 4. Subtitle: MY GREEN DAY
      ctx.fillStyle = '#DDE9D8';
      ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
      ctx.fillText('MY GREEN DAY', width / 2, 210);

      // 5. Giant Ordinal Day Number
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 130px system-ui, -apple-system, sans-serif';
      ctx.fillText(ordinalDay, width / 2, 370);

      // 6. Cadence: EVERY MONTH
      ctx.fillStyle = '#8EB892';
      ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
      ctx.fillText('EVERY MONTH', width / 2, 450);

      // 7. Core Motto Divider
      ctx.strokeStyle = 'rgba(221, 233, 216, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width * 0.25, 500);
      ctx.lineTo(width * 0.75, 500);
      ctx.stroke();

      // 8. Action Loop: PLANT • NURTURE • RETURN
      ctx.fillStyle = '#FFFDF7';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.fillText('PLANT  •  NURTURE  •  RETURN', width / 2, 570);

      // 9. Philosophy Tagline
      ctx.fillStyle = '#DDE9D8';
      ctx.font = 'italic 20px system-ui, -apple-system, sans-serif';
      ctx.fillText('«Your birthday gave you a date. Give that date a purpose.»', width / 2, 650);

      // 10. Footer URL
      ctx.fillStyle = '#8EB892';
      ctx.font = 'normal 18px monospace';
      ctx.fillText('birthdaygreen.org', width / 2, 720);

      // 11. Trigger Browser Download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = dataUrl;
      downloadAnchor.download = `birthday-green-day-${dayNumber}.png`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save card error:', err);
      setSaveError(
        "Your browser couldn't save the card automatically. You can take a screenshot instead."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Visual Presentation Card */}
      <div
        ref={cardElementRef}
        className="w-full aspect-square max-w-[340px] mx-auto rounded-3xl surface-glass-forest p-6 sm:p-8 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-xl border border-white/25 select-none"
      >
        {/* Subtle decorative concentric rings */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full border border-white/15"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full border border-white/15"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full pt-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8EB892] flex items-center justify-center gap-1.5">
            <Sprout className="w-3.5 h-3.5" />
            <span>BIRTHDAY GREEN</span>
          </span>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#DDE9D8] mt-1">
            MY GREEN DAY
          </h4>
        </div>

        <div className="relative z-10 py-2">
          <span className="font-display font-black text-6xl sm:text-7xl text-white tracking-tight block leading-none">
            {ordinalDay}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8EB892] mt-2 block">
            EVERY MONTH
          </span>
        </div>

        <div className="relative z-10 w-full pb-1 space-y-1.5">
          <div className="h-px bg-white/20 w-3/4 mx-auto mb-2" />
          <p className="text-[11px] font-bold text-[#FFFDF7] tracking-wider uppercase">
            PLANT • NURTURE • RETURN
          </p>
          <p className="text-[9px] text-[#8EB892] font-mono">
            birthdaygreen.org
          </p>
        </div>
      </div>

      {/* Save Button & Feedback */}
      <div className="text-center space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveCard}
          isLoading={isSaving}
          icon={saveSuccess ? <Check className="w-3.5 h-3.5 text-[#6F9F73]" /> : <Download className="w-3.5 h-3.5" />}
          className="bg-white/80 hover:bg-white text-xs"
        >
          {saveSuccess ? 'Card Saved! 🌱' : 'Save Card as Image'}
        </Button>

        {saveError && (
          <p className="text-[11px] text-[#B87070] flex items-center justify-center gap-1 max-w-xs mx-auto">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{saveError}</span>
          </p>
        )}
      </div>
    </div>
  );
}
