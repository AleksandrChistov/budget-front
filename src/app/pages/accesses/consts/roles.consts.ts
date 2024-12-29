import { Roles } from '../../../shared/enums/role.enums';
import { OptionName } from '../../../shared/interfaces/option.interface';

export const roles: OptionName<Roles>[] = [
  {
    id: Roles.ADMIN,
    name: 'Админ',
  },
  {
    id: Roles.MANAGER,
    name: 'Менеджер',
  },
  {
    id: Roles.ANALYST,
    name: 'Аналитик',
  },
];
