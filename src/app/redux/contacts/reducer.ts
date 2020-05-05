import { IAction } from '../combiner';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import Axios, { AxiosError } from 'axios';
import { URL_BACKEND_NODEJS } from '../urls';
import { combineEpics } from 'redux-observable-es6-compat';
import { List } from 'immutable';
import { tassign } from 'tassign';
interface IContact {
    username: string;
    address: string;
}
export interface IContactsReducer {
    contacts: List<IContact>;
}
export const contactsInitial: IContactsReducer = {
    contacts: List()
};
const contactsSuccess = (state: IContactsReducer, action: IAction<any>): IContactsReducer => {
    return tassign(state, {
        contacts: List(action.payload)
    });
};
export const RDX_CONTACTS_IS_ADDRESS = 'RDX_CONTACTS_IS_ADDRESS';
export const RDX_CONTACTS_IS_ADDRESS_SUCCESS = 'RDX_CONTACTS_IS_ADDRESS_SUCCESS';
export const RDX_CONTACTS_IS_ADDRESS_ERROR = 'RDX_CONTACTS_IS_ADDRESS_ERROR';
export const RDX_CONTACTS_FETCH_CONTACT_SUCCESS = 'RDX_CONTACTS_FETCH_CONTACT_SUCCESS';
export const RDX_CONTACTS_FETCH_CONTACT_ERROR = 'RDX_CONTACTS_FETCH_CONTACT_ERROR';
export const RDX_CONTACTS_CONTACTS = 'RDX_CONTACTS_CONTACTS';
export const RDX_CONTACTS_CONTACTS_SUCCESS = 'RDX_CONTACTS_CONTACTS_SUCCESS';
export const RDX_CONTACTS_CONTACTS_ERROR = 'RDX_CONTACTS_CONTACTS_ERROR';

export const contactsReducer = (state: IContactsReducer = contactsInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_CONTACTS_CONTACTS_SUCCESS: return contactsSuccess(state, action);
        default: return state;
    }
};
export const contactsEpicIsAddress = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_CONTACTS_IS_ADDRESS),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/common/is-address/' + ac.payload, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_CONTACTS_IS_ADDRESS_SUCCESS,
            component: ac.component,
            payload: ac.payload
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_CONTACTS_IS_ADDRESS_ERROR,
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
export const contactsEpicIsAddressSuccess = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_CONTACTS_IS_ADDRESS_SUCCESS),
    switchMap(ac => Axios.post(URL_BACKEND_NODEJS + '/api/contacts/fetch-contact', {
        address: state.value.profile.atm,
        contact: ac.payload
    }, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_CONTACTS_FETCH_CONTACT_SUCCESS,
            component: ac.component
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_CONTACTS_FETCH_CONTACT_ERROR,
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
export const contactsEpicContacts = (action: Observable<IAction<any>>, state): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_CONTACTS_CONTACTS || ac.type === RDX_CONTACTS_FETCH_CONTACT_SUCCESS),
    switchMap(ac => Axios.get(URL_BACKEND_NODEJS + '/api/contacts/get-contacts/' + state.value.profile.atm, {
        headers: {
            'x-auth-token': state.value.credentials.token
        }
    }).then(res => {
        return {
            type: RDX_CONTACTS_CONTACTS_SUCCESS,
            component: ac.component,
            payload: res.data
        };
    }).catch((err: AxiosError) => {
        return {
            type: RDX_CONTACTS_CONTACTS_ERROR,
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
export const contactsEpics = combineEpics(
    contactsEpicIsAddress,
    contactsEpicIsAddressSuccess,
    contactsEpicContacts
);