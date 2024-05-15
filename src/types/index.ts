export interface Response<T = Record<string, string | unknown>> {
  status?: number;
  data?: T;
  message?: string;
}
