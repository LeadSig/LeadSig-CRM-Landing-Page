
import React, { useState } from 'react';

interface LandingPageProps {
  onCtaClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-900">
      {/* MOTION BANNER */}
      <div className="bg-[#021cfd] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-3">
          <span className="mx-8 text-white font-semibold">🚀 Limited to First 100 Founders</span>
          <span className="mx-8 text-white font-semibold">💰 $99.99 Refundable Deposit</span>
          <span className="mx-8 text-white font-semibold">⚡ Lifetime Access - No Monthly Fees</span>
          <span className="mx-8 text-white font-semibold">🎯 Built for Landscapers</span>
          <span className="mx-8 text-white font-semibold">🚀 Limited to First 100 Founders</span>
          <span className="mx-8 text-white font-semibold">💰 $99.99 Refundable Deposit</span>
          <span className="mx-8 text-white font-semibold">⚡ Lifetime Access - No Monthly Fees</span>
          <span className="mx-8 text-white font-semibold">🎯 Built for Landscapers</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold text-black">LeadSig</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:333-333-3333" className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4c934c] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="font-bold text-[#363020] text-lg underline">333-333-3333</span>
            </a>
            <button
              onClick={onCtaClick}
              className="px-8 py-3 bg-white border-2 border-black font-bold hover:bg-gray-100 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <p className="text-xl text-gray-600">Trusted by 50+ Landscaping Companies</p>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                Stop Chasing Bad Leads. Start Closing High-Ticket Jobs.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                No more wasted evenings quoting $200 mulch jobs. LeadSig automatically qualifies, confirms, and filters leads before they hit your calendar—so you only talk to serious buyers.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={onCtaClick}
                className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition shadow-lg"
              >
                SECURE FOUNDER ACCESS
              </button>
              <p className="text-gray-600 font-semibold">
                ✓ 7-Day Free Trial &nbsp; ✓ $99.99 Refundable Deposit &nbsp; ✓ Cancel Anytime
              </p>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="flex-1 w-full">
            <div className="bg-white border-2 border-black aspect-video flex items-center justify-center p-8">
              <p className="text-2xl font-bold text-center text-black">
                📱 CRM Dashboard Preview<br/>
                <span className="text-lg font-normal text-gray-600">Mobile-first lead management</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-black py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-3xl font-semibold text-black">
            "Increased our close rate by 40% in the first month"
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-20 px-6 md:px-10 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            What Landscapers Are Saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mike R.", company: "Elite Hardscapes", quote: "Finally, a CRM that gets landscaping. No more tire-kickers wasting my time." },
              { name: "Sarah T.", company: "Green Thumb Pro", quote: "The AI qualification saved me 10+ hours per week. Game changer." },
              { name: "Dave K.", company: "Premier Landscapes", quote: "Closed 3 $15K+ jobs in my first month. The ROI is insane." }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white border-2 border-black p-8 flex flex-col justify-center">
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <p className="font-bold text-black">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.company}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              JOIN THE FOUNDERS
            </button>
          </div>
        </div>
      </section>

      {/* PAIN POINT SECTION */}
      <section className="py-20 px-6 md:px-10 bg-white border-y border-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-semibold text-black">
            Standard CRMs Don't Understand Your Overhead
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            They want you to respond to every ping in seconds. They call it "speed-to-lead."
            But when you're 15 feet in the air or managing a crew of six, a notification for a
            $200 mulch job is just noise that costs you focus and kills your margins.
          </p>
          <button
            onClick={onCtaClick}
            className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
          >
            SEE THE SOLUTION
          </button>
        </div>
      </section>

      {/* VALUE PROP SECTION 1 */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="bg-white border border-black aspect-video flex items-center justify-center">
              <p className="text-2xl font-bold text-center p-8">🎯 AI Lead Qualification Demo</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-gray-600 font-semibold uppercase tracking-wide">Automatic Lead Filtering</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-black">
              Only Talk to Buyers Who Are Ready to Pay
            </h3>
            <p className="text-lg text-gray-600">
              Our AI pre-qualifies every lead based on project size, budget signals, and intent markers.
              Low-value inquiries get filtered out automatically—you only see opportunities worth your time.
            </p>
            <button
              onClick={onCtaClick}
              className="px-10 py-5 bg-[#4c934c] text-white font-bold rounded-lg hover:bg-[#3d7a3d] transition"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* VALUE PROP SECTION 2 */}
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <div className="bg-white border border-black aspect-video flex items-center justify-center">
              <p className="text-2xl font-bold text-center p-8">📱 Mobile Dashboard Preview</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-gray-600 font-semibold uppercase tracking-wide">Run From Your Phone</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-black">
              Manage Your Pipeline From the Job Site
            </h3>
            <p className="text-lg text-gray-600">
              No more running back to the office. Approve quotes, schedule follow-ups, and close deals
              right from your phone—even while supervising a crew or meeting with clients.
            </p>
            <button
              onClick={onCtaClick}
              className="px-10 py-5 bg-[#4c934c] text-white font-bold rounded-lg hover:bg-[#3d7a3d] transition"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* VALUE PROP SECTION 3 */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="bg-white border border-black aspect-video flex items-center justify-center">
              <p className="text-2xl font-bold text-center p-8">⚡ Automated Follow-Up System</p>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-gray-600 font-semibold uppercase tracking-wide">Never Lose a Lead Again</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-black">
              Automated Follow-Ups That Feel Personal
            </h3>
            <p className="text-lg text-gray-600">
              LeadSig sends personalized follow-up messages on your behalf—texts, emails, and reminders
              that sound like you. Leads stay warm while you focus on the work that pays.
            </p>
            <button
              onClick={onCtaClick}
              className="px-10 py-5 bg-[#4c934c] text-white font-bold rounded-lg hover:bg-[#3d7a3d] transition"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION 2 */}
      <section className="py-20 px-6 md:px-10 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            Results That Speak for Themselves
          </h2>

          <div className="bg-white border-2 border-black p-12 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl font-bold text-[#4c934c]">40%</p>
                <p className="text-lg text-gray-600">Higher Close Rate</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#4c934c]">10hrs</p>
                <p className="text-lg text-gray-600">Saved Per Week</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-[#4c934c]">3x</p>
                <p className="text-lg text-gray-600">More High-Ticket Jobs</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              GET THESE RESULTS
            </button>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS SECTION */}
      <section className="py-20 px-6 md:px-10 bg-white border-y border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            Why LeadSig Is Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Built for Landscapers", desc: "Not a generic CRM adapted for your industry" },
              { title: "AI-Powered Filtering", desc: "Automatically removes low-value leads" },
              { title: "Mobile-First Design", desc: "Manage everything from your phone" },
              { title: "Personalized Automation", desc: "Follow-ups that sound like you wrote them" },
              { title: "No Monthly Fees", desc: "One-time payment, lifetime access" },
              { title: "7-Day Free Trial", desc: "Test it before your final payment" }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-black p-8 text-center">
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              CLAIM YOUR SPOT
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 md:px-10 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Connect Your Leads", desc: "Sync your website forms, Google Business, and social media in minutes" },
              { step: "2", title: "AI Qualifies Automatically", desc: "Our system filters and scores every lead based on your criteria" },
              { step: "3", title: "Close More Deals", desc: "Focus only on high-intent buyers ready to pay premium prices" }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-black p-8 text-center">
                <div className="w-12 h-12 bg-[#4c934c] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              START NOW
            </button>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-20 px-6 md:px-10 bg-white border-y border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            Built By Landscapers, For Landscapers
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-black p-8 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="text-xl font-bold">Founder Name</h4>
              <p className="text-gray-600">15+ years in landscaping operations</p>
            </div>
            <div className="bg-white border-2 border-black p-8 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="text-xl font-bold">Co-Founder Name</h4>
              <p className="text-gray-600">Tech lead, former CRM developer</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              JOIN OUR MISSION
            </button>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-20 px-6 md:px-10 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-black">
            100% Risk-Free Guarantee
          </h2>

          <div className="bg-white border-2 border-black p-12 max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🛡️</div>
            <h4 className="text-2xl font-bold mb-4">Full Refund, No Questions Asked</h4>
            <p className="text-lg text-gray-600">
              Your $99.99 deposit is fully refundable until launch. After launch, you get a 7-day free trial
              before your final payment. If LeadSig doesn't transform your lead management, you pay nothing.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={onCtaClick}
              className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition"
            >
              RESERVE RISK-FREE
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR 2 */}
      <section className="border-b border-black py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-3xl font-semibold text-black">
            "Best investment I've made for my business this year"
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#363020]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: "What happens after I pay the $99.99 deposit?", a: "You'll get immediate access to our founders community and early previews. When we launch, you'll have a 7-day free trial before your final $399 payment." },
              { q: "Is my deposit refundable?", a: "Yes! Your deposit is 100% refundable at any time before launch, no questions asked." },
              { q: "What if I'm not tech-savvy?", a: "LeadSig is designed for busy landscapers, not tech experts. Setup takes minutes and works right from your phone." },
              { q: "How is this different from other CRMs?", a: "We're built specifically for landscaping operations with AI that understands your business. No generic tools adapted for your industry." },
              { q: "What's included in the lifetime deal?", a: "Everything: AI lead qualification, mobile app, automated follow-ups, and all future updates. No monthly fees ever." },
              { q: "Can I get a demo first?", a: "We'll be releasing demo videos soon. Join as a founder to get early access and direct input on features." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-black">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-4 flex justify-between items-center text-left"
                >
                  <span className="text-xl font-bold text-[#363020]">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="pb-4 text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 px-6 md:px-10 bg-[#EBEBEB]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <p className="text-xl text-gray-600">Only 87 Founder Spots Remaining</p>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-black">
                Ready to Stop Chasing Bad Leads and Start Closing High-Ticket Jobs?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join the first 100 landscaping operators who are building the future of lead management.
                Lock in lifetime access before we open to the public at full price.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#91cb3e] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700">Lifetime access for $499 total (vs $99/month)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#91cb3e] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700">7-day free trial after launch</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#91cb3e] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700">100% refundable deposit</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onCtaClick}
                className="px-14 py-6 bg-[#4c934c] text-white font-bold text-xl rounded-lg hover:bg-[#3d7a3d] transition shadow-lg"
              >
                SECURE FOUNDER ACCESS - $99.99
              </button>
              <p className="text-gray-600 font-semibold">
                🔒 Secure payment via Stripe
              </p>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="flex-1 w-full">
            <div className="bg-white border-2 border-black aspect-video flex items-center justify-center p-8">
              <p className="text-2xl font-bold text-center text-black">
                📊 Success Story Video<br/>
                <span className="text-lg font-normal text-gray-600">See how landscapers are winning</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 md:px-10 bg-white border-t border-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-semibold text-black">LeadSig CRM</p>
          <p className="text-gray-600 mt-2">© 2024 LeadSig. Built for Landscapers.</p>
          <div className="flex justify-center gap-6 mt-4 text-gray-600">
            <a href="#" className="hover:text-black transition">Privacy</a>
            <a href="#" className="hover:text-black transition">Terms</a>
            <a href="#" className="hover:text-black transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
