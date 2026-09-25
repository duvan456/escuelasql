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

/**
 * Check which achievements the user has unlocked based on their progress.
 * @param progress - Current user progress state
 * @returns List of newly unlocked achievement IDs
 */
export function checkAchievements(progress: any): string[] {
  const newAchievements: string[] = [];
  
  if (!progress.achievements.includes('first_query') && Object.keys(progress.completedLevels).length >= 1) {
    newAchievements.push('first_query');
  }
  
  if (!progress.achievements.includes('ten_levels') && Object.keys(progress.completedLevels).length >= 10) {
    newAchievements.push('ten_levels');
  }

  // NOTE: Logic for other achievements would require more detailed game state tracking
  // (e.g., speed_demon, perfect_module) and can be implemented as needed.
  
  return newAchievements;
}
