import apiClient from './api';
import type { DefectResponse, DefectUpdateRequest } from '../types/api';

export const getDefects = async (status: string = 'pending'): Promise<DefectResponse> => {
  const response = await apiClient.get<DefectResponse>('/api/defects', {
    params: { status },
  });
  return response.data;
};

export const updateDefect = async (
  defectId: number,
  data: DefectUpdateRequest
): Promise<any> => {
  const response = await apiClient.patch(`/api/defects/${defectId}`, data);
  return response.data;
};

export const updateDefectPriority = async (
  defectId: number,
  priorityFactor: number
): Promise<any> => {
  return updateDefect(defectId, { priority_factor: priorityFactor });
};

export const updateDefectStatus = async (
  defectId: number,
  status: string
): Promise<any> => {
  return updateDefect(defectId, { status: status as 'pending' | 'in_progress' | 'completed' });
};


