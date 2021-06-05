interface User {
  permissions: string[];
  roles: string[];
}

interface ValidateUserPermissionsAndRolesParams {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function ValidateUserPermissionsAndRoles({
  user,
  permissions,
  roles
}: ValidateUserPermissionsAndRolesParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission)
    })

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role)
    })

    if (!hasAllRoles) {
      return false
    }
  }

  return true
}