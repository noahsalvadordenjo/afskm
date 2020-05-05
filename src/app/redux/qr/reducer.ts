import { IAction } from '../combiner'
import { tassign } from 'tassign';

export interface IQrReducer {
    state: string;
}
export const qrInitial: IQrReducer = {
    state: 'in'
};
const stateOut = (state: IQrReducer, action: IAction<any>): IQrReducer => {
    return tassign(state, {
        state: 'out'
    });
};
const stateIn = (state: IQrReducer, action: IAction<any>): IQrReducer => {
    return tassign(state, {
        state: 'in'
    });
};
export const RDX_QR_STATE_OUT = 'RDX_QR_STATE_OUT';
export const RDX_QR_STATE_IN = 'RDX_QR_STATE_IN';
export const qrReducer = (state: IQrReducer = qrInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_QR_STATE_IN: return stateIn(state, action);
        case RDX_QR_STATE_OUT: return stateOut(state, action);
        default: return state;
    }
};