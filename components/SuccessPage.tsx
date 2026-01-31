import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUpdateStripeSession } from '../hooks/useFirestore';

interface SuccessPageProps {
  sessionId: string | null;
  onBackToHome: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ sessionId, onBackToHome }) => {
  const { user, profile, loading: authLoading, signIn, signUp, signInWithGoogle, error: authError } = useAuth();
  const { updateStripeSession, loading: updateLoading, error: updateError } = useUpdateStripeSession();

  const [savedSession, setSavedSession] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isValidSession = sessionId && sessionId.startsWith('cs_');

  // Save session ID to Firestore when user is authenticated
  useEffect(() => {
    if (user && isValidSession && !savedSession && !profile?.stripeSessionId) {
      updateStripeSession(user.uid, sessionId).then((success) => {
        if (success) {
          setSavedSession(true);
        }
      });
    }
  }, [user, isValidSession, sessionId, savedSession, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setFormError('Please enter your name');
          return;
        }
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {isValidSession ? (
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full border-4 border-green-500">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <div>
              <h1 className="text-4xl font-black mb-4">Deposit Confirmed!</h1>
              <p className="text-xl text-slate-400">
                Welcome to the LeadSig Founders Cohort 001
              </p>
            </div>

            {/* Session ID Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Payment Verified</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider">Stripe Session ID</label>
                  <div className="mt-1 font-mono text-sm text-indigo-400 bg-slate-950 p-3 rounded-lg border border-slate-800 break-all">
                    {sessionId}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider">Amount</label>
                    <p className="text-slate-200 font-bold">$99.99</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider">Status</label>
                    <p className="text-green-400 font-bold">Completed</p>
                  </div>
                </div>

                {/* Firebase sync status */}
                {user && (
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-sm">
                      {updateLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
                          <span className="text-slate-400">Saving to your account...</span>
                        </>
                      ) : savedSession || profile?.stripeSessionId ? (
                        <>
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-green-400">Linked to {profile?.email}</span>
                        </>
                      ) : updateError ? (
                        <>
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-400">Failed to save</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Auth Section - Show if not logged in */}
            {!user && (
              <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-2xl p-6">
                {!showAuthForm ? (
                  <div className="text-center space-y-4">
                    <h3 className="font-bold text-lg">Link this payment to your account</h3>
                    <p className="text-slate-400 text-sm">
                      Sign in or create an account to track your founder status and access your trial.
                    </p>
                    <button
                      onClick={() => setShowAuthForm(true)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold transition"
                    >
                      Sign In / Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2 justify-center mb-4">
                      <button
                        onClick={() => setIsSignUp(true)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                          isSignUp ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={() => setIsSignUp(false)}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                          !isSignUp ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sign In
                      </button>
                    </div>

                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 px-4 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-slate-700"></div>
                      <span className="text-slate-500 text-sm">or</span>
                      <div className="flex-1 h-px bg-slate-700"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      {isSignUp && (
                        <input
                          type="text"
                          placeholder="Your name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                        />
                      )}
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                        required
                      />

                      {(formError || authError) && (
                        <p className="text-red-400 text-sm">{formError || authError}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-lg font-bold transition"
                      >
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-left">
              <h3 className="font-bold text-lg mb-4">What happens next?</h3>
              <ol className="space-y-3 text-slate-400">
                <li className="flex gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${user ? 'bg-green-600' : 'bg-indigo-600'}`}>
                    {user ? '✓' : '1'}
                  </span>
                  <span className={user ? 'text-green-400' : ''}>
                    {user ? 'Account created and payment linked' : 'Create your account (above)'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Our team will verify your deposit within 24 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>You'll receive an email with your 7-day trial access</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>After the trial, we'll send an invoice for the remaining $399</span>
                </li>
              </ol>
            </div>

            {/* Action Button */}
            <button
              onClick={onBackToHome}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="text-center space-y-8">
            {/* Warning Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-500/20 rounded-full border-4 border-amber-500">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Error Message */}
            <div>
              <h1 className="text-4xl font-black mb-4">Session Not Found</h1>
              <p className="text-xl text-slate-400">
                We couldn't verify your payment session.
              </p>
            </div>

            {/* Info Card */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 text-left">
              <p className="text-slate-400 mb-4">This could happen if:</p>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex gap-2">
                  <span className="text-amber-500">-</span>
                  You accessed this page directly without completing payment
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">-</span>
                  The payment link has expired or was already used
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">-</span>
                  There was an issue with the redirect from Stripe
                </li>
              </ul>
            </div>

            {/* Debug Info (if session_id was provided but invalid) */}
            {sessionId && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-left">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Received Session ID</label>
                <div className="mt-1 font-mono text-xs text-red-400 break-all">
                  {sessionId}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Expected format: cs_live_... or cs_test_...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBackToHome}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                Back to Home
              </button>
              <a
                href="mailto:support@leadsig.com"
                className="border border-slate-700 hover:border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-bold transition text-center"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
