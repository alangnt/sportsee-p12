import type { UserAverageSessionsRaw, AverageSession } from '../types';

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export class UserAverageSessions {
  userId: number;
  sessions: AverageSession[];

  constructor(raw: UserAverageSessionsRaw) {
    this.userId = raw.userId;
    this.sessions = raw.sessions.map((session) => ({
      day: DAY_LABELS[session.day - 1] ?? String(session.day),
      sessionLength: session.sessionLength,
    }));
  }
}
