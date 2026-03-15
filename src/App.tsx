import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Share, Lock, Shuffle, Play, ChevronRight, BarChart2, 
  CheckCircle2, AlertCircle, Clock, Activity, Home, Compass, User,
  ChevronDown, Flame, BookOpen, Crown, MessageSquare, Settings, Mic, 
  Info, Search, Filter, ThumbsUp, MessageCircle, Award, Calendar, X, Sparkles
} from 'lucide-react';

import { DATA } from './data';
import { HighlightTranscript } from './components/HighlightTranscript';
import { ScoreGauge } from './components/ScoreGauge';
import { SVGRadarChart } from './components/SVGRadarChart';
import { SVGLineChart } from './components/SVGLineChart';

export default function App() {
  const [mainTab, setMainTab] = useState('home');
  const [subFlow, setSubFlow] = useState<string | null>(null); 
  const [activeTab, setActiveTab] = useState(1);
  const [timer, setTimer] = useState(600);
  const [showRadarTooltip, setShowRadarTooltip] = useState(false);

  // 考情选择状态
  const [showExamSelector, setShowExamSelector] = useState(false);
  const [region, setRegion] = useState('广东省');
  const [examType, setExamType] = useState('结构化面试');
  const [tempRegion, setTempRegion] = useState('广东省');
  const [tempType, setTempType] = useState('结构化面试');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (subFlow === 'interview' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [subFlow, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startSubFlow = (flowStep: string) => {
    setSubFlow(flowStep);
  };

  const endSubFlow = () => {
    setSubFlow(null);
  };

  const handleFinishInterview = () => {
    setSubFlow('analyze');
    setTimeout(() => setSubFlow('record'), 3000);
  };

  const renderMainHome = () => (
    <div className="min-h-screen bg-[#F4F5F7] pb-24 animate-in fade-in">
      <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] pt-12 pb-14 px-5 rounded-b-[40px] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex justify-between items-center mb-5">
          <div 
            onClick={() => {
              setTempRegion(region);
              setTempType(examType);
              setShowExamSelector(true);
            }}
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer border border-white/20 hover:bg-white/30 transition"
          >
            <span className="text-white font-bold tracking-wide">{region}</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-white/90 text-sm">{examType}</span>
            <ChevronDown className="w-4 h-4 text-white ml-1" />
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/30 transition">
            <Calendar className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="relative z-10 mb-5 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-200 group-focus-within:text-white transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="搜索真题、知识点，如：人际关系" 
            className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:bg-white/20 focus:border-white/40 backdrop-blur-md transition-all"
          />
        </div>

        <div className="relative z-10 pl-2">
          <h1 className="text-2xl font-black text-white tracking-widest mb-1 shadow-sm">每天开口5分钟</h1>
          <p className="text-blue-200 text-[13px]">让肌肉记忆战胜考场焦虑</p>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 flex justify-between items-center">
          <div className="flex flex-col items-center justify-center w-1/3 cursor-pointer" onClick={() => startSubFlow('exam_info')}>
            <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 mb-2 transform hover:-translate-y-1 transition">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <span className="text-[13px] font-bold text-gray-800">历年真题</span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-2 transform hover:-translate-y-1 transition">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-[13px] font-bold text-gray-800">专项突破</span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 mb-2 transform hover:-translate-y-1 transition">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <span className="text-[13px] font-bold text-gray-800">全真模考</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-4 ml-1">
            <h2 className="text-[17px] font-black text-gray-800 flex items-center">
              题库推荐
            </h2>
            <div className="flex space-x-2">
              <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 px-2 py-1 rounded border border-blue-100 cursor-pointer">综合排序</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 cursor-pointer flex items-center">题型 <ChevronDown className="w-3 h-3 ml-0.5"/></span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => startSubFlow('exam_info')}>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded font-bold border border-blue-100">202{5-item}年真题</span>
                  <span className="text-[11px] text-gray-400 flex items-center"><User className="w-3 h-3 mr-1"/> 2183人练过</span>
                </div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-3 leading-snug">广东省考乡镇岗结构化面试全真模拟卷</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">4道大题 · 预计40分钟</span>
                  <button className="bg-[#DD331F] text-white text-[12px] font-bold px-4 py-1.5 rounded-full shadow-md shadow-red-200 hover:bg-red-700 transition">去练习</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainDiscover = () => (
    <div className="min-h-screen bg-[#F4F5F7] pb-24 animate-in fade-in">
      <div className="bg-white pt-12 pb-3 px-5 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-black text-gray-800 tracking-wider">高分观摩台</span>
          <div className="flex space-x-3">
            <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <Search className="w-4 h-4 text-gray-600" />
            </div>
            <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 relative">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {['全网最热', '广东专区', '综合分析', '组织管理', '人际关系'].map((tag, idx) => (
            <span key={idx} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-colors ${idx === 0 ? 'bg-[#1E3A8A] text-white shadow-md' : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 rounded-2xl border border-orange-200 flex items-center">
          <Award className="w-8 h-8 text-orange-500 mr-3" />
          <div>
            <p className="text-sm font-bold text-gray-800">他山之石，可以攻玉</p>
            <p className="text-[11px] text-gray-500">已收录全网 1,204 份 85分以上真实答题录音</p>
          </div>
        </div>
        
        {DATA.questionDetail.answers.slice(0, 2).map((post) => (
          <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 hover:border-blue-100 transition cursor-pointer" onClick={() => startSubFlow('discover_detail')}>
            <p className="text-[15px] font-bold text-gray-800 mb-3 leading-snug hover:text-blue-600 transition">
              <span className="text-[#DD331F] mr-1">Q:</span>{DATA.questionDetail.title}
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full bg-white border border-gray-200" />
                  <div>
                    <p className="text-[12px] font-bold text-gray-800">{post.user}</p>
                    <p className="text-[9px] text-gray-400">{post.time} · {post.likes}赞</p>
                  </div>
                </div>
                <div className="bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  <p className="text-[14px] font-black text-[#DD331F] leading-none">{post.score}<span className="text-[9px] text-gray-500 ml-0.5">分</span></p>
                </div>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed line-clamp-2">
                "{post.transcriptSnippet}"
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-1.5">
                {post.aiTags.map((tag, idx) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded-sm border border-emerald-100 font-bold">{tag}</span>
                ))}
              </div>
              <span className="text-[11px] text-blue-500 font-bold flex items-center">去听听 <ChevronRight className="w-3 h-3 ml-0.5" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubDiscoverDetail = () => (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative animate-in slide-in-from-right duration-300 z-50">
      <div className="bg-white pt-12 pb-4 px-5 flex items-center justify-between sticky top-0 shadow-sm z-20">
        <div className="flex items-center cursor-pointer text-gray-800 hover:text-blue-600 transition" onClick={endSubFlow}>
          <ChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-[15px] font-bold">题目解析与观摩</span>
        </div>
        <Share className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="bg-white p-6 shadow-sm mb-3">
          <div className="flex space-x-2 mb-3">
            {DATA.questionDetail.tags.map((tag, i) => (
              <span key={i} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded border border-blue-100 font-bold">{tag}</span>
            ))}
          </div>
          <h1 className="text-[17px] font-bold text-gray-900 leading-relaxed mb-4">
            {DATA.questionDetail.title}
          </h1>
          <div className="flex justify-between items-center text-[12px] text-gray-500 pt-3 border-t border-gray-50">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-gray-400"/> {DATA.questionDetail.practicedCount} 人练过这道题</span>
            <span className="text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">最高分 92.50</span>
          </div>
        </div>

        <div className="bg-white shadow-sm min-h-screen">
          <div className="flex border-b border-gray-100 sticky top-[72px] bg-white z-10 px-5 pt-2">
            <div className="py-3 text-[14px] font-black text-[#DD331F] border-b-2 border-[#DD331F] mr-6 cursor-pointer">高分答题榜</div>
            <div className="py-3 text-[14px] font-bold text-gray-400 cursor-pointer">最新回答</div>
          </div>
          
          <div className="px-5 py-2">
            {DATA.questionDetail.answers.map((ans, index) => (
              <div key={ans.id} className="py-6 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={ans.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200" />
                      {index === 0 && <span className="absolute -top-2 -right-2 text-xl">👑</span>}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-800">{ans.user}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{ans.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#DD331F] leading-none mb-1">{ans.score.toFixed(2)}</p>
                    <p className="text-[9px] text-gray-400">AI 综合评分</p>
                  </div>
                </div>

                <div className="flex space-x-2 mb-4">
                  {ans.aiTags.map((tag, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded border border-emerald-100 font-bold">{tag}</span>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-3 mb-4 flex items-center space-x-3 border border-blue-100 cursor-pointer shadow-sm hover:shadow transition">
                  <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-md">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-200 rounded-full w-full overflow-hidden mb-1"><div className="h-full bg-blue-500 w-[0%]"></div></div>
                    <p className="text-[10px] text-gray-500 flex justify-between">
                      <span>听TA怎么开口</span>
                      <span>{ans.audioLength}</span>
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                    <span className="font-bold text-gray-800">TA的原文：</span>"{ans.transcriptSnippet}"
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent rounded-b-2xl"></div>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-500 cursor-pointer bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">展开查看全文</span>
                </div>
                
                <div className="flex justify-end space-x-4 mt-4 text-gray-400">
                  <div className="flex items-center text-[12px] cursor-pointer hover:text-red-500 transition"><ThumbsUp className="w-4 h-4 mr-1"/> {ans.likes}</div>
                  <div className="flex items-center text-[12px] cursor-pointer hover:text-blue-500 transition"><MessageCircle className="w-4 h-4 mr-1"/> 评论</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-xl border-t border-gray-100 max-w-md mx-auto z-50">
        <button 
          onClick={() => { setTimer(600); startSubFlow('interview'); }}
          className="w-full py-4 bg-gradient-to-r from-[#DD331F] to-[#FF4B2B] text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-200 flex justify-center items-center hover:scale-[0.98] transition-transform"
        >
          <Mic className="w-5 h-5 mr-2" /> 我也来挑战这道题
        </button>
      </div>
    </div>
  );

  const renderMainProfile = () => (
    <div className="min-h-screen bg-[#F4F5F7] pb-24 animate-in fade-in">
      <div className="bg-white pt-16 pb-6 px-6 rounded-b-[40px] shadow-sm relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <img src={DATA.user.avatar} alt="avatar" className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-md" />
          <div className="flex-1">
            <h1 className="text-xl font-black text-gray-800 flex items-center">{DATA.user.name}<Crown className="w-4 h-4 text-gray-300 ml-2" /></h1>
            <p className="text-[11px] text-gray-400 mt-1">坚持练习的第 {DATA.user.stats.days} 天，保持热量！</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="text-center w-1/3"><p className="text-xl font-black text-gray-800">{DATA.user.stats.questions}</p><p className="text-[10px] text-gray-500">已答题数</p></div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center w-1/3"><p className="text-xl font-black text-[#DD331F]">{DATA.user.stats.avgScore}</p><p className="text-[10px] text-gray-500">平均分</p></div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center w-1/3"><p className="text-xl font-black text-emerald-500">{DATA.user.stats.umRemoved}</p><p className="text-[10px] text-gray-500">消灭口癖</p></div>
        </div>
      </div>
      <div className="px-5 -mt-4 relative z-0 space-y-4 pt-8">
        <div className="bg-gradient-to-r from-gray-800 to-black rounded-3xl p-5 text-white flex justify-between items-center shadow-lg shadow-gray-400/20">
          <div>
            <h3 className="text-[15px] font-bold flex items-center text-[#FCD34D] mb-1"><Crown className="w-4 h-4 mr-2" /> 解锁全真深度诊断报告</h3>
            <p className="text-[11px] text-gray-400">无限次AI打分 / 专属结构化解析 / 去除口癖</p>
          </div>
          <button className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-black text-[12px] font-black px-4 py-2 rounded-full hover:scale-105 transition">开通VIP</button>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <h2 className="text-[15px] font-black text-gray-800 mb-2">我的能力模型</h2>
          <p className="text-[10px] text-gray-400 mb-4">基于近 30 天练习数据综合评估</p>
          <SVGRadarChart data={DATA.report.radar} />
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          {[
            { icon: <Clock className="w-5 h-5 text-blue-500" />, title: '面试记录' },
            { icon: <BookOpen className="w-5 h-5 text-orange-500" />, title: '我的错题本' },
            { icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, title: '帮助与反馈' },
            { icon: <Settings className="w-5 h-5 text-gray-500" />, title: '设置' }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-5 border-b border-gray-50 last:border-0 active:bg-gray-50 cursor-pointer transition">
              <div className="flex items-center space-x-4">{item.icon}<span className="text-[14px] font-bold text-gray-700">{item.title}</span></div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubExamInfo = () => (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative animate-in slide-in-from-right duration-300 z-50">
      <div className="bg-white pt-12 pb-4 px-5 flex items-center justify-between sticky top-0 shadow-sm">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={endSubFlow} />
        <span className="text-lg font-bold text-gray-800">套题考情</span>
        <div className="w-6" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center mb-6 relative overflow-hidden border border-gray-50">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl"></div>
          <h1 className="text-4xl font-black text-[#1E3A8A] mb-2 relative z-10 tracking-wider">{DATA.exam.province}</h1>
          <p className="text-gray-500 text-sm mb-6 relative z-10">{DATA.exam.subtitle}</p>
          <div className="flex items-center justify-between bg-blue-50/50 rounded-xl p-4 border border-blue-100">
            <span className="font-bold text-[#1E3A8A]">{DATA.exam.type}</span>
            <div className="flex items-center text-blue-500 text-xs"><Info className="w-3.5 h-3.5 mr-1" /> 说明</div>
          </div>
        </div>

        <div className="mb-auto">
          <h2 className="text-lg font-bold text-[#1E3A8A] mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" /> 考情说明
          </h2>
          <p className="text-gray-600 leading-relaxed bg-white p-5 rounded-2xl shadow-sm text-sm border border-gray-50">
            {DATA.exam.desc}
          </p>
        </div>
      </div>

      <div className="p-5 bg-white pb-8 border-t border-gray-100 flex space-x-3 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button className="flex-1 py-4 bg-orange-100 text-orange-600 rounded-2xl font-bold flex justify-center items-center">
          邀请好友 <Share className="w-4 h-4 ml-2" />
        </button>
        <button 
          onClick={() => { setTimer(600); startSubFlow('interview'); }}
          className="flex-[2] py-4 bg-gradient-to-r from-[#DD331F] to-[#FF4B2B] text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-200"
        >
          开始 AI 面试
        </button>
      </div>
    </div>
  );

  const renderSubInterview = () => (
    <div className="min-h-screen bg-[#1A1C23] flex flex-col relative overflow-hidden animate-in slide-in-from-right duration-300 z-50">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white"></div>
        <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white"></div>
        <div className="absolute bottom-32 left-10 w-8 h-8 border-b-2 border-l-2 border-white"></div>
        <div className="absolute bottom-32 right-10 w-8 h-8 border-b-2 border-r-2 border-white"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-white/20 rounded-[100px] pointer-events-none"></div>

      <div className="pt-14 px-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium tracking-wider">作答中录音</span>
        </div>
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="font-mono font-bold text-lg">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="mt-8 px-6 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-[#1E3A8A] text-white text-xs px-2.5 py-1 rounded-md font-bold tracking-wider">第 1 题 / 共 4 题</span>
            <span className="text-gray-400 text-xs font-medium">综合分析</span>
          </div>
          <p className="text-gray-800 font-bold leading-relaxed text-[17px]">
            {DATA.questionDetail.title}
          </p>
        </div>
      </div>

      <div className="mt-auto pb-12 px-6 relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center space-x-1 h-12 mb-8">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 bg-emerald-400 rounded-full animate-pulse"
              style={{ height: `${Math.random() * 80 + 20}%`, animationDelay: `${i * 0.1}s`, animationDuration: '0.8s' }}></div>
          ))}
        </div>
        <button onClick={handleFinishInterview} className="w-full py-4 bg-red-500/90 backdrop-blur-md text-white rounded-2xl font-bold text-lg border border-red-400/50 shadow-lg flex items-center justify-center hover:scale-[0.98] transition">
          <CheckCircle2 className="w-5 h-5 mr-2" /> 结束本题作答
        </button>
      </div>
    </div>
  );

  const renderSubAnalyzing = () => (
    <div className="min-h-screen bg-[#1E3A8A] flex flex-col items-center justify-center p-8 relative z-50">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center"><Activity className="w-10 h-10 text-emerald-400 animate-pulse" /></div>
        </div>
        <h2 className="text-white text-2xl font-bold mb-3 tracking-widest">AI 考官评估中</h2>
        <p className="text-blue-200 text-sm text-center max-w-xs animate-pulse">正在提取语速、逻辑维度数据，生成专属诊断报告...</p>
      </div>
    </div>
  );

  const renderSubRecord = () => (
    <div className="min-h-screen bg-[#F7F8FA] pb-24 z-50 relative animate-in zoom-in-95">
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-700 pt-14 pb-24 px-6 text-white rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <ChevronLeft className="w-7 h-7 cursor-pointer" onClick={endSubFlow} />
          <span className="text-lg font-bold tracking-widest">面试记录</span>
          <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm"><Share className="w-4 h-4" /></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2 tracking-wider">{DATA.exam.province}</h1>
          <p className="text-white/90 text-sm font-medium">{DATA.exam.subtitle}</p>
        </div>
      </div>

      <div className="px-5 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between mb-5 border border-white/50 backdrop-blur-xl">
          <div className="flex-1 flex items-center space-x-3 cursor-pointer group">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
              <BarChart2 className="text-gray-400 w-6 h-6" />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]">
                 <Lock className="text-gray-600 w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">分数曲线</p>
              <p className="text-[11px] text-gray-400">面试次数：1次</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-100 mx-2"></div>
          <div className="flex-1 flex items-center justify-end space-x-3 cursor-pointer">
            <div className="text-right">
              <p className="font-bold text-gray-800 text-sm">抽题面试</p>
              <p className="text-[11px] text-gray-400">随机抽取不重复</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Shuffle className="text-orange-500 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 border border-gray-50">
          <div className="flex justify-between items-end mb-5 border-b border-gray-100 pb-5">
            <div>
              <p className="text-gray-500 text-xs font-bold mb-2">套题：{DATA.record.setId}</p>
              <div className="bg-gray-50 text-gray-500 text-[10px] px-2 py-1.5 rounded-md flex items-center font-medium">
                ✎ 本题 {DATA.record.practicedCount} 人练过 | 最高 {DATA.record.maxScore} 分
              </div>
            </div>
            <div className="text-right">
              <p className="text-[48px] font-black text-[#DD331F] leading-none mb-1 tracking-tighter drop-shadow-sm">{DATA.record.totalScore}</p>
              <p className="text-xs text-gray-500 font-medium">击败 <span className="text-[#DD331F] font-bold text-sm">{DATA.record.beatPercent}%</span> 考生</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-6 font-medium">
            <p>面试时间：{DATA.record.time}</p>
            <p className="text-blue-500 cursor-pointer flex items-center hover:underline">面试音频：查看 <ChevronRight className="w-3 h-3 ml-0.5"/></p>
          </div>
          
          <div className="flex space-x-3">
            <button onClick={() => startSubFlow('interview')} className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition">再次面试</button>
            <button onClick={() => startSubFlow('report')} className="flex-[1.5] py-3.5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center text-sm hover:scale-[0.98] transition">
              查看深度报告 <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const getScoreColorClass = (score: number) => {
    if (score < 60) return 'text-[#E53E3E]';
    if (score < 80) return 'text-[#D97706]';
    return 'text-[#16A34A]';
  };

  const getScoreBgClass = (score: number) => {
    if (score < 60) return 'bg-[#E53E3E]';
    if (score < 80) return 'bg-[#D97706]';
    return 'bg-[#16A34A]';
  };

  const renderSubReport = () => (
    <div className="min-h-screen bg-[#F4F5F7] pb-28 relative z-50 animate-in slide-in-from-bottom-10">
      <div className="bg-gradient-to-b from-slate-900 to-[#111827] pt-14 pb-16 px-5 relative overflow-hidden rounded-b-[40px] shadow-md">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 flex justify-between items-center text-white mb-8">
          <ChevronLeft className="w-8 h-8 cursor-pointer drop-shadow-md" onClick={() => startSubFlow('record')} />
          <span className="text-lg font-bold tracking-widest drop-shadow-md">面试报告</span>
          <div className="w-8 h-8 flex items-center justify-center bg-black/20 rounded-full cursor-pointer hover:bg-black/30 transition"><Share className="w-4 h-4" /></div>
        </div>
        <div className="relative z-10 pl-2">
          <h1 className="text-[44px] font-black text-white italic tracking-widest shadow-sm drop-shadow-lg leading-none">面试报告</h1>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-20 space-y-4">
        
        {/* AI Verdict & Gauge Header */}
        <div className="bg-[#111827] rounded-3xl p-6 relative overflow-hidden shadow-xl border border-white/5">
          {/* Orange-yellow glow */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-400 text-[18px] font-black tracking-widest mb-1 flex items-center">
              <Sparkles className="w-5 h-5 mr-1.5 text-orange-400" />
              AI 考公面试官总评
            </h2>
            <p className="text-gray-400 text-[10px] mb-6 tracking-wide text-center">
              综合现实中考官的实际评分规则训练出的引擎
            </p>

            <ScoreGauge score={DATA.report.totalScore} />

            <div className="flex items-center space-x-4 mt-4 mb-5">
              <p className="text-gray-400 text-[11px] tracking-wider">
                击败全省 <span className="text-orange-400 font-bold text-[13px]">{DATA.report.beatPercent}%</span> 考生
              </p>
              <div className="w-px h-3 bg-gray-700"></div>
              <p className="text-gray-400 text-[11px] tracking-wider">
                用时 <span className="text-orange-400 font-bold text-[13px]">{DATA.report.duration}</span>
              </p>
            </div>

            {/* AI Verdict Glassmorphism Box */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-full relative">
              <div className="absolute top-0 left-4 w-8 h-px bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0"></div>
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 text-[13px] leading-relaxed text-justify">
                    {DATA.report.aiVerdict}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-gray-500 text-[10px]">面试时间</span>
                    <span className="text-gray-400 text-[10px] font-mono">{DATA.report.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] font-black text-gray-800 flex items-center tracking-wide">
              广东省 <span className="text-gray-400 font-normal ml-2 text-sm tracking-normal">各题分数</span>
            </h2>
            <div className="flex items-center space-x-2 text-[10px] text-gray-500">
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></div>表现优异</span>
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>作答欠佳</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {DATA.report.questionsScores.map(q => {
              const passScore = q.max * 0.8;
              const isPass = q.score >= passScore;
              return (
                <div key={q.id} className="bg-[#F8FAFC] rounded-xl p-3 border border-gray-100 relative flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[13px] font-bold text-gray-700">第{q.id}题</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isPass ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {isPass ? '表现优异' : '作答欠佳'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-end mb-1.5">
                    <div className="flex items-baseline">
                      <span className={`text-[18px] font-black leading-none ${isPass ? 'text-emerald-500' : 'text-red-500'}`}>{q.score.toFixed(2)}</span>
                      <span className="text-[10px] text-gray-400 ml-0.5">/{q.max}</span>
                    </div>
                    <span className="text-[9px] text-blue-500 font-medium mb-0.5">进面 {passScore.toFixed(1)}</span>
                  </div>

                  <div className="relative h-1.5 bg-gray-200 rounded-full w-full mt-1">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${isPass ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
                      style={{ width: `${(q.score / q.max) * 100}%` }}
                    ></div>
                    {/* Pass Marker */}
                    <div 
                      className="absolute top-[-3px] bottom-[-3px] w-0.5 bg-blue-400 z-10"
                      style={{ left: `${(passScore / q.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[16px] font-black text-gray-800 flex items-center tracking-wide">岗位能力解析</h2>
            <div className="relative">
              <div 
                className="text-[11px] text-gray-400 flex items-center cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => setShowRadarTooltip(!showRadarTooltip)}
                onMouseEnter={() => setShowRadarTooltip(true)}
                onMouseLeave={() => setShowRadarTooltip(false)}
              >
                <Info className="w-3.5 h-3.5 mr-1" /> 能力说明
              </div>
              
              {showRadarTooltip && (
                <div className="absolute right-0 top-6 w-72 bg-gray-800 text-white text-[11px] p-4 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-gray-800 transform rotate-45"></div>
                  <div className="space-y-3 relative z-10">
                    {Object.values(DATA.report.radar).map((item: any, idx) => (
                      <div key={idx} className="leading-relaxed">
                        <span className="font-bold text-blue-300">{item.label} ({item.max}分)：</span>
                        <span className="text-gray-300">{item.desc}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-700 text-center text-gray-400 font-bold flex justify-between items-center">
                      <span>五项能力总分合计</span>
                      <span className="text-white text-[13px]">100分</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SVGRadarChart data={DATA.report.radar} />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
           <div className="bg-gradient-to-r from-orange-500 to-red-500 py-4 px-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 mix-blend-overlay"></div>
             <h2 className="text-xl font-black text-white italic tracking-widest relative z-10 drop-shadow-md">面试状态多维追踪</h2>
             <p className="text-white/60 text-[8px] font-bold uppercase tracking-[0.3em] relative z-10">Interview Status Analysis</p>
           </div>
           
           <div className="p-6 space-y-10">
             {DATA.report.status.map((item, idx) => (
               <div key={idx} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                 <div className="flex justify-between items-end mb-1">
                   <h3 className="text-[17px] font-black text-gray-800">{item.title}</h3>
                   <div className="flex items-baseline">
                     <span className={`text-[22px] font-black leading-none ${getScoreColorClass(item.score)}`}>
                       {item.score.toFixed(1)}
                     </span>
                     <span className="text-[11px] text-gray-400 ml-1 font-medium">/ 100分</span>
                   </div>
                 </div>
                 <p className="text-[12px] text-gray-500 mb-6">{item.sub}</p>
                 
                 {/* Progress Bar */}
                 <div className="relative h-2.5 bg-gray-100 rounded-full mt-8 mb-8">
                   <div className={`absolute left-0 top-0 h-full rounded-full ${getScoreBgClass(item.score)} transition-all duration-1000`} style={{ width: `${item.score}%` }}></div>
                   
                   {/* 60 Marker */}
                   <div className="absolute top-[-22px] left-[60%] -translate-x-1/2 flex flex-col items-center">
                     <span className="text-[10px] text-gray-400 mb-1 whitespace-nowrap">及格(60分)</span>
                     <div className="w-0.5 h-6 bg-gray-300"></div>
                   </div>
                   
                   {/* 80 Marker */}
                   <div className="absolute top-[-22px] left-[80%] -translate-x-1/2 flex flex-col items-center">
                     <span className="text-[10px] text-green-500 mb-1 whitespace-nowrap">优秀(80分)</span>
                     <div className="w-0.5 h-6 bg-green-400"></div>
                   </div>
                 </div>

                 {/* Score Grid */}
                 <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-4 mb-5">
                   <h4 className="text-[13px] font-bold text-gray-700 mb-4">各题目该项得分情况</h4>
                   <div className="flex items-center">
                     {item.data.map((score, i) => (
                       <div key={i} className={`flex flex-col items-center flex-1 ${i !== item.data.length - 1 ? 'border-r border-gray-200' : ''}`}>
                         <span className="text-[12px] text-gray-400 mb-1">第{i + 1}题</span>
                         <span className={`text-[17px] font-bold ${getScoreColorClass(score)}`}>{score}分</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* AI Evaluation Speech Bubble */}
                 <div className="relative bg-[#F4F9FF] border border-[#D1E4FF] rounded-xl p-4 mt-2 shadow-sm">
                   <div className="absolute -top-1.5 left-8 w-3 h-3 bg-[#F4F9FF] border-t border-l border-[#D1E4FF] transform rotate-45"></div>
                   <p className="text-[13px] text-gray-700 leading-relaxed relative z-10">
                     <span className="text-[#1E40AF] font-bold">考官锐评：</span>{item.aiText}
                   </p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white rounded-3xl p-0 overflow-hidden shadow-sm border border-gray-50">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 py-4 px-6">
             <h2 className="text-xl font-black text-white italic tracking-widest drop-shadow-md">答题记录</h2>
          </div>
          
          <div className="flex border-b border-gray-100 bg-white sticky top-0 z-30">
            {[1, 2, 3, 4].map(num => (
              <button key={num} onClick={() => setActiveTab(num)} className={`flex-1 py-4 text-[13px] font-bold relative transition-colors ${activeTab === num ? 'text-[#DD331F]' : 'text-gray-400'}`}>
                第{num}题
                {activeTab === num && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#DD331F] rounded-t-full"></span>}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 1 ? (
              <div className="space-y-6 animate-in fade-in">
                <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100/50">
                   <p className="text-gray-800 font-bold leading-relaxed text-[15px]">{DATA.report.q1Detail.title}</p>
                </div>

                <div>
                  <h3 className="text-[14px] font-black text-gray-800 mb-3 flex items-center tracking-wide">
                    考生回答原声
                    <span className="ml-2 text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">AI 重点标注口癖</span>
                  </h3>
                  <div className="bg-white rounded-2xl p-3 mb-4 flex items-center space-x-4 border border-gray-200 shadow-sm hover:shadow transition cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md"><Play className="w-4 h-4 text-white ml-0.5" /></div>
                    <div className="flex-1"><div className="h-2 bg-gray-100 rounded-full w-full"><div className="h-full bg-blue-500 w-[15%] rounded-full"></div></div></div>
                    <span className="text-xs text-gray-400 font-bold font-mono">{DATA.report.q1Detail.audioLength}</span>
                  </div>
                  <HighlightTranscript text={DATA.report.q1Detail.transcript} />
                </div>

                <div className="pt-2">
                  <h3 className="text-[14px] font-black text-gray-800 mb-4 flex items-center tracking-wide">
                    <span className="bg-emerald-100 text-emerald-500 p-1 rounded-full mr-2"><CheckCircle2 className="w-4 h-4" /></span>
                    答题评价和提高建议
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-5"><span className="font-bold text-gray-800">答题评价：</span>{DATA.report.q1Detail.aiEvaluation}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <span className="font-bold text-gray-800 text-[13px] mb-3 block">提高建议：</span>
                      <ul className="space-y-3">
                        {DATA.report.q1Detail.aiSuggestions.map((item, idx) => {
                          const match = item.match(/^(【.*?】)(.*)$/);
                          return (
                            <li key={idx} className="text-[13px] text-gray-600 flex items-start">
                              <span className="bg-orange-100 text-orange-600 text-[9px] font-black px-1.5 py-0.5 rounded mr-2.5 mt-0.5 shrink-0">{idx + 1}</span>
                              <span className="flex-1 leading-relaxed">
                                {match ? (
                                  <>
                                    <span className="font-bold text-gray-800">{match[1]}</span>
                                    {match[2]}
                                  </>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-[14px] font-black text-gray-800 mb-4 flex items-center tracking-wide">
                    <span className="bg-blue-100 text-blue-500 p-1 rounded-full mr-2"><AlertCircle className="w-4 h-4" /></span>
                    参考答案 (满分政府逻辑范文)
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5 shadow-inner">
                    <p className="text-[14px] text-gray-700 leading-loose whitespace-pre-wrap">{DATA.report.q1Detail.reference}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center"><Lock className="w-6 h-6 text-gray-300 mx-auto mb-2"/><p className="text-sm font-bold text-gray-400">需解锁 VIP 查看</p></div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-gray-100 max-w-md mx-auto z-50">
        <button onClick={endSubFlow} className="w-full py-4 bg-[#DD331F] text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-200 flex justify-center items-center hover:scale-[0.98] transition-transform">
          完成并返回首页 <Home className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderExamSelector = () => {
    const regions = ['国考', '广东省', '浙江省', '江苏省', '山东省', '北京市', '上海市', '四川省', '湖北省'];
    const types = ['结构化面试', '无领导小组', '结构化小组', '半结构化'];

    return (
      <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-md mx-auto">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowExamSelector(false)}></div>
        <div className="bg-white rounded-t-[32px] p-6 relative z-10 animate-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-gray-800 tracking-wide">切换考情</h2>
            <div className="p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100" onClick={() => setShowExamSelector(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-1 h-3.5 bg-blue-600 rounded-full mr-2"></div>
              报考地区
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {regions.map(r => (
                <button 
                  key={r}
                  onClick={() => setTempRegion(r)}
                  className={`py-2.5 rounded-xl text-[13px] font-bold border transition-all ${tempRegion === r ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-1 h-3.5 bg-orange-500 rounded-full mr-2"></div>
              面试类型
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {types.map(t => (
                <button 
                  key={t}
                  onClick={() => setTempType(t)}
                  className={`py-2.5 rounded-xl text-[13px] font-bold border transition-all ${tempType === t ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              setRegion(tempRegion);
              setExamType(tempType);
              setShowExamSelector(false);
            }}
            className="w-full py-4 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-2xl font-bold text-[15px] shadow-lg shadow-blue-200 hover:scale-[0.98] transition-transform"
          >
            确认切换
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-0 md:p-6 font-sans antialiased selection:bg-red-200 selection:text-red-900">
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[850px] md:rounded-[40px] md:shadow-2xl overflow-x-hidden relative scroll-smooth">
        
        {subFlow === 'discover_detail' && renderSubDiscoverDetail()}
        {subFlow === 'exam_info' && renderSubExamInfo()}
        {subFlow === 'interview' && renderSubInterview()}
        {subFlow === 'analyze' && renderSubAnalyzing()}
        {subFlow === 'record' && renderSubRecord()}
        {subFlow === 'report' && renderSubReport()}

        {!subFlow && (
          <>
            {mainTab === 'home' && renderMainHome()}
            {mainTab === 'discover' && renderMainDiscover()}
            {mainTab === 'profile' && renderMainProfile()}

            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 max-w-md mx-auto z-40 px-6 py-2 pb-6 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
              <div onClick={() => setMainTab('home')} className={`flex flex-col items-center justify-center w-16 cursor-pointer transition-colors ${mainTab === 'home' ? 'text-[#1E3A8A]' : 'text-gray-400'}`}>
                <div className={`p-1.5 rounded-xl mb-1 transition-all ${mainTab === 'home' ? 'bg-blue-50 text-[#1E3A8A] scale-110' : ''}`}>
                  <Home className="w-6 h-6" strokeWidth={mainTab === 'home' ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-bold ${mainTab === 'home' ? 'opacity-100' : 'opacity-70'}`}>练题</span>
              </div>
              
              <div onClick={() => setMainTab('discover')} className={`flex flex-col items-center justify-center w-16 cursor-pointer transition-colors ${mainTab === 'discover' ? 'text-[#DD331F]' : 'text-gray-400'}`}>
                <div className={`p-1.5 rounded-xl mb-1 transition-all ${mainTab === 'discover' ? 'bg-red-50 text-[#DD331F] scale-110' : ''}`}>
                  <Compass className="w-6 h-6" strokeWidth={mainTab === 'discover' ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-bold ${mainTab === 'discover' ? 'opacity-100' : 'opacity-70'}`}>发现</span>
              </div>

              <div onClick={() => setMainTab('profile')} className={`flex flex-col items-center justify-center w-16 cursor-pointer transition-colors ${mainTab === 'profile' ? 'text-gray-800' : 'text-gray-400'}`}>
                <div className={`p-1.5 rounded-xl mb-1 transition-all ${mainTab === 'profile' ? 'bg-gray-100 text-gray-800 scale-110' : ''}`}>
                  <User className="w-6 h-6" strokeWidth={mainTab === 'profile' ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-bold ${mainTab === 'profile' ? 'opacity-100' : 'opacity-70'}`}>我的</span>
              </div>
            </div>
          </>
        )}

        {showExamSelector && renderExamSelector()}
      </div>
    </div>
  );
}
