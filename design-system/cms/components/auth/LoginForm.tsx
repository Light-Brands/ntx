'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const { signInWithOTP, verifyOTP } = useAuth();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signInWithOTP(email);

    if (error) {
      setError(error.message || 'Failed to send code. Please check your email address.');
      setLoading(false);
    } else {
      setStep('code');
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await verifyOTP(email, code);

    if (error) {
      setError(error.message || 'Invalid code. Please try again.');
    }

    setLoading(false);
  };

  const handleBackToEmail = () => {
    setStep('email');
    setCode('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <img 
            src="/header-logo-white_1.png" 
            alt="VibeUp" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {step === 'email' ? 'Welcome Back' : 'Enter Code'}
          </h1>
          <p className="text-muted-foreground">
            {step === 'email' 
              ? 'Enter your email to receive a login code' 
              : `We sent a 6-digit code to ${email}`
            }
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@vibeup.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Only admin emails can access this CMS
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Login Code
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                disabled={loading}
                className="w-full text-center text-2xl tracking-widest font-mono"
                maxLength={6}
                pattern="[0-9]{6}"
                autoComplete="one-time-code"
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-center">
                Enter the 6-digit code from your email
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || code.length !== 6}
            >
              {loading ? (
                'Verifying...'
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Verify & Sign In
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleBackToEmail}
              disabled={loading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Use different email
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  signInWithOTP(email).then(() => setLoading(false));
                }}
                className="text-sm text-muted-foreground hover:text-primary"
                disabled={loading}
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
