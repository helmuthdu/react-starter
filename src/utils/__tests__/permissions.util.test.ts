import { Logit } from '../logit.util';
import { Permit } from '../permissions.util';

vi.mock('../logit.util', () => ({
  Logit: {
    debug: vi.fn(),
  },
}));

describe('Permit Utility', () => {
  beforeEach(() => {
    Permit.clear();
  });

  it('should allow registered permissions', () => {
    Permit.register('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] };
    expect(Permit.check(user, 'user', 'view')).toBe(true);
  });

  it('should deny unregistered permissions', () => {
    const user = { id: '1', roles: ['admin'] };
    expect(Permit.check(user, 'user', 'delete')).toBe(false);
  });

  it('should handle dynamic permissions', () => {
    Permit.register('moderator', 'user', {
      update: (user, data) => user.id === data?.userId,
    });
    const user = { id: '1', roles: ['moderator'] };
    expect(Permit.check(user, 'user', 'update', { userId: '1' })).toBe(true);
    expect(Permit.check(user, 'user', 'update', { userId: '2' })).toBe(false);
  });

  it('should handle multiple roles', () => {
    Permit.register('admin', 'user', { view: true });
    Permit.register('moderator', 'user', { delete: true });
    const user = { id: '1', roles: ['admin', 'moderator'] };
    expect(Permit.check(user, 'user', 'view')).toBe(true);
    expect(Permit.check(user, 'user', 'delete')).toBe(true);
  });

  it('should log permission checks', () => {
    Permit.register('admin', 'user', { view: true });
    const user = { id: '1', roles: ['admin'] };
    Permit.check(user, 'user', 'view');
    expect(Logit.debug).toHaveBeenCalledWith(
      expect.stringContaining('Permission check: User 1 - view on user -> true'),
    );
  });
});
