
import React from 'react';

interface SuccessPageProps {
  sessionId: string | null;
  onBackToHome: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ sessionId, onBackToHome }) => {
  const isValidSession = sessionId && sessionId.startsWith('cs_');

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
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-left">
              <h3 className="font-bold text-lg mb-4">What happens next?</h3>
              <ol className="space-y-3 text-slate-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Our team will verify your deposit within 24 hours</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>You'll receive an email with your 7-day trial access</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
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
