import type { UserJSON, UserRole } from '../models/user';

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: UserJSON, data: Permissions[Key]['dataType']) => boolean);

type RolesWithPermissions = {
  [R in UserRole]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>;
    }>;
  }>;
};

export type PermissionAction = 'view' | 'create' | 'update' | 'delete';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Permissions = Record<string, { action: PermissionAction; dataType: any }>;

const Roles = {
  admin: {},
  moderator: {},
  user: {},
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: UserJSON,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType'],
) {
  return user.roles.some((role) => {
    const permission = (Roles as RolesWithPermissions)[role][resource]?.[action];
    if (typeof permission === 'function' && data) return permission(user, data);
    return permission ?? false;
  });
}
