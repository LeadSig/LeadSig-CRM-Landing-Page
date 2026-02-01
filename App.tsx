
import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StripeGuide } from './components/StripeGuide';
import { FirebaseGuide } from './components/FirebaseGuide';
import { DeploymentGuide } from './components/DeploymentGuide';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';

export type AppView = 'landing' | 'stripe' | 'firebase' | 'deployment' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onCtaClick={() => setCurrentView('stripe')} />;
      case 'stripe':
        return <StripeGuide onNext={() => setCurrentView('firebase')} />;
      case 'firebase':
        return <FirebaseGuide onNext={() => setCurrentView('deployment')} />;
      case 'deployment':
        return <DeploymentGuide onNext={() => setCurrentView('admin')} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LandingPage onCtaClick={() => setCurrentView('stripe')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow">
        {renderView()}
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
