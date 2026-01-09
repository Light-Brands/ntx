
/**
 * Home Components implementing the Onyx Design System
 * Tokens: ../tokens/
 * Design Spec: ../spec/design/COMPONENT-CATALOG.md
 * Brand Philosophy: ../spec/brand/01-visual-identity.md
 */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Input } from './Input';

// ============================================================================
// SVG ICONS - Inline SVG icons to avoid lucide-react dependency
// ============================================================================

const Icons = {
  ChevronRight: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

// ============================================================================
// 1. PAGE CONTAINER - Consistent layout wrapper for all home screens
// ============================================================================

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => (
  <main className={`min-h-screen h-full w-full bg-abyss-base text-moonlight relative ${className}`}>
    <div className="h-full w-full text-moonlight">
      {children}
    </div>
  </main>
);

// ============================================================================
// 2. ERROR CONTAINER - Reusable error state with retry button
// ============================================================================

interface ErrorContainerProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({ message, onRetry, className = '' }) => (
  <div className={`min-h-screen h-full w-full bg-abyss-base text-moonlight relative flex flex-col items-center justify-center ${className}`}>
    <div className="text-center space-y-8 max-w-md mx-auto px-4 text-moonlight animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-xl font-light text-moonlight-soft font-heading">Something went wrong</h2>
        <p className="text-moonlight-muted text-sm font-light font-body">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 rounded-xl bg-abyss-mystic border border-aqua-light/20 backdrop-blur-sm transition-all duration-300 font-light hover:bg-abyss-light hover:shadow-aqua-glow font-ui"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// 3. SACRED LOADING - Animated loading spinner with progressive messages
// ============================================================================

interface SacredLoadingProps {
  onTimeout?: () => void;
  onRetry?: () => void;
  maxTimeout?: number;
  className?: string;
  compact?: boolean;
}

const LOADING_MESSAGES = [
  { text: "Connecting to your space...", duration: 3000 },
  { text: "Preparing your experience...", duration: 4000 },
  { text: "Opening pathways...", duration: 5000 },
  { text: "Almost ready...", duration: 6000 },
  { text: "Almost there...", duration: 8000 },
  { text: "Taking longer than expected...", duration: 12000 },
  { text: "Still working on it...", duration: 15000 },
];

export const SacredLoading: React.FC<SacredLoadingProps> = ({
  onTimeout,
  onRetry,
  maxTimeout = 20000,
  compact = false,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);

      if (elapsed > 10000 && !showRetry) {
        setShowRetry(true);
      }

      if (elapsed > maxTimeout && !isTimedOut) {
        setIsTimedOut(true);
        onTimeout?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [maxTimeout, onTimeout, showRetry, isTimedOut]);

  useEffect(() => {
    const messageIndex = LOADING_MESSAGES.findIndex((msg) => elapsedTime < msg.duration);
    if (messageIndex !== -1 && messageIndex !== currentMessageIndex) {
      setCurrentMessageIndex(messageIndex);
    } else if (messageIndex === -1 && currentMessageIndex !== LOADING_MESSAGES.length - 1) {
      setCurrentMessageIndex(LOADING_MESSAGES.length - 1);
    }
  }, [elapsedTime, currentMessageIndex]);

  const currentMessage = LOADING_MESSAGES[currentMessageIndex];

  return (
    <div className={compact ? "w-full h-full flex items-center justify-center bg-abyss-base" : ""}>
      <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
        <div className={`flex items-center justify-center ${compact ? 'h-full' : 'fixed inset-0'}`}>
          <div className="text-center space-y-8 max-w-md mx-auto px-4 relative z-10 animate-in fade-in zoom-in-95 duration-1000">
          {/* Loading Animation */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aqua-light animate-spin" />
            <div className="absolute inset-4 rounded-full bg-aqua-light/30 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-aqua-light animate-ping" />
            </div>
          </div>

          {/* Progressive Message */}
          <div key={currentMessageIndex} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-moonlight-soft text-lg font-light font-body">{currentMessage.text}</p>
            <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-aqua-light/60 animate-bounce"
                  style={{ 
                    animationDelay: `${i * 150}ms` 
                  }}
                />
            ))}
            </div>
          </div>

          {/* Retry Button */}
          {showRetry && !isTimedOut && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-moonlight-muted text-sm font-light font-body">Taking longer than usual...</p>
              <button
                onClick={onRetry}
                className="px-6 py-2 rounded-xl bg-abyss-mystic border border-aqua-light/20 backdrop-blur-sm text-moonlight hover:bg-abyss-light transition-all duration-300 font-light hover:shadow-aqua-glow font-ui"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Timeout Message */}
          {isTimedOut && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-moonlight-soft text-sm font-light font-body">
                Connection is taking longer than expected. Please check your internet connection.
              </p>
              <button
                onClick={onRetry}
                className="px-6 py-2 rounded-xl bg-abyss-mystic backdrop-blur-sm border border-aqua-light
                         text-moonlight hover:bg-abyss-light transition-all duration-300 font-light
                         hover:shadow-lg hover:shadow-aqua-glow font-ui"
              >
                Retry Connection
              </button>
            </div>
          )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

// ============================================================================
// 4. SOFT ARRIVAL - Breathing circle transition screen
// ============================================================================

interface SoftArrivalProps {
  onComplete: () => void;
  isReturningUser?: boolean;
  compact?: boolean;
}

const breathTiming = {
  inhale: 4000,
  hold: 2000,
  exhale: 4000,
};

export const SoftArrival: React.FC<SoftArrivalProps> = ({ onComplete, compact = false }) => {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const totalBreaths = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (breathPhase === 'inhale') {
        setBreathPhase('hold');
      } else if (breathPhase === 'hold') {
        setBreathPhase('exhale');
      } else if (breathPhase === 'exhale') {
        setBreathCount((prev) => prev + 1);
        setBreathPhase('inhale');
      }
    }, breathTiming[breathPhase]);

    return () => clearTimeout(timer);
  }, [breathPhase]);

  useEffect(() => {
    if (breathCount >= totalBreaths) {
      setTimeout(() => onComplete(), 1000);
    }
  }, [breathCount, onComplete]);

  const getCircleClass = () => {
    const baseClass = "relative w-32 h-32 rounded-full border-2 border-aqua-light shadow-aqua-glow flex items-center justify-center z-10 transition-transform duration-[4000ms] ease-in-out";

    if (breathPhase === 'exhale') {
      return `${baseClass} scale-[0.85]`;
    }
    return `${baseClass} scale-100`;
  };

  return (
    <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
      <div className={`flex flex-col items-center justify-center w-full relative overflow-hidden ${compact ? 'h-full py-12' : 'min-h-screen'}`}>
        <div className={`flex flex-col items-center justify-center space-y-12 relative z-10 animate-in fade-in zoom-in-95 duration-1500 ${compact ? '' : 'flex-1'}`}>
          {/* Breathing Sphere */}
          <div className="relative flex items-center justify-center">
            <div className={getCircleClass()}>
              {/* Triangle Logo Placeholder */}
              <div className="w-6 h-6 border-t-2 border-l-2 border-aqua-light transform rotate-45" />
            </div>
          </div>

          {/* Branding */}
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-500">
            <div className="space-y-3">
              <h1 className="text-2xl font-black tracking-tighter text-aqua-light uppercase italic font-display">Abyss</h1>
              <p className="text-sm font-light tracking-wide text-moonlight-soft font-ui">Intentional Living</p>
            </div>
            <p className="text-base font-light text-moonlight-soft tracking-wide font-body">
              Breathe with us as we prepare your space
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// ============================================================================
// 5. EMAIL CAPTURE - Email/SMS authentication flow with OTP
// ============================================================================

interface EmailCaptureProps {
  onComplete: () => void;
  compact?: boolean;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const EmailCapture: React.FC<EmailCaptureProps> = ({ onComplete, compact = false }) => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"welcome" | "email" | "sent" | "verifying">("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [useSMS, setUseSMS] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerifyOtp = async () => {
    const cleanedCode = otpCode.replace(/\D/g, "").trim();
    if (!cleanedCode || cleanedCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1000);
  };

  // Auto-submit OTP when 6 digits entered
  useEffect(() => {
    if (otpCode.length === 6 && !isLoading && step === "sent") {
      setTimeout(() => handleVerifyOtp(), 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpCode, isLoading, step]);

  const handleSendMagicLink = async () => {
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("sent");
      setResendCooldown(60);
    }, 1000);
  };

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    setError("");
    setResendCooldown(60);
    // Simulate resend
  };

  if (useSMS) {
    return (
      <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
        <div className={`w-full flex flex-col items-center justify-center p-6 ${compact ? 'h-full' : 'min-h-screen'}`}>
          <div className="text-center space-y-8 max-w-md mx-auto animate-in fade-in duration-500">
            <h2 className="text-2xl font-light text-moonlight font-heading">SMS Authentication</h2>
            <p className="text-moonlight-muted text-sm font-body">SMS flow placeholder - similar to email</p>
            <button
              onClick={() => setUseSMS(false)}
              className="text-aqua-light text-sm hover:underline font-ui"
            >
              Back to Email
            </button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
      <div className={`w-full flex flex-col items-center justify-center p-6 relative overflow-hidden ${compact ? 'h-full' : 'min-h-screen'}`}>
        {step === "welcome" && (
          <div key="welcome" className="text-center space-y-12 max-w-md mx-auto relative z-10 animate-in fade-in duration-800">
            {/* Triangle Logo */}
            <div className="w-24 h-24 mx-auto border-t-4 border-l-4 border-aqua-light transform rotate-45 shadow-aqua-glow animate-in zoom-in-50 duration-1000 delay-300" />

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-600">
              <h1 className="text-4xl font-black tracking-tighter text-aqua-light uppercase italic font-display">
                Welcome to Abyss
              </h1>
              <p className="text-moonlight-muted text-base font-light leading-relaxed font-body">
                Enter your space of intentional living
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-800 delay-900">
              <Button onClick={() => setStep("email")} className="w-full max-w-sm">
                Get Started
              </Button>
            </div>
          </div>
        )}

        {step === "email" && (
          <div key="email" className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-6 duration-600">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-moonlight font-heading">Enter your email</h2>
              <p className="text-moonlight-muted text-sm font-light font-body">
                We'll send you a magic link to sign in
              </p>
            </div>

            <div className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="your@email.com"
                label="Email Address"
                className="w-full"
              />

              {error && (
                <p className="text-error text-sm animate-in fade-in slide-in-from-top-2 duration-300 font-body">
                  {error}
                </p>
              )}

              <Button
                onClick={handleSendMagicLink}
                disabled={isLoading || !email}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Continue with Email"}
              </Button>

              <button
                onClick={() => setUseSMS(true)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl
                         bg-abyss-mystic border border-abyss-lighter text-moonlight hover:bg-abyss-light
                         transition-all duration-300 font-ui"
              >
                <Icons.Phone />
                <span>Use Phone Number Instead</span>
              </button>
            </div>
          </div>
        )}

        {step === "sent" && (
          <div key="sent" className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-6 duration-600">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-moonlight font-heading">Check your email</h2>
              <p className="text-moonlight-muted text-sm font-light font-body">
                We sent a 6-digit code to <span className="text-moonlight">{email}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-moonlight-soft mb-2 font-ui">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setOtpCode(value);
                    setError("");
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-6 py-4 text-center text-2xl tracking-[0.5em] rounded-xl
                           bg-abyss-mystic backdrop-blur-sm border border-abyss-lighter text-moonlight
                           placeholder-moonlight-muted/30 focus:outline-none focus:border-aqua-light
                           focus:bg-abyss-light transition-all duration-300 font-mono"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-error text-sm text-center animate-in fade-in slide-in-from-top-2 duration-300 font-body">
                  {error}
                </p>
              )}

              <div className="text-center space-y-2">
                <p className="text-moonlight-muted text-sm font-body">Didn't receive the code?</p>
                <button
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className="text-aqua-light text-sm hover:underline disabled:opacity-50
                           disabled:cursor-not-allowed font-ui"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                </button>
              </div>

              <button
                onClick={() => setStep("email")}
                className="text-moonlight-muted text-sm hover:text-moonlight transition-colors font-ui"
              >
                ← Change Email
              </button>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

// ============================================================================
// 6. ONBOARDING FORM - 4-step wizard (name, intention, lens, depth)
// ============================================================================

interface OnboardingFormProps {
  onComplete: (data: { user_name: string; intention: string; lens: string; depth: string }) => void;
  prefillName?: string;
  compact?: boolean;
}

interface OnboardingStep {
  id: number;
  question: string;
  placeholder?: string;
  fieldType: 'text' | 'select';
  options?: { text: string; value: string }[];
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    question: "What's your name?",
    placeholder: "Enter your name",
    fieldType: 'text',
  },
  {
    id: 2,
    question: "What's your intention?",
    fieldType: 'select',
    options: [
      { text: "Chat (search)", value: "chat" },
      { text: "The Guide (guidance)", value: "guide" },
      { text: "Journal (reflect)", value: "journal" },
    ],
  },
  {
    id: 3,
    question: "Choose your lens",
    fieldType: 'select',
    options: [
      { text: "Personal", value: "personal" },
      { text: "Professional", value: "professional" },
      { text: "Spiritual", value: "spiritual" },
    ],
  },
  {
    id: 4,
    question: "Select your depth",
    fieldType: 'select',
    options: [
      { text: "Lite", value: "lite" },
      { text: "Deep", value: "deep" },
      { text: "Deeper", value: "deeper" },
    ],
  },
];

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete, prefillName = '', compact = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    user_name: prefillName,
    intention: "",
    lens: "",
    depth: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentStepData = ONBOARDING_STEPS.find((step) => step.id === currentStep);
  const totalSteps = ONBOARDING_STEPS.length;
  const isLastStep = currentStep === totalSteps;

  // Simulate AI typing effect (skip in compact mode for showcase)
  useEffect(() => {
    setShowForm(false);
    const delay = compact ? 0 : 1500; // Instant in compact mode, 1.5s delay in full mode
    const timer = setTimeout(() => setShowForm(true), delay);
    return () => clearTimeout(timer);
  }, [currentStep, compact]);

  const getCurrentFieldValue = () => {
    switch (currentStep) {
      case 1: return formData.user_name;
      case 2: return formData.intention;
      case 3: return formData.lens;
      case 4: return formData.depth;
      default: return "";
    }
  };

  const handleFieldChange = (value: string) => {
    switch (currentStep) {
      case 1: setFormData({ ...formData, user_name: value }); break;
      case 2: setFormData({ ...formData, intention: value }); break;
      case 3: setFormData({ ...formData, lens: value }); break;
      case 4: setFormData({ ...formData, depth: value }); break;
    }

    // Auto-advance for steps 2 & 3
    if (currentStep === 2 || currentStep === 3) {
      if (autoAdvanceTimeoutRef.current) clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        handleNextStep();
      }, 1200);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      setTimeout(() => onComplete(formData), 1500);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = getCurrentFieldValue().trim().length > 0;

  if (isCompleted) {
    return (
      <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
        <div className={`flex items-center justify-center ${compact ? 'h-full py-12' : 'min-h-screen'}`}>
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 mx-auto rounded-full bg-aqua-light/20 border-2 border-aqua-light
                         flex items-center justify-center animate-in zoom-in-0 duration-300 delay-200">
              <Icons.CheckCircle />
            </div>
            <h2 className="text-3xl font-bold text-moonlight font-heading">Welcome, {formData.user_name}!</h2>
            <p className="text-moonlight-muted font-body">Preparing your experience...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className={compact ? "!min-h-0 !h-full" : ""}>
      <div className={`w-full flex flex-col items-center justify-center ${compact ? 'h-full py-8 px-6' : 'min-h-screen p-6'}`}>
        <div className={`w-full max-w-2xl ${compact ? 'space-y-6' : 'space-y-12'}`}>
          {/* Progress Indicator */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-moonlight-muted uppercase tracking-widest font-ui">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="flex gap-2">
                {ONBOARDING_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step.id < currentStep
                        ? 'bg-aqua-light w-2'
                        : step.id === currentStep
                        ? 'bg-aqua-light w-8'
                        : 'bg-abyss-lighter w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="h-1 bg-abyss-lighter rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-aqua-light to-gold-accent transition-all duration-600"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div key={currentStep} className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${compact ? 'space-y-4' : 'space-y-8'}`}>
            <h2 className={`font-bold text-moonlight text-center font-heading ${compact ? 'text-2xl' : 'text-4xl'}`}>
              {currentStepData?.question}
            </h2>

            {showForm && (
              <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${compact ? 'space-y-3' : 'space-y-6'}`}>
                {currentStepData?.fieldType === 'text' ? (
                  <input
                    type="text"
                    value={getCurrentFieldValue()}
                    onChange={(e) => handleFieldChange(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    className={`w-full rounded-xl bg-abyss-mystic backdrop-blur-sm
                             border border-abyss-lighter text-moonlight placeholder-moonlight-muted/50
                             focus:outline-none focus:border-aqua-light focus:bg-abyss-light
                             transition-all duration-300 font-body ${compact ? 'px-4 py-3 text-base' : 'px-6 py-4 text-lg'}`}
                    autoFocus
                  />
                ) : (
                  <div className={compact ? "grid gap-2" : "grid gap-4"}>
                    {currentStepData?.options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFieldChange(option.value)}
                        className={`rounded-2xl border-2 transition-all duration-300 text-left ${compact ? 'p-4' : 'p-6'}
                                  ${getCurrentFieldValue() === option.value
                                    ? 'border-aqua-light bg-aqua-light/10'
                                    : 'border-abyss-lighter bg-abyss-mystic hover:border-aqua-light/30 hover:bg-abyss-light'
                                  }`}
                      >
                        <span className={`font-medium text-moonlight font-ui ${compact ? 'text-base' : 'text-lg'}`}>{option.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className={`flex justify-between items-center ${compact ? 'pt-4' : 'pt-8'}`}>
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="text-moonlight-muted hover:text-moonlight transition-colors disabled:opacity-0
                       disabled:cursor-not-allowed font-ui"
            >
              ← Back
            </button>

            <Button
              onClick={handleNextStep}
              disabled={!isStepValid}
              className="px-8 flex items-center gap-2"
            >
              {isLastStep ? 'Complete' : 'Continue'}
              <Icons.ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
