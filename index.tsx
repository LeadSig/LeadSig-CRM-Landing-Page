import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  BarChart3, 
  Sparkles,
  Search,
  Mail,
  Building2,
  Lock,
  MessageSquare,
  Globe
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const LeadSigApp = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [leadInput, setLeadInput] = useState({
    company: '',
    industry: '',
    challenge: '',
    url: ''
  });
  const [leadAnalysis, setLeadAnalysis] = useState<any>(null);

  const analyzeLead = async () => {
    if (!leadInput.company) return;
    setLoading(true);
    try {
      const prompt = `
        Analyze this potential lead for a CRM sales team:
        Company: ${leadInput.company}
        Industry: ${leadInput.industry}
        Main Challenge: ${leadInput.challenge}
        Website: ${leadInput.url}

        Provide a structured "Lead Signature" (LeadSig) analysis.
        Include:
        1. Lead Score (1-100)
        2. Key Buying Triggers
        3. A personalized cold outreach email draft.
        4. Predicted Objection and Rebuttal.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
              outreach: { type: Type.STRING },
              objection: { type: Type.STRING },
              rebuttal: { type: Type.STRING }
            },
            required: ["score", "triggers", "outreach", "objection", "rebuttal"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setLeadAnalysis(data);
      setActiveTab('dashboard');
    } catch (error) {
      console.error("Error analyzing lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Target className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-jakarta">LeadSig <span className="text-blue-500">CRM</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">Features</button>
            <button className="hover:text-white transition-colors">Testimonials</button>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Master Dashboard</button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
              Get Lifetime Deal
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {activeTab === 'landing' ? (
          <LandingPage onAnalyzeClick={() => {
            const el = document.getElementById('demo-tool');
            el?.scrollIntoView({ behavior: 'smooth' });
          }} />
        ) : (
          <Dashboard leadAnalysis={leadAnalysis} />
        )}
      </div>

      {/* Demo Tool Section */}
      {activeTab === 'landing' && (
        <section id="demo-tool" className="py-24 bg-gray-950">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                AI Powered Demo
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Experience the Master Build</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Generate a "Lead Signature" instantly. Our AI analyzes your prospect's digital footprint to tell you exactly how to close them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Search className="text-blue-500" size={20} />
                  Identify Your Lead
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                      value={leadInput.company}
                      onChange={(e) => setLeadInput({...leadInput, company: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                      <input 
                        type="text" 
                        placeholder="SaaS, Real Estate..."
                        className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                        value={leadInput.industry}
                        onChange={(e) => setLeadInput({...leadInput, industry: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Website (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="www.acme.com"
                        className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                        value={leadInput.url}
                        onChange={(e) => setLeadInput({...leadInput, url: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Primary Pain Point</label>
                    <textarea 
                      placeholder="What is their biggest struggle?"
                      className="w-full bg-gray-900 border border-white/5 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white resize-none"
                      value={leadInput.challenge}
                      onChange={(e) => setLeadInput({...leadInput, challenge: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    onClick={analyzeLead}
                    disabled={loading || !leadInput.company}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Generate Lead Signature
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Zap className="text-green-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Instant Intelligence</h4>
                      <p className="text-gray-400 text-sm">LeadSig scrapes and analyzes data points in seconds, not hours.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <MessageSquare className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Personality Mapping</h4>
                      <p className="text-gray-400 text-sm">Know the exact tone and message that will resonate with your prospect.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-amber-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Founders Exclusive</h4>
                      <p className="text-gray-400 text-sm">Early adopters get lifetime access to all future AI model upgrades.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Target className="text-blue-500" size={28} />
            <span className="text-2xl font-bold text-white">LeadSig CRM</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">© 2024 LeadSig Founders Edition. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-gray-400 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LandingPage = ({ onAnalyzeClick }: { onAnalyzeClick: () => void }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-blue-300 text-sm font-medium mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Founders Lifetime Deal Available — 87/100 spots remaining
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight font-jakarta">
            The Last CRM You'll <br />
            <span className="gradient-text">Ever Need to Buy.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop paying monthly for complex bloatware. Get AI-powered lead generation, automated signatures, and conversion-focused pipelines for a single one-time payment.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={onAnalyzeClick}
              className="w-full md:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-blue-600/30 transition-all hover:-translate-y-1"
            >
              Reserve Founder Spot
            </button>
            <button className="w-full md:w-auto px-10 py-5 glass hover:bg-white/10 text-white font-bold rounded-2xl text-lg transition-all">
              Watch Master Build Demo
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-24 pt-12 border-t border-white/5">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Trusted by scaling founders worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 text-2xl font-bold"><Building2 size={24}/> VENTURE</div>
              <div className="flex items-center gap-2 text-2xl font-bold"><Globe size={24}/> GLOBAL.CO</div>
              <div className="flex items-center gap-2 text-2xl font-bold"><Users size={24}/> FOUNDRY</div>
              <div className="flex items-center gap-2 text-2xl font-bold"><ShieldCheck size={24}/> SECURE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Lifetime Deal Card */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[32px] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-10 md:p-14 rounded-[32px] text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-2 uppercase tracking-widest">Founders Special</h3>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">$497</span>
                <div className="text-left">
                  <span className="block text-gray-500 line-through text-lg font-bold">$197/mo</span>
                  <span className="block text-xs font-bold text-green-500 uppercase">One-Time Payment</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10 text-left">
                {[
                  "Unlimited Lead Analysis via Gemini AI",
                  "Unlimited Contacts & Pipelines",
                  "Automated Email Outreach Engine",
                  "Advanced Multi-Channel Prospecting",
                  "Early Access to All Beta Features",
                  "Exclusive Founders Discord Channel",
                  "White-Glove Migration Service"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-white text-black font-black text-xl rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-white/10 active:scale-95">
                JOIN THE FOUNDERS CIRCLE
              </button>
              <p className="mt-6 text-gray-500 text-sm flex items-center justify-center gap-2">
                <Lock size={14} /> 
                Secure Checkout • 30 Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl group hover:border-blue-500/50 transition-colors">
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="text-blue-500" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">LeadSig Engine</h4>
            <p className="text-gray-400 leading-relaxed">Our proprietary AI model identifies "buying signatures" in prospect behavior that standard CRMs miss.</p>
          </div>
          <div className="glass p-8 rounded-3xl group hover:border-purple-500/50 transition-colors">
            <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-purple-500" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Master Build Dashboard</h4>
            <p className="text-gray-400 leading-relaxed">Visualize your entire sales funnel with high-definition clarity and predictive revenue forecasting.</p>
          </div>
          <div className="glass p-8 rounded-3xl group hover:border-pink-500/50 transition-colors">
            <div className="w-14 h-14 bg-pink-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="text-pink-500" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">Hyper-Outreach</h4>
            <p className="text-gray-400 leading-relaxed">Automate personalized outreach at scale across LinkedIn, Email, and SMS with a single click.</p>
          </div>
        </div>
      </section>
    </>
  );
};

const Dashboard = ({ leadAnalysis }: { leadAnalysis: any }) => {
  if (!leadAnalysis) return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center glass p-12 rounded-3xl border border-white/10 max-w-md w-full">
        <Target className="text-blue-500 mx-auto mb-6 animate-pulse" size={64} />
        <h2 className="text-2xl font-bold text-white mb-4">No Data Analyzed</h2>
        <p className="text-gray-400 mb-8">Please use the demo tool on the landing page to generate your first Lead Signature.</p>
        <button 
           onClick={() => window.location.href = '#demo-tool'}
           className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl"
        >
          Go to Tool
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1 glass p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">Lead Signature Report</h2>
            <div className="text-right">
              <div className="text-5xl font-black text-blue-500">{leadAnalysis.score}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lead Signature Score</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  Buying Triggers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {leadAnalysis.triggers.map((t: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" />
                  Objection Rebuttal
                </h4>
                <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 italic mb-2">"{leadAnalysis.objection}"</p>
                  <p className="text-sm text-white font-medium">Rebuttal: {leadAnalysis.rebuttal}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Mail size={16} className="text-purple-500" />
                AI Outreach Draft
              </h4>
              <div className="p-5 bg-gray-950 rounded-xl border border-white/10 relative group">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                  {leadAnalysis.outreach}
                </pre>
                <button className="absolute top-4 right-4 text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Copy Draft
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 space-y-4">
          <div className="glass p-6 rounded-3xl">
            <h4 className="font-bold text-white mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full py-3 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2">
                <Mail size={18} /> Send Email
              </button>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2">
                <Users size={18} /> Add to CRM
              </button>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 text-red-400">
                <Lock size={18} /> Mark Cold
              </button>
            </div>
          </div>
          <div className="glass p-6 rounded-3xl">
             <div className="flex items-center gap-2 text-amber-500 font-bold mb-2">
               <Zap size={18}/> FOUNDER BONUS
             </div>
             <p className="text-xs text-gray-400">You have <b>9,998</b> AI credits remaining for this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<LeadSigApp />);
}
