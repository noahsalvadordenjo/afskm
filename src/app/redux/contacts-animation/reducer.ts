import { IAction } from '../combiner'
import { tassign } from 'tassign'

export interface IContactsAnimationReducer {
    isContacts: boolean;
}
export const contactsAnimationInitial: IContactsAnimationReducer = {
    isContacts: false
};
const isContactsTrue = (state: IContactsAnimationReducer, action: IAction<any>): IContactsAnimationReducer => {
    return tassign(state, {
        isContacts: true
    });
};
const reset = (state: IContactsAnimationReducer, action: IAction<any>): IContactsAnimationReducer => {
    return tassign(state, contactsAnimationInitial);
};
export const RDX_CONTACTS_ANIMATION_IS_CONTACTS_TRUE = 'RDX_CONTACTS_ANIMATION_IS_CONTACTS_TRUE';
export const RDX_CONTACTS_ANIMATION_RESET = 'RDX_CONTACTS_ANIMATION_RESET';
export const contactsAnimationReducer =
(state: IContactsAnimationReducer = contactsAnimationInitial, action: IAction<any>): IContactsAnimationReducer => {
    switch (action.type) {
        case RDX_CONTACTS_ANIMATION_IS_CONTACTS_TRUE: return isContactsTrue(state, action);
        case RDX_CONTACTS_ANIMATION_RESET: return reset(state, action);
        default: return state;
    }
};