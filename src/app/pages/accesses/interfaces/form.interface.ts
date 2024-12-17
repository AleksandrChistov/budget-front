import { Roles } from '../../../shared/enums/role.enums';

export interface FormAccessData {
  email: string;
  fullName: string;
  role: Roles;
  password: string;
}
