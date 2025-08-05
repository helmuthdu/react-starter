import { Broadcaster } from '../../broadcaster.util';
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
    Broadcaster.on('test', cb);
    await Broadcaster.emit('test', 1, 2);
    expect(cb).toHaveBeenCalledWith(1, 2);
  });

  it('should support multiple subscribers for the same event', async () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    Broadcaster.on('multi', cb1);
    Broadcaster.on('multi', cb2);
    await Broadcaster.emit('multi', 'a');
    expect(cb1).toHaveBeenCalledWith('a');
    expect(cb2).toHaveBeenCalledWith('a');
  });

  it('should unsubscribe a callback using stop', async () => {
    const cb = vi.fn();
    const { stop } = Broadcaster.on('off', cb);
    stop();
    await Broadcaster.emit('off', 42);
    expect(cb).not.toHaveBeenCalled();
  });

  it('should call once callback only once', async () => {
    const cb = vi.fn();
    Broadcaster.once('once', cb);
    await Broadcaster.emit('once', 'x');
    await Broadcaster.emit('once', 'y');
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith('x');
  });

  it('should call immediate callback immediately', () => {
    const cb = vi.fn();
    Broadcaster.on('immediate', cb, { immediate: true });
    expect(cb).toHaveBeenCalled();
  });

  it('should warn if emitting unregistered event', async () => {
    await Broadcaster.emit('not-registered');
    expect(Logger.warn).toHaveBeenCalledWith('Event "not-registered" not registered');
  });

  it('should support async callbacks', async () => {
    const cb = vi.fn(async (x) => Promise.resolve(x));
    Broadcaster.on('async', cb);
    await Broadcaster.emit('async', 123);
    expect(cb).toHaveBeenCalledWith(123);
  });
});
