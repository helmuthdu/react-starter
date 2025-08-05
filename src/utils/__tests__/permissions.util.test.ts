import { Logger } from '../logger.util';
import { Permissions } from '../permissions.util';

vi.mock('../logger.util', () => ({
  Logger: {
    debug: vi.fn(),
  },
}));

describe('Permissions Utility', () => {
  beforeEach(() => {
    Permissions.clear();
  });

  it('should allow registered permissions', () => {
    Permissions.register('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] };
    expect(Permissions.check(user, 'user', 'view')).toBe(true);
  });

  it('should deny unregistered permissions', () => {
    const user = { id: '1', roles: ['admin'] };
    expect(Permissions.check(user, 'user', 'delete')).toBe(false);
  });

  it('should handle dynamic permissions', () => {
    Permissions.register('moderator', 'user', {
      update: (user, data) => user.id === data?.userId,
    });
    const user = { id: '1', roles: ['moderator'] };
    expect(Permissions.check(user, 'user', 'update', { userId: '1' })).toBe(true);
    expect(Permissions.check(user, 'user', 'update', { userId: '2' })).toBe(false);
  });

  it('should handle multiple roles', () => {
    Permissions.register('admin', 'user', { view: true });
    Permissions.register('moderator', 'user', { delete: true });
    const user = { id: '1', roles: ['admin', 'moderator'] };
    expect(Permissions.check(user, 'user', 'view')).toBe(true);
    expect(Permissions.check(user, 'user', 'delete')).toBe(true);
  });

  it('should log permission checks', () => {
    Permissions.register('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] };
    Permissions.check(user, 'user', 'view');
    expect(Logger.debug).toHaveBeenCalledWith(
      expect.stringContaining('Permission check: User 1 - view on user -> true'),
    );
  });
});
