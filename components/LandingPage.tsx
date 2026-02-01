
import React from 'react';

interface LandingPageProps {
  onCtaClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
  return (
    <div className="bg-[#363020] text-white selection:bg-[#91cb3e] selection:text-white">
      {/* 1. PATTERN-INTERRUPT HERO */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-[#4c934c]/30 bg-gradient-to-br from-[#2563eb] via-[#0891b2] to-[#4c934c]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 text-white border border-white/20 rounded-full">
            Founder Cohort: 001 / Limited to 100 Seats
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-white">
            Simplify Your Workflow
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4">Streamline Your Business with Our Landscaping</p>
          <p className="text-xl md:text-2xl mb-12"><span className="text-[#021cfd] font-bold">Industry</span> <span className="text-[#91cb3e] font-bold">CRM Solutions</span></p>
          <div className="flex flex-col gap-1 text-xl md:text-2xl text-white/70 mb-12 font-medium tracking-tight">
            <p>All your leads in one place.</p>
            <p>Run entirely from your phone.</p>
            <p>Personalized automation qualifies, confirms, and filters leads before anything hits your calendar.</p>
          </div>
          <button
            onClick={onCtaClick}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-black text-white transition-all bg-[#021cfd] rounded-2xl hover:bg-[#0118cc] active:scale-95 shadow-[0_0_50px_rgba(2,28,253,0.4)]"
          >
            Start Free Trial
            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
          <p className="mt-8 text-white/60 text-sm font-semibold uppercase tracking-widest">
            $99.99 Commitment to Access
          </p>
        </div>
      </section>

      {/* 2. THE CORE FAILURE */}
      <section className="py-24 px-6 bg-[#363020]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight text-white">Software doesn't understand your overhead.</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8 text-lg text-[#6e7e85] leading-relaxed">
              <p>
                Standard CRMs want you to respond to every ping in seconds. They call it "speed-to-lead." But when you're 15 feet in the air or managing a crew of six, a notification for a $200 mulch job is just noise that costs you focus.
              </p>
              <p>
                Unfiltered demand destroys your margins. It fills your calendar with low-intent bids that steal your evening time and force your team to wait for direction while you chase "window shoppers."
              </p>
            </div>
            <div className="space-y-8 text-lg text-[#6e7e85] leading-relaxed">
              <p>
                If your system isn't stopping the noise before it hits your phone, it's not a tool—it's another job you have to manage. Dashboards don't dig holes, and they certainly don't close high-ticket hardscape jobs.
              </p>
              <p>
                We built LeadSig because busy operators don't need more "leads." They need <span className="text-white font-bold">Infrastructure</span> that protects their time and ensures only qualified, high-intent demand hits their calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NAMED MECHANISM */}
      <section className="py-24 px-6 relative bg-[#363020]">
        <div className="max-w-4xl mx-auto text-center border-x border-[#4c934c]/30 bg-gradient-to-b from-transparent via-[#4c934c]/10 to-transparent p-12 md:p-20">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#91cb3e] mb-6">The Mechanism</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white">The Gatekeeper Protocol</h3>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto font-medium">
            LeadSig applies structural logic to every inbound signal, forcing prospects through a verification sequence that confirms budget and scope before you're ever alerted.
          </p>
          <p className="mt-8 text-[#6e7e85] text-lg">
            This isn't "AI magic." It's logic-based friction designed to filter out price shoppers automatically.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-left p-6 bg-[#363020]/80 rounded-xl border border-[#4c934c]/30">
              <div className="text-[#91cb3e] font-bold mb-2">01. Structural Sorting</div>
              <div className="text-[#6e7e85] text-sm">Every lead is categorized by project type and revenue potential before ingestion.</div>
            </div>
            <div className="text-left p-6 bg-[#363020]/80 rounded-xl border border-[#4c934c]/30">
              <div className="text-[#91cb3e] font-bold mb-2">02. Intent Verification</div>
              <div className="text-[#6e7e85] text-sm">Automated follow-ups force the prospect to verify financial readiness.</div>
            </div>
            <div className="text-left p-6 bg-[#363020]/80 rounded-xl border border-[#4c934c]/30">
              <div className="text-[#91cb3e] font-bold mb-2">03. Alert Gating</div>
              <div className="text-[#6e7e85] text-sm">Your phone only rings when the protocol confirms the lead is worth your time.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE FOUNDERS DEAL WORKS */}
      <section className="py-24 px-6 bg-[#363020]/80 border-y border-[#4c934c]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight text-center text-white">Founder Access Logistics</h2>
          <div className="space-y-12">
            {[
              { title: 'Access Commitment', desc: 'Secure your spot in Cohort 001 with a $99.99 deposit today. This is not a purchase; it is a commitment to the infrastructure build-out.', meta: 'Step 01' },
              { title: 'Implementation Phase', desc: 'As a Founder, you work directly with our engineering team to map your business logic into the Gatekeeper Protocol.', meta: 'Step 02' },
              { title: '7-Day Field Trial', desc: 'Once launch-ready, you get 7 days of live infrastructure testing. Run your actual business volume through LeadSig at zero additional cost.', meta: 'Step 03' },
              { title: 'Lifetime Lock-in', desc: 'After your trial, pay the remaining $399 to reach your $499 total. You are locked in for life. No monthly fees, ever. Or walk away and we refund your deposit.', meta: 'Step 04' }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-12 border-l border-[#4c934c]/50">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-[#363020] border-2 border-[#4c934c] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#91cb3e] rounded-full"></div>
                </div>
                <div className="mb-2 text-[#91cb3e] font-mono text-xs font-bold uppercase tracking-widest">{item.meta}</div>
                <h4 className="text-2xl font-bold mb-3 text-white">{item.title}</h4>
                <p className="text-[#6e7e85] text-lg leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO THIS IS FOR / NOT FOR */}
      <section className="py-24 px-6 bg-[#363020]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight text-center text-white">Operational Readiness</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 bg-[#4c934c]/10 border border-[#4c934c]/30 rounded-3xl">
              <h4 className="text-2xl font-bold text-white mb-8 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#91cb3e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                This is for you if:
              </h4>
              <ul className="space-y-6 text-white/80 font-medium">
                <li className="flex items-start"><span className="text-[#91cb3e] mr-3">•</span> You are an established operator with existing lead flow.</li>
                <li className="flex items-start"><span className="text-[#91cb3e] mr-3">•</span> You value long-term infrastructure over short-term "apps."</li>
                <li className="flex items-start"><span className="text-[#91cb3e] mr-3">•</span> You manage crews and jobs primarily from your phone.</li>
                <li className="flex items-start"><span className="text-[#91cb3e] mr-3">•</span> You are ready to stop "chasing" and start "filtering."</li>
              </ul>
            </div>
            <div className="p-10 bg-[#363020]/80 border border-[#6e7e85]/30 rounded-3xl opacity-80">
              <h4 className="text-2xl font-bold text-[#6e7e85] mb-8 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#6e7e85]/60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                Disqualified if:
              </h4>
              <ul className="space-y-6 text-[#6e7e85] font-medium">
                <li className="flex items-start"><span className="text-[#6e7e85]/60 mr-3">•</span> You are "just looking" for pricing options.</li>
                <li className="flex items-start"><span className="text-[#6e7e85]/60 mr-3">•</span> You are a beginner without active project volume.</li>
                <li className="flex items-start"><span className="text-[#6e7e85]/60 mr-3">•</span> You want to buy volume-leads (we don't sell data).</li>
                <li className="flex items-start"><span className="text-[#6e7e85]/60 mr-3">•</span> You prioritize "low cost" over "high control."</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SCARCITY LOGIC */}
      <section className="py-32 px-6 overflow-hidden relative border-t border-[#4c934c]/30 bg-[#363020]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white">The Quantified Cost of Waiting.</h2>
          <p className="text-xl md:text-2xl text-[#6e7e85] leading-relaxed mb-16 italic">
            "We are limiting this to 100 operators because we aren't just giving you a login. We are manually configuring your infrastructure. Every lost estimate because you were 'too busy' is a bid you paid for but never collected."
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-[#363020]/80 border border-[#4c934c]/30 rounded-2xl">
              <div className="text-[#91cb3e] font-black text-2xl mb-4">Time Leakage</div>
              <p className="text-[#6e7e85]">The average operator loses 5-8 hours per week to low-intent estimates. At $100/hr, that's $32k/year in wasted time alone.</p>
            </div>
            <div className="p-8 bg-[#363020]/80 border border-[#4c934c]/30 rounded-2xl">
              <div className="text-[#91cb3e] font-black text-2xl mb-4">Opportunity Cost</div>
              <p className="text-[#6e7e85]">Missing a high-ticket hardscape lead because you were filtering mulch inquiries is a failure of infrastructure, not effort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA + TRUST + FAQ */}
      <section className="py-32 px-6 bg-[#4c934c] rounded-t-[5rem] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Commit to Access.</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 font-medium">Stop managing leads. Start managing infrastructure.</p>
            <button
              onClick={onCtaClick}
              className="bg-[#021cfd] text-white px-16 py-8 rounded-2xl text-2xl font-black hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              $99.99 Founder Deposit
            </button>
            <div className="mt-10 flex items-center justify-center gap-3 text-white/80 font-bold uppercase tracking-widest text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.397 9.331-6 12.127A11.956 11.956 0 012.166 7c0-.68.056-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Infrastructure Access Commitment
            </div>
          </div>

          <div className="border-t border-white/20 pt-20">
            <h3 className="text-4xl font-black mb-16 text-center tracking-tight">Operator FAQ</h3>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                { q: "Is the deposit a purchase?", a: "No. It's a commitment to secure your place in the first 100-operator cohort. We use this to fund the manual implementation of your protocol." },
                { q: "Can I get a refund?", a: "Yes. If during your 7-day field trial at launch you decide the infrastructure isn't for you, we refund the $99.99 deposit immediately." },
                { q: "What happens at launch?", a: "You'll be the first to go live. Our team will guide you through the switch from your current system to LeadSig's Gatekeeper Protocol." },
                { q: "Why only 100 spots?", a: "Infrastructure requires manual setup. To ensure every Founder is successful, we can only handle 100 implementations in the first cohort." }
              ].map((faq, i) => (
                <div key={i} className="group">
                  <div className="font-black text-xl mb-4 text-white group-hover:text-[#91cb3e] transition-colors">{faq.q}</div>
                  <div className="text-white/70 text-lg leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
