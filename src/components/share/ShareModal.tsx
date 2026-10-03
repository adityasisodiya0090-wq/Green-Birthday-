import { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { shareService, ShareContentType } from '../../services/shareService';
import { ShareVisualCard } from './ShareVisualCard';
import { Share2, Copy, Check, MessageSquare, Image, Sparkles, Send } from '../common/Icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType?: ShareContentType;
  dayNumber?: number;
  title?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  contentType = 'GREEN_DAY_DISCOVERED',
  dayNumber,
  title = 'Share Birthday Green',
}: ShareModalProps) {
  const [customNote, setCustomNote] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'card'>(dayNumber ? 'card' : 'text');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'shared' | 'cancelled'>('idle');

  // Reset transient feedback when opened
  useEffect(() => {
    if (isOpen) {
      setCopyStatus('idle');
      setShareStatus('idle');
      if (dayNumber) {
        setActiveTab('card');
      } else {
        setActiveTab('text');
      }
    }
  }, [isOpen, dayNumber]);

  const shareData = shareService.generateShareData(contentType, {
    dayNumber,
    customNote: customNote.trim(),
  });

  const fullShareText = `${shareData.text}\n${shareData.url}`;

  const handleCopy = async () => {
    const success = await shareService.copyToClipboard(fullShareText);
    if (success) {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2500);
    } else {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const handleNativeShare = async () => {
    const res = await shareService.share(shareData);
    if (res.status === 'shared') {
      setShareStatus('shared');
      setTimeout(() => setShareStatus('idle'), 2500);
    } else if (res.status === 'unsupported' || res.status === 'failed') {
      // Fallback directly to clipboard
      await handleCopy();
    }
  };

  const canShare = shareService.canNativeShare();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-6 pt-1">
        {/* Tab Switcher if Visual Card is applicable */}
        {dayNumber && (
          <div className="flex items-center justify-center p-1 rounded-2xl bg-[#DDE9D8]/50 border border-[#DDE9D8] max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-[#1F4D38] text-white shadow-xs'
                  : 'text-[#4D6153] hover:text-[#1F4D38]'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Visual Card</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#1F4D38] text-white shadow-xs'
                  : 'text-[#4D6153] hover:text-[#1F4D38]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Message</span>
            </button>
          </div>
        )}

        {/* Tab 1: Visual Card View */}
        {activeTab === 'card' && dayNumber ? (
          <div className="py-2">
            <ShareVisualCard dayNumber={dayNumber} />
          </div>
        ) : (
          /* Tab 2: Text Message Preview & Customization */
          <div className="space-y-4">
            {/* Optional Personal Note */}
            <div className="space-y-1.5">
              <label
                htmlFor="custom-share-note"
                className="block text-xs font-bold uppercase tracking-wider text-[#1F4D38]"
              >
                Add a personal thought <span className="text-[10px] text-[#7A8E80] font-normal">(Optional)</span>
              </label>
              <input
                id="custom-share-note"
                type="text"
                maxLength={120}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. I just found mine and thought you'd like this idea..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF7] border border-[#DDE9D8] text-xs text-[#1C2821] placeholder-[#7A8E80] focus:outline-none focus:ring-2 focus:ring-[#1F4D38] focus:border-transparent transition-all shadow-2xs"
              />
              <span className="text-[10px] text-[#7A8E80] block text-right">
                {customNote.length}/120
              </span>
            </div>

            {/* Message Preview Box */}
            <div className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#DDE9D8] space-y-2 text-xs text-[#1C2821] font-mono leading-relaxed select-all">
              <p className="whitespace-pre-wrap">{fullShareText}</p>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {canShare ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNativeShare}
                  fullWidth
                  icon={shareStatus === 'shared' ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
                >
                  {shareStatus === 'shared' ? 'Shared! 🌱' : 'Share Now'}
                </Button>
              ) : null}

              <Button
                variant={canShare ? 'outline' : 'primary'}
                size="md"
                onClick={handleCopy}
                fullWidth
                icon={copyStatus === 'copied' ? <Check className="w-4 h-4 text-[#6F9F73]" /> : <Copy className="w-4 h-4" />}
                className={canShare ? 'bg-white/90' : ''}
              >
                {copyStatus === 'copied' ? 'Copied. 🌱' : 'Copy Share Message'}
              </Button>
            </div>

            {copyStatus === 'failed' && (
              <p className="text-[11px] text-[#B87070] text-center">
                Clipboard copy was blocked. You can manually select and copy the text preview above.
              </p>
            )}
          </div>
        )}

        {/* Privacy Invariant Footer */}
        <div className="pt-3 border-t border-[#DDE9D8]/70 text-center text-[11px] text-[#7A8E80]">
          Zero referral tracking · No cookies or accounts · Purely voluntary
        </div>
      </div>
    </Modal>
  );
}
