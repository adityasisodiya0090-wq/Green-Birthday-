import { ReactNode, useEffect, useRef } from 'react';
import { X } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C2821]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Surface with Mobile-First Safe Constraints */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col bg-[#FFFDF7] rounded-2xl sm:rounded-3xl border border-[#DDE9D8] shadow-xl overflow-hidden transition-all duration-200 z-10 my-auto`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-2 shrink-0">
          {title ? (
            <h3 id="modal-title" className="text-lg sm:text-xl font-display font-bold text-[#1F4D38]">
              {title}
            </h3>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-[#4D6153] hover:text-[#1F4D38] hover:bg-[#DDE9D8]/50 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4D38] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 overflow-y-auto overscroll-contain flex-1">{children}</div>
      </div>
    </div>
  );
}
