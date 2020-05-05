import { IAction } from '../combiner'
import { tassign } from 'tassign';
import { Observable } from 'rxjs';
import { filter, delay, map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable-es6-compat';

export interface ILoginAnimationReducer {
    isLogin: boolean;
    isRouteAway: boolean;
}
export const loginAnimationInitial: ILoginAnimationReducer = {
    isLogin: false,
    isRouteAway: false
};
const isLoginTrue = (state: ILoginAnimationReducer, action: IAction<any>): ILoginAnimationReducer => {
    return tassign(state, {
        isLogin: true
    });
};
const isLoginFalse = (state: ILoginAnimationReducer, action: IAction<any>): ILoginAnimationReducer => {
    return tassign(state, {
        isLogin: false
    });
};
const isRouteAwayTrue = (state: ILoginAnimationReducer, action: IAction<any>): ILoginAnimationReducer => {
    return tassign(state, {
        isRouteAway: true
    });
};
export const RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE = 'RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE';
export const RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE = 'RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE';
export const RDX_LOGIN_ANIMATION_IS_ROUTE_AWAY_TRUE = 'RDX_LOGIN_ANIMATION_IS_ROUTE_AWAY_TRUE';
export const loginAnimationReducer = (state: ILoginAnimationReducer = loginAnimationInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE: return isLoginTrue(state, action);
        case RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE: return isLoginFalse(state, action);
        case RDX_LOGIN_ANIMATION_IS_ROUTE_AWAY_TRUE: return isRouteAwayTrue(state, action);
        default: return state;
    }
};
export const loginAnimationEpicIsLoginFalse = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_LOGIN_ANIMATION_IS_LOGIN_FALSE),
    delay(500),
    map(ac => {
        return {
            type: RDX_LOGIN_ANIMATION_IS_ROUTE_AWAY_TRUE,
            component: ac.component
        };
    }));
}
export const loginAnimationEpics = combineEpics(
    loginAnimationEpicIsLoginFalse
);