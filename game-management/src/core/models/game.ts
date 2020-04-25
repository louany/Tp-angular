import { Category } from './category';

export interface GameBase {
  id: number;

  title: string;

  description: string;

  developer: string;

  coverImage: string;

  /** Note/10. */
  note: number;

}
export interface Game extends GameBase{

  genres: Category[];

}

export interface GameDto extends GameBase{

  genres: number[];

}