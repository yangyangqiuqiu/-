import React from 'react';

export const SVGRadarChart = ({ data }: { data: any }) => {
  const center = 100, radius = 70;
  const getPoint = (angle: number, value: number, max: number) => {
    const r = (value / max) * radius;
    const a = angle * (Math.PI / 180);
    return `${center + r * Math.sin(a)},${center - r * Math.cos(a)}`;
  };
  const points = [
    getPoint(0, data.analysis.score, data.analysis.max),
    getPoint(72, data.expression.score, data.expression.max),
    getPoint(144, data.interpersonal.score, data.interpersonal.max),
    getPoint(216, data.emergency.score, data.emergency.max),
    getPoint(288, data.organization.score, data.organization.max),
  ].join(' ');

  return (
    <div className="relative w-full aspect-square max-w-[240px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
        {[0.3, 0.6, 1].map(scale => (
          <polygon key={scale} points={[
              getPoint(0, scale, 1), getPoint(72, scale, 1), getPoint(144, scale, 1), getPoint(216, scale, 1), getPoint(288, scale, 1)
            ].join(' ')} fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray={scale < 1 ? "2,2" : ""} />
        ))}
        {[0, 72, 144, 216, 288].map(angle => (
          <line key={angle} x1={center} y1={center} x2={getPoint(angle, 1, 1).split(',')[0]} y2={getPoint(angle, 1, 1).split(',')[1]} stroke="#E5E7EB" strokeWidth="1" />
        ))}
        <polygon points={points} fill="rgba(59, 130, 246, 0.25)" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round" />
        {points.split(' ').map((p, i) => (
          <circle key={i} cx={p.split(',')[0]} cy={p.split(',')[1]} r="4" fill="#fff" stroke="#2563EB" strokeWidth="2" />
        ))}
      </svg>
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 text-center bg-white/80 px-1 rounded whitespace-nowrap">{data.analysis.label}<br/><span className="text-gray-800 font-bold">{data.analysis.score}</span><span className="text-gray-400 text-[8px]">/{data.analysis.max}</span></div>
      <div className="absolute top-[35%] right-0 text-[10px] text-gray-500 text-center bg-white/80 px-1 rounded whitespace-nowrap">{data.expression.label}<br/><span className="text-gray-800 font-bold">{data.expression.score}</span><span className="text-gray-400 text-[8px]">/{data.expression.max}</span></div>
      <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 text-center bg-white/80 px-1 rounded whitespace-nowrap">{data.interpersonal.label}<br/><span className="text-gray-800 font-bold">{data.interpersonal.score}</span><span className="text-gray-400 text-[8px]">/{data.interpersonal.max}</span></div>
      <div className="absolute bottom-1 left-2 text-[10px] text-gray-500 text-center bg-white/80 px-1 rounded whitespace-nowrap">{data.emergency.label}<br/><span className="text-gray-800 font-bold">{data.emergency.score}</span><span className="text-gray-400 text-[8px]">/{data.emergency.max}</span></div>
      <div className="absolute top-[35%] left-0 text-[10px] text-gray-500 text-center bg-white/80 px-1 rounded whitespace-nowrap">{data.organization.label}<br/><span className="text-gray-800 font-bold">{data.organization.score}</span><span className="text-gray-400 text-[8px]">/{data.organization.max}</span></div>
    </div>
  );
};
