import React, { useEffect, useState } from 'react';

export const ScoreGauge = ({ score, max = 100 }: { score: number; max?: number }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [dashOffset, setDashOffset] = useState(251.327); // Initial offset (empty)
  
  const radius = 80;
  const circumference = Math.PI * radius; // ~251.327

  useEffect(() => {
    // Animate the number
    let start = 0;
    const duration = 1000;
    const interval = 16;
    const step = (score / duration) * interval;
    
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(start);
      }
    }, interval);

    // Animate the SVG stroke
    const targetOffset = circumference - (score / max) * circumference;
    // Small delay to ensure CSS transition triggers after mount
    const strokeTimer = setTimeout(() => {
      setDashOffset(targetOffset);
    }, 50);

    return () => {
      clearInterval(timer);
      clearTimeout(strokeTimer);
    };
  }, [score, max, circumference]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="200" height="110" viewBox="0 0 200 110" className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" /> {/* amber-500 */}
            <stop offset="50%" stopColor="#F97316" /> {/* orange-500 */}
            <stop offset="100%" stopColor="#EF4444" /> {/* red-500 */}
          </linearGradient>
        </defs>
        
        {/* Background Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#374151" /* gray-700 */
          strokeWidth="16"
          strokeLinecap="butt"
        />
        
        {/* Foreground Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="16"
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Score Text */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-[42px] font-black text-white tracking-tighter leading-none drop-shadow-lg">
          {displayScore.toFixed(1)}
        </span>
      </div>
    </div>
  );
};
