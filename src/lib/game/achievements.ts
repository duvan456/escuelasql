export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  { id: 'first_query', title: 'Primera Consulta', description: 'Ejecuta tu primera consulta SQL correctamente.', icon: '🏆' },
  { id: 'ten_levels', title: 'Veterano SQL', description: 'Completa 10 niveles.', icon: '🔥' },
  { id: 'no_hints_streak_5', title: 'Mente Brillante', description: 'Completa 5 niveles seguidos sin usar pistas.', icon: '🧠' },
  { id: 'all_module_complete', title: 'Especialista', description: 'Completa todos los niveles de un módulo.', icon: '🎓' },
  { id: 'speed_demon', title: 'Demonio de la Velocidad', description: 'Completa un nivel en menos de 30 segundos.', icon: '⚡' },
  { id: 'perfect_module', title: 'Perfeccionista', description: 'Obtén 3 estrellas en todos los niveles de un módulo.', icon: '⭐' }
];

export const ACHIEVEMENTS = achievements;

interface AchievementProgress {
  completedLevels: Record<string, {
    stars: number;
    moduleId?: string;
    noHints?: boolean;
    bestTimeSeconds?: number;
  }>;
  achievements: string[];
  noHintStreak: number;
}

interface AchievementModule {
  id: string;
  levels: { id: string }[];
}

/**
 * Check which achievements the user has unlocked based on their progress.
 * @param progress - Current user progress state
 * @param modules - All modules and their level IDs
 * @returns List of newly unlocked achievement IDs
 */
export function checkAchievements(progress: AchievementProgress, modules: AchievementModule[]): string[] {
  const newAchievements: string[] = [];
  const completedLevelIds = Object.keys(progress.completedLevels);
  const hasAchievement = (id: string) => progress.achievements.includes(id);
  const hasCompletedModule = (module: AchievementModule) =>
    module.levels.every(level => Boolean(progress.completedLevels[level.id]));
  const hasPerfectModule = (module: AchievementModule) =>
    module.levels.every(level => progress.completedLevels[level.id]?.stars === 3);
  
  if (!hasAchievement('first_query') && completedLevelIds.length >= 1) {
    newAchievements.push('first_query');
  }
  
  if (!hasAchievement('ten_levels') && completedLevelIds.length >= 10) {
    newAchievements.push('ten_levels');
  }

  if (!hasAchievement('no_hints_streak_5') && progress.noHintStreak >= 5) {
    newAchievements.push('no_hints_streak_5');
  }

  if (!hasAchievement('all_module_complete') && modules.some(hasCompletedModule)) {
    newAchievements.push('all_module_complete');
  }

  if (!hasAchievement('speed_demon') && completedLevelIds.some(
    levelId => (progress.completedLevels[levelId].bestTimeSeconds ?? Infinity) < 30
  )) {
    newAchievements.push('speed_demon');
  }

  if (!hasAchievement('perfect_module') && modules.some(hasPerfectModule)) {
    newAchievements.push('perfect_module');
  }
  
  return newAchievements;
}
