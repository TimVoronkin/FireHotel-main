export interface User {
  id?: number;
  uuid?: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  role: 'worker' | 'admin';
  password: string;
}
