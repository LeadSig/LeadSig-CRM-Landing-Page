
import React from 'react';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  // Stripe payment link for Founder Access
  const paymentLink = "https://buy.stripe.com/aFa00icvZ8Ua9zA9FTgjC00";

  const handleCtaClick = () => {
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="min-h-screen">
      <LandingPage onCtaClick={handleCtaClick} />
    </div>
  );
};

export default App;
