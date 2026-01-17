import React, { useState } from 'react';

interface Props {
  question: string;
  onNext: (answer: string) => void;
  isLoading: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const QuestionScreen: React.FC<Props> = ({ question, onNext, isLoading, isDarkMode, toggleTheme }) => {
  const [answer, setAnswer] = useState('');

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] animate-fade-in">
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 z-50 bg-slate-50/90 dark:bg-[#101922]/90 backdrop-blur-md">
         <div className="w-10"></div>
         <div className="flex-1"></div>
         <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
        >
            <span className="material-symbols-outlined text-[24px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </header>

      <div className="px-6 py-2 w-full max-w-md mx-auto -mt-2 animate-slide-in-right">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
          <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
          <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-2 text-right">Adım 3/3</p>
      </div>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-24 w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-6 relative overflow-hidden animate-pop-in delay-75 opacity-0" style={{animationFillMode: 'forwards'}}>
            <div className="absolute top-0 left-0 w-1 h-full bg-[#137fec]"></div>
            <p className="text-sm text-[#137fec] font-bold uppercase mb-2">Netleştirelim</p>
            <h1 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">
                {question}
            </h1>
        </div>

        <div className="relative flex-1 flex flex-col bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 focus-within:border-[#137fec] focus-within:ring-1 focus-within:ring-[#137fec] transition-all duration-300 overflow-hidden animate-slide-up delay-150 opacity-0" style={{animationFillMode: 'forwards'}}>
        <textarea 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 w-full p-5 bg-transparent border-0 focus:ring-0 resize-none text-base leading-relaxed text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none" 
            placeholder="Cevabını buraya yaz..."
        ></textarea>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-lg border-t border-slate-200/50 dark:border-slate-800/50 z-40 animate-slide-up delay-200">
        <div className="max-w-md mx-auto">
          <button 
            disabled={!answer.trim() || isLoading}
            onClick={() => answer.trim() && onNext(answer)}
            className="w-full flex items-center justify-center gap-2 bg-[#137fec] disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
          >
             {isLoading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
             ) : (
                 <>
                    <span>Analizi Tamamla</span>
                    <span className="material-symbols-outlined text-[20px]">check</span>
                 </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};