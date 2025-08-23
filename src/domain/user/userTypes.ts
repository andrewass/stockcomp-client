export const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
};

export const userStatusRecord: Record<string, string> = {
  [USER_STATUS.ACTIVE]: "Active",
};

export const userRoleRecord: Record<string, string> = {
  [USER_ROLE.USER]: "User",
  [USER_ROLE.ADMIN]: "Admin",
};

export type User = {
  username: string;
  email: string;
  userRole: string;
  userStatus: string;
};
