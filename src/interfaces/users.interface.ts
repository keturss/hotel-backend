import Roles from '@/roles/roles';

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: Roles;
}
