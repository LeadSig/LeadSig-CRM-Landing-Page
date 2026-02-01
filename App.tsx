
import React from 'react';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  // Payment link - replace with your actual Stripe payment link
  const paymentLink = "https://buy.stripe.com/test_yourpaymentlink";

  const handleCtaClick = () => {
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <LandingPage onCtaClick={handleCtaClick} />
      </main>
      <footer className="bg-[#363020] border-t border-[#4c934c]/30 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-[#021cfd]">LEADSIG <span className="text-white">CRM</span></div>
          <p className="text-[#6e7e85] text-sm">© 2024 LeadSig. Founders Lifetime Deal (Cohort 001)</p>
          <div className="flex gap-6 text-sm text-[#6e7e85]">
            <a href="#" className="hover:text-[#91cb3e] transition">Privacy</a>
            <a href="#" className="hover:text-[#91cb3e] transition">Terms</a>
            <a href="#" className="hover:text-[#91cb3e] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
