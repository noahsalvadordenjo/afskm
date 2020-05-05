import { IAction } from '../combiner'
import { tassign } from 'tassign'
import { Observable } from 'rxjs';
import { filter, switchMap, map, mergeMap, delay } from 'rxjs/operators';
import { URL_BACKEND_NODEJS } from '../urls';
import Axios, { AxiosError } from 'axios';
import { combineEpics } from 'redux-observable-es6-compat';
import { RDX_ERROR_FETCH_ERROR } from '../error/reducer';
import { 
    RDX_REGISTER_ANIMATION_IS_EMAIL_SLIDE_AWAY_TRUE,
    RDX_REGISTER_ANIMATION_IS_CONFIRM_SLIDE_AWAY_TRUE,
    RDX_REGISTER_ANIMATION_IS_VERIFICATION_CODE_TRUE,
    RDX_REGISTER_ANIMATION_IS_PHONENUMBER_VERIFICATION_CODE_SLIDE_AWAY_TRUE, 
    RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_TRUE,
    RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_FALSE
} from '../register-animation/actions';
import { RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET } from '../credentials/reducer';
export interface IRegisterReducer {
    email: string;
    isFetchMail: boolean;
    isFetchMailError: boolean;
    fetchMailError: string;
    number: string;
    isFetchPhonenumber: boolean;
    isFetchPhonenumberError: boolean;
    fetchPhonenumberError: string;
    isFetchVerificationCode: boolean;
    isFetchVerifciationCodeError: boolean;
    fetchVerificationCodeError: string;
    password: string;
    isFetchPassword: boolean;
    isFetchPasswordError: boolean;
    fetchPasswordError: string;
    isRouteAway: boolean;
}
export const registerInitial: IRegisterReducer = {
    email: '',
    isFetchMail: false,
    fetchMailError: '',
    isFetchMailError: false,
    number: '',
    isFetchPhonenumber: false,
    isFetchPhonenumberError: false,
    fetchPhonenumberError: '',
    isFetchVerifciationCodeError: false,
    isFetchVerificationCode: false,
    fetchVerificationCodeError: '',
    password: '',
    isFetchPassword: false,
    isFetchPasswordError: false,
    fetchPasswordError: '',
    isRouteAway: false
};
const fetchMail = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        email: action.payload,
        isFetchMail: true,
        isFetchMailError: false
    });
};
const fetchMailSuccess = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchMail: false
    });
};
const fetchMailError = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchMail: false,
        isFetchMailError: true,
        fetchMailError: action.payload.message
    });
};
const fetchPhonenumber = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        number: action.payload,
        isFetchPhonenumber: true,
        isFetchPhonenumberError: false,
    });
};
const fetchPhonenumberSuccess = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchPhonenumber: false
    });
};
const fetchPhonenumberError = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchPhonenumber: false,
        isFetchPhonenumberError: true,
        fetchPhonenumberError: action.payload.message
    });
};
const fetchVerificationCode = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchVerificationCode: true,
        isFetchVerifciationCodeError: false
    });
};
const fetchVerificationCodeSuccess = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchVerificationCode: false
    });
};
const fetchVerificationCodeError = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchVerificationCode: false,
        isFetchVerifciationCodeError: true,
        fetchVerificationCodeError: action.payload.message
    })
};
const fetchPassword = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        password: action.payload,
        isFetchPassword: true,
        isFetchPasswordError: false
    });
};
const fetchPasswordError = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchPassword: false,
        isFetchPasswordError: true,
        fetchPasswordError: action.payload.message
    });
};
const fetchAccountSuccess = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isFetchPassword: false
    });
};
const isRouteAwayTrue = (state: IRegisterReducer, action: IAction<any>): IRegisterReducer => {
    return tassign(state, {
        isRouteAway: true
    });
};
export const RDX_REGISTER_FETCH_MAIL = 'RDX_REGISTER_FETCH_MAIL';
export const RDX_REGISTER_FETCH_MAIL_SUCCESS = 'RDX_REGISTER_FETCH_MAIL_SUCCESS';
export const RDX_REGISTER_FETCH_MAIL_ERROR = 'RDX_REGISTER_FETCH_MAIL_ERROR';
export const RDX_REGISTER_IS_MAIL_CONFIRMED = 'RDX_REGISTER_IS_MAIL_CONFIRMED';
export const RDX_REGISTER_IS_MAIL_CONFIRMED_SUCCESS = 'RDX_REGISTER_IS_MAIL_CONFIRMED_SUCCESS';
export const RDX_REGISTER_IS_MAIL_CONFIRMED_ERROR = 'RDX_REGISTER_IS_MAIL_CONFIRMED_ERROR';
export const RDX_REGISTER_FETCH_PHONENUMBER = 'RDX_REGISTER_FETCH_PHONENUMBER';
export const RDX_REGISTER_FETCH_PHONENUMBER_SUCCESS = 'RDX_REGISTER_FETCH_PHONENUMBER_SUCCESS';
export const RDX_REGISTER_FETCH_PHONENUMBER_ERROR = 'RDX_REGISTER_FETCH_PHONENUMBER_ERROR';
export const RDX_REGISTER_FETCH_VERIFCATION_CODE = 'RDX_REGISTER_FETCH_VERIFCATION_CODE';
export const RDX_REGISTER_FETCH_VERIFCATION_CODE_SUCCESS = 'RDX_REGISTER_FETCH_VERIFCATION_CODE_SUCCESS';
export const RDX_REGISTER_FETCH_VERIFICATION_CODE_ERROR = 'RDX_REGISTER_FETCH_VERIFICATION_CODE_ERROR';
export const RDX_REGISTER_FETCH_PASSWORD = 'RDX_REGISTER_FETCH_PASSWORD';
export const RDX_REGISTER_FETCH_PASSWORD_SUCCESS = 'RDX_REGISTER_FETCH_PASSWORD_SUCCESS';
export const RDX_REGISTER_FETCH_PASSWORD_ERROR = 'RDX_REGISTER_FETCH_PASSWORD_ERROR';
export const RDX_REGISTER_FETCH_ACCOUNT_SUCCESS = 'RDX_REGISTER_FETCH_ACCOUNT_SUCCESS';
export const RDX_REGISTER_IS_ROUTE_AWAY_TRUE = 'RDX_REGISTER_IS_ROUTE_AWAY_TRUE';
export const registerReducer = (state: IRegisterReducer = registerInitial, action: IAction<any>): IRegisterReducer => {
    switch (action.type) {
        case RDX_REGISTER_FETCH_MAIL: return fetchMail(state, action);
        case RDX_REGISTER_FETCH_MAIL_SUCCESS: return fetchMailSuccess(state, action);
        case RDX_REGISTER_FETCH_MAIL_ERROR: return fetchMailError(state, action);
        case RDX_REGISTER_FETCH_PHONENUMBER: return fetchPhonenumber(state, action);
        case RDX_REGISTER_FETCH_PHONENUMBER_SUCCESS: return fetchPhonenumberSuccess(state, action);
        case RDX_REGISTER_FETCH_PHONENUMBER_ERROR: return fetchPhonenumberError(state, action);
        case RDX_REGISTER_FETCH_VERIFCATION_CODE: return fetchVerificationCode(state, action);
        case RDX_REGISTER_FETCH_VERIFCATION_CODE_SUCCESS: return fetchVerificationCodeSuccess(state, action);
        case RDX_REGISTER_FETCH_VERIFICATION_CODE_ERROR: return fetchVerificationCodeError(state, action);
        case RDX_REGISTER_FETCH_PASSWORD: return fetchPassword(state, action);
        case RDX_REGISTER_FETCH_PASSWORD_ERROR: return fetchPasswordError(state, action);
        case RDX_REGISTER_FETCH_ACCOUNT_SUCCESS: return fetchAccountSuccess(state, action);
        case RDX_REGISTER_IS_ROUTE_AWAY_TRUE: return isRouteAwayTrue(state, action);
        default: return state;
    }
};
export const registerEpicFetchMail = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_MAIL),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/confirm/check-mail', {
        email: ac.payload
    }).then(res => {
        return {
            type: RDX_REGISTER_FETCH_MAIL_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_REGISTER_FETCH_MAIL_ERROR,
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
export const registerEpicFetchMailSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_MAIL_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_REGISTER_ANIMATION_IS_EMAIL_SLIDE_AWAY_TRUE,
                component: ac.component
            },
            {
                type: RDX_REGISTER_IS_MAIL_CONFIRMED,
                component: ac.component,
                payload: ac.payload
            }
        ];
    }));
};
export const registerEpicFetchMailError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_MAIL_ERROR),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            payload: ac.payload,
            component: ac.component
        };
    }));
};
export const registerEpicIsMailConfirmed = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_IS_MAIL_CONFIRMED),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/confirm/is-mail-confirmed', {
        email: ac.payload
    }).then(res => {
        return {
            type: RDX_REGISTER_IS_MAIL_CONFIRMED_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        if(err.response.status === 400) {
            return {
                type: RDX_REGISTER_IS_MAIL_CONFIRMED_ERROR,
                component: ac.component,
                payload: ac.payload
            };
        } else {
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
        }
    })));
};
export const registerEpicIsMailConfirmedSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_IS_MAIL_CONFIRMED_SUCCESS),
    map(ac => {
        return {
            type: RDX_REGISTER_ANIMATION_IS_CONFIRM_SLIDE_AWAY_TRUE,
            component: ac.component
        };
    }));
};
export const registerEpicIsMailConfirmedError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_IS_MAIL_CONFIRMED_ERROR),
    delay(500),
    map(ac => {
        return {
            type: RDX_REGISTER_IS_MAIL_CONFIRMED,
            component: ac.component,
            payload: ac.payload
        };
    }));
};
export const registerEpicFetchPassword = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_PASSWORD),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/password/validate', {
        password: ac.payload
    }).then(res => {
        return {
            type: RDX_REGISTER_FETCH_PASSWORD_SUCCESS,
            component: ac.component
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_REGISTER_FETCH_PASSWORD_ERROR,
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
export const registerEpicFetchPasswordSuccess = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_PASSWORD_SUCCESS),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/accounts/register', {
        email: state.value.register.email,
        password: state.value.register.password,
        oneSignal: state.value.credentials.playerId
    }).then(res => {
        return {
            type: RDX_REGISTER_FETCH_ACCOUNT_SUCCESS,
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
export const registerEpicFetchAccountSuccess = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_ACCOUNT_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_FALSE,
                component: ac.component
            },
            {
                type: RDX_CREDENTIALS_EMAIL_PASSWORD_TOKEN_SET,
                component: ac.component,
                payload: {
                    email: state.value.register.email,
                    password: state.value.register.password,
                    token: ac.payload
                }
            }
        ];
    }));
};
export const registerEpicFetchAccountSuccessDelay = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_ACCOUNT_SUCCESS),
    delay(500),
    map(ac => {
        return {
            type: RDX_REGISTER_IS_ROUTE_AWAY_TRUE,
            component: ac.component
        };
    }));
};
export const registerEpicFetchPasswordError = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_FETCH_PASSWORD),
    map(ac => {
        return {
            type: RDX_ERROR_FETCH_ERROR,
            component: ac.component,
            payload: ac.payload
        };
    }));
};
export const registerEpics = combineEpics(
    registerEpicFetchMail,
    registerEpicFetchMailSuccess,
    registerEpicIsMailConfirmed,
    registerEpicIsMailConfirmedSuccess,
    registerEpicIsMailConfirmedError,
    registerEpicFetchPassword,
    registerEpicFetchPasswordSuccess,
    registerEpicFetchAccountSuccess,
    registerEpicFetchAccountSuccessDelay,
    registerEpicFetchPasswordError,
);
