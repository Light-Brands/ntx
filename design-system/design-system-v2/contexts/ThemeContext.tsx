import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================================================
// Theme Type Definitions
// ============================================================================

export interface ColorPalette {
  id: string;
  name: string;
  colors: {
    // Background scale
    'abyss-base': string;
    'abyss-mystic': string;
    'abyss-light': string;
    'abyss-lighter': string;
    
    // Text scale
    'moonlight': string;
    'moonlight-soft': string;
    'moonlight-muted': string;
    
    // Accent colors
    'aqua-light': string;
    'aqua-medium': string;
    'teal-light': string;
    'gold-accent': string;
    
    // Semantic colors
    'success': string;
    'warning': string;
    'error': string;
    'info': string;
  };
}

export interface FontTheme {
  id: string;
  name: string;
  fonts: {
    display: string;      // Hero text, big impact moments
    heading: string;      // H1-H3, section titles
    body: string;         // Paragraphs, general content
    ui: string;           // Buttons, labels, UI elements
    mono: string;         // Code, technical content
  };
  googleFontsUrl?: string;
}

// ============================================================================
// Predefined Color Palettes
// ============================================================================

export const colorPalettes: ColorPalette[] = [
  {
    id: 'onyx',
    name: 'Onyx (Default)',
    colors: {
      'abyss-base': '#0D0D0D',
      'abyss-mystic': '#121212',
      'abyss-light': '#1A1A1A',
      'abyss-lighter': '#2A2A2A',
      'moonlight': '#F5F5F5',
      'moonlight-soft': '#E0E0E0',
      'moonlight-muted': '#A0A0A0',
      'aqua-light': '#97D9C4',
      'aqua-medium': '#7BC4B1',
      'teal-light': '#5BB8B0',
      'gold-accent': '#D4AF37',
      'success': '#4CAF50',
      'warning': '#FF9800',
      'error': '#EF5350',
      'info': '#29B6F6',
    },
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    colors: {
      'abyss-base': '#04282F',
      'abyss-mystic': '#052A31',
      'abyss-light': '#083B4A',
      'abyss-lighter': '#0A4651',
      'moonlight': '#FFFFFF',
      'moonlight-soft': '#E8F4F8',
      'moonlight-muted': '#B0D4DB',
      'aqua-light': '#97D9C4',
      'aqua-medium': '#6BC7A8',
      'teal-light': '#5BB8B0',
      'gold-accent': '#FBBF24',
      'success': '#10B981',
      'warning': '#F59E0B',
      'error': '#EF4444',
      'info': '#3B82F6',
    },
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    colors: {
      'abyss-base': '#1A0B2E',
      'abyss-mystic': '#2D1B4E',
      'abyss-light': '#3F2C5F',
      'abyss-lighter': '#513D71',
      'moonlight': '#F8F7FF',
      'moonlight-soft': '#E5DEFF',
      'moonlight-muted': '#B8A9D4',
      'aqua-light': '#A78BFA',
      'aqua-medium': '#8B5CF6',
      'teal-light': '#7C3AED',
      'gold-accent': '#FBBF24',
      'success': '#34D399',
      'warning': '#FBBF24',
      'error': '#F87171',
      'info': '#60A5FA',
    },
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    colors: {
      'abyss-base': '#0F1B0F',
      'abyss-mystic': '#1A2A1A',
      'abyss-light': '#243424',
      'abyss-lighter': '#2F4030',
      'moonlight': '#F0FFF0',
      'moonlight-soft': '#D9F2D9',
      'moonlight-muted': '#A3C9A3',
      'aqua-light': '#86EFAC',
      'aqua-medium': '#4ADE80',
      'teal-light': '#22C55E',
      'gold-accent': '#FCD34D',
      'success': '#10B981',
      'warning': '#F59E0B',
      'error': '#EF4444',
      'info': '#06B6D4',
    },
  },
  {
    id: 'ruby-noir',
    name: 'Ruby Noir',
    colors: {
      'abyss-base': '#1A0A0F',
      'abyss-mystic': '#2A1520',
      'abyss-light': '#3A2030',
      'abyss-lighter': '#4A2B40',
      'moonlight': '#FFF5F7',
      'moonlight-soft': '#FFE0E6',
      'moonlight-muted': '#D4A5B3',
      'aqua-light': '#FB7185',
      'aqua-medium': '#F43F5E',
      'teal-light': '#E11D48',
      'gold-accent': '#FBBF24',
      'success': '#10B981',
      'warning': '#F59E0B',
      'error': '#DC2626',
      'info': '#06B6D4',
    },
  },
  {
    id: 'amber-dusk',
    name: 'Amber Dusk',
    colors: {
      'abyss-base': '#1F1508',
      'abyss-mystic': '#2D2010',
      'abyss-light': '#3D2C18',
      'abyss-lighter': '#4D3820',
      'moonlight': '#FFF8F0',
      'moonlight-soft': '#FFE8D1',
      'moonlight-muted': '#D4C4A8',
      'aqua-light': '#FCD34D',
      'aqua-medium': '#FBBF24',
      'teal-light': '#F59E0B',
      'gold-accent': '#F59E0B',
      'success': '#10B981',
      'warning': '#F97316',
      'error': '#EF4444',
      'info': '#06B6D4',
    },
  },
  // --- 10 More Earthy, Nature Toned Palettes Added Below ---
  {
    id: 'moss-green',
    name: 'Moss Green',
    colors: {
      'abyss-base': '#2B3A23',
      'abyss-mystic': '#3A4D2C',
      'abyss-light': '#4E6E34',
      'abyss-lighter': '#7E995B',
      'moonlight': '#F8FFF0',
      'moonlight-soft': '#DFEDC7',
      'moonlight-muted': '#AAB693',
      'aqua-light': '#ACCFCB',
      'aqua-medium': '#669967',
      'teal-light': '#6AA371',
      'gold-accent': '#D6A333',
      'success': '#54934B',
      'warning': '#B19939',
      'error': '#B03B34',
      'info': '#5BB6A8',
    },
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand',
    colors: {
      'abyss-base': '#B59E74',
      'abyss-mystic': '#D2BB92',
      'abyss-light': '#E9D4B8',
      'abyss-lighter': '#F5E7C4',
      'moonlight': '#FFFFFF',
      'moonlight-soft': '#F5EEDD',
      'moonlight-muted': '#D9C5A0',
      'aqua-light': '#EDE2BD',
      'aqua-medium': '#CBA675',
      'teal-light': '#B2946E',
      'gold-accent': '#DFB063',
      'success': '#B6A684',
      'warning': '#BA8548',
      'error': '#C96F4A',
      'info': '#A8855B',
    },
  },
  {
    id: 'clay',
    name: 'Clay',
    colors: {
      'abyss-base': '#6F4A32',
      'abyss-mystic': '#7A5740',
      'abyss-light': '#9B7355',
      'abyss-lighter': '#C4A381',
      'moonlight': '#F8F3EF',
      'moonlight-soft': '#E2D5C3',
      'moonlight-muted': '#CDB497',
      'aqua-light': '#CDAA76',
      'aqua-medium': '#D6A77A',
      'teal-light': '#B7885D',
      'gold-accent': '#D5B187',
      'success': '#918264',
      'warning': '#B58331',
      'error': '#A25124',
      'info': '#9E947A',
    },
  },
  {
    id: 'sage',
    name: 'Sage',
    colors: {
      'abyss-base': '#56593D',
      'abyss-mystic': '#6D6F4A',
      'abyss-light': '#8E9270',
      'abyss-lighter': '#B5C0A2',
      'moonlight': '#F8FFF4',
      'moonlight-soft': '#E3EFD9',
      'moonlight-muted': '#BFCAA1',
      'aqua-light': '#A9CBA7',
      'aqua-medium': '#84A98C',
      'teal-light': '#738678',
      'gold-accent': '#E6D890',
      'success': '#6A9C66',
      'warning': '#BCB95F',
      'error': '#A06A66',
      'info': '#7CB9AF',
    },
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    colors: {
      'abyss-base': '#623D36',
      'abyss-mystic': '#7E4A3C',
      'abyss-light': '#A55D3B',
      'abyss-lighter': '#E29578',
      'moonlight': '#FFEDE2',
      'moonlight-soft': '#FFDDD2',
      'moonlight-muted': '#FFD5B8',
      'aqua-light': '#E0A899',
      'aqua-medium': '#CB997E',
      'teal-light': '#A27051',
      'gold-accent': '#F6BD60',
      'success': '#D62828',
      'warning': '#F4A259',
      'error': '#B0413E',
      'info': '#A3B18A',
    },
  },
  {
    id: 'pinewood',
    name: 'Pinewood',
    colors: {
      'abyss-base': '#2B382C',
      'abyss-mystic': '#384B3B',
      'abyss-light': '#50624D',
      'abyss-lighter': '#7B9672',
      'moonlight': '#F5F8F6',
      'moonlight-soft': '#CDE4D6',
      'moonlight-muted': '#A3B892',
      'aqua-light': '#B2C9A7',
      'aqua-medium': '#7AA57A',
      'teal-light': '#5E7B5E',
      'gold-accent': '#D0B783',
      'success': '#849669',
      'warning': '#BBA65A',
      'error': '#9B5246',
      'info': '#6D8C7C',
    },
  },
  {
    id: 'earth-brown',
    name: 'Earth Brown',
    colors: {
      'abyss-base': '#312B20',
      'abyss-mystic': '#564C33',
      'abyss-light': '#7C6853',
      'abyss-lighter': '#B39C8F',
      'moonlight': '#EFE5DC',
      'moonlight-soft': '#DBCABD',
      'moonlight-muted': '#C0A895',
      'aqua-light': '#CEB8A7',
      'aqua-medium': '#A4836D',
      'teal-light': '#7A6651',
      'gold-accent': '#B49A6B',
      'success': '#836953',
      'warning': '#B59367',
      'error': '#874037',
      'info': '#A5867B',
    },
  },
  {
    id: 'riverbank',
    name: 'Riverbank',
    colors: {
      'abyss-base': '#2C3E35',
      'abyss-mystic': '#425E54',
      'abyss-light': '#608E85',
      'abyss-lighter': '#B7CFC2',
      'moonlight': '#F8FCFA',
      'moonlight-soft': '#DDEDE6',
      'moonlight-muted': '#B5CBC0',
      'aqua-light': '#A5D6D3',
      'aqua-medium': '#75BCBA',
      'teal-light': '#409893',
      'gold-accent': '#E7C784',
      'success': '#54B495',
      'warning': '#C0A06C',
      'error': '#9E6C61',
      'info': '#7CB8B6',
    },
  },
  {
    id: 'canyon',
    name: 'Canyon',
    colors: {
      'abyss-base': '#7B4E3F',
      'abyss-mystic': '#9C6F5D',
      'abyss-light': '#C4988A',
      'abyss-lighter': '#EED6CC',
      'moonlight': '#FFF8F6',
      'moonlight-soft': '#DFCBC9',
      'moonlight-muted': '#C1AFA6',
      'aqua-light': '#D9A98B',
      'aqua-medium': '#CC7154',
      'teal-light': '#7B523F',
      'gold-accent': '#E8B869',
      'success': '#A97F5B',
      'warning': '#E6A569',
      'error': '#B04A32',
      'info': '#CE968B',
    },
  },
  {
    id: 'meadow',
    name: 'Meadow',
    colors: {
      'abyss-base': '#44633F',
      'abyss-mystic': '#599441',
      'abyss-light': '#93B377',
      'abyss-lighter': '#C7D8B0',
      'moonlight': '#F7FFF6',
      'moonlight-soft': '#D9E4D6',
      'moonlight-muted': '#A9BA98',
      'aqua-light': '#B5EAD7',
      'aqua-medium': '#78C850',
      'teal-light': '#53A548',
      'gold-accent': '#F5DD90',
      'success': '#6ABE83',
      'warning': '#D8AC49',
      'error': '#B75238',
      'info': '#7BB174',
    },
  },
  {
    id: 'pebble',
    name: 'Pebble',
    colors: {
      'abyss-base': '#767062',
      'abyss-mystic': '#988E81',
      'abyss-light': '#B8B1A6',
      'abyss-lighter': '#E1DED9',
      'moonlight': '#FFFEFA',
      'moonlight-soft': '#EDEBE4',
      'moonlight-muted': '#CBC6BA',
      'aqua-light': '#D5E1DF',
      'aqua-medium': '#B7BBB0',
      'teal-light': '#848C81',
      'gold-accent': '#EAE2B7',
      'success': '#A2B29F',
      'warning': '#B49E68',
      'error': '#AE8774',
      'info': '#A5A79A',
    },
  }
];

