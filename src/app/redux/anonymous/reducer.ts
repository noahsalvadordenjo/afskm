import { IAction } from '../combiner';
import { Observable } from 'rxjs';
import { IonCard } from '@ionic/angular';
import { filter, switchMap, map } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { combineEpics } from 'redux-observable-es6-compat';
import { List } from 'immutable';
import { IAnonymous } from '../interfaces';
import { tassign } from 'tassign';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { RDX_TEXT_BLOCK_SUCCESS } from '../text/reducer';
import { RDX_PROFILE_ATM } from '../profile/reducer';

export interface IAnonymousReducer {
    texts: List<IAnonymous>;
    isFetchReply: boolean;
    isFetchReplyError: boolean;
    fetchReplyError: string;
}
export const anonymousInitial: IAnonymousReducer = {
    texts: List(),
    isFetchReply: false,
    isFetchReplyError: false,
    fetchReplyError: ''
};
const textsSuccess = (state: IAnonymousReducer, action: IAction<any>): IAnonymousReducer => {
    const texts: IAnonymous[] = [];
    for (let i = 0; i < action.payload.length; i++) {
        const text: IAnonymous = action.payload[i];
        texts.push({
            index: text.index,
            txt: text.txt,
            date: new Date(text.date)
        });
    }
    return tassign(state, {
        texts: List(texts)
    });
};
const fetchReply = (state: IAnonymousReducer, action: IAction<any>): IAnonymousReducer => {
    return tassign(state, {
        isFetchReply: true,
        isFetchReplyError: false
    });
};
const fetchReplySuccess = (state: IAnonymousReducer, action: IAction<any>): IAnonymousReducer => {
    return tassign(state, {
        isFetchReply: false
    });
};
const fetchReplyError = (state: IAnonymousReducer, action: IAction<any>): IAnonymousReducer => {
    return tassign(state, {
        isFetchReply: false,
        isFetchReplyError: true,
        fetchReplyError: action.payload.message
    });
};

export const RDX_ANONYMOUS_TEXTS = 'RDX_ANONYMOUS_TEXTS';
export const RDX_ANONYMOUS_TEXTS_SUCCESS = 'RDX_ANONYMOUS_TEXTS_SUCCESS';
export const RDX_ANONYMOUS_TEXTS_ERROR = 'RDX_ANONYMOUS_TEXTS_ERROR';
export const RDX_ANONYMOUS_FETCH_REPLY = 'RDX_ANONYMOUS_FETCH_REPLY';
export const RDX_ANONYMOUS_FETCH_REPLY_SUCCESS = 'RDX_ANONYMOUS_FETCH_REPLY_SUCCESS';
export const RDX_ANONYMOUS_FETCH_REPLY_ERROR = 'RDX_ANONYMOUS_FETCH_REPLY_ERROR';
export const RDX_ANONYMOUS_FETCH_BLOCK = 'RDX_ANONYMOUS_FETCH_BLOCK';
export const RDX_ANONYMOUS_FETCH_BLOCK_SUCCESS = 'RDX_ANONYMOUS_FETCH_BLOCK_SUCCESS';
export const RDX_ANONYMOUS_FETCH_BLOCK_ERROR = 'RDX_ANONYMOUS_FETCH_BLOCK_ERROR';
export const anonymousReducer = (state: IAnonymousReducer = anonymousInitial, action: IAction<any>): IAnonymousReducer => {
    switch (action.type) {
        case RDX_ANONYMOUS_TEXTS_SUCCESS: return textsSuccess(state, action);
        case RDX_ANONYMOUS_FETCH_REPLY: return fetchReply(state, action);
        case RDX_ANONYMOUS_FETCH_REPLY_SUCCESS: return fetchReplySuccess(state, action);
        case RDX_ANONYMOUS_FETCH_REPLY_ERROR: return fetchReplyError(state, action);
        default: return state;
    }
};
export const anonymousEpicTexts = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_ANONYMOUS_TEXTS),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/anonymous/texts/' + state.value.profile.atm, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_ANONYMOUS_TEXTS_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_ANONYMOUS_TEXTS_ERROR,
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
export const anonymousEpicFetchReply = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_ANONYMOUS_FETCH_REPLY),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/anonymous/reply', {
        index: ac.payload.index,
        reciever: state.value.profile.atm,
        text: ac.payload.text
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_ANONYMOUS_FETCH_REPLY_SUCCESS,
            component: ac.component
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_ANONYMOUS_FETCH_REPLY_ERROR,
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
export const anonymousEpicFetchReplyError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_ANONYMOUS_FETCH_REPLY_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            payload: ac.payload,
            component: ac.component
        };
    }));
};
export const anonymousEpicFetchBlock = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_ANONYMOUS_FETCH_BLOCK),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/anonymous/block', {
        index: ac.payload,
        reciever: state.value.profile.atm,
        email: state.value.credentials.email,
        password: state.value.credentials.password
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_ANONYMOUS_FETCH_BLOCK_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_ANONYMOUS_FETCH_BLOCK_ERROR,
            component: ac.component,
        };
    })));
};
export const anonymousEpicFetchBlockSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_ANONYMOUS_FETCH_BLOCK_SUCCESS),
    map(ac => {
        return {
            type: RDX_PROFILE_ATM,
            component: ac.component
        };
    }));
};
export const anonymousEpics = combineEpics(
    anonymousEpicTexts,
    anonymousEpicFetchReply,
    anonymousEpicFetchReplyError,
    anonymousEpicFetchBlock,
    anonymousEpicFetchBlockSuccess
);
