import { IAction } from '../combiner';
import { tassign } from 'tassign';
import { IRegisterReducer, RDX_REGISTER_FETCH_PASSWORD } from '../register/reducer';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, delay } from 'rxjs/operators';
import { combineEpics } from 'redux-observable-es6-compat';
import { RDX_REGISTER_ANIMATION_IS_EMAIL_FORM_FIELD_TRUE, RDX_REGISTER_ANIMATION_IS_EMAIL_SLIDE_AWAY_TRUE, RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE, RDX_REGISTER_ANIMATION_IS_CONFIRM_TEXT_TRUE, RDX_REGISTER_ANIMATION_IS_CONFIRM_SLIDE_AWAY_TRUE, RDX_REGISTER_ANIMATION_IS_PHONENUMBER_TRUE, RDX_REGISTER_ANIMATION_IS_PHONENUMBER_FORM_FIELD_TRUE, RDX_REGISTER_ANIMATION_IS_VERIFICATION_CODE_TRUE, RDX_REGISTER_ANIMATION_IS_PHONENUMBER_VERIFICATION_CODE_SLIDE_AWAY_TRUE, RDX_REGISTER_ANIMATION_IS_PASSWORD_TRUE, RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_TRUE, RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_FALSE } from './actions';
import { RDX_HOME_IS_REGISTER_CLICKED_FALSE } from '../home-animation/actions';

export interface IRegisterAnimationReducer {
    isEmailFormField: boolean;
    isEmailSlideAway: boolean;
    isConfirm: boolean;
    isConfirmText: boolean;
    isConfirmSlideAway: boolean;
    isPhonenumber: boolean;
    isPhonenumberFormField: boolean;
    isVerificationCode: boolean;
    isPhonenumberVerificationCodeSlideAway: boolean;
    isPassword: boolean;
    isPasswordFormField: boolean;
}
export const registerAnimationInitial: IRegisterAnimationReducer = {
    isEmailFormField: false,
    isEmailSlideAway: false,
    isConfirm: false,
    isConfirmText: false,
    isConfirmSlideAway: false,
    isPhonenumber: false,
    isPhonenumberFormField: false,
    isVerificationCode: false,
    isPhonenumberVerificationCodeSlideAway: false,
    isPassword: false,
    isPasswordFormField: false
};
const isEmailFormFieldTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isEmailFormField: true
    });
};
const isEmailSlideAwayTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isEmailSlideAway: true
    });
};
const isConfirmTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isConfirm: true
    });
};
const isConfirmTextTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isConfirmText: true
    });
};
const isConfirmSlideAwayTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isConfirmSlideAway: true
    });
};
const isPhonenumberTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPhonenumber: true,
        isConfirm: false
    });
};
const isPhonenumberFormFieldTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPhonenumberFormField: true
    });
};
const isVerifcationCodeTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isVerificationCode: true
    });
};
const isPhonenumberVerificationCodeSlideAwayTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPhonenumberVerificationCodeSlideAway: true
    });
};
const isPasswordTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPassword: true,
        isPhonenumber: false
    });
};
const isPasswordFormFieldTrue = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPasswordFormField: true
    });
};
const isPasswordFormFieldFalse = (state: IRegisterAnimationReducer, action: IAction<any>): IRegisterAnimationReducer => {
    return tassign(state, {
        isPasswordFormField: false
    });
};
export const registerAnimationReducer = (state: IRegisterAnimationReducer = registerAnimationInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_REGISTER_ANIMATION_IS_EMAIL_FORM_FIELD_TRUE: return isEmailFormFieldTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_EMAIL_FORM_FIELD_TRUE: return isEmailFormFieldTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_EMAIL_SLIDE_AWAY_TRUE: return isEmailSlideAwayTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE: return isConfirmTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_CONFIRM_TEXT_TRUE: return isConfirmTextTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_CONFIRM_SLIDE_AWAY_TRUE: return isConfirmSlideAwayTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PHONENUMBER_TRUE: return isPhonenumberTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PHONENUMBER_FORM_FIELD_TRUE: return isPhonenumberFormFieldTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_VERIFICATION_CODE_TRUE: return isVerifcationCodeTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PHONENUMBER_VERIFICATION_CODE_SLIDE_AWAY_TRUE:
            return isPhonenumberVerificationCodeSlideAwayTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PASSWORD_TRUE: return isPasswordTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_TRUE: return isPasswordFormFieldTrue(state, action);
        case RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_FALSE: return isPasswordFormFieldFalse(state, action);
        default: return state;
    }
};
export const registerAnimationEpicIsConfirmTrue = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(
        filter(ac => ac.type === RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE),
        mergeMap(ac => {
            return [
                {
                    type: RDX_HOME_IS_REGISTER_CLICKED_FALSE,
                    component: ac.component
                },
            ];
        })
    );
};
export const registerAnimationEpicIsConfirmTrueDelay = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE),
    delay(500),
    map(ac => {
        return {
            type: RDX_REGISTER_ANIMATION_IS_CONFIRM_TEXT_TRUE,
            component: ac.component
        };
    }));
};
export const registerAnimationEpicIsPhonenumberTrue = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_ANIMATION_IS_PHONENUMBER_TRUE),
    delay(500),
    map(ac => {
        return {
            type: RDX_REGISTER_ANIMATION_IS_PHONENUMBER_FORM_FIELD_TRUE,
            component: ac.component
        };
    }));
};
export const registerAnimationEpicIsPasswordTrue = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_REGISTER_ANIMATION_IS_PASSWORD_TRUE),
    delay(500),
    map(ac => {
        return {
            type: RDX_REGISTER_ANIMATION_IS_PASSWORD_FORM_FIELD_TRUE,
            component: ac.component
        };
    }));
};
export const registerAnimationEpics = combineEpics(
    registerAnimationEpicIsConfirmTrue,
    registerAnimationEpicIsConfirmTrueDelay,
    registerAnimationEpicIsPhonenumberTrue,
    registerAnimationEpicIsPasswordTrue
);