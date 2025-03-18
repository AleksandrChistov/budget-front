import { Roles } from '../enums/role.enums';

export interface User {
  fullName: string;
  email: string;
  password: string;
  role: Roles;
}

export interface AuthUser {
  token?: string,
  username?: string,
  role?: string
}
