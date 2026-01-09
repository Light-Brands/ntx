import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { DiagramViewerModal } from './DiagramViewerModal';

// Initialize mermaid with Onyx dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    // Background colors
    primaryColor: '#0A4651',
    primaryBorderColor: '#97D9C4',
    primaryTextColor: '#ffffff',
    secondaryColor: '#083B4A',
    secondaryBorderColor: '#6BC7A8',
    secondaryTextColor: '#ffffff',
    tertiaryColor: '#052A31',
    tertiaryBorderColor: '#97D9C4',
    tertiaryTextColor: '#ffffff',
    
    // Base colors
    background: '#04282F',
    mainBkg: '#083B4A',
    textColor: '#ffffff',
    lineColor: '#97D9C4',
    
    // Node colors
    nodeBorder: '#97D9C4',
    nodeTextColor: '#ffffff',
    
    // Flowchart specific
    clusterBkg: '#052A31',
    clusterBorder: '#6BC7A8',
    
    // Sequence diagram
    actorBkg: '#083B4A',
    actorBorder: '#97D9C4',
    actorTextColor: '#ffffff',
    actorLineColor: '#6BC7A8',
    signalColor: '#97D9C4',
    signalTextColor: '#ffffff',
    
    // Labels
    labelColor: '#ffffff',
    labelTextColor: '#04282F',
    labelBoxBkgColor: '#97D9C4',
    labelBoxBorderColor: '#6BC7A8',
    
    // Notes
    noteBkgColor: '#0A4651',
    noteTextColor: '#ffffff',
    noteBorderColor: '#6BC7A8',
    
    // State diagram
    labelBackgroundColor: '#083B4A',
    
    // Class diagram
    classText: '#ffffff',
    
    // Git graph
    git0: '#97D9C4',
    git1: '#6BC7A8',
    git2: '#fbbf24',
    git3: '#f87171',
    gitBranchLabel0: '#04282F',
    gitBranchLabel1: '#04282F',
    gitBranchLabel2: '#04282F',
    gitBranchLabel3: '#ffffff',
    
    // Pie chart
    pie1: '#97D9C4',
    pie2: '#6BC7A8',
    pie3: '#fbbf24',
    pie4: '#f87171',
    pie5: '#a78bfa',
    pie6: '#38bdf8',
    pieStrokeColor: '#04282F',
    pieLegendTextColor: '#ffffff',
    pieSectionTextColor: '#04282F',
    
    // Font
    fontFamily: 'Ubuntu, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    htmlLabels: true,
  },
  sequence: {
    actorMargin: 80,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
  },
});

interface MermaidBlockProps {
  chart: string;
  title?: string;
}

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ chart, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart.trim()) {
        setError('Empty diagram content');
        setIsRendering(false);
        return;
      }

      try {
        setIsRendering(true);
        setError(null);
        
        // Generate unique ID for this diagram
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      } finally {
        setIsRendering(false);
      }
    };

    renderDiagram();
  }, [chart]);

  // Handle keyboard shortcuts when focused
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(true);
    }
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  if (isRendering) {
    return (
      <div className="flex items-center justify-center py-12 bg-abyss-depths/50 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3 text-moonlight/60">
          <div className="w-5 h-5 rounded-full border-2 border-aqua-light border-t-transparent animate-spin" />
          <span className="text-sm">Rendering diagram...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-red-400 font-medium text-sm mb-2">Failed to render diagram</p>
            <p className="text-red-300/70 text-xs mb-4">{error}</p>
            <details className="group">
              <summary className="text-moonlight/50 text-xs cursor-pointer hover:text-moonlight/70 transition-colors">
                View source code
              </summary>
              <pre className="mt-3 p-4 bg-abyss-base rounded-xl text-xs text-moonlight/60 overflow-x-auto">
                <code>{chart}</code>
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Interactive diagram container */}
      <div 
        ref={containerRef}
        role="button"
        tabIndex={0}
        onClick={handleExpand}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          mermaid-diagram relative group
          bg-abyss-depths/30 rounded-2xl p-6 
          border transition-all duration-300 cursor-zoom-in
          overflow-x-auto
          ${isHovered 
            ? 'border-aqua-light/40 shadow-[0_0_30px_rgba(151,217,196,0.1)]' 
            : 'border-white/5'
          }
        `}
        aria-label={title ? `Diagram: ${title}. Click to expand` : 'Click to expand diagram'}
      >
        {/* Diagram SVG */}
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        
        {/* Expand overlay - shows on hover */}
        <div 
          className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-t from-abyss-base/80 via-transparent to-transparent
            flex items-end justify-center pb-4
            transition-opacity duration-300
            pointer-events-none
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-abyss-mystic/90 backdrop-blur-sm rounded-full border border-white/10 shadow-lg">
            <svg className="w-4 h-4 text-aqua-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-sm font-medium text-moonlight/90">Click to expand</span>
          </div>
        </div>
        
        {/* Expand icon in corner */}
        <div 
          className={`
            absolute top-3 right-3
            p-2 rounded-lg
            bg-abyss-mystic/80 backdrop-blur-sm
            border border-white/10
            transition-all duration-300
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          <svg className="w-4 h-4 text-aqua-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>

      {/* Fullscreen modal viewer */}
      <DiagramViewerModal
        isOpen={isExpanded}
        onClose={handleClose}
        svg={svg}
        title={title}
      />
    </>
  );
};

export default MermaidBlock;
