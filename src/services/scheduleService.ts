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

export const querySchedule = async (
  targetDate: string,
  targetSession: 'morning' | 'afternoon' | 'night'
): Promise<ScheduleResponse> => {
  const response = await apiClient.get<ScheduleResponse>('/api/schedules/query', {
    params: {
      target_date: targetDate,
      target_session: targetSession,
    },
  });
  return response.data;
};

export const confirmSchedule = async (batchId: number): Promise<any> => {
  const response = await apiClient.patch(`/api/schedules/${batchId}/confirm`);
  return response.data;
};

export const getWelderTicket = async (
  welderId: number,
  targetDate: string,
  targetSession: 'morning' | 'afternoon' | 'night'
): Promise<any> => {
  const response = await apiClient.get(`/api/schedules/welder/${welderId}/ticket`, {
    params: {
      target_date: targetDate,
      target_session: targetSession,
    },
  });
  return response.data;
};


