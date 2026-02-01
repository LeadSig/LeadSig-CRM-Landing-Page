
import React, { useState } from 'react';

interface Founder {
  id: string;
  name: string;
  email: string;
  depositStatus: 'Paid' | 'Pending';
  trialStatus: 'Inactive' | 'Active';
}

export const AdminDashboard: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([
    { id: '1', name: 'Joe Foreman', email: 'joe@hardscapes.com', depositStatus: 'Paid', trialStatus: 'Inactive' },
    { id: '2', name: 'Bill Diggs', email: 'bill@excavation.net', depositStatus: 'Pending', trialStatus: 'Inactive' },
    { id: '3', name: 'Samantha Bloom', email: 'sam@blooms.io', depositStatus: 'Pending', trialStatus: 'Inactive' },
  ]);

  const toggleVerify = (id: string) => {
    setFounders(prev => prev.map(f => f.id === id ? { ...f, depositStatus: 'Paid' } : f));
  };

  const toggleTrial = (id: string) => {
    setFounders(prev => prev.map(f => f.id === id ? { ...f, trialStatus: f.trialStatus === 'Active' ? 'Inactive' : 'Active' } : f));
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 bg-[#363020]">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2 text-white">Cohort 001 Management</h2>
          <p className="text-[#6e7e85]">Manual verification portal for LeadSig Founders.</p>
        </div>
        <div className="bg-[#4c934c]/10 border border-[#4c934c]/30 px-6 py-4 rounded-xl text-center">
          <div className="text-3xl font-black text-[#91cb3e]">{founders.filter(f => f.depositStatus === 'Paid').length} / 100</div>
          <div className="text-xs uppercase tracking-widest font-bold text-[#4c934c]">Spots Claimed</div>
        </div>
      </div>

      <div className="bg-[#363020]/80 border border-[#4c934c]/30 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#363020] border-b border-[#4c934c]/30 text-xs uppercase tracking-widest font-bold text-[#6e7e85]">
            <tr>
              <th className="px-6 py-4">Founder Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Deposit</th>
              <th className="px-6 py-4">Trial Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4c934c]/20">
            {founders.map((founder) => (
              <tr key={founder.id} className="hover:bg-[#4c934c]/10 transition-colors">
                <td className="px-6 py-6 font-bold text-white">{founder.name}</td>
                <td className="px-6 py-6 text-[#6e7e85]">{founder.email}</td>
                <td className="px-6 py-6">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    founder.depositStatus === 'Paid' ? 'bg-[#91cb3e]/10 text-[#91cb3e] border border-[#91cb3e]/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {founder.depositStatus}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    founder.trialStatus === 'Active' ? 'bg-[#021cfd]/10 text-[#021cfd] border border-[#021cfd]/20' : 'bg-[#363020] text-[#6e7e85]'
                  }`}>
                    {founder.trialStatus}
                  </span>
                </td>
                <td className="px-6 py-6 text-right space-x-3">
                  {founder.depositStatus === 'Pending' && (
                    <button
                      onClick={() => toggleVerify(founder.id)}
                      className="text-xs font-bold text-[#91cb3e] hover:text-white transition"
                    >
                      Verify Deposit
                    </button>
                  )}
                  <button
                    onClick={() => toggleTrial(founder.id)}
                    className="text-xs font-bold text-[#6e7e85] hover:text-white transition"
                  >
                    {founder.trialStatus === 'Active' ? 'Stop Trial' : 'Start Trial'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {founders.length === 0 && (
          <div className="py-24 text-center text-[#6e7e85] italic">No founders registered yet.</div>
        )}
      </div>

      <div className="mt-12 p-8 bg-[#4c934c] rounded-2xl flex items-center justify-between text-white">
        <div>
          <h4 className="text-xl font-bold mb-1">Ready to scale Cohort 002?</h4>
          <p className="text-white/80 text-sm">Transition to fully automated Stripe Webhooks when cohort reaches capacity.</p>
        </div>
        <button className="bg-[#021cfd] text-white px-6 py-3 rounded-lg font-bold shadow-xl hover:bg-[#0118cc]">Setup Webhooks</button>
      </div>
    </div>
  );
};
