import React, { useState, useRef, useEffect } from 'react';
import { useTheme, colorPalettes, fontThemes } from '../contexts/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { colorPalette, headingFont, bodyFont, setColorPalette, setHeadingFont, setBodyFont } = useTheme();
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isHeadingFontOpen, setIsHeadingFontOpen] = useState(false);
  const [isBodyFontOpen, setIsBodyFontOpen] = useState(false);
  
  const colorRef = useRef<HTMLDivElement>(null);
  const headingFontRef = useRef<HTMLDivElement>(null);
  const bodyFontRef = useRef<HTMLDivElement>(null);

  // Preload all Google Fonts for preview in dropdown
  useEffect(() => {
    const preloadedFonts = new Set<string>();
    
    fontThemes.forEach(font => {
      if (font.googleFontsUrl && !preloadedFonts.has(font.id)) {
        const link = document.createElement('link');
        link.id = `font-preview-${font.id}`;
        link.rel = 'stylesheet';
        link.href = font.googleFontsUrl;
        document.head.appendChild(link);
        preloadedFonts.add(font.id);
      }
    });
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setIsColorOpen(false);
      }
      if (headingFontRef.current && !headingFontRef.current.contains(event.target as Node)) {
        setIsHeadingFontOpen(false);
      }
      if (bodyFontRef.current && !bodyFontRef.current.contains(event.target as Node)) {
        setIsBodyFontOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-wrap gap-2 max-w-[600px] justify-end">
      {/* Color Palette Selector */}
      <div className="relative" ref={colorRef}>
        <button
          onClick={() => {
            setIsColorOpen(!isColorOpen);
            setIsHeadingFontOpen(false);
            setIsBodyFontOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-abyss-mystic/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-aqua-light/30 transition-all duration-300 shadow-lg hover:shadow-aqua-light/10"
        >
          <div className="flex gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colorPalette.colors['aqua-light'] }}
            />
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colorPalette.colors['teal-light'] }}
            />
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colorPalette.colors['gold-accent'] }}
            />
          </div>
          <span className="text-xs font-bold text-moonlight uppercase tracking-wider">
            {colorPalette.name}
          </span>
          <svg
            className={`w-4 h-4 text-moonlight-muted transition-transform duration-200 ${isColorOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isColorOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-abyss-mystic/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-2 border-b border-white/5">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-3 py-2 text-left">
                Color Palette
              </p>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => {
                    setColorPalette(palette.id);
                    setIsColorOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                    palette.id === colorPalette.id
                      ? 'bg-aqua-light/10 border border-aqua-light/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex gap-1 flex-shrink-0">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20" 
                      style={{ backgroundColor: palette.colors['aqua-light'] }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20" 
                      style={{ backgroundColor: palette.colors['teal-light'] }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20" 
                      style={{ backgroundColor: palette.colors['gold-accent'] }}
                    />
                  </div>
                  <span className={`text-sm font-semibold flex-1 text-left ${
                    palette.id === colorPalette.id ? 'text-aqua-light' : 'text-moonlight'
                  }`}>
                    {palette.name}
                  </span>
                  {palette.id === colorPalette.id && (
                    <svg 
                      className="w-4 h-4 flex-shrink-0 text-aqua-light" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Heading Font Selector */}
      <div className="relative" ref={headingFontRef}>
        <button
          onClick={() => {
            setIsHeadingFontOpen(!isHeadingFontOpen);
            setIsColorOpen(false);
            setIsBodyFontOpen(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-abyss-mystic/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-aqua-light/30 transition-all duration-300 shadow-lg hover:shadow-aqua-light/10"
        >
          <svg 
            className="w-3.5 h-3.5 text-aqua-light" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
            />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-wider leading-none">Heading</span>
            <span className="text-[10px] font-bold text-moonlight leading-tight">{headingFont.name.split('(')[0].trim()}</span>
          </div>
          <svg
            className={`w-3 h-3 text-moonlight-muted transition-transform duration-200 ${isHeadingFontOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isHeadingFontOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-abyss-mystic/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-2 border-b border-white/5">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-3 py-2 text-left">
                Heading Font (Display & H1-H5)
              </p>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {fontThemes.map((font) => (
                <button
                  key={font.id}
                  onClick={() => {
                    setHeadingFont(font.id);
                    setIsHeadingFontOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                    font.id === headingFont.id
                      ? 'bg-aqua-light/10 border border-aqua-light/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex-1 flex flex-col items-start">
                    <span 
                      className={`text-sm font-bold text-left ${
                        font.id === headingFont.id ? 'text-aqua-light' : 'text-moonlight'
                      }`}
                      style={{ 
                        fontFamily: `"${font.fonts.heading}", -apple-system, BlinkMacSystemFont, sans-serif`,
                      }}
                    >
                      {font.name}
                    </span>
                    <span 
                      className="text-xs text-moonlight-muted mt-0.5 font-bold text-left"
                      style={{ 
                        fontFamily: `"${font.fonts.heading}", -apple-system, BlinkMacSystemFont, sans-serif`,
                      }}
                    >
                      The Quick Brown Fox
                    </span>
                  </div>
                  {font.id === headingFont.id && (
                    <svg 
                      className="w-4 h-4 flex-shrink-0 text-aqua-light" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Body Font Selector */}
      <div className="relative" ref={bodyFontRef}>
        <button
          onClick={() => {
            setIsBodyFontOpen(!isBodyFontOpen);
            setIsColorOpen(false);
            setIsHeadingFontOpen(false);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-abyss-mystic/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-aqua-light/30 transition-all duration-300 shadow-lg hover:shadow-aqua-light/10"
        >
          <svg 
            className="w-3.5 h-3.5 text-teal-light" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[8px] font-black text-white/30 uppercase tracking-wider leading-none">Body</span>
            <span className="text-[10px] font-bold text-moonlight leading-tight">{bodyFont.name.split('(')[0].trim()}</span>
          </div>
          <svg
            className={`w-3 h-3 text-moonlight-muted transition-transform duration-200 ${isBodyFontOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isBodyFontOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-abyss-mystic/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-2 border-b border-white/5">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] px-3 py-2 text-left">
                Body Font (Paragraphs & UI)
              </p>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {fontThemes.map((font) => (
                <button
                  key={font.id}
                  onClick={() => {
                    setBodyFont(font.id);
                    setIsBodyFontOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                    font.id === bodyFont.id
                      ? 'bg-aqua-light/10 border border-aqua-light/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex-1 flex flex-col items-start">
                    <span 
                      className={`text-sm font-semibold text-left ${
                        font.id === bodyFont.id ? 'text-aqua-light' : 'text-moonlight'
                      }`}
                      style={{ 
                        fontFamily: `"${font.fonts.body}", -apple-system, BlinkMacSystemFont, sans-serif`,
                      }}
                    >
                      {font.name}
                    </span>
                    <span 
                      className="text-xs text-moonlight-muted mt-0.5 text-left"
                      style={{ 
                        fontFamily: `"${font.fonts.body}", -apple-system, BlinkMacSystemFont, sans-serif`,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </div>
                  {font.id === bodyFont.id && (
                    <svg 
                      className="w-4 h-4 flex-shrink-0 text-aqua-light" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

