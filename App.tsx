
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageCard from './components/ImageCard';
import Footer from './components/Footer';
import { GeneratedImage, ImageStyle, AspectRatio, UserProfile } from './types';
import { generateAIImage, improvePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load history from localStorage with error handling for large base64 strings
  useEffect(() => {
    const saved = localStorage.getItem('amber_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setImages(parsed);
        }
      } catch (e) {
        console.error("Storage retrieval error", e);
        localStorage.removeItem('amber_history'); // Reset on corruption
      }
    }
    
    // Auto-login session without alert
    setUser({
      name: 'ক্রিয়েটিভ আর্কিটেক্ট',
      email: 'user@amber.ai',
      photo: 'https://picsum.photos/seed/amber-ai-user/100/100'
    });
  }, []);

  // Save history but limit to last 5 images to prevent LocalStorage Quota Exceeded error
  useEffect(() => {
    try {
      // We only store the last few images to avoid browser crashes (localStorage limit is ~5MB)
      const imagesToSave = images.slice(0, 5); 
      localStorage.setItem('amber_history', JSON.stringify(imagesToSave));
    } catch (e) {
      console.warn("LocalStorage is full, images stored in memory only.");
      // If full, we try to store just the last 2
      try {
        localStorage.setItem('amber_history', JSON.stringify(images.slice(0, 2)));
      } catch (innerE) {
        localStorage.removeItem('amber_history');
      }
    }
  }, [images]);

  const handleGenerate = async (prompt: string, style: ImageStyle, ratio: AspectRatio) => {
    setLoading(true);
    try {
      const imageUrl = await generateAIImage(prompt, style, ratio);
      const newImage: GeneratedImage = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        url: imageUrl,
        prompt,
        style,
        aspectRatio: ratio,
        createdAt: Date.now()
      };
      // For "endless" generation, we keep the full session in state
      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error(error);
      // Fallback for errors
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (image: GeneratedImage) => {
    if (navigator.share) {
      navigator.share({
        title: 'এম্বার এআই মাস্টারপিস',
        text: `এআই দিয়ে তৈরি এই ছবিটি দেখুন: "${image.prompt}"`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(image.url);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-[#A2D2FF]/40">
      <Header 
        user={user} 
        onLogin={() => setUser({ name: 'গেস্ট ইউজার', email: '', photo: 'https://picsum.photos/seed/guest/100/100' })}
        onLogout={() => setUser(null)}
      />

      <main className="pt-40 px-6 max-w-7xl mx-auto relative z-10">
        <section className="text-center mb-20 animate-in fade-in zoom-in duration-1000">
          <h2 className="text-7xl md:text-9xl font-black text-white mb-8 leading-tight bold-title">
            ভাবুন এবং <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A2D2FF] via-[#CDB4DB] to-[#BDE0FE] brand-glow">সৃজন</span> করুন
          </h2>
          <p className="text-[#BDE0FE] text-2xl md:text-3xl max-w-4xl mx-auto font-black tracking-tight leading-snug">
            এম্বার এআই এর মাধ্যমে আপনার কল্পনাকে বাস্তবের ক্যানভাসে ফুটিয়ে তুলুন এক নিমিষেই।
          </p>
        </section>

        <section className="mb-36">
          <PromptInput 
            onGenerate={handleGenerate} 
            onImprove={improvePrompt} 
            loading={loading}
          />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex items-center justify-between mb-14 border-b border-white/10 pb-8">
            <h3 className="text-4xl font-black text-white flex items-center gap-5">
              <span className="w-5 h-5 rounded-full bg-[#A2D2FF] shadow-[0_0_20px_#A2D2FF] animate-pulse"></span>
              আপনার তৈরীকৃত ছবিগুলো
            </h3>
            {images.length > 0 && (
              <button 
                onClick={() => { if(confirm("সব ছবি মুছে ফেলতে চান?")) setImages([]); }}
                className="text-sm font-black text-slate-500 hover:text-red-400 transition-colors uppercase tracking-[4px]"
              >
                Clear All
              </button>
            )}
          </div>

          {images.length === 0 ? (
            <div className="text-center py-40 glass rounded-[4rem] border-dashed border-white/10 opacity-60">
              <p className="text-slate-400 text-3xl font-black italic">গ্যালারি খালি। নতুন ছবি তৈরি শুরু করুন!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {images.map(img => (
                <ImageCard 
                  key={img.id} 
                  image={img} 
                  onDownload={handleDownload} 
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {loading && (
        <div className="fixed bottom-12 left-12 z-50 glass px-10 py-5 rounded-[2.5rem] border border-[#A2D2FF]/40 flex items-center gap-6 shadow-2xl animate-in slide-in-from-left-10">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#A2D2FF]/20 border-t-[#A2D2FF] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#CDB4DB] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-[#A2D2FF] uppercase tracking-[3px]">সংশ্লেষণ চলছে</span>
            <span className="text-[12px] text-slate-500 font-bold">এআই আপনার দৃশ্যটি নিখুঁত করছে...</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
