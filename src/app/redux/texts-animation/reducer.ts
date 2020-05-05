import { IAction } from '../combiner';
import { tassign } from 'tassign';

export interface ITextAnimationReducer {
    isTexts: boolean;
}
export const textAnimationInitial: ITextAnimationReducer = {
    isTexts: false
};
const isTextsTrue = (state: ITextAnimationReducer, action: IAction<any>): ITextAnimationReducer => {
    return tassign(state, {
        isTexts: true
    });
};
const reset = (state: ITextAnimationReducer, action: IAction<any>): ITextAnimationReducer => {
    return tassign(state, textAnimationInitial);
};
export const RDX_TEXT_ANIMATION_IS_TEXTS_TRUE = 'RDX_TEXT_ANIMATION_IS_TEXTS_TRUE';
export const RDX_TEXT_ANIMATION_RESET = 'RDX_TEXT_ANIMATION_RESET';
export const textAnimationReducer = (state: ITextAnimationReducer = textAnimationInitial, action: IAction<any>): ITextAnimationReducer => {
    switch (action.type) {
        case RDX_TEXT_ANIMATION_IS_TEXTS_TRUE: return isTextsTrue(state, action);
        case RDX_TEXT_ANIMATION_RESET: return reset(state, action);
        default: return state;
    }
};