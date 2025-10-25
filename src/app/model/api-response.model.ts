export interface ApiResponse<T> {
  data: T;
  message: string;
  timestamp: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
  path: string;
}