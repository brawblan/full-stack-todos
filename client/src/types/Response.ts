export interface SuccessResponse<T> {
  data: T;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
}
