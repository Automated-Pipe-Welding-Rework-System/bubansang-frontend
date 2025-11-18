import axios from 'axios';

// API 베이스 URL (환경변수로 관리 가능)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (필요시 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 예: 인증 토큰 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.error('Unauthorized access');
      } else if (error.response.status === 404) {
        console.error('Resource not found');
      } else if (error.response.status >= 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      console.error('No response from server:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;


