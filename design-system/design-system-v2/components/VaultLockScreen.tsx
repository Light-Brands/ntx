/**
 * Vault Lock Screen - Secure access to the design system
 * Tokens: ../tokens/
 */
import React, { useState, useEffect } from 'react';
import { colors, shadows } from '../tokens';

interface VaultLockScreenProps {
  onUnlock: () => void;
}

const CORRECT_CODE = '8888';
const MAX_DIGITS = 4;

export const VaultLockScreen: React.FC<VaultLockScreenProps> = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [error, setError] = useState(false);
  const [vaultRotation, setVaultRotation] = useState(0);

  // Vault rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVaultRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleDigit = (digit: string) => {
    if (code.length < MAX_DIGITS) {
      const newCode = code + digit;
      setCode(newCode);
      setError(false);

      // Check if complete
      if (newCode.length === MAX_DIGITS) {
        if (newCode === CORRECT_CODE) {
          setIsUnlocking(true);
          setTimeout(() => {
            onUnlock();
          }, 2000);
        } else {
          setError(true);
          setTimeout(() => {
            setCode('');
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleClear = () => {
    setCode('');
    setError(false);
  };

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden"
      style={{ backgroundColor: colors['abyss-base'] }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${colors['aqua-light']}30 1px, transparent 1px),
                           linear-gradient(90deg, ${colors['aqua-light']}30 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Vault door visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-96 h-96 opacity-5">
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{ 
              border: `2px solid ${colors['aqua-light']}`,
              transform: `rotate(${vaultRotation}deg)`,
              boxShadow: shadows['mira-glow']
            }}
          >
            {/* Inner mechanisms */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <div
                key={i}
                className="absolute w-2 h-8 rounded-full"
                style={{
                  backgroundColor: colors['teal-light'],
                  left: '50%',
                  top: '10%',
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  transformOrigin: '50% 200px'
                }}
              />
            ))}
          </div>
          
          {/* Middle ring */}
          <div 
            className="absolute inset-12 rounded-full"
            style={{ 
              border: `1px solid ${colors['teal-light']}`,
              transform: `rotate(${-vaultRotation * 1.5}deg)`,
            }}
          />
          
          {/* Center lock mechanism */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-20 h-20 rounded-full"
              style={{ 
                backgroundColor: colors['abyss-mystic'],
                border: `2px solid ${colors['aqua-light']}`,
                boxShadow: shadows['mira-glow-intense']
              }}
            />
          </div>
        </div>
      </div>

      {/* Lock screen content */}
      <div className="relative z-10 w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-1000">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div 
              className="text-5xl font-black tracking-wide"
              style={{ color: colors['aqua-light'] }}
            >
              VIBEUP
            </div>
            <div 
              className="absolute -bottom-1 left-0 right-0 h-0.5"
              style={{ 
                backgroundColor: colors['aqua-light'],
                boxShadow: shadows['aqua-glow']
              }}
            />
          </div>
          <div 
            className="text-sm uppercase tracking-widest font-light"
            style={{ color: colors['moonlight-muted'] }}
          >
            Master Spec Access
          </div>
        </div>

        {/* Vault status */}
        <div className="text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
            style={{ 
              backgroundColor: `${colors['aqua-light']}10`,
              border: `1px solid ${colors['aqua-light']}30`,
              color: colors['aqua-light']
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors['aqua-light'] }}
            />
            {isUnlocking ? 'VAULT UNLOCKING...' : error ? 'ACCESS DENIED' : 'VAULT SECURED'}
          </div>
        </div>

        {/* Code display */}
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative w-16 h-20 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ 
                backgroundColor: colors['abyss-mystic'],
                border: `2px solid ${
                  error 
                    ? colors['error']
                    : code.length > i 
                      ? colors['aqua-light'] 
                      : colors['abyss-lighter']
                }`,
                boxShadow: code.length > i ? shadows['aqua-glow'] : 'none',
                transform: error ? 'translateX(0)' : 'none',
                animation: error ? 'shake 0.5s' : 'none'
              }}
            >
              {code[i] && (
                <div 
                  className="text-3xl font-bold animate-in zoom-in-0 duration-200"
                  style={{ color: isUnlocking ? colors['success'] : colors['aqua-light'] }}
                >
                  {isUnlocking ? '✓' : '•'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status message */}
        <div className="text-center h-6">
          {isUnlocking && (
            <div 
              className="text-sm font-medium animate-pulse"
              style={{ color: colors['success'] }}
            >
              ✓ Access Granted - Opening Vault...
            </div>
          )}
          {error && (
            <div 
              className="text-sm font-medium"
              style={{ color: colors['error'] }}
            >
              ✗ Invalid Code - Try Again
            </div>
          )}
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {digits.map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              disabled={isUnlocking || code.length >= MAX_DIGITS}
              className="relative h-16 rounded-xl font-semibold text-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{ 
                backgroundColor: colors['abyss-mystic'],
                border: `1px solid ${colors['abyss-lighter']}`,
                color: colors['moonlight']
              }}
            >
              <span className="relative z-10">{digit}</span>
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200"
                style={{ 
                  backgroundColor: `${colors['aqua-light']}20`,
                  boxShadow: shadows['aqua-glow']
                }}
              />
            </button>
          ))}
          
          {/* Clear button */}
          <button
            onClick={handleClear}
            disabled={isUnlocking || code.length === 0}
            className="col-span-3 h-14 rounded-xl font-medium text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: `${colors['abyss-light']}`,
              border: `1px solid ${colors['abyss-lighter']}`,
              color: colors['moonlight-muted']
            }}
          >
            Clear
          </button>
        </div>

        {/* Footer hint */}
        <div 
          className="text-center text-xs tracking-wide opacity-50"
          style={{ color: colors['moonlight-muted'] }}
        >
          Authorized Personnel Only
        </div>
      </div>

      {/* Unlocking animation overlay */}
      {isUnlocking && (
        <div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in duration-500">
          <div className="relative">
            {/* Expanding circles */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  border: `2px solid ${colors['aqua-light']}`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '2s'
                }}
              />
            ))}
            {/* Check mark */}
            <div 
              className="relative w-32 h-32 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: colors['abyss-mystic'],
                border: `3px solid ${colors['success']}`,
                boxShadow: `0 0 40px ${colors['success']}99`
              }}
            >
              <svg 
                className="w-16 h-16"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={colors['success']}
                strokeWidth="3"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" className="animate-in draw-in duration-1000" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes draw-in {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 100, 0; }
        }
      `}</style>
    </div>
  );
};

