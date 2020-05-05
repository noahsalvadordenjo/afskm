import { tassign } from 'tassign'
import { IAction } from '../combiner';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { RDX_PROFILE_ATM, RDX_PROFILE_USERNAME } from '../profile/reducer';
import { combineEpics } from 'redux-observable-es6-compat';
import Axios from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';

export interface ICredentialsReducer {
    email: string;
    password: string;
    token: string;
    playerId: string;
}
export const credentialsInitial: ICredentialsReducer = {
    email: '',
    password: '',
    token: '',
    playerId: 'asfkm',
};
const emailPasswordTokenSet = (state: ICredentialsReducer, action: IAction<any>): ICredentialsReducer => {
    return tassign(state, {
        email: action.payload.email,
        password: action.payload.password,
        token: action.payload.token
    });
};
const playerIdSet = (state: ICredentialsReducer, action: IAction<any>): ICredentialsReducer => {
    return tassign(state, {
        playerId: action.payload
    });
};
export const RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET = 'RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET';
export const RDX_CREDENTIALS_PLAYER_ID_SET = 'RDX_CREDENTIALS_PLAYER_ID_SET';
export const credentialsReducer = (state: ICredentialsReducer = credentialsInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET: return emailPasswordTokenSet(state, action);
        case RDX_CREDENTIALS_PLAYER_ID_SET: return playerIdSet(state, action);
        default: return state;
    }
};
export const credentialsEpicEmailPasswordSet = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET),
    map(ac => {
        return {
            type: RDX_PROFILE_ATM,
            component: ac.component
        };
    }));
};
export const credentialsEpics = combineEpics(
    credentialsEpicEmailPasswordSet
);