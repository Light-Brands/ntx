
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-abyss-base/90 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Content */}
      <div className="relative bg-abyss-depths border border-abyss-light rounded-[2.5rem] w-full max-w-lg shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 flex items-center justify-between border-b border-abyss-light bg-abyss-mystic/50">
          <h2 className="text-xl font-black text-moonlight uppercase tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2.5 hover:bg-abyss-light text-muted hover:text-moonlight rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-10 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {footer && (
          <div className="px-8 py-6 border-t border-abyss-light flex justify-end gap-4 bg-abyss-mystic/30">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
