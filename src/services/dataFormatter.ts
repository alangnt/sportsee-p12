import type {
  UserMainDataRaw,
  UserActivityRaw,
  UserAverageSessionsRaw,
  UserPerformanceRaw,
  UserMainData,
  ActivitySession,
  AverageSession,
  PerformanceEntry,
} from '../types';

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const PERFORMANCE_LABELS: Record<string, string> = {
  cardio: 'Cardio',
  energy: 'Energie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

export function formatUserMainData(raw: UserMainDataRaw): UserMainData {
  return {
    id: raw.id,
    firstName: raw.userInfos.firstName,
    // Normalize: user 12 uses todayScore, user 18 uses score
    score: raw.todayScore ?? raw.score ?? 0,
    calorieCount: raw.keyData.calorieCount,
    proteinCount: raw.keyData.proteinCount,
    carbohydrateCount: raw.keyData.carbohydrateCount,
    lipidCount: raw.keyData.lipidCount,
  };
}

export function formatActivity(raw: UserActivityRaw): ActivitySession[] {
  return raw.sessions.map((session, index) => ({
    day: String(index + 1),
    kilogram: session.kilogram,
    calories: session.calories,
  }));
}

export function formatAverageSessions(raw: UserAverageSessionsRaw): AverageSession[] {
  return raw.sessions.map((session) => ({
    day: DAY_LABELS[session.day - 1] ?? String(session.day),
    sessionLength: session.sessionLength,
  }));
}

export function formatPerformance(raw: UserPerformanceRaw): PerformanceEntry[] {
  return raw.data
    .map((entry) => ({
      subject: PERFORMANCE_LABELS[raw.kind[entry.kind]] ?? raw.kind[entry.kind],
      value: entry.value,
    }))
    .reverse();
}
