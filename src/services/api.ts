import type { ApiResponse, UserMainDataRaw, UserActivityRaw, UserAverageSessionsRaw, UserPerformanceRaw, UserData } from '../types';
import { formatUserMainData, formatActivity, formatAverageSessions, formatPerformance } from './dataFormatter';

const BASE_URL = import.meta.env.VITE_API_URL;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getUserData(userId: number): Promise<UserData> {
  const [mainRes, activityRes, sessionsRes, performanceRes] = await Promise.all([
    fetchJson<ApiResponse<UserMainDataRaw>>(`${BASE_URL}/user/${userId}`),
    fetchJson<ApiResponse<UserActivityRaw>>(`${BASE_URL}/user/${userId}/activity`),
    fetchJson<ApiResponse<UserAverageSessionsRaw>>(`${BASE_URL}/user/${userId}/average-sessions`),
    fetchJson<ApiResponse<UserPerformanceRaw>>(`${BASE_URL}/user/${userId}/performance`),
  ]);

  return {
    mainData: formatUserMainData(mainRes.data),
    activity: formatActivity(activityRes.data),
    averageSessions: formatAverageSessions(sessionsRes.data),
    performance: formatPerformance(performanceRes.data),
  };
}
