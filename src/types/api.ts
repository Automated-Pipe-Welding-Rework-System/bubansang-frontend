/**
 * API 요청/응답 타입 정의
 * 백엔드 API 구조에 맞춘 인터페이스
 */

// ============================================
// 결함 (Defect) 관련 타입
// ============================================

export interface DefectItem {
  defect_id: number;
  pipe_id: string;
  location_id: number;
  location_name: string | null;
  defect_type: string;
  defect_type_name: string;
  is_critical: boolean;
  p_in: number;
  p_out: number;
  severity_score: number;
  required_skill_id: number;
  required_skill: string | null;
  setup_type_id: number;
  setup_type_name: string | null;
  priority_factor: number;
  rework_time: number;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
}

export interface DefectResponse {
  defects: DefectItem[];
  total: number;
}

export interface DefectUpdateRequest {
  priority_factor?: number;
  status?: 'pending' | 'in_progress' | 'completed';
}

// ============================================
// 용접공 (Welder) 관련 타입
// ============================================

export interface WelderSkill {
  skill_id: number;
  process: string;
  position: string;
  position_level: number;
  material: string;
  skill_name: string;
}

export interface WelderItem {
  welder_id: number;
  welder_name: string;
  current_location_id: number;
  current_location_name: string | null;
  current_setup_id: number;
  current_setup_name: string | null;
  current_defect_id: number | null;
  status: 'available' | 'working' | 'on_break' | 'off_duty';
  shift_end_time: string;
  skills: WelderSkill[];
  skill_count: number;
}

export interface WelderResponse {
  welders: WelderItem[];
  total: number;
}

export interface WelderUpdateRequest {
  status: 'available' | 'working' | 'on_break' | 'off_duty';
}

// ============================================
// 스케줄 (Schedule) 관련 타입
// ============================================

export interface ScheduleOptimizeRequest {
  target_date: string; // YYYY-MM-DD
  target_session: 'morning' | 'afternoon' | 'night';
}

export interface ScheduleJob {
  job_id: number;
  job_order: number;
  welder_id: number;
  welder_name: string;
  defect_id: number;
  defect_type: string;
  defect_type_name: string;
  location_id: number;
  location_name: string;
  severity_score: number;
  estimated_start_time: string;
  estimated_end_time: string;
  rework_time: number;
  status: string;
}

export interface OptimizationMetrics {
  method: string;
  total_severity_score: number;
  total_defects_scheduled: number;
  total_travel_time_minutes?: number;
  total_setup_time_minutes?: number;
  solver_time_seconds?: number;
}

export interface ScheduleResponse {
  batch_id: number;
  status: string;
  target_date: string;
  target_session: 'morning' | 'afternoon' | 'night';
  session_time: string;
  created_at: string;
  total_jobs: number;
  optimization_metrics: OptimizationMetrics;
  jobs: ScheduleJob[];
}

// ============================================
// 에러 응답
// ============================================

export interface ApiError {
  error: string;
}

