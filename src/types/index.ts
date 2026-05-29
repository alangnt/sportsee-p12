// Raw API response wrapper
export interface ApiResponse<T> {
  data: T;
}

// Raw types as returned by the API
export interface UserMainDataRaw {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore?: number; // user 12
  score?: number;      // user 18
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

export interface UserActivityRaw {
  userId: number;
  sessions: Array<{
    day: string;
    kilogram: number;
    calories: number;
  }>;
}

export interface UserAverageSessionsRaw {
  userId: number;
  sessions: Array<{
    day: number;
    sessionLength: number;
  }>;
}

export interface UserPerformanceRaw {
  userId: number;
  kind: Record<number, string>;
  data: Array<{
    value: number;
    kind: number;
  }>;
}

// Normalized types used in components
export interface UserMainData {
  id: number;
  firstName: string;
  score: number;
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export interface ActivitySession {
  day: string;
  kilogram: number;
  calories: number;
}

export interface AverageSession {
  day: string;
  sessionLength: number;
}

export interface PerformanceEntry {
  subject: string;
  value: number;
}

export interface UserData {
  mainData: UserMainData;
  activity: ActivitySession[];
  averageSessions: AverageSession[];
  performance: PerformanceEntry[];
}
