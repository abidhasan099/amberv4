
import React, { useState } from 'react';
import { ImageStyle, AspectRatio } from '../types';

interface PromptInputProps {
  onGenerate: (prompt: string, style: ImageStyle, ratio: AspectRatio) => void;
  onImprove: (prompt: string) => Promise<string>;
  loading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, onImprove, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.REALISTIC);
  const [ratio, setRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isImproving, setIsImproving] = useState(false);

  const handleImprove = async () => {
    if (!prompt.trim() || isImproving || loading) return;
    setIsImproving(true);
    try {
      const enhanced = await onImprove(prompt);
      if (enhanced) setPrompt(enhanced);
    } catch (err) {
      console.error("Enhancement failed:", err);
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt, style, ratio);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="আপনার কল্পনার ছবিটি বর্ণনা করুন (যেমন: সাইবারপাঙ্ক ঢাকা শহর, বৃষ্টির রাত)..."
          className="w-full h-56 bg-white/5 border-2 border-white/10 rounded-[2.5rem] p-10 text-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-8 focus:ring-[#A2D2FF]/10 focus:border-[#A2D2FF]/40 transition-all resize-none shadow-2xl font-bold leading-relaxed"
          disabled={loading || isImproving}
        />
        <div className="absolute bottom-8 right-8">
          <button
            onClick={handleImprove}
            disabled={!prompt.trim() || isImproving || loading}
            className="flex items-center gap-3 px-8 py-4 rounded-[1.5rem] bg-white/10 hover:bg-white/20 text-base font-black text-[#A2D2FF] border border-white/10 transition-all disabled:opacity-30 group/magic active:scale-95 shadow-lg"
          >
            {isImproving ? (
              <div className="w-5 h-5 border-2 border-[#A2D2FF] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6 group-hover/magic:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            ম্যাজিক প্রম্পট
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-[2rem] p-8">
          <label className="text-sm font-black text-[#A2D2FF] uppercase tracking-[4px] mb-6 block">স্টাইল পছন্দ করুন</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(ImageStyle).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-5 py-4 rounded-2xl text-base font-black transition-all border-2 ${
                  style === s 
                    ? 'bg-[#A2D2FF] text-slate-900 border-[#A2D2FF] shadow-xl' 
                    : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10'
                }`}
              >
                {s === 'Realistic' ? 'বাস্তবসম্মত' : 
                 s === 'Anime' ? 'এনিমে' : 
                 s === 'Cinematic' ? 'সিনেমাটিক' : 
                 s === 'Illustration' ? 'ইলাস্ট্রেশন' : '৩ডি রেন্ডার'}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] p-8">
          <label className="text-sm font-black text-[#CDB4DB] uppercase tracking-[4px] mb-6 block">সাইজ পছন্দ করুন</label>
          <div className="flex gap-4">
            {Object.values(AspectRatio).map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`flex flex-col items-center gap-3 p-5 rounded-[1.5rem] transition-all flex-1 border-2 ${
                  ratio === r 
                    ? 'bg-[#CDB4DB]/20 border-[#CDB4DB]/50 text-white shadow-inner' 
                    : 'bg-white/5 border-transparent text-slate-600 hover:bg-white/10'
                }`}
              >
                <div className={`border-2 border-current rounded-sm ${
                  r === AspectRatio.SQUARE ? 'w-6 h-6' : 
                  r === AspectRatio.LANDSCAPE ? 'w-10 h-6' : 'w-6 h-10'
                }`}></div>
                <span className="text-xs font-black">{r}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim() || isImproving}
        className="btn-glow relative w-full py-8 rounded-[2.5rem] bg-gradient-to-r from-[#A2D2FF] via-[#BDE0FE] to-[#CDB4DB] text-slate-900 font-black text-3xl shadow-2xl active:scale-[0.97] transition-all disabled:opacity-30 disabled:grayscale"
      >
        <div className="flex items-center justify-center gap-5">
          {loading ? (
            <>
              <div className="w-10 h-10 border-4 border-slate-900/10 border-t-slate-900 rounded-full animate-spin"></div>
              তৈরি হচ্ছে...
            </>
          ) : (
            <>
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ছবি তৈরি করুন
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default PromptInput;
