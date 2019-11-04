export interface Notification {
  message: string;
  timeout?: number;
  type?: 'success' | 'info' | 'warning' | 'error';
  translate?: boolean;
}
