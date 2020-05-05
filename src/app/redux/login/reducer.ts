import { IAction } from '../combiner'
import { Observable } from 'rxjs';
import { filter, switchMap, map, mergeMap } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { combineEpics } from 'redux-observable-es6-compat';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE, ILoginAnimationReducer } from '../login-animation/reducer';
import { tassign } from 'tassign';
import { RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET } from '../credentials/reducer';

export interface ILoginReducer {
    isLoginError: boolean;
}
export const loginInitial: ILoginReducer = {
    isLoginError: false
};
const isLoginErrorTrue = (state: ILoginReducer, action: IAction<any>): ILoginReducer => {
    return tassign(state, {
        isLoginError: true
    });
};
export const RDX_LOGIN_FETCH = 'RDX_LOGIN_FETCH';
export const RDX_LOGIN_FETCH_SUCCESS = 'RDX_LOGIN_FETCH_SUCCESS';
export const RDX_LOGIN_FETCH_ERROR = 'RDX_LOGIN_FETCH_ERROR';
export const loginReducer = (state: ILoginReducer = loginInitial, action: IAction<any>): ILoginReducer => {
    switch (action.type) {
        case RDX_LOGIN_FETCH_ERROR: return isLoginErrorTrue(state, action);
        default: return state;
    }
};
export const loginEpicFetch = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_LOGIN_FETCH),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/login', {
        email: ac.payload.email,
        password: ac.payload.password
    }).then(res => {
        return {
            type: RDX_LOGIN_FETCH_SUCCESS,
            component: ac.component,
            payload: {
                email: ac.payload.email,
                password: ac.payload.password,
                token: res.data
            }
        }
    }).catch((err: AxiosError) => {
        return {
            type: RDX_LOGIN_FETCH_ERROR,
            component: ac.component,
            payload: {
                status: err.response.status,
                message: err.response.data,
                action: ac.type,
                url: err.config.url,
                method: err.config.method,
            },
        };
    })));
};
export const loginEpicFetchSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_LOGIN_FETCH_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE,
                component: ac.component
            },
            {
                type: RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET,
                component: ac.component,
                payload: ac.payload
            }
        ];
    }));
};
export const loginEpicFetchError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_LOGIN_FETCH_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            component: ac.component,
            payload: ac.payload
        }
    }));
};
export const loginEpics = combineEpics(
    loginEpicFetch,
    loginEpicFetchSuccess,
    loginEpicFetchError
)