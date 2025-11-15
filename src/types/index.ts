//공통 타입 정의
export type DefectStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type WelderStatus = 'available' | 'working' | 'break' | 'off_duty';
export type ScheduleStatus = 'draft' | 'confirmed' | 'in_progress' | 'completed';

export interface Defect {
  id: number;
  pipe_id: string;
  location_id: string;
  defect_type?: string;
  p_in?: number;
  p_out?: number;
  required_skill_id?: number;
  setup_type_id?: number;
  rework_time?: number;
  priority_factor?: number;
  status: DefectStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Welder {
  id: number;
  name: string;
  skill_ids: number[];
  current_location_id?: string;
  status: WelderStatus;
  shift_end_time?: string;
}

export interface Skill {
  id: number;
  name: string;
  description?: string;
}

export interface SetupType {
  id: number;
  name: string;
  setup_time: number;
}

export interface Location {
  id: string;
  name: string;
  zone: string;
}

export interface Schedule {
  id: number;
  welder_id: number;
  defect_id?: number;
  task_type: 'travel' | 'setup' | 'work';
  start_time: string;
  end_time: string;
  status: ScheduleStatus;
}

export interface Statistics {
  pending_defects: number;
  available_welders: number;
  working_welders: number;
  completed_today: number;
}

export interface Notification {
  id: number;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
}

