import { IUser } from "./IUser";

export interface IComment {
    id: string,
    text: string,
    user: IUser
}