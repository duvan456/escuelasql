import { useState, useCallback, useRef } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { useProgressStore } from '../stores/useProgressStore';
import { calculateStars, calculateXp } from '../lib/game/scoring';
import { checkAchievements } from '../lib/game/achievements';
import { allModules } from '../data/modules';
import { useSqlEngine } from './useSqlEngine';

export interface LevelData {
  id: string;
  moduleId: string;
  schema: string;
  seed: string;
  baseXp: number;
  expectedResult: any[];
}

/**
 * Hook to manage game level logic.
 * Integrates the SQL engine, validates results, handles scoring and completion.
 * @param levelData - Data and definitions for the current level
 */
export function useLevel(levelData: LevelData) {
  const gameStore = useGameStore();
  const progressStore = useProgressStore();
  const { executeQuery, isReady, error: engineError } = useSqlEngine(levelData.schema, levelData.seed);
  
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const levelStartedAt = useRef(Date.now());

  const submitQuery = useCallback(() => {
    if (!isReady) return;
    
    gameStore.submitAttempt();
    try {
      const res = executeQuery(query);
      setResult(res);
      setError(null);
      
      // Compare execution result against the expected result.
      const isSuccess = JSON.stringify(res) === JSON.stringify(levelData.expectedResult);
      
      if (isSuccess) {
        useGameStore.setState({ isLevelComplete: true });
        
        const stars = calculateStars(gameStore.attempts + 1, gameStore.hintsUsed);
        const xp = calculateXp(levelData.baseXp, gameStore.attempts + 1, gameStore.hintsUsed, progressStore.currentStreak);
        
        progressStore.completeLevel(levelData.id, stars, gameStore.attempts + 1, {
          moduleId: levelData.moduleId,
          noHints: gameStore.hintsUsed === 0,
          timeSeconds: (Date.now() - levelStartedAt.current) / 1000,
        });
        progressStore.addXp(xp);
        progressStore.updateStreak();
        const newAchievements = checkAchievements(useProgressStore.getState(), allModules);
        newAchievements.forEach(achievementId => progressStore.unlockAchievement(achievementId));
        
        // At this point, UI should trigger confetti/celebration based on gameStore.isLevelComplete
      }
    } catch (err: any) {
      setError(err.message || 'Syntax Error');
      setResult(null);
      gameStore.loseLife();
    }
  }, [query, isReady, executeQuery, gameStore, levelData, progressStore]);

  return {
    query,
    setQuery,
    submitQuery,
    result,
    error: error || engineError,
    isReady
  };
}
