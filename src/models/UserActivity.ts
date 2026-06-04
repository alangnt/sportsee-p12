import type { UserActivityRaw, ActivitySession } from '../types';

export class UserActivity {
  userId: number;
  sessions: ActivitySession[];

  constructor(raw: UserActivityRaw) {
    this.userId = raw.userId;
    this.sessions = raw.sessions.map((session, index) => ({
      day: String(index + 1),
      kilogram: session.kilogram,
      calories: session.calories,
    }));
  }
}
