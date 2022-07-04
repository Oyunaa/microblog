import { IComment } from './IComment';
import { IUser } from './IUser';

export interface IPost {
  id: string;
  title: string;
  content: string;
  user: IUser;
  comments: IComment;
}
