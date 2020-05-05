import { IAction } from '../combiner';
import { Observable } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { tassign } from 'tassign';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { combineEpics } from 'redux-observable-es6-compat';

export interface IForgotReducer {
    isFetch: boolean;
    isFetchError: boolean;
    fetchError: string;
}
export const forgotInitial: IForgotReducer = {
    isFetch: false,
    isFetchError: false,
    fetchError: ''
};
const fetch = (state: IForgotReducer, action: IAction<any>): IForgotReducer => {
    return tassign(state, {
        isFetch: true,
        isFetchError: false
    });
};
const fetchSuccess = (state: IForgotReducer, action: IAction<any>): IForgotReducer => {
    return tassign(state, {
        isFetch: false
    });
};
const fetchError = (state: IForgotReducer, action: IAction<any>): IForgotReducer => {
    return tassign(state, {
        isFetch: false,
        isFetchError: true,
        fetchError: action.payload.message
    });
};
export const RDX_FORGOT_FETCH = 'RDX_FORGOT_FETCH';
export const RDX_FORGOT_FETCH_SUCCESS = 'RDX_FORGOT_FETCH_SUCCESS';
export const RDX_FORGOT_FETCH_ERROR = 'RDX_FORGOT_FETCH_ERROR';
export const forgotReducer = (state: IForgotReducer = forgotInitial, action: IAction<any>): IForgotReducer => {
    switch (action.type) {
        case RDX_FORGOT_FETCH: return fetch(state, action);
        case RDX_FORGOT_FETCH_SUCCESS: return fetchSuccess(state, action);
        case RDX_FORGOT_FETCH_ERROR: return fetchError(state, action);
        default: return state;
    }
};
export const forgotEpicFetch = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_FORGOT_FETCH),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/prepare-password-reset', {
        email: ac.payload
    }).then(res => {
        return {
            type: RDX_FORGOT_FETCH_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_FORGOT_FETCH_ERROR,
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
export const forgotEpicFetchError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_FORGOT_FETCH_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            payload: ac.payload,
            component: ac.component
        };
    }));
};
export const forgotEpics = combineEpics(
    forgotEpicFetch,
    forgotEpicFetchError
);