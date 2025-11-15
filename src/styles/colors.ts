/**
 * 색상 테마 정의
 * 이 파일에서 모든 색상을 중앙 관리합니다.
 */

export const colors = {
  // 메인 색상 - 보라색 계열
  primary: {
    light: '#E9D5FF',    // 연한 보라색 (네비게이션 배경)
    DEFAULT: '#A855F7',  // 기본 보라색
    dark: '#7E22CE',     // 진한 보라색 (클릭/활성화)
    darker: '#6B21A8',   // 더 진한 보라색
  },

  // 배경 색상
  background: {
    white: '#FFFFFF',    // 메인 배경 (흰색)
    light: '#F9FAFB',    // 밝은 회색 배경
    dark: '#111827',     // 다크모드 배경
    card: '#F3F4F6',     // 카드 배경
  },

  // 텍스트 색상
  text: {
    primary: '#111827',   // 기본 텍스트
    secondary: '#6B7280', // 보조 텍스트
    muted: '#9CA3AF',     // 흐린 텍스트
    white: '#FFFFFF',     // 흰색 텍스트
  },

  // 상태 색상
  status: {
    pending: '#EF4444',   // 대기 (빨강)
    inProgress: '#F59E0B', // 진행중 (주황)
    completed: '#10B981',  // 완료 (초록)
    idle: '#6B7280',       // 유휴 (회색)
  },

  // 경고/알림 색상
  alert: {
    error: '#DC2626',     // 에러 (빨강)
    warning: '#F59E0B',   // 경고 (주황)
    success: '#059669',   // 성공 (초록)
    info: '#3B82F6',      // 정보 (파랑)
  },

  // 테두리 색상
  border: {
    light: '#E5E7EB',     // 밝은 테두리
    DEFAULT: '#D1D5DB',   // 기본 테두리
    dark: '#374151',      // 어두운 테두리
  },

  // 그래프/차트 색상
  chart: {
    blue: '#3B82F6',
    purple: '#A855F7',
    pink: '#EC4899',
    orange: '#F97316',
    green: '#10B981',
    yellow: '#FBBF24',
    red: '#EF4444',
    gray: '#6B7280',
  },
} as const;

// Tailwind CSS 클래스로 사용할 수 있는 색상 매핑
export const tailwindColors = {
  // 네비게이션 바
  nav: {
    bg: 'bg-purple-100',           // 연한 보라색 배경
    hover: 'hover:bg-purple-200',  // 호버 시
    active: 'bg-purple-600',       // 활성화 시 진한 보라색
    text: 'text-purple-900',       // 텍스트
    activeText: 'text-white',      // 활성화 텍스트
  },

  // 메인 배경
  main: {
    bg: 'bg-white',
    text: 'text-gray-900',
  },

  // 버튼
  button: {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-purple-100 hover:bg-purple-200 text-purple-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  },

  // 상태 배지
  badge: {
    pending: 'bg-red-100 text-red-800',
    inProgress: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    idle: 'bg-gray-100 text-gray-800',
  },
} as const;

