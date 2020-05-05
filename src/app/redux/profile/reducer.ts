import { IAction, IReduxState } from '../combiner'
import { Observable } from 'rxjs';
import { filter, switchMap, map, mergeMap } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { combineEpics } from 'redux-observable-es6-compat';
import { tassign } from 'tassign';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { RDX_CONTACTS_CONTACTS } from '../contacts/reducer';
import { RDX_TEXTS_TEXTS } from '../texts/reducer';

export interface IProfileReducer {
    atm: string;
    username: string;
    isUsername: boolean;
    isFetchUsername: boolean;
    isFetchUsernameError: boolean;
    fetchUsernameError: string;
}
export const profileInitial: IProfileReducer = {
    atm: '',
    username: '',
    isUsername: false,
    isFetchUsername: false,
    isFetchUsernameError: false,
    fetchUsernameError: '',
};
const atmSuccess = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        atm: action.payload
    });
};
const username = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        isUsername: true
    });
};
const usernameSuccess = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        username: action.payload,
        isUsername: false
    });
};
const fetchUsername = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        isFetchUsername: true,
        isFetchUsernameError: false
    });
};
const fetchUsernameSuccess = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        isFetchUsername: false,
    });
};
const fetchUsernameError = (state: IProfileReducer, action: IAction<any>): IProfileReducer => {
    return tassign(state, {
        isFetchUsername: false,
        isFetchUsernameError: true,
    });
};
export const RDX_PROFILE_ATM = 'RDX_PROFILE_ATM';
export const RDX_PROFILE_ATM_SUCCESS = 'RDX_PROFILE_ATM_SUCCESS';
export const RDX_PROFILE_ATM_ERROR = 'RDX_PROFILE_ATM_ERROR';
export const RDX_PROFILE_USERNAME = 'RDX_PROFILE_USERNAME';
export const RDX_PROFILE_USERNAME_SUCCESS = 'RDX_PROFILE_USERNAME_SUCCESS';
export const RDX_PROFILE_USERNAME_ERROR = 'RDX_PROFILE_USERNAME_ERROR';
export const RDX_PROFILE_FETCH_USERNAME = 'RDX_PROFILE_FETCH_USERNAME';
export const RDX_PROFILE_FETCH_USERNAME_SUCCESS = 'RDX_PROFILE_FETCH_USERNAME_SUCCESS';
export const RDX_PROFILE_FETCH_USERNAME_ERROR = 'RDX_PROFILE_FETCH_USERNAME_ERROR';
export const profileReducer = (state: IProfileReducer = profileInitial, action: IAction<any>): IProfileReducer => {
    switch (action.type) {
        case RDX_PROFILE_ATM_SUCCESS: return atmSuccess(state, action);
        case RDX_PROFILE_USERNAME: return username(state, action);
        case RDX_PROFILE_USERNAME_SUCCESS: return usernameSuccess(state, action);
        case RDX_PROFILE_FETCH_USERNAME: return fetchUsername(state, action);
        case RDX_PROFILE_FETCH_USERNAME_SUCCESS: return fetchUsernameSuccess(state, action);
        case RDX_PROFILE_FETCH_USERNAME_ERROR: return fetchUsernameError(state, action);
        default: return state;
    }
};
export const profileEpicAtm = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_PROFILE_ATM),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/cryschyp', {
        email: state.value.credentials.email,
        password: state.value.credentials.password
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_PROFILE_ATM_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_PROFILE_ATM_ERROR,
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
export const profileEpicAtmSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_PROFILE_ATM_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_CONTACTS_CONTACTS,
                component: ac.component
            },
            {
                type: RDX_TEXTS_TEXTS,
                component: ac.component
            }
        ];
    }));
}
export const profileEpicAtmSuccessOrUsername = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac =>
        (ac.type === RDX_PROFILE_ATM_SUCCESS && (state.value.profile.atm !== '' || state.value.profile.atm !== undefined)) ||
        (ac.type === RDX_PROFILE_USERNAME && (state.value.profile.atm !== '' || state.value.profile.atm !== undefined))),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/accounts/username/' + state.value.profile.atm, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_PROFILE_USERNAME_SUCCESS,
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
export const profileEpicFetchUsername = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_PROFILE_FETCH_USERNAME),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/fetch-username', {
        email: state.value.credentials.email,
        password: state.value.credentials.password,
        username: ac.payload
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_PROFILE_FETCH_USERNAME_SUCCESS,
            component: ac.component,
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_PROFILE_FETCH_USERNAME_ERROR,
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
export const profileEpicFetchUsernameSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_PROFILE_FETCH_USERNAME_SUCCESS),
    map(ac => {
        return {
            type: RDX_PROFILE_USERNAME,
            component: ac.component
        }
    }))
}
export const profileEpicFetchUsernameError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_PROFILE_FETCH_USERNAME_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            component: ac.component,
            payload: ac.payload
        };
    }));
};
export const profileEpics = combineEpics(
    profileEpicAtm,
    profileEpicAtmSuccess,
    profileEpicAtmSuccessOrUsername,
    profileEpicFetchUsername,
    profileEpicFetchUsernameSuccess,
    profileEpicFetchUsernameError
);