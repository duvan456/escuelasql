import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PLAYER_RANKS } from '../lib/utils/constants';

interface CompletedLevelData {
  stars: number;
  bestAttempts: number;
}

interface ProgressState {
  completedLevels: Record<string, CompletedLevelData>;
  totalXp: number;
  currentStreak: number;
  lastPlayedDate: string | null;
  achievements: string[];
  
  completeLevel: (levelId: string, stars: number, attempts: number) => void;
  addXp: (xp: number) => void;
  updateStreak: () => void;
  unlockAchievement: (achievementId: string) => void;
  getPlayerRank: () => { name: string; minXp: number; icon: string };
  getModuleProgress: (levelIds: string[]) => { completed: number; total: number };
}

/**
 * Zustand store with localStorage persistence for player progress.
 * Tracks completed levels, XP, streaks, and achievements.
 */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLevels: {},
      totalXp: 0,
      currentStreak: 0,
      lastPlayedDate: null,
      achievements: [],

      completeLevel: (levelId, stars, attempts) => set((state) => {
        const existing = state.completedLevels[levelId];
        const newBestAttempts = existing ? Math.min(existing.bestAttempts, attempts) : attempts;
        const newStars = existing ? Math.max(existing.stars, stars) : stars;
        
        return {
          completedLevels: {
            ...state.completedLevels,
            [levelId]: { stars: newStars, bestAttempts: newBestAttempts }
          }
        };
      }),

      addXp: (xp) => set((state) => ({ totalXp: state.totalXp + xp })),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastPlayedDate === today) return state;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        return {
          lastPlayedDate: today,
          currentStreak: state.lastPlayedDate === yesterdayStr ? state.currentStreak + 1 : 1
        };
      }),

      unlockAchievement: (achievementId) => set((state) => {
        if (state.achievements.includes(achievementId)) return state;
        return { achievements: [...state.achievements, achievementId] };
      }),

      getPlayerRank: () => {
        const { totalXp } = get();
        let currentRank = PLAYER_RANKS[0];
        for (const rank of PLAYER_RANKS) {
          if (totalXp >= rank.minXp) {
            currentRank = rank;
          } else {
            break;
          }
        }
        return currentRank;
      },

      getModuleProgress: (levelIds) => {
        const { completedLevels } = get();
        const completed = levelIds.filter(id => completedLevels[id]).length;
        return { completed, total: levelIds.length };
      }
    }),
    {
      name: 'escuelasql-progress',
    }
  )
);
