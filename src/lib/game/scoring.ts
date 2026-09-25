/**
 * Calculate the XP gained for completing a level.
 * @param baseXp - Base XP for the level
 * @param attempts - Number of attempts taken
 * @param hintsUsed - Number of hints revealed
 * @param streak - Current daily streak count
 * @returns Final calculated XP
 */
export function calculateXp(baseXp: number, attempts: number, hintsUsed: number, streak: number): number {
  const streakMultiplier = 1 + (streak * 0.1);
  const hintMultiplier = hintsUsed === 0 ? 1.5 : 1;
  const attemptsFactor = 1 / Math.max(attempts, 1);
  
  const xp = baseXp * attemptsFactor * streakMultiplier * hintMultiplier;
  return Math.round(xp);
}

/**
 * Calculate the star rating for completing a level.
 * @param attempts - Number of attempts taken
 * @param hintsUsed - Number of hints revealed
 * @returns 1, 2, or 3 stars
 */
export function calculateStars(attempts: number, hintsUsed: number): 1 | 2 | 3 {
  if (attempts === 1 && hintsUsed === 0) return 3;
  if (attempts <= 3) return 2;
  return 1;
}
