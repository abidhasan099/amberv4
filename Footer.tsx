
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-8 mt-20 glass border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-black text-white brand-glow mb-1 uppercase tracking-tighter">
            Amber AI
          </h4>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[3px]">
            Future of Visual Creativity
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm font-bold">Developer:</span>
            <span className="text-[#A2D2FF] text-sm font-black uppercase tracking-wider">Abid Hasan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm font-bold">Contact our team:</span>
            <span className="text-[#CDB4DB] text-sm font-black tracking-widest">+8801876158277</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[5px]">
          &copy; {new Date().getFullYear()} Amber AI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
