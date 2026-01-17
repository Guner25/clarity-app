import React, { useState } from 'react';

interface Props {
  onNext: (text: string) => void;
  onBack: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const InputScreen: React.FC<Props> = ({ onNext, onBack, isDarkMode, toggleTheme }) => {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] animate-fade-in">
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 z-50 bg-slate-50/90 dark:bg-[#101922]/90 backdrop-blur-md transition-all">
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
        >
            <span className="material-symbols-outlined text-[24px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </header>

      <div className="px-6 py-2 w-full max-w-md mx-auto animate-slide-in-right">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-all duration-300"></div>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-all duration-300"></div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 text-right">Adım 1/3</p>
      </div>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-24 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white mb-6 animate-slide-up delay-75 opacity-0" style={{animationFillMode: 'forwards'}}>
          Şu anda seni en çok zorlayan şey ne?
        </h1>

        <div className="relative group flex-1 flex flex-col animate-slide-up delay-150 opacity-0" style={{animationFillMode: 'forwards'}}>
          <div className="relative flex-1 flex flex-col bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 focus-within:border-[#137fec] focus-within:ring-1 focus-within:ring-[#137fec] transition-all duration-300 overflow-hidden">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 w-full p-5 bg-transparent border-0 focus:ring-0 resize-none text-base leading-relaxed text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[240px] outline-none" 
              placeholder="Aklına geldiği gibi yazabilirsin. İş stresi, ilişki problemleri veya sadece belirsiz bir huzursuzluk..."
            ></textarea>
            
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Gizlilik koruması aktif</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 opacity-80">
            <span className="material-symbols-outlined text-[16px] text-[#137fec]">lock</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Yanıtlarınız şifrelenir ve kaydedilmez.</p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-lg border-t border-slate-200/50 dark:border-slate-800/50 z-40 animate-slide-up delay-200">
        <div className="max-w-md mx-auto">
          <button 
            disabled={!text.trim()}
            onClick={() => text.trim() && onNext(text)}
            className="w-full flex items-center justify-center gap-2 bg-[#137fec] disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
          >
            <span>Devam Et</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};