import { Message } from './message';

export interface Room {
  id: string;
  title: string;
  updated: number;
  messages: Message[];
  lastMessage: string;
  avatarUrl: string;
}
