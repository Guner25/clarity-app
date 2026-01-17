import React from 'react';
import { ClarityAnalysis } from '../types';

interface Props {
  analysis: ClarityAnalysis;
  onEdit: () => void;
  onContinue: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const SummaryScreen: React.FC<Props> = ({ analysis, onEdit, onContinue, isDarkMode, toggleTheme }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] overflow-x-hidden animate-fade-in">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-20 backdrop-blur-md bg-slate-50/95 dark:bg-[#101922]/95 transition-all">
        <button onClick={onEdit} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center animate-fade-in delay-100">Problem Netlik Özeti</h2>
        <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
        >
            <span className="material-symbols-outlined text-[24px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-3 py-4 animate-slide-in-right">
        <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-2 w-2 rounded-full bg-[#137fec] ring-2 ring-blue-500/30"></div>
        <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      </div>

      <div className="max-w-md mx-auto w-full pb-32">
        <h2 className="text-slate-900 dark:text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-2 pt-2 animate-slide-up delay-75 opacity-0" style={{animationFillMode: 'forwards'}}>
            Özetinize göz atın
        </h2>
        <p className="text-slate-700 dark:text-gray-400 text-base font-normal leading-normal pb-6 pt-1 px-4 animate-slide-up delay-100 opacity-0" style={{animationFillMode: 'forwards'}}>
            Sorunu netleştirmek için analiz sonucu aşağıdadır.
        </p>

        {/* Card 1: Definition */}
        <div className="px-4 mb-5 animate-slide-up delay-[150ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            <div className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[140px] shadow-lg overflow-hidden relative group transition-transform hover:scale-[1.01] duration-300" 
                 style={{backgroundImage: `linear-gradient(180deg, rgba(19, 127, 236, 0) 0%, rgba(16, 25, 34, 0.95) 100%), url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop')`}}>
                <div className="flex w-full items-end justify-between gap-4 p-5 z-10">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-center gap-2 mb-1 opacity-90">
                            <span className="material-symbols-outlined text-white text-lg">flag</span>
                            <span className="text-white text-xs font-bold uppercase tracking-wider">Kısa Problem Tanımı</span>
                        </div>
                        <p className="text-white text-lg font-medium leading-normal">
                            {analysis.shortDefinition}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Card 2: Factors */}
        <div className="px-4 mb-5 animate-slide-up delay-[250ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm p-5 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec]">
                            <span className="material-symbols-outlined text-xl">fact_check</span>
                        </div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Muhtemel Etkenler</h3>
                    </div>
                    <span className="text-xs font-medium text-gray-400">{analysis.probableFactors.length} Madde</span>
                </div>
                <div className="space-y-3">
                    {analysis.probableFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined text-[#137fec] text-xl shrink-0 mt-0.5">check_small</span>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{factor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Card 3: What It Is Not */}
        <div className="px-4 animate-slide-up delay-[350ms] opacity-0" style={{animationFillMode: 'forwards'}}>
            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm p-5 border border-slate-100 dark:border-slate-800 relative overflow-hidden hover:border-orange-200 transition-colors duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 dark:bg-orange-900/10 rounded-bl-full -mr-10 -mt-10 z-0 transition-transform hover:scale-110 duration-500"></div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="size-8 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
                        <span className="material-symbols-outlined text-xl">block</span>
                    </div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Bu ne değil?</h3>
                </div>
                <div className="relative z-10 space-y-2">
                    {analysis.whatItIsNot.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 z-50 animate-slide-up delay-500">
        <div className="flex gap-3 max-w-md mx-auto">
            <button onClick={onEdit} className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white font-semibold py-3.5 px-6 rounded-xl transition-all active:scale-[0.98] hover:bg-slate-50 dark:hover:bg-slate-700">
                Başa Dön
            </button>
            <button onClick={onContinue} className="flex-[2] bg-[#137fec] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] hover:bg-blue-600 flex items-center justify-center gap-2">
                <span>Paylaşılabilir Özet</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </button>
        </div>
      </div>
    </div>
  );
};