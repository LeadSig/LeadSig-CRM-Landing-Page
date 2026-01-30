
import React from 'react';

interface FirebaseGuideProps {
  onNext: () => void;
}

export const FirebaseGuide: React.FC<FirebaseGuideProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h2 className="text-4xl font-black mb-4">Part 3: Firebase Architecture</h2>
        <p className="text-slate-400 text-lg">Setting up the data infrastructure to manage the 100-person cohort.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-indigo-400 font-mono">1. User Data Schema</h3>
          <p className="mb-6 text-slate-400">Standardizing the <span className="font-mono text-slate-200">/users/&#123;uid&#125;</span> document fields:</p>
          <div className="bg-slate-950 p-6 rounded-lg font-mono text-xs md:text-sm text-indigo-300 overflow-x-auto">
{`{
  email: "operator@landscaper.com",
  displayName: "Joe Foreman",
  createdAt: serverTimestamp(),
  founderStatus: true,
  founderCohort: "founders_100",
  depositPaid: false, // Updated manually or via Option B
  stripePaymentLinkId: "pl_12345...",
  trialStatus: "pending", // ['pending', 'active', 'completed', 'cancelled']
  trialStartDate: null,
  launchAccessEnabled: false
}`}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-indigo-400">2. Verification Strategy</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-slate-800 p-6 rounded-xl bg-slate-950">
              <h4 className="font-bold mb-3 text-white">Option A: Manual Verification</h4>
              <p className="text-sm text-slate-400 mb-4 italic">(Safest for blocked APIs)</p>
              <ol className="text-sm space-y-2 text-slate-400 list-decimal list-inside">
                <li>User signs up on LeadSig site.</li>
                <li>User pays deposit on Stripe Link.</li>
                <li>Admin gets Stripe email notification.</li>
                <li>Admin logs into LeadSig Admin Panel.</li>
                <li>Admin clicks "Verify Deposit" for user UID.</li>
              </ol>
            </div>
            <div className="border border-indigo-500/20 p-6 rounded-xl bg-indigo-500/5">
              <h4 className="font-bold mb-3 text-white">Option B: Stripe Webhook</h4>
              <p className="text-sm text-slate-400 mb-4 italic">(Hosted on Cloud Run)</p>
              <ul className="text-sm space-y-2 text-slate-400 list-disc list-inside">
                <li>Set up a simple Node.js Express endpoint.</li>
                <li>Listen for <span className="font-mono">checkout.session.completed</span>.</li>
                <li>Match customer email to Firebase user email.</li>
                <li>Update Firestore <span className="font-mono text-white">depositPaid: true</span>.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 text-indigo-400">3. Auth Configuration</h3>
          <p className="text-slate-400 mb-4">Enable the following in Firebase Console:</p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded text-sm">Email/Password</span>
            <span className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded text-sm">Google Sign-in</span>
            <span className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded text-sm">Email Verification Required</span>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8">
          <button className="text-slate-500 hover:text-white" onClick={() => window.location.reload()}>Previous</button>
          <button 
            onClick={onNext}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold"
          >
            Go to GCP Deployment
          </button>
        </div>
      </div>
    </div>
  );
};
