import { receiver, transmitter } from '../../broadcaster.util';
import { Logger } from '../../logger.util';

vi.mock('../../logger.util', () => ({
  Logger: {
    warn: vi.fn(),
  },
}));

describe('broadcaster', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call subscribed callback when event is emitted', async () => {
    const cb = vi.fn();
    receiver('test', cb);
    await transmitter('test', 1, 2);
    expect(cb).toHaveBeenCalledWith(1, 2);
  });

  it('should support multiple subscribers for the same event', async () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    receiver('multi', cb1);
    receiver('multi', cb2);
    await transmitter('multi', 'a');
    expect(cb1).toHaveBeenCalledWith('a');
    expect(cb2).toHaveBeenCalledWith('a');
  });

  it('should unsubscribe a callback using stop', async () => {
    const cb = vi.fn();
    const { stop } = receiver('off', cb);
    stop();
    await transmitter('off', 42);
    expect(cb).not.toHaveBeenCalled();
  });

  it('should call once callback only once', async () => {
    const cb = vi.fn();
    receiver('once', cb, { once: true });
    await transmitter('once', 'x');
    await transmitter('once', 'y');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith('x');
  });

  it('should call immediate callback immediately', () => {
    const cb = vi.fn();
    receiver('immediate', cb, { immediate: true });
    expect(cb).toHaveBeenCalled();
  });

  it('should warn if emitting unregistered event', async () => {
    await transmitter('not-registered');
    expect(Logger.warn).toHaveBeenCalledWith('Event "not-registered" not registered');
  });

  it('should support async callbacks', async () => {
    const cb = vi.fn(async (x) => Promise.resolve(x));
    receiver('async', cb);
    await transmitter('async', 123);
    expect(cb).toHaveBeenCalledWith(123);
  });
});
