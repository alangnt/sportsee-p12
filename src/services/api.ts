import type { ApiResponse, UserMainDataRaw, UserActivityRaw, UserAverageSessionsRaw, UserPerformanceRaw, UserData } from '../types';
import { UserMainData } from '../models/UserMainData';
import { UserActivity } from '../models/UserActivity';
import { UserAverageSessions } from '../models/UserAverageSessions';
import { UserPerformance } from '../models/UserPerformance';
import { mockUserData } from './mockData';

const BASE_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getUserData(userId: number): Promise<UserData> {
  if (USE_MOCK) {
    return { ...mockUserData, mainData: { ...mockUserData.mainData, id: userId } };
  }

  const [mainRes, activityRes, sessionsRes, performanceRes] = await Promise.all([
    fetchJson<ApiResponse<UserMainDataRaw>>(`${BASE_URL}/user/${userId}`),
    fetchJson<ApiResponse<UserActivityRaw>>(`${BASE_URL}/user/${userId}/activity`),
    fetchJson<ApiResponse<UserAverageSessionsRaw>>(`${BASE_URL}/user/${userId}/average-sessions`),
    fetchJson<ApiResponse<UserPerformanceRaw>>(`${BASE_URL}/user/${userId}/performance`),
  ]);

  const mainData = new UserMainData(mainRes.data);
  const activity = new UserActivity(activityRes.data);
  const averageSessions = new UserAverageSessions(sessionsRes.data);
  const performance = new UserPerformance(performanceRes.data);

  return {
    mainData,
    activity: activity.sessions,
    averageSessions: averageSessions.sessions,
    performance: performance.data,
  };
}
