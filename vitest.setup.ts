import 'fake-indexeddb/auto';
import { vi } from 'vitest';

globalThis.window.URL.createObjectURL = vi.fn();
