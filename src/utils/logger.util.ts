/** biome-ignore-all lint/suspicious/noAssignInExpressions: - */
/** biome-ignore-all lint/suspicious/noExplicitAny: - */
import { isProd } from './env.util';

declare global {
  interface Window {
    Logger: LoggerInstance;
  }
}

export type LoggerInstance = typeof Logger;
export type LoggerType = 'debug' | 'trace' | 'time' | 'table' | 'info' | 'success' | 'warn' | 'error';
export type LoggerColors = Exclude<LoggerType, 'table'> | 'group' | 'ns';
export type LoggerLevel = LoggerType | 'off';
export type LoggerRemoteOptions = {
  handler?: (...args: any[]) => void;
  logLevel: LoggerLevel;
};
export type LoggerOptions = {
  environment?: boolean;
  variant?: 'text' | 'symbol' | 'icon';
  logLevel?: LoggerLevel;
  namespace?: string;
  remote?: LoggerRemoteOptions;
  timestamp?: boolean;
};
export type LoggerTheme = { color: string; bg: string; border: string; icon?: string; symbol?: string };

const isDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const Theme: Readonly<Record<LoggerColors, LoggerTheme>> = {
  debug: { bg: '#616161', border: '#424242', color: '#fff', icon: '\u2615', symbol: '\uD83C\uDD73' },
  error: { bg: '#d32f2f', border: '#c62828', color: '#fff', icon: '\u2718', symbol: '\uD83C\uDD74' },
  group: { bg: '#546e7a', border: '#455a64', color: '#fff', icon: '\u26AD', symbol: '\uD83C\uDD76' },
  info: { bg: '#1976d2', border: '#1565c0', color: '#fff', icon: '\u2139', symbol: '\uD83C\uDD78' },
  ns: isDark
    ? { bg: '#fafafa', border: '#c7c7c7', color: '#000' }
    : { bg: '#424242', border: '#212121', color: '#fff' },
  success: { bg: '#689f38', border: '#558b2f', color: '#fff', icon: '\u2714', symbol: '\uD83C\uDD82' },
  time: { bg: '#0097a7', border: '#00838f', color: '#fff', icon: '\u23F2', symbol: '\uD83C\uDD83' },
  trace: { bg: '#d81b60', border: '#c2185b', color: '#fff', icon: '\u26e2', symbol: '\uD83C\uDD83' },
  warn: { bg: '#ffb300', border: '#ffa000', color: '#fff', icon: '\u26a0', symbol: '\uD83C\uDD86' },
};

// biome-ignore assist/source/useSortedKeys: -
const loggerLevel: Readonly<Record<LoggerLevel, number>> = {
  debug: 0,
  trace: 1,
  time: 2,
  table: 3,
  info: 4,
  success: 5,
  warn: 6,
  error: 7,
  off: 8,
};

const state: Required<LoggerOptions> = {
  environment: true,
  logLevel: 'debug',
  namespace: '',
  remote: { handler: undefined, logLevel: 'off' },
  timestamp: true,
  variant: 'symbol',
};

const shouldLog = (type: LoggerType) => loggerLevel[state.logLevel] <= loggerLevel[type];
const getTimestamp = () => new Date().toISOString().slice(11, 23);

const sendRemoteLog = (type: LoggerType, args: any) => {
  if (state.remote.handler && loggerLevel[state.remote.logLevel] <= loggerLevel[type]) {
    state.remote.handler(type, ...args);
  }
};

const style = (type: LoggerColors, extra = '') => {
  const { bg, color, border } = Theme[type];
  const { variant } = state;
  switch (variant) {
    case 'symbol':
      return `color: ${bg}; border: 1px solid ${border}; border-radius: 4px; padding: 1px 1px 0;${extra};`;
    case 'icon':
      return `color: ${bg}; border: 1px solid ${border}; border-radius: 4px; padding: 0 3px;${extra};`;
    default:
      return `background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; font-weight: bold; padding: 0 3px;${extra}`;
  }
};

