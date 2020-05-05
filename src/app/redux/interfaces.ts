import { List } from 'immutable';

export interface IText {
    isIncoming: boolean;
    txt: string;
    date: Date;
}
export interface ITexts {
    username: string;
    reciever: string;
    texts: IText;
    time: Date;
}
export interface IAnonymous {
    index: number;
    txt: string;
    date: Date;
}
