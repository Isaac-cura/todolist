import { User } from './user.model';
export namespace AuthenticationModels{
    export type Session = User & {start: number};
}