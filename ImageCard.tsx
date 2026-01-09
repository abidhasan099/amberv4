
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: (url: string, name: string) => void;
  onShare: (image: GeneratedImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDownload, onShare }) => {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] glass border border-white/5 transition-all hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(162,210,255,0.15)]">
      <div className="aspect-square w-full overflow-hidden bg-slate-900/50 relative">
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#A2D2FF] animate-pulse"></div>
          <span className="text-[10px] font-black text-[#A2D2FF] tracking-[2px] uppercase">Amber Core</span>
        </div>
      </div>
      
      <div className="p-7">
        <p className="text-slate-300 text-sm line-clamp-2 font-bold mb-5 italic">"{image.prompt}"</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-[#A2D2FF] font-black uppercase border border-white/5">{image.style}</span>
            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-slate-500 font-black uppercase border border-white/5">{image.aspectRatio}</span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => onDownload(image.url, `amber-${image.id}.png`)}
              className="p-3 rounded-2xl bg-[#A2D2FF] text-slate-900 hover:scale-110 transition-transform shadow-lg shadow-[#A2D2FF]/20"
              title="ডাউনলোড করুন"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button 
              onClick={() => onShare(image)}
              className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5 transition-all"
              title="শেয়ার করুন"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
