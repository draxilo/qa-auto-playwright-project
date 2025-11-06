import { List } from './list.interface';

export interface Board {
  id?: string;
  name: string;
  lists?: Array<List>;
}
