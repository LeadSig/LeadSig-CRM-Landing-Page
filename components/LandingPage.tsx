
import React from 'react';

interface LandingPageProps {
  onCtaClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-[#91cb3e] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-wide bg-[#021cfd]/20 text-[#91cb3e] border border-[#021cfd]/30 rounded-full">
            <span className="w-2 h-2 bg-[#91cb3e] rounded-full animate-pulse"></span>
            Limited to First 100 Founders
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            The First CRM Built for Landscapers That Decides Which Leads Are Worth Your Time
          </h1>
          <div className="flex flex-col gap-2 text-xl md:text-2xl text-slate-400 mb-12 font-medium">
            <p>All your leads in one place.</p>
            <p>Run entirely from your phone.</p>
            <p>Personalized automation qualifies, confirms, and filters leads before anything hits your calendar.</p>
          </div>
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all bg-[#021cfd] rounded-xl hover:bg-[#0118cc] active:scale-95 shadow-[0_0_40px_rgba(2,28,253,0.3)]"
          >
            Secure Founder Access
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
        </div>
      </section>

      {/* FOUNDER LIFETIME DEAL PRICING */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 tracking-tight">Founder Lifetime Deal</h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pricing Left */}
              <div>
                <div className="text-[#021cfd] font-bold text-sm uppercase tracking-widest mb-2">TODAY</div>
                <div className="text-5xl font-black mb-2">$99.99</div>
                <p className="text-slate-400 mb-8">Refundable deposit to reserve your spot</p>

                <div className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-2">AFTER LAUNCH + 7-DAY TRIAL</div>
                <div className="text-3xl font-bold mb-2">$399 remaining</div>
                <p className="text-slate-500">Total: $499 lifetime access</p>
              </div>

              {/* Benefits Right */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#91cb3e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span>One-time payment, no monthly fees ever</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#91cb3e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span>7-day free trial after launch before final payment</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#91cb3e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-[#91cb3e] font-bold">Bonus: 25% lifetime discount on Premium Plan</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#91cb3e] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  <span>Custom marketing + advertising campaign included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THIS IS NOT FOR */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-8">This is NOT for:</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full font-bold">Beginners</span>
            <span className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full font-bold">Price shoppers</span>
            <span className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full font-bold">Volume-lead buyers</span>
          </div>
          <p className="text-slate-400 text-lg">This is for serious landscaping operators who want quality over quantity.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#021cfd] to-[#4c934c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Ready to stop chasing bad leads?</h2>
          <p className="text-xl text-white/80 mb-10">Join the first 100 founders and lock in lifetime access.</p>
          <button
            onClick={onCtaClick}
            className="bg-white text-[#021cfd] px-12 py-6 rounded-xl text-xl font-black hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            $99.99 Founder Deposit
          </button>
        </div>
      </section>
    </div>
  );
};
