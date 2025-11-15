import apiClient from './api';
import type { WelderResponse, WelderUpdateRequest } from '../types/api';

export const getWelders = async (status: string = 'available,working'): Promise<WelderResponse> => {
  const response = await apiClient.get<WelderResponse>('/api/welders', {
    params: { status },
  });
  return response.data;
};

export const updateWelderStatus = async (
  welderId: number,
  status: string
): Promise<any> => {
  const response = await apiClient.patch<WelderUpdateRequest>(`/api/welders/${welderId}`, {
    status,
  });
  return response.data;
};


