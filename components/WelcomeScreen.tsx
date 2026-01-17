import React from 'react';

interface Props {
  onStart: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart, isDarkMode, toggleTheme }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] transition-colors duration-500 overflow-hidden">
      {/* Header */}
      <div className="flex-none flex items-center justify-between p-6 pt-6 animate-fade-in z-20">
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

      {/* Main Content - Flexible with scroll safety */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 min-h-0 overflow-y-auto">
        
        {/* Image Container - Responsive Height */}
        <div className="w-full max-w-[340px] relative rounded-3xl overflow-hidden mb-6 shadow-2xl shadow-blue-500/10 animate-pop-in shrink" style={{maxHeight: '45vh'}}>
           <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
            alt="Abstract Fluid Art"
            className="w-full h-full object-cover"
            style={{maxHeight: '45vh', width: '100%'}}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 via-transparent to-transparent dark:from-[#101922]/50"></div>
        </div>

        {/* Text Section */}
        <div className="w-full text-center space-y-4 shrink-0 pb-2">
          <h1 className="text-slate-900 dark:text-white text-[28px] md:text-[34px] font-bold leading-[1.15] tracking-tight animate-slide-up delay-[100ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            Zihnindeki düğümleri çözelim.
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-normal leading-relaxed max-w-[280px] mx-auto animate-slide-up delay-[200ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            Karmaşık düşüncelerini sade ve net bir zemine oturtmak için buradayız.
          </p>
        </div>
      </div>

      {/* Footer / Button Area */}
      <div className="flex-none w-full p-6 pb-8 flex flex-col items-center gap-6 animate-slide-up delay-[300ms] opacity-0 z-20 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-[#101922] dark:via-[#101922]" style={{animationFillMode: 'forwards'}}>
        
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-1.5 w-8 rounded-full bg-[#137fec] transition-all duration-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <button 
          onClick={onStart}
          className="w-full bg-[#137fec] hover:bg-blue-600 active:bg-blue-700 active:scale-95 text-white text-lg font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>Başla</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};