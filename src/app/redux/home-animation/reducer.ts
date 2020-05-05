import { IAction } from '../combiner';
import { tassign } from 'tassign';
import { delay, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable-es6-compat';
import { RDX_HOME_ANIMATION_LEFT_ONE, RDX_HOME_ANIMATION_LEFT_TWO, RDX_HOME_ANIMATION_LEFT_THREE, RDX_HOME_ANIMATION_RIGHT_ONE, RDX_HOME_ANIMATION_RIGHT_TWO, RDX_HOME_ANIMATION_RIGHT_THREE, RDX_HOME_ANIMATION_IS_LOGIN_CLICKED_TRUE, RDX_HOME_ANIMATION_IS_REGISTER_CLICKED_TRUE, RDX_HOME_IS_HOME_TRUE, RDX_HOME_IS_REGISTER_CLICKED_FALSE } from './actions';
import { RDX_REGISTER_ANIMATION_IS_EMAIL_FORM_FIELD_TRUE } from '../register-animation/actions';
import { RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE } from '../login-animation/reducer';

export interface IHomeAnimationReducer {
    loginState: string;
    isRegister: boolean;
    isLogin: boolean;
    registerState: string;
    isLoginClicked: boolean;
    isRegisterClicked: boolean;
    isHome: boolean;
}
export const homeAnimationInitial: IHomeAnimationReducer = {
    isRegister: false,
    isLogin: true,
    registerState: '',
    loginState: 'in',
    isLoginClicked: false,
    isRegisterClicked: false,
    isHome: true
};
const leftOne = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
    if (state.isLogin) {
      return tassign(state, {
        loginState: 'left'
      });
    } else {
      return tassign(state, {
        registerState: 'left'
      });
    }
};
const leftTwo = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
    if (state.isLogin) {
      return tassign(state, {
        isLogin: false,
        registerState: 'right',
        isRegister: true
      });
    } else {
      return tassign(state, {
        isLogin: true,
        loginState: 'right',
        isRegister: false
      });
    }
};
const leftThree = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
    if (!state.isLogin) {
      return tassign(state, {
        registerState: 'in'
      });
    } else {
      return tassign(state, {
        loginState: 'in'
      });
    }
};
const rightOne = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
  console.log(state.isLogin);
  if (state.isLogin) {
      return tassign(state, {
        loginState: 'right'
      });
    } else {
      return tassign(state, {
        registerState: 'right'
      });
    }
};
const rightTwo = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
    if (state.isLogin) {
      return tassign(state, {
        isLogin: false,
        registerState: 'left',
        isRegister: true
      });
    } else {
      return tassign(state, {
        isLogin: true,
        loginState: 'left',
        isRegister: false
      });
    }
};
const rightThree = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
    if (!state.isLogin) {
      return tassign(state, {
        registerState: 'in'
      });
    } else {
      return tassign(state, {
        loginState: 'in'
      });
    }
};
const isLoginClickedTrue = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
  return tassign(state, {
    isLoginClicked: true,
    isHome: false,
  });
};
const isRegisterClickedTrue = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
  return tassign(state, {
    isRegisterClicked: true,
    isHome: false
  });
};
const isHomeTrue = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
  return tassign(state, {
    isHome: true,
    isLoginClicked: false,
    isRegisterClicked: false
  });
};
const isRegisterClickedFalse = (state: IHomeAnimationReducer, action: IAction<any>): IHomeAnimationReducer => {
  return tassign(state, {
    isRegisterClicked: false
  });
};
export const homeAnimationReducer = (state: IHomeAnimationReducer = homeAnimationInitial, action: IAction<any>) => {
    switch (action.type) {
        case RDX_HOME_ANIMATION_LEFT_ONE: return leftOne(state, action);
        case RDX_HOME_ANIMATION_LEFT_TWO: return leftTwo(state, action);
        case RDX_HOME_ANIMATION_LEFT_THREE: return leftThree(state, action);
        case RDX_HOME_ANIMATION_RIGHT_ONE: return rightOne(state, action);
        case RDX_HOME_ANIMATION_RIGHT_TWO: return rightTwo(state, action);
        case RDX_HOME_ANIMATION_RIGHT_THREE: return rightThree(state, action);
        case RDX_HOME_ANIMATION_IS_LOGIN_CLICKED_TRUE: return isLoginClickedTrue(state, action);
        case RDX_HOME_ANIMATION_IS_REGISTER_CLICKED_TRUE: return isRegisterClickedTrue(state, action);
        case RDX_HOME_IS_HOME_TRUE: return isHomeTrue(state, action);
        case RDX_HOME_IS_REGISTER_CLICKED_FALSE: return isRegisterClickedFalse(state, action);
        default: return state;
    }
};
export const homeAnimationEpicLeftOne = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_LEFT_ONE),
    delay(500),
    map(ac => {
      return {
        type: RDX_HOME_ANIMATION_LEFT_TWO,
        component: ac.component
      };
    }));
  };
export const homeAnimationEpicLeftTwo = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_LEFT_TWO),
    delay(250),
    map(ac => {
      return {
        type: RDX_HOME_ANIMATION_LEFT_THREE,
        component: ac.component
      };
    }));
};
export const homeAnimationEpicRightOne = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_RIGHT_ONE),
    delay(500),
    map(ac => {
      return {
        type: RDX_HOME_ANIMATION_RIGHT_TWO,
        component: ac.component
      };
    }));
};
export const homeAnimationEpicRightTwo = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
    return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_RIGHT_TWO),
    delay(250),
    map(ac => {
      return {
        type: RDX_HOME_ANIMATION_RIGHT_THREE,
        component: ac.component
      };
    }));
};
export const homeAnimationEpicIsRegisterClickedTrue = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
  return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_IS_REGISTER_CLICKED_TRUE),
  delay(500),
  map(ac => {
    return {
      type: RDX_REGISTER_ANIMATION_IS_EMAIL_FORM_FIELD_TRUE,
      component: ac.component
    };
  }));
};
export const homeAnimationEpicIsLoginClickedTrue = (action: Observable<IAction<any>>): Observable<IAction<any>> => {
  return action.pipe(filter(ac => ac.type === RDX_HOME_ANIMATION_IS_LOGIN_CLICKED_TRUE),
  delay(500),
  map(ac => {
    return {
      type: RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE,
      component: ac.component
    };
  }));
};
export const homeAnimationEpics = combineEpics(
  homeAnimationEpicRightOne,
  homeAnimationEpicRightTwo,
  homeAnimationEpicLeftOne,
  homeAnimationEpicLeftTwo,
  homeAnimationEpicIsRegisterClickedTrue,
  homeAnimationEpicIsLoginClickedTrue
);