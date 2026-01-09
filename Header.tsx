
import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onLogin }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-8 py-6 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl font-black brand-glow text-white leading-none tracking-tight">
            এম্বার <span className="text-[#A2D2FF]">এআই</span>
          </h1>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[5px] mt-2">Next Gen Vision</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {user && user.name ? (
          <div className="flex items-center gap-4 group cursor-pointer" onClick={onLogout}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white">প্রো সদস্য</p>
              <p className="text-[10px] text-[#A2D2FF] font-black uppercase">সক্রিয়</p>
            </div>
            <img 
              src={user.photo} 
              alt="User" 
              className="w-11 h-11 rounded-full border-2 border-[#A2D2FF]/40 group-hover:border-[#A2D2FF] transition-all p-0.5" 
            />
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#A2D2FF] to-[#BDE0FE] text-slate-900 font-black text-sm hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            প্রবেশ করুন
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
