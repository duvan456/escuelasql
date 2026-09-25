import { create } from 'zustand';

interface GameState {
  currentModuleId: string | null;
  currentLevelId: string | null;
  attempts: number;
  hintsUsed: number;
  lives: number;
  isLevelComplete: boolean;
  showSolution: boolean;
  
  startLevel: (moduleId: string, levelId: string) => void;
  submitAttempt: () => void;
  useHint: () => void;
  resetLevel: () => void;
  nextLevel: () => void;
  loseLife: () => void;
  resetLives: () => void;
}

/**
 * Zustand store for current game session.
 * Tracks attempts, hints, lives, and level completion status.
 */
export const useGameStore = create<GameState>((set) => ({
  currentModuleId: null,
  currentLevelId: null,
  attempts: 0,
  hintsUsed: 0,
  lives: 3,
  isLevelComplete: false,
  showSolution: false,

  startLevel: (moduleId, levelId) => set({
    currentModuleId: moduleId,
    currentLevelId: levelId,
    attempts: 0,
    hintsUsed: 0,
    isLevelComplete: false,
    showSolution: false
  }),
  
  submitAttempt: () => set((state) => ({ attempts: state.attempts + 1 })),
  
  useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
  
  resetLevel: () => set({ attempts: 0, hintsUsed: 0, isLevelComplete: false, showSolution: false }),
  
  nextLevel: () => set({ attempts: 0, hintsUsed: 0, isLevelComplete: false, showSolution: false }),
  
  loseLife: () => set((state) => ({ lives: Math.max(0, state.lives - 1) })),
  
  resetLives: () => set({ lives: 3 })
}));
