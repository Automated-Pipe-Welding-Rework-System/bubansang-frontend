import apiClient from './api';
import type { ScheduleOptimizeRequest, ScheduleResponse } from '../types/api';


export const optimizeSchedule = async (
  targetDate: string,
  targetSession: 'morning' | 'afternoon' | 'night'
): Promise<ScheduleResponse> => {
  const response = await apiClient.post<ScheduleResponse>('/api/schedules/optimize', {
    target_date: targetDate,
    target_session: targetSession,
  } as ScheduleOptimizeRequest);
  return response.data;
};

export const optimizeScheduleORTools = async (
  targetDate: string,
  targetSession: 'morning' | 'afternoon' | 'night'
): Promise<ScheduleResponse> => {
  const response = await apiClient.post<ScheduleResponse>('/api/schedules/optimize2', {
    target_date: targetDate,
    target_session: targetSession,
  } as ScheduleOptimizeRequest);
  return response.data;
};

export const getSchedule = async (batchId: number): Promise<ScheduleResponse> => {
  const response = await apiClient.get<ScheduleResponse>(`/api/schedules/${batchId}`);
  return response.data;
};


