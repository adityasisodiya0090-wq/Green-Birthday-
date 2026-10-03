import { useRouter } from '../../context/RouterContext';
import { Modal } from '../common/Modal';
import { GreenDayCalculator } from './GreenDayCalculator';

export function GreenDayModal() {
  const { isCalculatorOpen, closeCalculator, activeCalculatorDay } = useRouter();

  return (
    <Modal
      isOpen={isCalculatorOpen}
      onClose={closeCalculator}
      title="Find Your Green Day"
      size="lg"
    >
      <div className="py-2">
        <GreenDayCalculator
          initialDay={activeCalculatorDay}
          onReadyToGrow={closeCalculator}
          isModalView={true}
        />
      </div>
    </Modal>
  );
}
