import { Card } from './card.interface';

export interface List {
  id?: string;
  /** The name of the board */
  name: string;
  cards?: Array<Card>;
}
