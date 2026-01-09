
import React, { useState, useEffect } from 'react';
import { Showcase } from './pages/Showcase';
import { Dashboard } from './pages/Dashboard';
import { Tracker } from './pages/Tracker';
import FeedbackPage from './pages/Feedback';
import Autodev from './pages/Autodev';
import CMS from './pages/CMS';
import { Sidebar } from './components/Sidebar';
import { VaultLockScreen } from './components/VaultLockScreen';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { FeedbackProvider } from './contexts/FeedbackContext';
import {
  FeedbackButton,
  FeedbackMode,
  FeedbackModal,
  FeedbackMarkerLayer,
} from './components/feedback';

const VAULT_KEY = 'onyx-vault-unlocked';

const App: React.FC = () => {
  // Vault access control
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  // Check localStorage for vault access on mount
  useEffect(() => {
    const unlocked = localStorage.getItem(VAULT_KEY) === 'true';
    setIsVaultUnlocked(unlocked);
    setIsCheckingAccess(false);
  }, []);

  // Handle vault unlock
  const handleVaultUnlock = () => {
    localStorage.setItem(VAULT_KEY, 'true');
    setIsVaultUnlocked(true);
  };

  // Default to dashboard as the command center
  const [activeSection, setActiveSection] = useState('dashboard');

  // Smooth scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Check which page we're on
  const isDashboard = activeSection === 'dashboard';
  const isTracker = activeSection === 'tracker';
  const isFeedback = activeSection === 'feedback';
  const isAutodev = activeSection === 'autodev';
  const isCMS = activeSection === 'cms';

  // Show loading during access check
  if (isCheckingAccess) {
    return null;
  }

  // Show vault lock screen if not unlocked
  if (!isVaultUnlocked) {
    return <VaultLockScreen onUnlock={handleVaultUnlock} />;
  }

  return (
    <FeedbackProvider pageId={activeSection as 'dashboard' | 'tracker' | 'showcase' | 'feedback'}>
      <div className="flex min-h-screen bg-abyss-base text-moonlight antialiased selection:bg-aqua-light selection:text-abyss-base">
        {/* Theme Switcher - Fixed in top-right corner */}
        <ThemeSwitcher />

        {/* Fixed Navigation Sidebar */}
        <aside className="fixed inset-y-0 left-0 w-72 border-r border-white/5 bg-abyss-mystic/40 backdrop-blur-2xl hidden lg:block z-50 shadow-2xl">
          <div className="p-8 h-full flex flex-col">
            <div
              className="flex items-center gap-4 mb-12 group cursor-pointer"
              onClick={() => setActiveSection('dashboard')}
            >
              <img
                src="/Asset-1.png"
                alt="VIBEUP Icon"
                className="w-9 h-9 object-contain transform group-hover:rotate-12 transition-all duration-500"
                style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--color-aqua-light) 30%, transparent))' }}
              />
              <img src="/VIBEUP-LOGO.svg" alt="VIBEUP" className="h-7 object-contain group-hover:opacity-80 transition-opacity" />
            </div>

            <div className="flex-1 overflow-y-auto -mx-2 px-2 no-scrollbar">
              <Sidebar activeKey={activeSection} onSelect={setActiveSection} />
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <div className="w-8 h-8 rounded-full abyss-gradient-primary mira-glow animate-neural" />
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">System</p>
                  <p className="text-xs font-black text-aqua-light uppercase tracking-widest">Design System</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Primary Content Container */}
        <main className="flex-1 lg:ml-72 relative min-h-screen" data-page={activeSection}>
          {isDashboard ? (
            // Dashboard has its own layout
            <Dashboard onNavigate={setActiveSection} />
          ) : isTracker ? (
            // Tracker page with full width
            <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-16">
              <Tracker />
            </div>
          ) : isFeedback ? (
            // Feedback dashboard page
            <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-16">
              <FeedbackPage onNavigate={setActiveSection} />
            </div>
          ) : isAutodev ? (
            // AUTODEV - Autonomous Development Intelligence System
            <Autodev />
          ) : isCMS ? (
            // CMS - Content Management System
            <div className="w-full max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-16">
              <CMS onNavigate={setActiveSection} />
            </div>
          ) : (
            // Showcase pages with standardized width
            <div className="w-full max-w-5xl mx-auto px-6 py-16 md:px-12 lg:px-16">
              <Showcase activeSection={activeSection} />
            </div>
          )}

          {/* Subtle Global Ambient Glow */}
          <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-aqua-light/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="fixed bottom-0 left-72 -z-10 w-[400px] h-[400px] bg-teal-light/5 blur-[100px] rounded-full pointer-events-none" />
        </main>

        {/* Feedback System Components */}
        <FeedbackButton onNavigate={setActiveSection} />
        <FeedbackMode />
        <FeedbackModal />
        <FeedbackMarkerLayer />
      </div>
    </FeedbackProvider>
  );
};

export default App;
