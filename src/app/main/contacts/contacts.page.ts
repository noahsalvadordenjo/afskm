import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { RDX_CONTACTS_FETCH_CONTACT_ERROR, RDX_CONTACTS_IS_ADDRESS } from 'src/app/redux/contacts/reducer';
import { transformFromAboveEnter } from 'src/app/animations/animator';
import { RDX_CONTACTS_ANIMATION_RESET, RDX_CONTACTS_ANIMATION_IS_CONTACTS_TRUE } from 'src/app/redux/contacts-animation/reducer';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';
import { RDX_QR_STATE_OUT, RDX_QR_STATE_IN } from 'src/app/redux/qr/reducer';
import { Platform } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
  animations: [
    transformFromAboveEnter
  ]
})
export class ContactsPage implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.contactsAnimation.isContacts) isContacts;
  @select((s: IReduxState) => s.contacts.contacts) contacts;
  address: string;
  qrSub: SubscriptionLike;
  constructor(
    public platform: Platform,
    private qrScanner: QRScanner,
    private ngRedux: NgRedux<IReduxState>
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.ngRedux.dispatch({ type: RDX_QR_STATE_IN });
      this.qrSub.unsubscribe();
    });
   }

  ngOnInit() {
    this.ngRedux.select((s: IReduxState) => s.router).subscribe(res => {
      if(res === '/main/contacts') {
        this.ngRedux.dispatch<IAction<any>>({
          type: RDX_CONTACTS_ANIMATION_IS_CONTACTS_TRUE,
          component: 'contacts'
        });
      } else {
        this.ngRedux.dispatch<IAction<any>>({
          type: RDX_CONTACTS_ANIMATION_RESET,
          component: 'contacts'
        });
      }
    });
  }
  search(ev) {
    if(ev.detail.value.length > 0) {
      this.ngRedux.dispatch<IAction<any>>({
        type: RDX_CONTACTS_IS_ADDRESS,
        component: 'contacts',
        payload: ev.detail.value
      });
    }
  }
  scan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.innerScan();
      } else {
        this.innerScan();
      }
    }).catch(err => console.log('got error', err));
  }
  innerScan() {
    this.qrScanner.show();
    this.ngRedux.dispatch({ type: RDX_QR_STATE_OUT });
    this.qrSub = this.qrScanner.scan().subscribe((text: string) => {
      this.qrScanner.hide();
      this.address = text;
      this.ngRedux.dispatch({ type: RDX_QR_STATE_IN });
    }, (err) => {
      console.log(err);
    });
  }
  ngOnDestroy() {
    this.qrSub.unsubscribe();
  }
}