const log = (type: LoggerType, ...args: any) => {
  const t = (['debug', 'success'].includes(type) ? 'log' : type) as keyof Console;

  const clg = console[t as keyof Console] as (...a: any) => void;
  const theme = Theme[type as LoggerColors];
  const env = isProd() ? '\uD83C\uDD3F' : '\uD83C\uDD33';
  const { namespace, variant, timestamp, environment } = state;

  if (typeof window === 'undefined') {
    clg(`${theme[variant as keyof LoggerTheme] ?? type.toUpperCase()} | ${env} |`, ...args);
    return;
  }

  if (!shouldLog(type)) return;

  let fmt = `%c${theme[variant as keyof LoggerTheme] ?? type.toUpperCase()}%c`;
  const parts: string[] = [];
  parts.push(style(type as any), '');

  if (namespace) {
    fmt += ` %c${namespace}%c`;
    parts.push(style('ns', ' border-radius: 8px; font: italic small-caps bold 12px; font-weight: lighter;'), '');
  }
  if (environment) {
    fmt += ` %c${env}%c`;
    parts.push('color: darkgray;', '');
  }
  if (timestamp) {
    fmt += ` %c${getTimestamp()}%c`;
    parts.push('color: gray;', '');
  }
  parts.push(...args);

  clg(fmt, ...parts);
  sendRemoteLog(type, args);
};

export const Logger = {
  assert: (valid: boolean, message: string, context: Record<string, any>) => console.assert(valid, message, context),
  debug: (...args: any) => log('debug', ...args),
  error: (...args: any) => log('error', ...args),
  getLevel: () => state.logLevel,
  getPrefix: () => state.namespace,
  getTimestamp: () => state.timestamp,
  groupCollapsed: (text: string, label = 'GROUP', time = Date.now()) => {
    if (!shouldLog('success')) return;
    const elapsed = Math.floor(Date.now() - time);
    const env = isProd() ? '\uD83C\uDD3F' : '\uD83C\uDD33';
    console.groupCollapsed(
      `%c${label}%c${state.namespace}%c${env}%c${state.timestamp ? getTimestamp() : ''}%c${elapsed ? `${elapsed}ms` : ''}%c${text}`,
      style('group', 'margin-right: 6px; padding: 1px 3px 0'),
      style('ns', ' border-radius: 8px; font: italic small-caps bold 12px; font-weight: lighter;margin-right: 6px;'),
      'color: darkgray; margin-right: 6px;',
      'color: gray;font-weight: lighter;margin-right: 6px;',
      'color: gray; font-weight: lighter;margin-right: 6px;',
      'color: inherit;font-weight: lighter;',
    );
  },
  groupEnd: () => shouldLog('success') && console.groupEnd(),
  info: (...args: any) => log('info', ...args),
  initialise: (options: LoggerOptions) => Object.assign(state, options),
  setLogLevel: (level: LoggerLevel) => (state.logLevel = level),
  setPrefix: (namespace: string) => (state.namespace = namespace),
  setRemote: (remote: LoggerRemoteOptions) => (state.remote = remote),
  setRemoteLogLevel: (level: LoggerLevel) => (state.remote.logLevel = level),
  setVariant: (variant: 'text' | 'icon' | 'symbol') => (state.variant = variant),
  showEnvironment: (value: boolean) => (state.environment = value),
  showTimestamp: (value: boolean) => (state.timestamp = value),
  success: (...args: any) => log('success', ...args),
  table: (...args: any) => shouldLog('table') && console.table(...args),
  time: (label: string) => shouldLog('time') && console.time(label),
  timeEnd: (label: string) => shouldLog('time') && console.timeEnd(label),
  trace: (...args: any) => log('trace', ...args),
  warn: (...args: any) => log('warn', ...args),
};

if (typeof window !== 'undefined') {
  window.Logger = Logger;
}
