import { IAction } from '../combiner'

export interface IErrorReducer {
}
export const errorInitial: IErrorReducer = {

};
export const RDX_ERROR_FETCH_ERROR = 'RDX_ERROR_FETCH_ERROR';
export const errorReducer = (state: IErrorReducer = errorInitial, action: IAction<any>): IErrorReducer => {
  switch (action.type) {
    default: return state;
  }
};
