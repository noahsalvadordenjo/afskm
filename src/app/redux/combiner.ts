import { combineReducers } from 'redux';
import { IHomeAnimationReducer, homeAnimationInitial, homeAnimationReducer, homeAnimationEpicRightOne, homeAnimationEpicRightTwo, homeAnimationEpicLeftOne, homeAnimationEpicLeftTwo } from './home-animation/reducer'
import { combineEpics } from 'redux-observable-es6-compat';
import { IRegisterAnimationReducer, registerAnimationInitial, registerAnimationReducer } from './register-animation/reducer';
import { IRegisterReducer, registerInitial, registerReducer } from './register/reducer';
import { IPhonenumberPrefixReducer, phonenumberPrefixInitial, phonenumberPrefixReducer } from './phonenumber-prefix/reducer';
import { ILoginReducer, loginInitial, loginReducer } from './login/reducer';
import { ILoginAnimationReducer, loginAnimationInitial, loginAnimationReducer } from './login-animation/reducer';
import { ICredentialsReducer, credentialsInitial, credentialsReducer } from './credentials/reducer';
import { IProfileReducer, profileInitial, profileReducer } from './profile/reducer';
import { IContactsReducer, contactsInitial, contactsReducer } from './contacts/reducer';
import { ITextReducer, textInitial, textReducer } from './text/reducer';
import { ITextsReducer, textsInitial, textsReducer } from './texts/reducer';
import { routerReducer } from '@angular-redux/router';
import { IAnonymousReducer, anonymousInitial, anonymousReducer } from './anonymous/reducer';
import { ITextAnimationReducer, textAnimationInitial, textAnimationReducer } from './texts-animation/reducer';
import { IContactsAnimationReducer, contactsAnimationInitial, contactsAnimationReducer } from './contacts-animation/reducer';
import { IForgotReducer, forgotInitial, forgotReducer } from './forgot/reducer';
import { qrReducer, qrInitial, IQrReducer } from './qr/reducer';
export interface IAction<T> {
    type: string;
    payload?: T;
    component: string;
}
export interface IReduxState {
    homeAnimation: IHomeAnimationReducer;
    registerAnimation: IRegisterAnimationReducer;
    register: IRegisterReducer;
    phonenumberPrefix: IPhonenumberPrefixReducer;
    login: ILoginReducer;
    loginAnimation: ILoginAnimationReducer;
    credentials: ICredentialsReducer;
    profile: IProfileReducer;
    contacts: IContactsReducer;
    text: ITextReducer;
    texts: ITextsReducer;
    anonymous: IAnonymousReducer;
    textAnimation: ITextAnimationReducer;
    contactsAnimation: IContactsAnimationReducer;
    forgot: IForgotReducer;
    qr: IQrReducer;
    router: string;
}
export const initial: IReduxState = {
    homeAnimation: homeAnimationInitial,
    registerAnimation: registerAnimationInitial,
    register: registerInitial,
    phonenumberPrefix: phonenumberPrefixInitial,
    login: loginInitial,
    loginAnimation: loginAnimationInitial,
    credentials: credentialsInitial,
    profile: profileInitial,
    contacts: contactsInitial,
    text: textInitial,
    texts: textsInitial,
    anonymous: anonymousInitial,
    textAnimation: textAnimationInitial,
    contactsAnimation: contactsAnimationInitial,
    forgot: forgotInitial,
    qr: qrInitial,
    router: ''
};
export const reducers = combineReducers({
    homeAnimation: homeAnimationReducer,
    registerAnimation: registerAnimationReducer,
    register: registerReducer,
    phonenumberPrefix: phonenumberPrefixReducer,
    login: loginReducer,
    loginAnimation: loginAnimationReducer,
    credentials: credentialsReducer,
    profile: profileReducer,
    contacts: contactsReducer,
    text: textReducer,
    texts: textsReducer,
    anonymous: anonymousReducer,
    textAnimation: textAnimationReducer,
    contactsAnimation: contactsAnimationReducer,
    forgot: forgotReducer,
    qr: qrReducer,
    router: routerReducer,
});
