import React from 'react';

interface Props {
  onStart: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart, isDarkMode, toggleTheme }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] transition-colors duration-500 overflow-hidden">
      <div className="flex items-center justify-between p-6 pt-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-[#137fec]">
            <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
          </div>
          <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">Clarity</span>
        </div>
        <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
        >
            <span className="material-symbols-outlined text-[24px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-6">
        <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner animate-pop-in">
           <img 
            src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=1000&auto=format&fit=crop" 
            alt="Abstract tangled thread"
            className="w-full h-full object-cover opacity-80 transition-transform duration-[20s] hover:scale-110"
           />
        </div>

        <div className="w-full text-center space-y-4">
          <h1 className="text-slate-900 dark:text-white text-[28px] md:text-[32px] font-bold leading-[1.2] tracking-tight animate-slide-up delay-[100ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            Ne yaşadığını birlikte netleştirelim.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-[280px] mx-auto animate-slide-up delay-[200ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            Cümlelerin düzgün olmak zorunda değil.
          </p>
        </div>
      </div>

      <div className="w-full p-6 pb-10 flex flex-col items-center gap-8 mt-auto animate-slide-up delay-[300ms] opacity-0" style={{animationFillMode: 'forwards'}}>
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-[#137fec] transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <button 
          onClick={onStart}
          className="w-full bg-[#137fec] hover:bg-blue-600 active:bg-blue-700 active:scale-95 text-white text-lg font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>Başla</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        <p className="text-xs text-slate-400 dark:text-slate-600 text-center px-4">
          Bu uygulama tıbbi bir araç değildir.
        </p>
      </div>
    </div>
  );
};