import React from 'react';

export const HighlightTranscript = ({ text }: { text: string }) => {
  const fillers = ['呃', '啊', '呢', '就是', '那个'];
  const jargons = ['交付物', '闭环', '卡点', '调优', '跃迁', '赋能', '抓手', '对齐'];
  
  const allKeywords = [...fillers, ...jargons];
  const regex = new RegExp(`(${allKeywords.join('|')})`, 'g');
  const parts = text.split(regex);
  
  return (
    <div className="text-gray-700 leading-relaxed text-[15px] bg-orange-50/40 p-4 rounded-2xl border border-orange-100 shadow-inner">
      {parts.map((part, i) => {
        if (fillers.includes(part)) {
          return (
            <span key={i} className="inline-block bg-red-100/80 text-red-600 font-bold px-1.5 py-0.5 rounded text-sm mx-0.5 shadow-sm border border-red-200 animate-pulse">
              {part}
            </span>
          );
        }
        if (jargons.includes(part)) {
          return (
            <span key={i} className="inline-block bg-orange-100/80 text-orange-600 font-bold px-1.5 py-0.5 rounded text-sm mx-0.5 shadow-sm border border-orange-200">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};
