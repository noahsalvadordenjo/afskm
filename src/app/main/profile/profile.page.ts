import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { RDX_PROFILE_FETCH_USERNAME } from 'src/app/redux/profile/reducer';
import { FormControl } from '@angular/forms';
import { transformFromBelowEnter, sizeEnter } from 'src/app/animations/animator';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  animations: [
    transformFromBelowEnter,
    sizeEnter
  ]
})
export class ProfilePage implements OnInit {
  @select((s: IReduxState) => s.profile.atm) atm;
  @select((s: IReduxState) => s.profile.isFetchUsername) isFetchUsername;
  @select((s: IReduxState) => s.profile.isUsername) isUsername;
  username: string;
  usernameFormControl: FormControl;
  atmCode: string;
  constructor(
    private toastCtrl: ToastController,
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.ngRedux.select((s: IReduxState) => s.profile.username).subscribe(res => this.username = res);
    this.ngRedux.select((s: IReduxState) => s.profile.atm).subscribe(res => this.atmCode = res);
  }
  change() {
    this.ngRedux.dispatch<IAction<any>>({
      type: RDX_PROFILE_FETCH_USERNAME,
      component: 'profile',
      payload: this.username
    });
  }
  async copy() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.atmCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    const toast = await this.toastCtrl.create({
      message: 'copied',
      duration: 1500
    });
    await toast.present();
  }
  onClick() {
    
  }

}
