import axios from 'axios';
import { ASCIIRequest, ASCIIResponse, RefineRequest, APIError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const asciiAPI = {
  async generateASCII(request: ASCIIRequest): Promise<ASCIIResponse> {
    try {
      const response = await apiClient.post<ASCIIResponse>('/api/v1/generate-ascii', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError: APIError = error.response.data;
        throw new Error(apiError.detail || 'ASCII生成に失敗しました');
      }
      throw new Error('ネットワークエラーが発生しました');
    }
  },

  async refineASCII(request: RefineRequest): Promise<ASCIIResponse> {
    try {
      const response = await apiClient.post<ASCIIResponse>('/api/v1/refine-ascii', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError: APIError = error.response.data;
        throw new Error(apiError.detail || 'ASCII修正に失敗しました');
      }
      throw new Error('ネットワークエラーが発生しました');
    }
  },

  async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('サーバーとの接続に失敗しました');
    }
  }
};