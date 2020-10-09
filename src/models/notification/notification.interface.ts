export interface NotificationSchema {
  message: string;
  timeout?: number;
  type?: 'success' | 'info' | 'warning' | 'error';
  translate?: boolean;
}
