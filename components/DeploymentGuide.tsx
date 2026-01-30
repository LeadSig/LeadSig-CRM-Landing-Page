
import React from 'react';

interface DeploymentGuideProps {
  onNext: () => void;
}

export const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h2 className="text-4xl font-black mb-4">Part 4: GCP Deployment Strategy</h2>
        <p className="text-slate-400 text-lg">Launching for the first 100 operators with high reliability.</p>
      </div>

      <div className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 text-white">Path A: Firebase Hosting</h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">Best for the React Landing Page.</p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-indigo-300">
              # 1. Install CLI<br/>
              npm install -g firebase-tools<br/><br/>
              # 2. Build App<br/>
              npm run build<br/><br/>
              # 3. Deploy<br/>
              firebase deploy --only hosting
            </div>
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4 text-white">Path B: Cloud Run</h3>
            <p className="text-sm text-slate-400 mb-6 font-medium">Best for dynamic admin verification logic.</p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-indigo-300">
              # 1. Build Image<br/>
              gcloud builds submit --tag gcr.io/leadsig-crm/api<br/><br/>
              # 2. Deploy Service<br/>
              gcloud run deploy api --image gcr.io/leadsig-crm/api
            </div>
          </section>
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 text-indigo-400">Launch Checklist</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Connect custom domain</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> SSL Certificate propagation</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Stripe Success URL verified</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Firebase Security Rules set</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Environment variables synced</li>
            </ul>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Mobile layout responsiveness</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Test manual verification flow</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Email notifications configured</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Firestore index creation</li>
              <li className="flex items-center"><input type="checkbox" className="mr-3" /> Analytics tracking active</li>
            </ul>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8">
          <button className="text-slate-500 hover:text-white" disabled>Previous</button>
          <button 
            onClick={onNext}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold"
          >
            View Admin Dashboard Demo
          </button>
        </div>
      </div>
    </div>
  );
};
