import { getOrdinalSuffix } from '../utils/greenDay';

export type ShareContentType =
  | 'GREEN_DAY_DISCOVERED'
  | 'GREEN_DAY_EXPLAINER'
  | 'PLANTED'
  | 'NURTURE'
  | 'COMMUNITY'
  | 'FIND_YOURS';

export interface ShareContentParams {
  dayNumber?: number;
  plantTypeLabel?: string;
  customNote?: string;
}

export interface ShareDataPayload {
  title: string;
  text: string;
  url: string;
}

export const shareService = {
  /**
   * Determine clean public destination URL without tracking tokens or referral parameters.
   */
  getBaseUrl(): string {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://birthdaygreen.org';
  },

  /**
   * Generates clean, human-authored share copy based on standard content models.
   * Strips out any full DOB or private identifiers.
   */
  generateShareData(type: ShareContentType, params: ShareContentParams = {}): ShareDataPayload {
    const baseUrl = this.getBaseUrl();
    const dayStr = params.dayNumber ? getOrdinalSuffix(params.dayNumber) : '16th';
    const cleanNote = params.customNote ? params.customNote.trim().slice(0, 120) : '';

    let title = 'Birthday Green 🌱';
    let text = '';
    let url = baseUrl;

    switch (type) {
      case 'GREEN_DAY_DISCOVERED': {
        title = `My Green Day is the ${dayStr} of every month 🌱`;
        const core = `My Green Day is the ${dayStr} of every month. 🌱\n\nBirthday Green turns your birth date into a recurring monthly opportunity to plant, nurture, and return.`;
        text = cleanNote ? `${cleanNote}\n\n${core}` : core;
        url = baseUrl;
        break;
      }

      case 'PLANTED': {
        title = 'I planted on my Green Day 🌱';
        const core = `I planted on my Green Day. 🌱\n\nBirthday Green turns your birth date into a monthly Green Day — a day to plant, nurture, and return. Find yours:`;
        text = cleanNote ? `${cleanNote}\n\n${core}` : core;
        url = baseUrl;
        break;
      }

      case 'NURTURE': {
        title = 'Plant. Nurture. Repeat. 🌱';
        const core = `Planting is the beginning. Nurturing is the responsibility. 🌱\n\nBirthday Green gives personal birth dates a recurring monthly environmental purpose.`;
        text = cleanNote ? `${cleanNote}\n\n${core}` : core;
        url = baseUrl;
        break;
      }

      case 'COMMUNITY': {
        title = 'Bring Birthday Green to Your Community 🌱';
        const core = `Bring Birthday Green to your community. A school, college, housing society, or NGO can turn individual birthdays into recurring monthly Green Days. Explore the self-serve starter kit:`;
        text = cleanNote ? `${cleanNote}\n\n${core}` : core;
        url = `${baseUrl}/community-kit`;
        break;
      }

      case 'FIND_YOURS':
      case 'GREEN_DAY_EXPLAINER':
      default: {
        title = 'Birthday Green — Your Green Day 🌱';
        const core = `Your birthday gave you a date. Give that date a purpose.\n\nFind your recurring monthly Green Day to plant, nurture, and return:`;
        text = cleanNote ? `${cleanNote}\n\n${core}` : core;
        url = baseUrl;
        break;
      }
    }

    return { title, text, url };
  },

  /**
   * Check if native sharing is available in the current browser context.
   */
  canNativeShare(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  },

  /**
   * Execute native Web Share API with proper cancellation detection.
   */
  async share(payload: ShareDataPayload): Promise<{ status: 'shared' | 'cancelled' | 'unsupported' | 'failed' }> {
    if (!this.canNativeShare()) {
      return { status: 'unsupported' };
    }

    try {
      await navigator.share({
        title: payload.title,
        text: `${payload.text}\n${payload.url}`,
        url: payload.url,
      });
      return { status: 'shared' };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { status: 'cancelled' };
      }
      return { status: 'failed' };
    }
  },

  /**
   * Copy message to clipboard with safe fallback for all browser contexts.
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Proceed to fallback
    }

    try {
      if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        textArea.remove();
        return successful;
      }
    } catch (fallbackErr) {
      console.error('Clipboard fallback failed:', fallbackErr);
    }

    return false;
  },
};