// ============================================================================
// Predefined Font Themes
// ============================================================================

export const fontThemes: FontTheme[] = [
  {
    id: 'sohne',
    name: 'Söhne (Premium)',
    fonts: {
      display: 'Söhne',
      heading: 'Söhne',
      body: 'Söhne',
      ui: 'Söhne',
      mono: 'Söhne Mono',
    },
    // Note: Söhne is a commercial font. Falls back to system fonts if not available.
    // To use Söhne, you need to license it from Klim Type Foundry and host the fonts.
  },
  {
    id: 'inter',
    name: 'Inter (Modern)',
    fonts: {
      display: 'Inter',
      heading: 'Inter',
      body: 'Inter',
      ui: 'Inter',
      mono: 'JetBrains Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'sf-pro',
    name: 'SF Pro (Apple)',
    fonts: {
      display: 'SF Pro Display',
      heading: 'SF Pro Display',
      body: 'SF Pro Text',
      ui: 'SF Pro Text',
      mono: 'SF Mono',
    },
    // Note: SF Pro is available on Apple devices by default, falls back to system fonts on other platforms
  },
  {
    id: 'montserrat',
    name: 'Montserrat (Geometric)',
    fonts: {
      display: 'Montserrat',
      heading: 'Montserrat',
      body: 'Montserrat',
      ui: 'Montserrat',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&family=Roboto+Mono&display=swap',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu (Friendly)',
    fonts: {
      display: 'Ubuntu',
      heading: 'Ubuntu',
      body: 'Ubuntu',
      ui: 'Ubuntu',
      mono: 'Ubuntu Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&family=Ubuntu+Mono&display=swap',
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk (Futuristic)',
    fonts: {
      display: 'Space Grotesk',
      heading: 'Space Grotesk',
      body: 'Space Grotesk',
      ui: 'Space Grotesk',
      mono: 'Space Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono&display=swap',
  },
  {
    id: 'poppins',
    name: 'Poppins (Clean)',
    fonts: {
      display: 'Poppins',
      heading: 'Poppins',
      body: 'Poppins',
      ui: 'Poppins',
      mono: 'Fira Code',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'manrope',
    name: 'Manrope (Elegant)',
    fonts: {
      display: 'Manrope',
      heading: 'Manrope',
      body: 'Manrope',
      ui: 'Manrope',
      mono: 'JetBrains Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap',
  },
  {
    id: 'work-sans',
    name: 'Work Sans (Professional)',
    fonts: {
      display: 'Work Sans',
      heading: 'Work Sans',
      body: 'Work Sans',
      ui: 'Work Sans',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;900&family=Roboto+Mono&display=swap',
  },
  {
    id: 'dm-sans',
    name: 'DM Sans (Contemporary)',
    fonts: {
      display: 'DM Sans',
      heading: 'DM Sans',
      body: 'DM Sans',
      ui: 'DM Sans',
      mono: 'DM Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;900&family=DM+Mono&display=swap',
  },
  {
    id: 'raleway',
    name: 'Raleway (Sophisticated)',
    fonts: {
      display: 'Raleway',
      heading: 'Raleway',
      body: 'Raleway',
      ui: 'Raleway',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'outfit',
    name: 'Outfit (Bold)',
    fonts: {
      display: 'Outfit',
      heading: 'Outfit',
      body: 'Outfit',
      ui: 'Outfit',
      mono: 'JetBrains Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans (Trendy)',
    fonts: {
      display: 'Plus Jakarta Sans',
      heading: 'Plus Jakarta Sans',
      body: 'Plus Jakarta Sans',
      ui: 'Plus Jakarta Sans',
      mono: 'Fira Code',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
  },
  {
    id: 'lexend',
    name: 'Lexend (Readable)',
    fonts: {
      display: 'Lexend',
      heading: 'Lexend',
      body: 'Lexend',
      ui: 'Lexend',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'archivo',
    name: 'Archivo (Versatile)',
    fonts: {
      display: 'Archivo',
      heading: 'Archivo',
      body: 'Archivo',
      ui: 'Archivo',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'sora',
    name: 'Sora (Modern Tech)',
    fonts: {
      display: 'Sora',
      heading: 'Sora',
      body: 'Sora',
      ui: 'Sora',
      mono: 'JetBrains Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap',
  },
  {
    id: 'epilogue',
    name: 'Epilogue (Editorial)',
    fonts: {
      display: 'Epilogue',
      heading: 'Epilogue',
      body: 'Epilogue',
      ui: 'Epilogue',
      mono: 'Roboto Mono',
    },
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700;900&display=swap',
  },
  {
    id: 'satoshi',
    name: 'Satoshi (Premium)',
    fonts: {
      display: 'Satoshi',
      heading: 'Satoshi',
      body: 'Satoshi',
      ui: 'Satoshi',
      mono: 'JetBrains Mono',
    },
    // Note: Satoshi is a commercial font that requires licensing. Falls back to system fonts.
  },
  {
    id: 'cabinet-grotesk',
    name: 'Cabinet Grotesk (Stylish)',
    fonts: {
      display: 'Cabinet Grotesk',
      heading: 'Cabinet Grotesk',
      body: 'Cabinet Grotesk',
      ui: 'Cabinet Grotesk',
      mono: 'JetBrains Mono',
    },
    // Note: Cabinet Grotesk is a commercial font. Falls back to system fonts if not available.
  },
];

// ============================================================================
// Theme Context
// ============================================================================

interface ThemeContextType {
  colorPalette: ColorPalette;
  fontTheme: FontTheme;
  headingFont: FontTheme;
  bodyFont: FontTheme;
  setColorPalette: (paletteId: string) => void;
  setFontTheme: (fontId: string) => void;
  setHeadingFont: (fontId: string) => void;
  setBodyFont: (fontId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// Theme Provider Component
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(colorPalettes[0]);
  const [fontTheme, setFontThemeState] = useState<FontTheme>(fontThemes[0]);
  const [headingFont, setHeadingFontState] = useState<FontTheme>(fontThemes[0]);
  const [bodyFont, setBodyFontState] = useState<FontTheme>(fontThemes[0]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedPaletteId = localStorage.getItem('theme-color-palette');
    const savedFontId = localStorage.getItem('theme-font');
    const savedHeadingFontId = localStorage.getItem('theme-heading-font');
    const savedBodyFontId = localStorage.getItem('theme-body-font');

    if (savedPaletteId) {
      const palette = colorPalettes.find(p => p.id === savedPaletteId);
      if (palette) setColorPaletteState(palette);
    }

    if (savedFontId) {
      const font = fontThemes.find(f => f.id === savedFontId);
      if (font) setFontThemeState(font);
    }

    if (savedHeadingFontId) {
      const font = fontThemes.find(f => f.id === savedHeadingFontId);
      if (font) setHeadingFontState(font);
    }

    if (savedBodyFontId) {
      const font = fontThemes.find(f => f.id === savedBodyFontId);
      if (font) setBodyFontState(font);
    }
  }, []);

  // Apply color palette CSS variables
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colorPalette.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colorPalette]);

  // Apply font theme (combined mode - for backward compatibility)
  useEffect(() => {
    if (fontTheme.googleFontsUrl) {
      const existingLink = document.getElementById('google-fonts-link');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.id = 'google-fonts-link';
      link.rel = 'stylesheet';
      link.href = fontTheme.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [fontTheme]);

  // Apply heading and body fonts separately
  useEffect(() => {
    const systemFallback = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
    const monoFallback = '"SF Mono", "Consolas", "Monaco", monospace';
    
    // Load heading font
    if (headingFont.googleFontsUrl) {
      const existingLink = document.getElementById('google-fonts-heading-link');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.id = 'google-fonts-heading-link';
      link.rel = 'stylesheet';
      link.href = headingFont.googleFontsUrl;
      document.head.appendChild(link);
    }

    // Load body font
    if (bodyFont.googleFontsUrl) {
      const existingLink = document.getElementById('google-fonts-body-link');
      if (existingLink) {
        existingLink.remove();
      }

      const link = document.createElement('link');
      link.id = 'google-fonts-body-link';
      link.rel = 'stylesheet';
      link.href = bodyFont.googleFontsUrl;
      document.head.appendChild(link);
    }
    
    // Apply hierarchical font family CSS variables with fallbacks
    const root = document.documentElement;
    root.style.setProperty('--font-display', `"${headingFont.fonts.display}", ${systemFallback}`);
    root.style.setProperty('--font-heading', `"${headingFont.fonts.heading}", ${systemFallback}`);
    root.style.setProperty('--font-body', `"${bodyFont.fonts.body}", ${systemFallback}`);
    root.style.setProperty('--font-ui', `"${bodyFont.fonts.ui}", ${systemFallback}`);
    root.style.setProperty('--font-mono', `"${bodyFont.fonts.mono}", ${monoFallback}`);
    
    // Update body font with body font (for general content)
    document.body.style.fontFamily = `"${bodyFont.fonts.body}", ${systemFallback}`;
  }, [headingFont, bodyFont]);

  const setColorPalette = (paletteId: string) => {
    const palette = colorPalettes.find(p => p.id === paletteId);
    if (palette) {
      setColorPaletteState(palette);
      localStorage.setItem('theme-color-palette', paletteId);
    }
  };

  const setFontTheme = (fontId: string) => {
    const font = fontThemes.find(f => f.id === fontId);
    if (font) {
      setFontThemeState(font);
      setHeadingFontState(font);
      setBodyFontState(font);
      localStorage.setItem('theme-font', fontId);
      localStorage.setItem('theme-heading-font', fontId);
      localStorage.setItem('theme-body-font', fontId);
    }
  };

  const setHeadingFont = (fontId: string) => {
    const font = fontThemes.find(f => f.id === fontId);
    if (font) {
      setHeadingFontState(font);
      localStorage.setItem('theme-heading-font', fontId);
    }
  };

  const setBodyFont = (fontId: string) => {
    const font = fontThemes.find(f => f.id === fontId);
    if (font) {
      setBodyFontState(font);
      localStorage.setItem('theme-body-font', fontId);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      colorPalette, 
      fontTheme, 
      headingFont, 
      bodyFont, 
      setColorPalette, 
      setFontTheme,
      setHeadingFont,
      setBodyFont 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// Custom Hook
// ============================================================================

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

