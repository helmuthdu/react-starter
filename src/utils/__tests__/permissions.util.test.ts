import type { UserJSON } from '@/models/user';
import { Logger } from '../logger.util';
import { hasPermission, Roles, registerPermissions } from '../permissions.util';

vi.mock('../logger.util', () => ({
  Logger: {
    debug: vi.fn(),
  },
}));

describe('Permissions Utility', () => {
  beforeEach(() => {
    // Reset roles before each test
    Object.keys(Roles).forEach((key) => delete Roles[key as keyof typeof Roles]);
  });

  it('should allow registered permissions', () => {
    registerPermissions('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] } as UserJSON;
    expect(hasPermission(user, 'user', 'view')).toBe(true);
  });

  it('should deny unregistered permissions', () => {
    const user = { id: '1', roles: ['admin'] } as UserJSON;
    expect(hasPermission(user, 'user', 'delete')).toBe(false);
  });

  it('should handle dynamic permissions', () => {
    registerPermissions('moderator', 'user', {
      update: (user: UserJSON, data?: Record<string, unknown>) => user.id === data?.userId,
    });
    const user = { id: '1', roles: ['moderator'] } as UserJSON;
    expect(hasPermission(user, 'user', 'update', { userId: '1' })).toBe(true);
    expect(hasPermission(user, 'user', 'update', { userId: '2' })).toBe(false);
  });

  it('should handle multiple roles', () => {
    registerPermissions('admin', 'user', { view: true });
    registerPermissions('moderator', 'user', { delete: true });
    const user = { id: '1', roles: ['admin', 'moderator'] } as UserJSON;
    expect(hasPermission(user, 'user', 'view')).toBe(true);
    expect(hasPermission(user, 'user', 'delete')).toBe(true);
  });

  it('should fallback to default permissions', () => {
    const user = { id: '1', roles: ['admin'] } as UserJSON;
    expect(hasPermission(user, '*', 'view')).toBe(true);
    expect(hasPermission(user, '*', 'delete')).toBe(true);
  });

  it('should log permission checks', () => {
    registerPermissions('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] } as UserJSON;
    hasPermission(user, 'user', 'view');
    expect(Logger.debug).toHaveBeenCalledWith(
      expect.stringContaining('Permission check: User 1 - view on user -> true'),
    );
  });
});
