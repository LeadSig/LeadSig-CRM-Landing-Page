import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAdminFounders, useIsAdmin } from '../hooks/useFirestore';

export const AdminDashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.uid);
  const {
    founders,
    loading: foundersLoading,
    error,
    verifyDeposit,
    startTrial,
    stopTrial,
  } = useAdminFounders();

  const handleVerifyDeposit = async (uid: string) => {
    await verifyDeposit(uid);
  };

  const handleToggleTrial = async (uid: string, currentStatus: string) => {
    if (currentStatus === 'active') {
      await stopTrial(uid);
    } else {
      await startTrial(uid);
    }
  };

  // Loading state
  if (authLoading || adminLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-slate-400">Loading...</p>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-slate-400 mb-6">Please sign in with an admin account to access this dashboard.</p>
          <div className="text-slate-500 text-sm">
            Contact support if you need admin access.
          </div>
        </div>
      </div>
    );
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Access Denied</h2>
          <p className="text-slate-400 mb-6">Your account does not have admin privileges.</p>
          <div className="text-slate-500 text-sm">
            Signed in as: {user.email}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Error Loading Data</h2>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  const paidCount = founders.filter(f => f.depositPaid).length;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2">Cohort 001 Management</h2>
          <p className="text-slate-400">Manual verification portal for LeadSig Founders.</p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/30 px-6 py-4 rounded-xl text-center">
          <div className="text-3xl font-black text-indigo-400">{paidCount} / 100</div>
          <div className="text-xs uppercase tracking-widest font-bold text-indigo-500">Spots Claimed</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {foundersLoading ? (
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-slate-400">Loading founders...</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 border-b border-slate-700 text-xs uppercase tracking-widest font-bold text-slate-400">
              <tr>
                <th className="px-6 py-4">Founder Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Stripe Session</th>
                <th className="px-6 py-4">Deposit</th>
                <th className="px-6 py-4">Trial Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {founders.map((founder) => (
                <tr key={founder.uid} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-6 font-bold">{founder.displayName || 'No name'}</td>
                  <td className="px-6 py-6 text-slate-400">{founder.email}</td>
                  <td className="px-6 py-6">
                    {founder.stripeSessionId ? (
                      <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
                        {founder.stripeSessionId.slice(0, 20)}...
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">No session</span>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      founder.depositPaid
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {founder.depositPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      founder.trialStatus === 'active'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : founder.trialStatus === 'completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : founder.trialStatus === 'cancelled'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {founder.trialStatus}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right space-x-3">
                    {!founder.depositPaid && founder.stripeSessionId && (
                      <button
                        onClick={() => handleVerifyDeposit(founder.uid)}
                        className="text-xs font-bold text-indigo-400 hover:text-white transition"
                      >
                        Verify Deposit
                      </button>
                    )}
                    {founder.depositPaid && founder.trialStatus !== 'completed' && (
                      <button
                        onClick={() => handleToggleTrial(founder.uid, founder.trialStatus)}
                        className="text-xs font-bold text-slate-400 hover:text-white transition"
                      >
                        {founder.trialStatus === 'active' ? 'Stop Trial' : 'Start Trial'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!foundersLoading && founders.length === 0 && (
          <div className="py-24 text-center text-slate-500 italic">No founders registered yet.</div>
        )}
      </div>

      <div className="mt-12 p-8 bg-indigo-600 rounded-2xl flex items-center justify-between text-white">
        <div>
          <h4 className="text-xl font-bold mb-1">Ready to scale Cohort 002?</h4>
          <p className="text-indigo-100 text-sm opacity-80">Transition to fully automated Stripe Webhooks when cohort reaches capacity.</p>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold shadow-xl">Setup Webhooks</button>
      </div>
    </div>
  );
};
