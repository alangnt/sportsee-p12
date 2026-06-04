import type { UserPerformanceRaw, PerformanceEntry } from '../types';

const PERFORMANCE_LABELS: Record<string, string> = {
  cardio: 'Cardio',
  energy: 'Energie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

export class UserPerformance {
  userId: number;
  data: PerformanceEntry[];

  constructor(raw: UserPerformanceRaw) {
    this.userId = raw.userId;
    this.data = raw.data
      .map((entry) => ({
        subject: PERFORMANCE_LABELS[raw.kind[entry.kind]] ?? raw.kind[entry.kind],
        value: entry.value,
      }))
      .reverse();
  }
}
