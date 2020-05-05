import { IAction } from '../combiner'
import { Observable } from 'rxjs';
import { filter, switchMap, mergeMap, map } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { List } from 'immutable';
import { combineEpics } from 'redux-observable-es6-compat';
import { tassign } from 'tassign';
import { ITexts, IText } from '../interfaces';
import { ITextReducer } from '../text/reducer';
import { RDX_TEXT_ANIMATION_RESET, RDX_TEXT_ANIMATION_IS_TEXTS_TRUE } from '../texts-animation/reducer';
export interface ITextsReducer {
    texts: List<ITexts>;
}
export const textsInitial: ITextsReducer = {
    texts: List(),
};
const textsTexts = (state: ITextsReducer, action: IAction<any>): ITextsReducer => {
    return tassign(state, {
        texts: List()
    });
};
const textsTextsSuccess = (state: ITextsReducer, action: IAction<any>): ITextsReducer => {
    return tassign(state, {
        texts: state.texts.push(action.payload)
    });
};
const textsTextsSort = (state: ITextsReducer, action: IAction<any>): ITextsReducer => {
    return tassign(state, {
        texts: state.texts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    });
};
export const RDX_TEXTS_TEXTS = 'RDX_TEXTS_TEXTS';
export const RDX_TEXTS_TEXTS_SUCCESS = 'RDX_TEXTS_TEXTS_SUCCESS';
export const RDX_TEXTS_TEXTS_ERROR = 'RDX_TEXTS_TEXTS_ERROR';
export const RDX_TEXTS_TEXTS_TEXTS = 'RDX_TEXTS_TEXTS_TEXTS';
export const RDX_TEXTS_TEXTS_TEXTS_SUCCESS = 'RDX_TEXTS_TEXTS_TEXTS_SUCCESS';
export const RDX_TEXTS_TEXTS_TEXTS_ERROR = 'RDX_TEXTS_TEXTS_TEXTS_ERROR';
export const RDX_TEXTS_TEXTS_TEXTS_SORT = 'RDX_TEXTS_TEXTS_TEXTS_SORT';
export const textsReducer = (state: ITextsReducer = textsInitial, action: IAction<any>): ITextsReducer => {
    switch (action.type) {
        case RDX_TEXTS_TEXTS_TEXTS: return textsTexts(state, action);
        case RDX_TEXTS_TEXTS_TEXTS_SUCCESS: return textsTextsSuccess(state, action);
        case RDX_TEXTS_TEXTS_TEXTS_SORT: return textsTextsSort(state, action);
        default: return state;
    }
};
export const textsEpicsTexts = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXTS_TEXTS && state.value.profile.atm !== ''),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/texts/texts/' + state.value.profile.atm, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_TEXTS_TEXTS_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXTS_TEXTS_ERROR,
            component: ac.component,
            payload: {
                status: err.response.status,
                message: err.response.data,
                action: ac.type,
                url: err.config.url,
                method: err.config.method,
            }
        };
    })));
};
export const textsEpicsTextsSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXTS_TEXTS_SUCCESS),
    mergeMap(ac => {
        const actions: IAction<any>[] = [];
        for(let i = 0; i < ac.payload.length; i++) {
            actions.push({
                type: RDX_TEXTS_TEXTS_TEXTS,
                payload: {
                    index: i,
                    address: ac.payload[i]
                },
                component: ac.component
            });
        }
        return actions;
    }));
};
export const textsEpicsTextsTexts = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXTS_TEXTS_TEXTS),
    mergeMap(ac => Axios.all([
        Axios.post(URL_BACKEND_NODEJS + '/api/texts/texts', {
            sender: state.value.profile.atm,
            reciever: ac.payload.address
        }, {
            headers: {
                'x-auth-token': state.value.credentials.token
            }
        }),
        Axios.get(URL_BACKEND_NODEJS + '/api/accounts/username/' + ac.payload.address, {
            headers: {
                'x-auth-token': state.value.credentials.token
            }
        })
    ]).then(res => {
        return {
            type: RDX_TEXTS_TEXTS_TEXTS_SUCCESS,
            component: ac.component,
            payload: {
                texts: List(res[0].data).first(),
                username: res[1].data,
                reciever: ac.payload.address,
                time: new Date(res[0].data[res[0].data.length - 1].date),
                index: ac.payload.index
            }
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_TEXTS_TEXTS_TEXTS_ERROR,
            component: ac.component,
            payload: {
                status: err.response.status,
                message: err.response.data,
                action: ac.type,
                url: err.config.url,
                method: err.config.method,
            }
        };
    })));
};
export const textsEpicTextsTextsSuccess = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_TEXTS_TEXTS_TEXTS_SUCCESS),
    mergeMap(ac => {
        return [
            {
                type: RDX_TEXTS_TEXTS_TEXTS_SORT,
                component: ac.component
            },
            {
                type: RDX_TEXT_ANIMATION_IS_TEXTS_TRUE,
                component: ac.component
            }
        ];
    }));
};
export const textsEpics = combineEpics(
    textsEpicsTexts,
    textsEpicsTextsSuccess,
    textsEpicsTextsTexts,
    textsEpicTextsTextsSuccess
);