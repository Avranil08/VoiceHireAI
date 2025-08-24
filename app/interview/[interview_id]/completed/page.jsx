import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

const InterviewComplete = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 gap-y-16'> {/* Use gap-y for overall vertical spacing */}
      <div className='text-center'>
        <h1 className="text-2xl font-bold">Interview Complete!</h1>
        <p className="text-lg font-bold">Thank you for participating in the AI-driven interview with VoiceHire</p>
      </div>
      
      <div className="bg-midnightLighter rounded-xl p-8 shadow-md w-full max-w-xl space-y-4 flex flex-col items-center justify-center">
        <h2 className='text-gray-300 text-center text-xl font-bold'>What's next?</h2> {/* Increased font size and weight */}
        <p className='text-gray-400 text-base font-semibold text-center'> {/* Increased font size and weight */}
          Response within 2-3 business days
        </p>
      </div>
      
      {/* Increased top margin to push it further down */}
      <footer className="bg-secondary font-bold text-center py-4 w-full mt-auto">
        <p>CopyRight 2025 VoiceHire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;