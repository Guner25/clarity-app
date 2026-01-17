import React from 'react';

interface Props {
  onStartAnalysis: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onStartAnalysis, isDarkMode, toggleTheme }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#101922] transition-colors duration-500 overflow-hidden animate-fade-in relative">
      
      {/* Header - Simplified since settings is now at bottom */}
      <div className="flex items-center justify-between p-6 pt-8 pb-2">
        <div className="flex flex-col">
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-slide-in-right">Tekrar Merhaba,</span>
          <span className="text-slate-900 dark:text-white font-bold text-2xl tracking-tight animate-slide-in-right delay-75">Zihnin nasıl?</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden animate-fade-in">
             <img src="https://api.dicebear.com/9.x/micah/svg?seed=ClarityUser" alt="User" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-32 w-full max-w-md mx-auto overflow-y-auto scrollbar-hide">
        
        {/* Daily Quote - Moved to top as Hero */}
        <div className="mb-8 animate-pop-in" style={{animationFillMode: 'forwards'}}>
           <div className="bg-gradient-to-br from-[#137fec] to-[#0b5bb0] p-6 rounded-3xl shadow-lg shadow-blue-500/20 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 text-white opacity-10 transform translate-x-4 -translate-y-2">
                 <span className="material-symbols-outlined text-[120px]">format_quote</span>
              </div>
              <div className="flex items-center gap-2 mb-3 opacity-80">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                <span className="text-xs font-bold uppercase tracking-wider">Günün Notu</span>
              </div>
              <p className="text-white text-lg font-medium leading-relaxed relative z-10">
                "Netlik, zihnin sakinleşmesiyle başlar. Acele etme, sadece tanımla."
              </p>
           </div>
        </div>

        {/* Categories Preview */}
        <div className="animate-slide-up delay-100 opacity-0 mb-8" style={{animationFillMode: 'forwards'}}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Kategoriler</h3>
                <span className="text-xs text-[#137fec] font-medium">Tümü</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
               {[
                 { label: 'İş', icon: 'work', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
                 { label: 'İlişkiler', icon: 'favorite', color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
                 { label: 'Sağlık', icon: 'monitor_heart', color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
                 { label: 'Para', icon: 'payments', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' }
               ].map((cat, i) => (
                   <button key={i} onClick={onStartAnalysis} className="flex-shrink-0 flex flex-col items-center gap-3 group">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95 ${cat.color}`}>
                         <span className="material-symbols-outlined text-2xl">
                            {cat.icon}
                         </span>
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{cat.label}</span>
                   </button>
               ))}
            </div>
        </div>

        {/* Recent History Placeholder */}
        <div className="animate-slide-up delay-200 opacity-0" style={{animationFillMode: 'forwards'}}>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">Geçmiş Analizler</h3>
            <div className="flex flex-col gap-3">
                {/* Empty State / Placeholder Item */}
                <div className="bg-white dark:bg-[#1a2632] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 opacity-60">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">history</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    </div>
                </div>
                 <div className="text-center mt-2">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Henüz kaydedilmiş bir analiz yok.</p>
                 </div>
            </div>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50">
          {/* Curved Background Shape effect can be complex, using a clean glass bar instead */}
          <div className="bg-white/90 dark:bg-[#101922]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-6 h-[80px] w-full flex items-start justify-between relative shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
              
              {/* Left: Home */}
              <button className="flex-1 flex flex-col items-center gap-1 py-2 group">
                  <span className="material-symbols-outlined text-[#137fec] text-[28px] transition-transform group-active:scale-90">home</span>
                  <span className="text-[10px] font-bold text-[#137fec]">Ev</span>
              </button>

              {/* Center: FAB (Floating Action Button) */}
              <div className="relative -top-8">
                  <button 
                    onClick={onStartAnalysis}
                    className="h-16 w-16 rounded-full bg-[#137fec] text-white flex items-center justify-center shadow-lg shadow-blue-500/40 hover:bg-blue-600 active:scale-95 transition-all duration-200 ring-4 ring-slate-50 dark:ring-[#101922]"
                  >
                      <span className="material-symbols-outlined text-[32px]">add</span>
                  </button>
              </div>

              {/* Right: Settings (Theme Toggle for now) */}
              <button onClick={toggleTheme} className="flex-1 flex flex-col items-center gap-1 py-2 group text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-[28px] transition-transform group-active:rotate-90">settings</span>
                  <span className="text-[10px] font-medium">Ayarlar</span>
              </button>
          </div>
      </div>
    </div>
  );
};