import React from 'react';

export const SVGLineChart = ({ dataArray }: { dataArray: number[] }) => {
  const w = 300, h = 120, padY = 20, padX = 20;
  const getX = (index: number) => padX + (index * ((w - padX * 2) / 3));
  const getY = (val: number) => h - padY - (val / 100) * (h - padY * 2);
  
  const points = dataArray.map((val, i) => `${getX(i)},${getY(val)}`).join(' ');
  let pathD = `M ${points.split(' ')[0]}`;
  for (let i = 0; i < dataArray.length - 1; i++) {
    const p1 = points.split(' ')[i].split(',');
    const p2 = points.split(' ')[i+1].split(',');
    const cx = (parseFloat(p1[0]) + parseFloat(p2[0])) / 2;
    pathD += ` C ${cx},${p1[1]} ${cx},${p2[1]} ${p2[0]},${p2[1]}`;
  }

  return (
    <div className="w-full relative mt-2 mb-4">
      <div className="flex justify-between text-[10px] text-gray-400 mb-1 px-4">
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></span>满分</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-300 mr-1"></span>及格</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>优秀</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-1"></span>实际</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        {[100, 80, 60, 0].map(val => (
          <line key={val} x1={padX} y1={getY(val)} x2={w-padX} y2={getY(val)} stroke={val===100?'#34D399':val===80?'#FBBF24':val===60?'#93C5FD':'#E5E7EB'} strokeWidth="1" />
        ))}
        {[100, 80, 60, 40, 20, 0].map(val => (
          <text key={val} x={padX - 5} y={getY(val) + 3} fontSize="8" fill="#9CA3AF" textAnchor="end">{val}</text>
        ))}
        <path d={pathD} fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
        {dataArray.map((val, i) => (
          <circle key={i} cx={getX(i)} cy={getY(val)} r="3" fill="#fff" stroke="#A855F7" strokeWidth="1.5" />
        ))}
        {[1, 2, 3, 4].map(val => (
          <text key={val} x={getX(val-1)} y={h} fontSize="8" fill="#9CA3AF" textAnchor="middle">{val}</text>
        ))}
      </svg>
      <span className="absolute bottom-0 right-0 text-[8px] text-gray-400">面试题目</span>
    </div>
  );
};
