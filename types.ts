export interface ClarityAnalysis {
  shortDefinition: string;
  probableFactors: string[];
  whatItIsNot: string[];
}

export type CategoryType = 'work' | 'relationships' | 'self' | 'health' | 'money' | 'unsure';

export interface AppState {
  step: 'welcome' | 'input' | 'category' | 'question' | 'summary' | 'share';
  initialInput: string;
  selectedCategory: CategoryType | null;
  aiQuestion: string | null;
  userAnswer: string | null;
  analysis: ClarityAnalysis | null;
  shareableText: string | null;
  isLoading: boolean;
}
