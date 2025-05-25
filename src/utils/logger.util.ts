/** biome-ignore-all lint/suspicious/noAssignInExpressions: - */
/** biome-ignore-all lint/suspicious/noExplicitAny: - */
declare global {
  interface Window {
    Logger: LoggerInstance;
  }
}

export type LoggerType = 'debug' | 'tracer' | 'time' | 'table' | 'info' | 'success' | 'warn' | 'error';
export type LoggerInstance = typeof Logger;
export type LoggerColors = Exclude<LoggerType, 'table'> | 'group' | 'ns';
export type LoggerLevel = LoggerType | 'off';
export type LoggerRemoteOptions = {
  logLevel: LoggerLevel;
  handler?: (...args: unknown[]) => void;
};
export type LoggerOptions = {
  remote?: LoggerRemoteOptions;
  logLevel?: LoggerLevel;
  namespace?: string;
  timestamp?: boolean;
};

const isDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const Colors: Readonly<Record<LoggerColors, { color: string; bg: string; border: string }>> = {
  debug: { bg: '#616161', border: '#424242', color: '#fff' },
  error: { bg: '#d32f2f', border: '#c62828', color: '#fff' },
  group: { bg: '#546e7a', border: '#455a64', color: '#fff' },
  info: { bg: '#1976d2', border: '#1565c0', color: '#fff' },
  ns: isDark
    ? { bg: '#fafafa', border: '#c7c7c7', color: '#000' }
    : { bg: '#424242', border: '#212121', color: '#fff' },
  success: { bg: '#689f38', border: '#558b2f', color: '#fff' },
  time: { bg: '#0097a7', border: '#00838f', color: '#fff' },
  tracer: { bg: '#d81b60', border: '#c2185b', color: '#fff' },
  warn: { bg: '#ffb300', border: '#ffa000', color: '#fff' },
};

const loggerLevel: Readonly<Record<LoggerLevel, number>> = {
  debug: 0,
  error: 7,
  info: 4,
  off: 8,
  success: 5,
  table: 3,
  time: 2,
  tracer: 1,
  warn: 6,
};

const state: Required<LoggerOptions> = {
  logLevel: import.meta?.env?.NODE_ENV === 'production' ? 'error' : 'debug',
  namespace: '',
  remote: { handler: undefined, logLevel: 'off' },
  timestamp: true,
};

const shouldLog = (type: LoggerType) => loggerLevel[state.logLevel] <= loggerLevel[type];
const getTimestamp = () => new Date().toISOString().slice(11, 23);

const sendRemoteLog = (type: LoggerType, args: unknown[]) => {
  if (state.remote.handler && loggerLevel[state.remote.logLevel] <= loggerLevel[type]) {
    state.remote.handler(type, ...args);
  }
};

const style = (type: LoggerColors, extra = '') => {
  const { bg, color, border } = Colors[type];
  return `background: ${bg}; color: ${color}; border: 1px solid ${border}; border-radius: 4px; font-weight: bold; padding: 0 3px;${extra}`;
};

const log = (type: LoggerType, ...args: unknown[]) => {
  if (!shouldLog(type)) return;
  const { namespace, timestamp } = state;
  const parts: unknown[] = [];
  let fmt = `%c${type.toUpperCase()}%c`;

  parts.push(style(type as any), '');

  if (namespace) {
    fmt += `${namespace}%c`;
    parts.push(style('ns', ' border-radius: 8px; font: italic small-caps bold 12px; font-weight: lighter;'), '');
  }
  if (timestamp) {
    fmt += `${getTimestamp()}%c`;
    parts.push('color: gray;', '');
  }
  parts.push('color: inherit;', ...args);

  const method = (['debug', 'success'].includes(type) ? 'log' : type) as keyof Console;
  (console[method] as (...a: unknown[]) => void)(fmt, ...parts);

  sendRemoteLog(type, args);
};

export const Logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  error: (...args: unknown[]) => log('error', ...args),
  getLevel: () => state.logLevel,
  getPrefix: () => state.namespace,
  getTimestamp: () => state.timestamp,
  groupCollapsed: (text: string, label = 'GROUP', time = Date.now()) => {
    if (!shouldLog('success')) return;
    const elapsed = Math.floor(Date.now() - time);
    console.groupCollapsed(
      `%c${label}%c${state.namespace}%c${state.timestamp ? getTimestamp() : ''}%c${text} %c${elapsed ? `${elapsed}ms` : ''}`,
      style('group'),
      style('ns', ' border-radius: 8px; font: italic small-caps bold 12px; font-weight: lighter;'),
      'color: gray; font-weight: lighter; margin-right: 6px;',
      'color: inherit;',
      'color: gray; font-weight: lighter;',
    );
  },
  groupEnd: () => shouldLog('success') && console.groupEnd(),
  info: (...args: unknown[]) => log('info', ...args),
  initialise: (options: LoggerOptions) => Object.assign(state, options),
  setLogLevel: (level: LoggerLevel) => (state.logLevel = level),
  setPrefix: (namespace: string) => (state.namespace = namespace),
  setRemote: (remote: LoggerRemoteOptions) => (state.remote = remote),
  setRemoteLogLevel: (level: LoggerLevel) => (state.remote.logLevel = level),
  setTimestamp: (enabled: boolean) => (state.timestamp = enabled),
  success: (...args: unknown[]) => log('success', ...args),
  table: (...args: unknown[]) => shouldLog('table') && console.table(...args),
  time: (...args: unknown[]) => log('time', ...args),
  timeEnd: () => shouldLog('time') && console.timeEnd(),
  trace: (...args: unknown[]) => log('tracer', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
};

if (typeof window !== 'undefined') {
  window.Logger = Logger;
}
