
import React from 'react';

interface StripeGuideProps {
  onNext: () => void;
}

export const StripeGuide: React.FC<StripeGuideProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h2 className="text-4xl font-black mb-4">Part 2: API-Safe Stripe Setup</h2>
        <p className="text-slate-400 text-lg">Walkthrough for setting up the Founder Deposit without custom backend code.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-3 font-bold text-sm tracking-widest uppercase">Step 1: Create the Product</div>
          <div className="p-8 space-y-4">
            <p>Go to your Stripe Dashboard > Products > <span className="text-indigo-400 font-mono">Add Product</span>.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><span className="text-slate-200 font-bold">Name:</span> $99.99 Founder Access Deposit</li>
              <li><span className="text-slate-200 font-bold">Description:</span> Fully refundable commitment to the LeadSig CRM Founders Cohort.</li>
              <li><span className="text-slate-200 font-bold">Price:</span> $99.99 (One-time)</li>
              <li><span className="text-slate-200 font-bold">Tax:</span> Set to 'None' or 'Exclude' depending on your jurisdiction.</li>
            </ul>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-3 font-bold text-sm tracking-widest uppercase">Step 2: Generate Payment Link</div>
          <div className="p-8 space-y-4">
            <p>From the product page, click <span className="text-indigo-400 font-mono">Create Payment Link</span>.</p>
            <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 font-mono text-sm text-indigo-300">
              Settings to Enable:<br/>
              - Allow promotion codes: Yes<br/>
              - Collect customer address: Optional (recommended for invoice accuracy)<br/>
              - Success page: Redirect to custom URL (https://your-domain.com/#/success)<br/>
              - Redirect behavior: Append Session ID to URL (Crucial for verification)
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-3 font-bold text-sm tracking-widest uppercase">Step 3: Founder Metadata</div>
          <div className="p-8 space-y-4">
            <p>Scroll down to the <span className="text-indigo-400 font-mono">Advanced options</span> of the Payment Link.</p>
            <p className="text-slate-400">Add these metadata keys so you can filter your exports later:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-950 p-3 rounded border border-slate-800"><span className="text-slate-500">Key:</span> founder</div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800"><span className="text-slate-500">Value:</span> true</div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800"><span className="text-slate-500">Key:</span> cohort</div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800"><span className="text-slate-500">Value:</span> founders_100</div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-3 font-bold text-sm tracking-widest uppercase">Step 4: Invoice Workflow (Safe Post-Launch)</div>
          <div className="p-8 space-y-4">
            <p className="text-slate-200">The remaining $399 is handled <span className="italic">post-launch</span> manually:</p>
            <ol className="list-decimal list-inside space-y-3 text-slate-400">
              <li>After the 7-day trial ends, go to the Customer in Stripe.</li>
              <li>Click <span className="text-indigo-400">Create Invoice</span>.</li>
              <li>Add a line item for "$399 Remaining Founder Balance".</li>
              <li>Send invoice via email. This prevents "surprise" charges and ensures compliance.</li>
            </ol>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8">
          <button className="text-slate-500 hover:text-white" disabled>Previous</button>
          <button 
            onClick={onNext}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold"
          >
            Continue to Firebase Setup
          </button>
        </div>
      </div>
    </div>
  );
};
