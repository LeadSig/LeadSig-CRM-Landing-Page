
import React from 'react';
import { AppView } from '../App';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems: { label: string; value: AppView }[] = [
    { label: 'Landing Page', value: 'landing' },
    { label: 'Stripe Setup', value: 'stripe' },
    { label: 'Firebase Setup', value: 'firebase' },
    { label: 'GCP Deployment', value: 'deployment' },
    { label: 'Admin Portal', value: 'admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer text-indigo-500 hover:text-indigo-400 transition"
          onClick={() => setView('landing')}
        >
          LEADSIG<span className="text-slate-200"> CRM</span>
        </div>
        
        <nav className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-lg">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                currentView === item.value 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
