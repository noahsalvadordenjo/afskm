import { List } from 'immutable';
import { IAction } from '../combiner';
import { tassign } from 'tassign';
import { INumberPrefix } from './interfaces';

export interface IPhonenumberPrefixReducer {
    phonenumberPrefixes: List<INumberPrefix>;
    selectedPhonenumberPrefix: INumberPrefix;
}
export const phonenumberPrefixInitial: IPhonenumberPrefixReducer = {
    phonenumberPrefixes: List([
        {
            name: 'NL',
            code: '+31',
            backendCode: '31'
        },
        {
            name: 'BE',
            code: '+32',
            backendCode: '32'
        },
        {
            name: 'FR',
            code: '+33',
            backendCode: '33'
        },
        {
            name: 'DE',
            code: '+49',
            backendCode: '49'
        },
        {
            name: 'ES',
            code: '+34',
            backendCode: '34'
        },
        {
            name: 'PT',
            code: '+351',
            backendCode: '351'
        },
        {
            name: 'IT',
            code: '+39',
            backendCode: '39'
        }
    ]),
    selectedPhonenumberPrefix: { name: 'NL', code: '+31', backendCode: '31' }
};
const selectedPhonenumberPrefixSet = (state: IPhonenumberPrefixReducer, action: IAction<INumberPrefix>): IPhonenumberPrefixReducer => {
    return tassign(state, {
        selectedPhonenumberPrefix: { name: action.payload.name, code: action.payload.code, backendCode: action.payload.backendCode }
    });
};
const reset = (state: IPhonenumberPrefixReducer, action: IAction<any>): IPhonenumberPrefixReducer => {
    return tassign(state, phonenumberPrefixInitial);
}
export const RDX_PHONENUMBER_PREFIX_SELECTED_PHONENUMBER_PREFIX_SET = 'RDX_PHONENUMBER_PREFIX_SELECTED_PHONENUMBER_PREFIX_SET';
export const RDX_PHONENUMBER_PREFIX_RESET = 'RDX_PHONENUMBER_PREFIX_RESET';
export const phonenumberPrefixReducer = (state: IPhonenumberPrefixReducer = phonenumberPrefixInitial, action: IAction<any>)
: IPhonenumberPrefixReducer => {
    switch (action.type) {
        case RDX_PHONENUMBER_PREFIX_SELECTED_PHONENUMBER_PREFIX_SET: return selectedPhonenumberPrefixSet(state, action);
        case RDX_PHONENUMBER_PREFIX_RESET: return reset(state, action);
        default: return state;
    }
};
