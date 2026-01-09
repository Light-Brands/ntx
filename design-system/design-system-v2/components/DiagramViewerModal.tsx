import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent, useControls, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface DiagramViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  svg: string;
  title?: string;
}

// Zoom control buttons component with keyboard shortcuts
const ZoomControls: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { zoomIn, zoomOut, resetTransform, centerView } = useControls();
  
  // Handle keyboard shortcuts for zoom controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          zoomIn(0.5);
          break;
        case '-':
        case '_':
          e.preventDefault();
          zoomOut(0.5);
          break;
        case '0':
          e.preventDefault();
          resetTransform();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          centerView(1);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetTransform, centerView, onClose]);

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
      {/* Zoom controls group */}
      <div className="flex items-center gap-1 bg-abyss-mystic/90 backdrop-blur-md rounded-xl border border-white/10 p-1 shadow-xl">
        <button
          onClick={() => zoomOut(0.5)}
          className="p-2.5 hover:bg-white/10 text-moonlight/70 hover:text-moonlight rounded-lg transition-all group"
          title="Zoom Out (-)"
          aria-label="Zoom out"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <div className="w-px h-6 bg-white/10" />
        
        <button
          onClick={() => zoomIn(0.5)}
          className="p-2.5 hover:bg-white/10 text-moonlight/70 hover:text-moonlight rounded-lg transition-all group"
          title="Zoom In (+)"
          aria-label="Zoom in"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        <div className="w-px h-6 bg-white/10" />
        
        <button
          onClick={() => resetTransform()}
          className="p-2.5 hover:bg-white/10 text-moonlight/70 hover:text-moonlight rounded-lg transition-all group"
          title="Reset View (0)"
          aria-label="Reset view"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        <div className="w-px h-6 bg-white/10" />
        
        <button
          onClick={() => centerView(1)}
          className="p-2.5 hover:bg-white/10 text-moonlight/70 hover:text-moonlight rounded-lg transition-all group"
          title="Fit to View (F)"
          aria-label="Fit to view"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="p-2.5 bg-abyss-mystic/90 backdrop-blur-md hover:bg-red-500/20 text-moonlight/70 hover:text-red-400 rounded-xl border border-white/10 hover:border-red-500/30 transition-all shadow-xl"
        title="Close (Esc)"
        aria-label="Close viewer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Help tooltip showing controls
const HelpTooltip: React.FC = () => (
  <div className="absolute bottom-4 left-4 z-10">
    <div className="bg-abyss-mystic/80 backdrop-blur-md rounded-xl border border-white/10 px-4 py-3 shadow-xl">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-moonlight/50">
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">Scroll</kbd> Zoom</span>
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">Drag</kbd> Pan</span>
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">+/-</kbd> Zoom</span>
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">0</kbd> Reset</span>
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">F</kbd> Fit</span>
        <span><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-moonlight/70">Esc</kbd> Close</span>
      </div>
    </div>
  </div>
);


export const DiagramViewerModal: React.FC<DiagramViewerModalProps> = ({ 
  isOpen, 
  onClose, 
  svg,
  title 
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Set initial view to fit width on mount
  useEffect(() => {
    if (isOpen && transformComponentRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        transformComponentRef.current?.centerView(1.2, 100);
      }, 50);
    }
  }, [isOpen, svg]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-abyss-base/95 backdrop-blur-xl animate-in fade-in duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div className="relative w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* Header with title */}
        {title && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-abyss-mystic/90 backdrop-blur-md rounded-xl border border-white/10 px-4 py-2 shadow-xl">
              <h2 className="text-sm font-semibold text-moonlight/80">{title}</h2>
            </div>
          </div>
        )}
        
        {/* Diagram viewer with zoom/pan */}
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          minScale={0.1}
          maxScale={50}
          centerOnInit={true}
          limitToBounds={false}
          wheel={{
            step: 0.2,
          }}
          panning={{
            velocityDisabled: false,
          }}
          doubleClick={{
            mode: 'reset',
          }}
          alignmentAnimation={{
            sizeX: 0,
            sizeY: 0,
          }}
        >
          <ZoomControls onClose={onClose} />
          <HelpTooltip />
          
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div 
              className="diagram-viewer-content p-8"
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>,
    document.body
  );
};

export default DiagramViewerModal;

