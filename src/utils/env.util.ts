// biome-ignore lint/suspicious/noExplicitAny: -
const env = (import.meta as any)?.env ?? {};

export function isDev() {
  return env.NODE_ENV === 'development';
}

export function isProd() {
  return env.NODE_ENV === 'production';
}
