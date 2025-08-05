import { Logger } from './logger.util';
import { uuid } from './random/uuid';

type BroadcasterEventCallback = (...args: unknown[]) => void | Promise<void>;
type BroadcasterEventMap = Map<string, BroadcasterEventCallback>;
type BroadcasterEventOptions = { immediate: boolean };
type BroadcasterSubscription = { stop: () => void; off: () => void };

const events = new Map<string, BroadcasterEventMap>();

const getEvent = (event: string): BroadcasterEventMap => {
  if (!events.has(event)) {
    events.set(event, new Map());
  }
  return events.get(event)!;
};

const removeEvent = (event: string, id: string) => {
  const eventMap = events.get(event);
  if (eventMap) {
    eventMap.delete(id);
    if (eventMap.size === 0) events.delete(event);
  }
};

export const Broadcaster = {
  async emit(event: string, ...args: unknown[]) {
    const eventMap = events.get(event);
    if (eventMap) {
      await Promise.all([...eventMap.values()].map((fn) => fn(...args)));
    } else {
      Logger.warn(`Event "${event}" not registered`);
    }
  },

  off(event: string) {
    if (!events.delete(event)) {
      Logger.warn(`All "${event}" events are already removed`);
    }
  },

  on(event: string, fn: BroadcasterEventCallback, options?: BroadcasterEventOptions): BroadcasterSubscription {
    const id = uuid();
    getEvent(event).set(id, fn);

    if (options?.immediate) {
      fn();
    }

    return { off: () => this.off(event), stop: () => removeEvent(event, id) };
  },

  once(event: string, fn: BroadcasterEventCallback, options?: BroadcasterEventOptions): BroadcasterSubscription {
    const id = uuid();

    const wrappedFn: BroadcasterEventCallback = async (...args) => {
      await fn(...args);
      removeEvent(event, id);
    };

    getEvent(event).set(id, wrappedFn);

    if (options?.immediate) {
      fn();
    }

    return { off: () => this.off(event), stop: () => removeEvent(event, id) };
  },
};
