import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomeScreen } from './components/HomeScreen';
import { InputScreen } from './components/InputScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { ShareScreen } from './components/ShareScreen';
import { geminiService } from './services/geminiService';
import { AppState, CategoryType } from './types';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<AppState>({
    step: 'welcome', // Default, will be updated by useEffect
    initialInput: '',
    selectedCategory: null,
    aiQuestion: null,
    userAnswer: null,
    analysis: null,
    shareableText: null,
    isLoading: false,
  });

  // Theme Management
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // First Time Visitor Check
  useEffect(() => {
    const hasVisited = localStorage.getItem('clarity_has_visited');
    if (hasVisited === 'true') {
        setState(prev => ({ ...prev, step: 'home' }));
    }
    // If not visited, it stays 'welcome' by default
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // App Logic
  const handleWelcomeComplete = () => {
    localStorage.setItem('clarity_has_visited', 'true');
    setState(prev => ({ ...prev, step: 'home' }));
  };

  const handleStartAnalysis = () => {
      setState(prev => ({ 
        ...prev, 
        step: 'input',
        // Reset analysis state
        initialInput: '',
        selectedCategory: null,
        aiQuestion: null,
        userAnswer: null,
        analysis: null
      }));
  };

  const handleInputSubmit = (text: string) => {
    setState(prev => ({ ...prev, initialInput: text, step: 'category' }));
  };

  const handleCategorySubmit = async (category: CategoryType) => {
    setState(prev => ({ ...prev, selectedCategory: category, isLoading: true, step: 'question' }));
    
    const question = await geminiService.generateQuestion(state.initialInput, category);
    
    setState(prev => ({ 
        ...prev, 
        selectedCategory: category, 
        aiQuestion: question, 
        isLoading: false 
    }));
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!state.selectedCategory || !state.aiQuestion) return;

    setState(prev => ({ ...prev, userAnswer: answer, isLoading: true }));

    const analysis = await geminiService.generateAnalysis(
        state.initialInput, 
        state.selectedCategory, 
        state.aiQuestion, 
        answer
    );

    setState(prev => ({ 
        ...prev, 
        userAnswer: answer, 
        analysis, 
        step: 'summary', 
        isLoading: false 
    }));
  };

  const handleEdit = () => {
      setState(prev => ({...prev, step: 'input', analysis: null, aiQuestion: null, userAnswer: null}));
  };

  const handleContinueToShare = () => {
      setState(prev => ({...prev, step: 'share'}));
  };

  const handleHome = () => {
      setState({
        step: 'home',
        initialInput: '',
        selectedCategory: null,
        aiQuestion: null,
        userAnswer: null,
        analysis: null,
        shareableText: null,
        isLoading: false,
      });
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-50 dark:bg-[#101922] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-500">
      {state.step === 'welcome' && (
        <WelcomeScreen onStart={handleWelcomeComplete} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
      {state.step === 'home' && (
        <HomeScreen onStartAnalysis={handleStartAnalysis} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
      {state.step === 'input' && (
        <InputScreen onNext={handleInputSubmit} onBack={handleHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
      {state.step === 'category' && (
        <CategoryScreen onNext={handleCategorySubmit} onBack={() => setState(p => ({...p, step: 'input'}))} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
      {state.step === 'question' && state.aiQuestion && (
          <QuestionScreen 
            question={state.aiQuestion} 
            onNext={handleAnswerSubmit} 
            isLoading={state.isLoading}
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme}
          />
      )}
      {state.step === 'summary' && state.analysis && (
          <SummaryScreen 
            analysis={state.analysis} 
            onEdit={handleEdit} 
            onContinue={handleContinueToShare} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme}
          />
      )}
      {state.step === 'share' && state.analysis && (
          <ShareScreen 
            analysis={state.analysis}
            onHome={handleHome}
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme}
          />
      )}
      
      {state.step === 'question' && !state.aiQuestion && state.isLoading && (
         <div className="fixed inset-0 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-fade-in">
             <div className="relative">
                 <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                 <span className="material-symbols-outlined text-[#137fec] text-5xl animate-spin relative z-10">progress_activity</span>
             </div>
             <p className="text-slate-600 dark:text-slate-300 font-medium mt-6 animate-pulse">Durumu analiz ediyorum...</p>
         </div>
      )}
    </div>
  );
};

export default App;