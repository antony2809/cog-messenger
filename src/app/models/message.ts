import { User } from './user';

export interface Message {
  sender: User;
  description: string;
  created: Date;
  id: string;
}
