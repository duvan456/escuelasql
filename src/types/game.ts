export type Difficulty = 'principiante' | 'intermedio' | 'avanzado';
export type ValidationMode = 'exact' | 'unordered' | 'contains';

export interface Level {
  id: string;
  schemaKey?: 'contabilidad' | 'nomina';
  title: string;
  story: string;
  instruction: string;
  hints: string[];
  tables: string[];
  expectedQuery: string;
  validationMode: ValidationMode;
  xpReward: number;
  concepts: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  schemaKey: 'contabilidad' | 'nomina';
  levels: Level[];
}

export interface UserProgress {
  userId: string;
  completedLevels: string[];
  xp: number;
  rank: PlayerRank;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  dateUnlocked: string;
}

export interface GameState {
  currentModuleId: string | null;
  currentLevelId: string | null;
  progress: UserProgress;
}

export type PlayerRank = 'Novato' | 'Asistente' | 'Contador' | 'Gerente Financiero' | 'Auditor Master';
