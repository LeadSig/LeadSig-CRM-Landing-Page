
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { StripeGuide } from './components/StripeGuide';
import { FirebaseGuide } from './components/FirebaseGuide';
import { DeploymentGuide } from './components/DeploymentGuide';
import { AdminDashboard } from './components/AdminDashboard';
import { SuccessPage } from './components/SuccessPage';
import { Header } from './components/Header';
import { useHashRouter } from './hooks/useHashRouter';

export type AppView = 'landing' | 'stripe' | 'firebase' | 'deployment' | 'admin' | 'success';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const { path, sessionId, clearHash } = useHashRouter();

  // Handle URL-based routing (e.g., /#/success?session_id=cs_test_123)
  useEffect(() => {
    if (path === 'success') {
      setCurrentView('success');
    }
  }, [path]);

  // Handle navigation back to home (clears the hash)
  const handleBackToHome = () => {
    clearHash();
    setCurrentView('landing');
  };

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
      case 'success':
        return <SuccessPage sessionId={sessionId} onBackToHome={handleBackToHome} />;
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
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-indigo-400">LEADSIG CRM</div>
          <p className="text-slate-400 text-sm">© 2024 LeadSig. Founders Lifetime Deal (Cohort 001)</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
