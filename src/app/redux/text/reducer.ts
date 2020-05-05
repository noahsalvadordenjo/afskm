import { IAction } from '../combiner';
import { Observable } from 'rxjs';
import { filter, switchMap, map, delay, mergeMap } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { combineEpics } from 'redux-observable-es6-compat';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { tassign } from 'tassign';
import { List } from 'immutable';
import { RDX_PROFILE_ATM } from '../profile/reducer';
import { IText } from '../interfaces';
import { ITextsReducer } from '../texts/reducer';

export interface ITextReducer {
    username: string;
    texts: List<IText>;
    isBlocked: boolean;
    isFetchText: boolean;
    isFetchTextError: boolean;
    fetchTextError: string;
};
export const textInitial: ITextReducer = {
    username: '',
    texts: List(),
    isBlocked: false,
    isFetchText: false,
    isFetchTextError: false,
    fetchTextError: ''
};
const usernameSuccess = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    return tassign(state, {
        username: action.payload
    });
};
const textsSuccess = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    const texts: IText[] = [];
    console.log(action.payload.texts.length);
    for (let i = 0; i < action.payload.texts.length; i++) {
        const text: IText = action.payload.texts[i];
        console.log(text);
        texts.push({
            isIncoming: text.isIncoming,
            txt: text.txt,
            date: new Date(text.date)
        });
    }
    console.log(texts);
    return tassign(state, {
        texts: List(texts)
    });
};
const isBlockedSuccess = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    return tassign(state, {
        isBlocked: action.payload
    });
};
const fetchText = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    return tassign(state, {
        isFetchText: true,
        isFetchTextError: false,
    });
};
const fetchTextSuccess = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    return tassign(state, {
        isFetchText: false
    });
};
const fetchTextError = (state: ITextReducer, action: IAction<any>): ITextReducer => {
    return tassign(state, {
        isFetchText: false,
        isFetchTextError: true,
        fetchTextError: action.payload.message
    });
};
export const RDX_TEXT_USERNAME = 'RDX_TEXT_USERNAME';
export const RDX_TEXT_USERNAME_SUCCESS = 'RDX_TEXT_USERNAME_SUCCESS';
export const RDX_TEXT_USERNAME_ERROR = 'RDX_TEXT_USERNAME_ERROR';
export const RDX_TEXT_FETCH_TEXT = 'RDX_TEXT_FETCH_TEXT';
export const RDX_TEXT_FETCH_TEXT_SUCCESS = 'RDX_TEXT_FETCH_TEXT_SUCCESS';
export const RDX_TEXT_FETCH_TEXT_ERROR = 'RDX_TEXT_FETCH_TEXT_ERROR';
export const RDX_TEXT_TEXTS = 'RDX_TEXT_TEXTS';
export const RDX_TEXT_TEXTS_SUCCESS = 'RDX_TEXT_TEXTS_SUCCESS';
export const RDX_TEXT_TEXTS_ERROR = 'RDX_TEXT_TEXTS_ERROR';
export const RDX_TEXT_BLOCK = 'RDX_TEXT_BLOCK';
export const RDX_TEXT_BLOCK_SUCCESS = 'RDX_TEXT_BLOCK_SUCCESS';
export const RDX_TEXT_BLOCK_ERROR = 'RDX_TEXT_BLOCK_ERROR';
export const RDX_TEXT_IS_BLOCKED = 'RDX_TEXT_IS_BLOCKED';
export const RDX_TEXT_IS_BLOCKED_SUCCESS = 'RDX_TEXT_IS_BLOCKED_SUCCESS';

export const textReducer = (state: ITextReducer = textInitial, action: IAction<any>): ITextReducer => {
    switch (action.type) {
        case RDX_TEXT_USERNAME_SUCCESS: return usernameSuccess(state, action);
        case RDX_TEXT_TEXTS_SUCCESS: return textsSuccess(state, action);
        case RDX_TEXT_IS_BLOCKED_SUCCESS: return isBlockedSuccess(state, action);
        case RDX_TEXT_FETCH_TEXT: return fetchText(state, action);
        case RDX_TEXT_FETCH_TEXT_SUCCESS: return fetchTextSuccess(state, action);
        case RDX_TEXT_FETCH_TEXT_ERROR: return fetchTextError(state, action);
        default: return state;
    }
};
export const textEpicUsername = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_USERNAME),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/accounts/username/' + ac.payload, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_USERNAME_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
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
export const textEpicFetchTextAnonymousFalse = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_FETCH_TEXT && ac.payload.anonymous === false),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/texts/fetch-text', {
        sender: state.value.profile.atm,
        reciever: ac.payload.reciever,
        text: ac.payload.text
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_FETCH_TEXT_SUCCESS,
            component: ac.component,
            payload: ac.payload.reciever
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXT_FETCH_TEXT_ERROR,
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
export const textEpicFetchTextAnonymousTrue = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_FETCH_TEXT && ac.payload.anonymous === true),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/anonymous/fetch-text', {
        reciever: ac.payload.reciever,
        sender: state.value.profile.atm,
        text: ac.payload.text
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_FETCH_TEXT_SUCCESS,
            component: ac.component,
            payload: ac.payload.reciever
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXT_FETCH_TEXT_ERROR,
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
export const textEpicFetchTextSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_FETCH_TEXT_SUCCESS),
    map(ac => {
        return {
            type: RDX_TEXT_TEXTS,
            payload: {
                reciever: ac.payload,
                repeat: false
            },
            component: ac.component
        };
    }));
};
export const textEpicFetchTextError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_FETCH_TEXT_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            component: ac.component,
            payload: ac.payload
        };
    }));
}
export const textEpicTexts = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_TEXTS),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/texts/texts', {
        sender: state.value.profile.atm,
        reciever: ac.payload.reciever
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_TEXTS_SUCCESS,
            component: ac.component,
            payload: {
                texts: res.data,
                reciever: ac.payload.reciever,
                repeat: ac.payload.repeat
            }
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXT_TEXTS_ERROR,
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
export const textEpicTextsSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_TEXTS_SUCCESS && ac.payload.repeat === true),
    delay(1000),
    map(ac => {
        return {
            type: RDX_TEXT_TEXTS,
            component: ac.component,
            payload: ac.payload.reciever
        };
    }));
};
export const textEpicBlock = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_BLOCK),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/change-cryschyp', {
        email: state.value.credentials.email,
        password: state.value.credentials.password,
        blocked: ac.payload
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_BLOCK_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXT_BLOCK_ERROR,
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
export const textEpicBlockSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_BLOCK_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_PROFILE_ATM,
                component: ac.component,
                payload: ac.payload
            },
            {
                type: RDX_TEXT_IS_BLOCKED,
                component: ac.component,
                payload: ac.payload
            }
        ];
    }));
};
export const textEpicIsBlocked = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXT_IS_BLOCKED),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/contacts/is-blocked', {
        sender: state.value.profile.atm,
        reciever: ac.payload
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXT_IS_BLOCKED_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
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
export const textEpics = combineEpics(
    textEpicUsername,
    textEpicFetchTextAnonymousFalse,
    textEpicFetchTextAnonymousTrue,
    textEpicFetchTextSuccess,
    textEpicTexts,
    textEpicBlock,
    textEpicBlockSuccess,
    textEpicIsBlocked
);