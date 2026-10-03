import { useState, useEffect } from 'react';
import { impactRepository } from '../../services/impactRepository';
import { PlantingActivity } from '../../types';
import { Sprout, Clock, CheckCircle2 } from '../common/Icons';

interface MyGreenDaysHistoryProps {
  lastUpdated?: number;
}

export function MyGreenDaysHistory({ lastUpdated }: MyGreenDaysHistoryProps) {
  const [history, setHistory] = useState<PlantingActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    impactRepository.getMyParticipationHistory().then((data) => {
      if (isMounted) {
        setHistory(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [lastUpdated]);

  if (isLoading || history.length === 0) {
    return null;
  }

  const now = Date.now();

  return (
    <div className="surface-elevated rounded-3xl p-6 sm:p-8 border border-[#DDE9D8] shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DDE9D8]">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#1F4D38]" />
          <h3 className="font-display font-bold text-lg text-[#1F4D38]">
            My Green Days
          </h3>
        </div>
        <span className="text-xs text-[#7A8E80]">
          Private to this device
        </span>
      </div>

      <div className="divide-y divide-[#DDE9D8]/60">
        {history.map((act) => {
          const isEligible = now >= act.eligibleAt;
          const plantingDateObj = new Date(act.plantingDate);
          const dateLabel = plantingDateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          return (
            <div key={act.activityId} className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-bold text-[#1F4D38] block">
                  {dateLabel}
                </span>
                <span className="text-xs text-[#4D6153]">
                  {act.saplingCount} {act.saplingCount === 1 ? 'sapling' : 'saplings'} · {act.actionType}
                </span>
              </div>

              <div className="text-right shrink-0">
                {isEligible ? (
                  <span className="text-[11px] font-semibold text-[#1F4D38] bg-[#DDE9D8]/60 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#6F9F73]" />
                    In Public Impact
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#7A8E80] bg-[#F7F3E8] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#7A8E80]" />
                    24h Hold Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
