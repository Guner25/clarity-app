import React, { useState } from 'react';
import { CategoryType } from '../types';

interface Props {
  onNext: (category: CategoryType) => void;
  onBack: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const categories: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'work', label: 'İş', icon: 'work' },
  { id: 'relationships', label: 'İlişkiler', icon: 'favorite' },
  { id: 'self', label: 'Kendimle ilgili', icon: 'person' },
  { id: 'health', label: 'Sağlık', icon: 'monitor_heart' },
  { id: 'money', label: 'Para', icon: 'payments' },
  { id: 'unsure', label: 'Emin değilim', icon: 'help_center' },
];

export const CategoryScreen: React.FC<Props> = ({ onNext, onBack, isDarkMode, toggleTheme }) => {
  const [selected, setSelected] = useState<CategoryType | null>(null);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] animate-fade-in">
      <header className="flex items-center justify-between px-4 py-4 sticky top-0 z-50 bg-slate-50/90 dark:bg-[#101922]/90 backdrop-blur-md">
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <div className="flex items-center gap-1 animate-fade-in">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Adım 2 / 3</span>
        </div>
        <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90 text-slate-600 dark:text-slate-300"
        >
            <span className="material-symbols-outlined text-[24px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
      </header>

      <div className="flex w-full flex-row items-center justify-center gap-2 pb-4 pt-1 px-4 max-w-md mx-auto animate-slide-in-right">
        <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
        <div className="h-1.5 flex-1 rounded-full bg-[#137fec] transition-all duration-500"></div>
        <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-all duration-300"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 max-w-md mx-auto w-full">
        <div className="px-6 pt-2 pb-1">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight text-left animate-slide-up delay-75 opacity-0" style={{animationFillMode: 'forwards'}}>
            Bu konu neyle ilgili?
          </h1>
        </div>
        <div className="px-6 pb-6 pt-2">
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal animate-slide-up delay-100 opacity-0" style={{animationFillMode: 'forwards'}}>
            Size en uygun olan kategoriyi seçin.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6">
          {categories.map((cat, index) => {
            const isSelected = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                style={{ animationDelay: `${150 + (index * 50)}ms`, animationFillMode: 'forwards' }}
                className={`relative flex flex-col items-start gap-4 rounded-2xl p-5 aspect-[1/1] transition-all duration-200 group ring-0 outline-none opacity-0 animate-pop-in
                  ${isSelected 
                    ? 'border-2 border-[#137fec] bg-blue-50 dark:bg-blue-900/10 shadow-md scale-[1.02]' 
                    : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] shadow-sm hover:border-blue-300 active:scale-95'
                  }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300
                   ${isSelected 
                     ? 'bg-[#137fec] text-white' 
                     : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 group-hover:bg-blue-100 group-hover:text-[#137fec]'
                   }`}>
                  <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                </div>
                <div className="flex flex-col items-start text-left mt-auto">
                  <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{cat.label}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#137fec] text-white flex items-center justify-center animate-in fade-in zoom-in duration-200">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent dark:from-[#101922] dark:via-[#101922] px-6 py-6 pt-12 animate-fade-in delay-300">
        <div className="max-w-md mx-auto">
            <button 
            disabled={!selected}
            onClick={() => selected && onNext(selected)}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-[#137fec] hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 text-white text-[17px] font-bold leading-normal tracking-wide"
            >
            <span className="truncate">Devam Et</span>
            </button>
        </div>
      </div>
    </div>
  );
};