import { useState } from 'react';
import { useGreenDay } from '../../context/GreenDayContext';
import { getOrdinalSuffix } from '../../utils/greenDay';
import { Bell, Calendar, Check, AlertCircle, Sparkles, ShieldCheck } from './Icons';

interface GreenDayReminderProps {
  className?: string;
}

export function GreenDayReminder({ className = '' }: GreenDayReminderProps) {
  const {
    savedDay,
    reminderEnabled,
    reminderPermission,
    requestNotificationReminder,
    disableReminder,
    downloadCalendarEvent,
  } = useGreenDay();

  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!savedDay) return null;

  const ordinal = getOrdinalSuffix(savedDay);

  const handleToggleNotification = async () => {
    if (reminderEnabled) {
      disableReminder();
      return;
    }

    setIsLoading(true);
    await requestNotificationReminder();
    setIsLoading(false);
  };

  const handleCalendarDownload = () => {
    downloadCalendarEvent();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className={`surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs ${className}`}>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6F9F73] flex items-center gap-1.5 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Monthly Checkpoint Reminders</span>
          </span>
          <h4 className="font-display font-bold text-lg sm:text-xl text-[#1F4D38]">
            Never miss your Green Day
          </h4>
          <p className="text-xs sm:text-sm text-[#4D6153] mt-1 max-w-lg leading-relaxed">
            Choose how you'd like to be reminded each month on the {ordinal}. Both options are completely free, private, and store zero personal data.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1F4D38] bg-[#DDE9D8]/60 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Device-Only · ₹0 Cost</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Native Calendar (.ics recurring event) */}
        <div className="surface-canvas rounded-2xl p-5 border border-[#DDE9D8] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#1F4D38]" />
              <h5 className="font-display font-bold text-sm text-[#1F4D38]">
                Native Device Calendar
              </h5>
            </div>
            <p className="text-xs text-[#7A8E80] leading-relaxed">
              Downloads a recurring monthly calendar event (.ics). Works with Apple Calendar, Google Calendar, Android, and Outlook without accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCalendarDownload}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              downloadSuccess
                ? 'bg-[#EEF5EC] text-[#1F4D38] border border-[#8EB892]'
                : 'bg-[#FFFDF7] text-[#1F4D38] border border-[#DDE9D8] hover:border-[#6F9F73] hover:shadow-2xs'
            }`}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#6F9F73]" />
                <span>Added to Downloads!</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 text-[#6F9F73]" />
                <span>Add to My Calendar (.ics)</span>
              </>
            )}
          </button>
        </div>

        {/* Option 2: Browser Notification */}
        <div className="surface-canvas rounded-2xl p-5 border border-[#DDE9D8] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-[#1F4D38]" />
              <h5 className="font-display font-bold text-sm text-[#1F4D38]">
                Browser Notification
              </h5>
            </div>
            <p className="text-xs text-[#7A8E80] leading-relaxed">
              {reminderPermission === 'unsupported'
                ? "Notifications aren't available in this browser. You can still add your Green Day to your calendar."
                : reminderPermission === 'denied'
                ? "Notifications aren't available in this browser. You can still add your Green Day to your calendar."
                : 'Receive a gentle browser alert when your Green Day arrives. No email or phone number needed.'}
            </p>
          </div>

          {reminderPermission !== 'unsupported' && reminderPermission !== 'denied' && (
            <button
              type="button"
              onClick={handleToggleNotification}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                reminderEnabled
                  ? 'bg-[#1F4D38] text-white hover:bg-[#153929]'
                  : 'bg-[#FFFDF7] text-[#1F4D38] border border-[#DDE9D8] hover:border-[#6F9F73]'
              }`}
            >
              {isLoading ? (
                <span>Requesting permission...</span>
              ) : reminderEnabled ? (
                <>
                  <Check className="w-4 h-4 text-[#8EB892]" />
                  <span>Reminder Enabled (Tap to turn off)</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 text-[#6F9F73]" />
                  <span>Enable Browser Notification</span>
                </>
              )}
            </button>
          )}

          {(reminderPermission === 'unsupported' || reminderPermission === 'denied') && (
            <div className="text-[11px] text-[#7A8E80] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-[#6F9F73] shrink-0" />
              <span>Calendar download is recommended for your browser.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
