import { vi } from 'vitest';

// @ts-expect-error non-issue
globalThis.window.URL.createObjectURL = vi.fn();
