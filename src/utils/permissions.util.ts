import type { UserJSON, UserRole } from '../models/user';
import { Logger } from './logger.util';

type PermissionAction = 'view' | 'create' | 'update' | 'delete';
type PermissionCheck<T = unknown> = boolean | ((user: UserJSON, data: T) => boolean);
type ResourcePermissions = Map<string, Partial<Record<PermissionAction, PermissionCheck>>>;
type RolesWithPermissions = Map<UserRole, ResourcePermissions>;

export const Roles: RolesWithPermissions = new Map([
  [
    'admin',
    new Map([
      [
        '*',
        {
          create: true,
          delete: true,
          update: true,
          view: true,
        },
      ],
    ]),
  ],
]);

/**
 * Registers permissions for a specific role and resource.
 *
 * @remarks
 * This function allows you to define permissions for a specific role and resource.
 * You can specify which actions (view, create, update, delete) are allowed for that role on the resource.
 *
 * @example
 * ```ts
 * registerPermissions('admin', 'posts', {
 *   view: true,
 *   create: true,
 *   update: (user, data) => user.id === data.userId,
 *   delete: false,
 * });
 * ```
 *
 * @param role - The role to which the permissions apply.
 * @param resource - The resource for which the permissions are defined.
 * @param actions - An object defining the permissions for the specified role and resource.
 *
 * @throws {Error} If the arguments are invalid or if the role is not found.
 */
export function registerPermissions(
  role: UserRole,
  resource: string,
  actions: Partial<Record<PermissionAction, PermissionCheck>>,
): void {
  if (!role || !resource) {
    throw new Error('Invalid arguments provided to register permissions.');
  }

  const rolePermissions = Roles.get(role) ?? new Map();
  const resourcePermissions = { ...rolePermissions.get(resource), ...actions };
  rolePermissions.set(resource, resourcePermissions);
  Roles.set(role, rolePermissions);
}

/**
 * Determines whether a user has permission to perform a specific action on a given resource.
 *
 * @example
 * ```ts
 * const user = { id: '123', roles: ['admin'] };
 * const resource = 'posts';
 * const action = 'view';
 *
 * hasPermission(user, resource, action) // true;
 * ```
 *
 * @example
 * ```ts
 * const user = { id: '123', roles: ['user'] };
 * const resource = 'posts';
 * const action = 'update';
 * const data = { userId: '321' };
 *
 * hasPermission(user, resource, action, data) // false;
 * ```
 *
 * @param user - The user object containing information about the user's roles.
 * @param resource - The resource identifier to check permissions for.
 * @param action - The action to check permission for, such as "read", "write", etc.
 * @param [data] - Optional contextual data used for evaluating dynamic permissions.
 *
 * @return Returns true if the user is allowed to perform the action on the resource; otherwise, false.
 */
export function hasPermission(user: UserJSON, resource: string, action: PermissionAction, data?: unknown): boolean {
  const result = user.roles.some((role) => {
    const rolePermissions = Roles.get(role);
    if (!rolePermissions) return false;

    const resourcePermissions = rolePermissions.get(resource) || rolePermissions.get('*');
    if (!resourcePermissions) return false;

    const permission = resourcePermissions[action];
    if (typeof permission === 'function') {
      return data !== undefined ? permission(user, data) : false;
    }
    return Boolean(permission);
  });

  Logger.debug(`Permission check: User ${user.id} - ${action} on ${resource} -> ${result}`);
  return result;
}
