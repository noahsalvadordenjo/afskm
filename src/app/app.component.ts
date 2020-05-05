import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState } from './redux/combiner';
import { opacityState } from './animations/animator';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { RDX_CREDENTIALS_PLAYER_ID_SET } from './redux/credentials/reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    opacityState
  ]
})
export class AppComponent {
  @select((s: IReduxState) => s.qr.state) state;
  constructor(
    private ngRedux: NgRedux<IReduxState>,
    private oneSignal: OneSignal,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if(this.platform.is('capacitor')) {
      this.setUpPush();
    }
  }
  setUpPush() {
    this.oneSignal.startInit('a9f3548f-cb3b-4c39-bb80-a0a357e81374', 'nl.nachtstein.firefire');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
    });
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      const additionalData = data.notification.payload.additionalData;
    });
    this.oneSignal.endInit();
    this.oneSignal.getIds().then(
      ids => this.ngRedux.dispatch({ type: RDX_CREDENTIALS_PLAYER_ID_SET, payload: ids.userId, component: 'app' })
    );
  }
}
