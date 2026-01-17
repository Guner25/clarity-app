import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ClarityAnalysis } from '../types';

interface Props {
  analysis: ClarityAnalysis;
  onHome: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ShareScreen: React.FC<Props> = ({ analysis, onHome, isDarkMode, toggleTheme }) => {
  const [shareText, setShareText] = useState<string | null>(null);

  useEffect(() => {
    const fetchText = async () => {
      const text = await geminiService.generateShareableText(analysis);
      setShareText(text);
    };
    fetchText();
  }, [analysis]);

  const copyToClipboard = () => {
    if (shareText) {
        navigator.clipboard.writeText(shareText);
        alert("Metin kopyalandı!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] overflow-x-hidden animate-fade-in">
        <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-slate-50 dark:bg-[#101922]">
            <button onClick={onHome} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90">
                <span className="material-symbols-outlined">home</span>
            </button>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center animate-fade-in delay-100">Özet</h2>
            <button 
                onClick={toggleTheme} 
                className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
            >
                <span className="material-symbols-outlined text-[24px]">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
        </div>

        <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-24 w-full max-w-md mx-auto">
            <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight text-center pb-6 pt-2 animate-slide-up delay-75 opacity-0" style={{animationFillMode: 'forwards'}}>
                Bunu birine anlatmak istersen
            </h3>

            <div className="w-full bg-white dark:bg-[#1e2936] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative animate-pop-in delay-150 opacity-0" style={{animationFillMode: 'forwards'}}>
                <div className="h-2 w-full bg-[#137fec]"></div>
                <div className="p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#137fec]" style={{fontSize: '20px'}}>format_quote</span>
                        </div>
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Özet Kartı</span>
                    </div>

                    <div className="flex flex-col gap-4 min-h-[150px]">
                        {!shareText ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <p className="text-slate-900 dark:text-white text-base leading-relaxed animate-fade-in">
                                {shareText}
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-cover bg-center bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-500 text-sm">person</span>
                     </div>
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white text-xs font-bold">Senin Notun</span>
                        <span className="text-slate-400 text-[10px]">Bugün oluşturuldu</span>
                    </div>
                </div>
            </div>

            <div className="h-6"></div>

            <div className="flex w-full gap-3 animate-slide-up delay-200 opacity-0" style={{animationFillMode: 'forwards'}}>
                <button 
                    onClick={copyToClipboard}
                    className="flex-1 flex cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-[#137fec] transition-all active:scale-95 text-sm font-bold leading-normal tracking-[0.015em]"
                >
                    <span className="material-symbols-outlined mr-2" style={{fontSize: '20px'}}>content_copy</span>
                    <span className="truncate">Kopyala</span>
                </button>
            </div>
        </div>
    </div>
  );
};