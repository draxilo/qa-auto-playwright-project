import { Card } from './card.interface';

export interface List {
  id?: string;
  name: string;
  cards?: Array<Card>;
  boardId?: string;
}
