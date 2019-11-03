export interface INotification {
  message: string;
  timeout?: number;
  type?: 'success' | 'info' | 'warning' | 'error';
  translate?: boolean;
}