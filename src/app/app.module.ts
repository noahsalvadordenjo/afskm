import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { reducers, initial, IReduxState } from './redux/combiner';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { homeAnimationEpics } from './redux/home-animation/reducer';
import { RegisterComponent } from './home/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { registerEpics } from './redux/register/reducer';
import { registerAnimationEpics } from './redux/register-animation/reducer';
import { loginEpicFetch, loginEpics } from './redux/login/reducer';
import { loginAnimationEpics } from './redux/login-animation/reducer';
import { credentialsEpics } from './redux/credentials/reducer';
import { profileEpics } from './redux/profile/reducer';
import { contactsEpics } from './redux/contacts/reducer';
import { textReducer, textEpics } from './redux/text/reducer';
import { textsEpics } from './redux/texts/reducer';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { anonymousEpics } from './redux/anonymous/reducer';
import { forgotEpics } from './redux/forgot/reducer';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgReduxModule,
    IonicModule.forRoot(),
    MatFormFieldModule,
    AppRoutingModule,
    NgxPageScrollCoreModule,
    BrowserAnimationsModule,
    NgReduxRouterModule.forRoot(),
  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IReduxState>, ngReduxRouter: NgReduxRouter, devtools: DevToolsExtension) {
    const epicMiddleWare = createEpicMiddleware();
    ngRedux.configureStore(reducers, initial, [epicMiddleWare], [devtools.enhancer()]);
    ngReduxRouter.initialize();
    epicMiddleWare.run(homeAnimationEpics);
    epicMiddleWare.run(registerEpics);
    epicMiddleWare.run(registerAnimationEpics);
    epicMiddleWare.run(loginEpics);
    epicMiddleWare.run(loginAnimationEpics);
    epicMiddleWare.run(credentialsEpics);
    epicMiddleWare.run(profileEpics);
    epicMiddleWare.run(contactsEpics);
    epicMiddleWare.run(textEpics);
    epicMiddleWare.run(textsEpics);
    epicMiddleWare.run(anonymousEpics);
    epicMiddleWare.run(forgotEpics);
  }
}
