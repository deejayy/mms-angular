import { AccessLevel, Role } from './mmscreen.model';

export const accessLevels: { [key: string]: AccessLevel } = {
  read: {
    name: 'Read',
    value: 'read',
  },
  write: {
    name: 'Write',
    value: 'write',
  },
  admin: {
    name: 'Admin',
    value: 'admin',
  },
};

export const roleList: Role[] = [
  {
    name: 'Customer',
    value: 'customer',
  },
  {
    name: 'Employee',
    value: 'employee',
  },
  {
    name: 'Manager',
    value: 'manager',
  },
];

export const roleLevelMap = {
  customer: [
    accessLevels.read,
    accessLevels.write,
  ],
  employee: [
    accessLevels.write,
    accessLevels.admin,
  ],
  manager: [
    accessLevels.admin,
  ],
};
