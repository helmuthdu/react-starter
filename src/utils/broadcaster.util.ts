import { Logger } from './logger.util';
import { uuid } from './random/uuid';

type EventCallback = (...args: unknown[]) => void | Promise<void>;
type EventMap = Map<string, EventCallback>;
type Subscription = { stop: () => void };

const events = new Map<string, EventMap>();

const getEvent = (event: string): EventMap => {
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

  on(event: string, fn: EventCallback): Subscription {
    const id = uuid();
    getEvent(event).set(id, fn);
    return { stop: () => removeEvent(event, id) };
  },

  once(event: string, fn: EventCallback): Subscription {
    const id = uuid();
    const wrappedFn: EventCallback = async (...args) => {
      await fn(...args);
      removeEvent(event, id);
    };
    getEvent(event).set(id, wrappedFn);
    return { stop: () => removeEvent(event, id) };
  },
};

export const transmitter = Broadcaster.emit;

export const receiver = (event: string, fn: EventCallback, options?: { once?: boolean; immediate?: boolean }) => {
  const subscription = options?.once ? Broadcaster.once(event, fn) : Broadcaster.on(event, fn);

  if (options?.immediate) fn();

  return subscription;
};
