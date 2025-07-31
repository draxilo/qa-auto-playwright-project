import { List } from './list.interface';

export interface Board {
  id?: string;
  /** The name of the board */
  name: string;
  lists?: Array<List>;
}
