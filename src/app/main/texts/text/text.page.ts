import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { NgRedux, select } from '@angular-redux/store';
import { RDX_PROFILE_USERNAME } from 'src/app/redux/profile/reducer';
import { RDX_TEXT_USERNAME, RDX_TEXT_FETCH_TEXT, RDX_TEXT_TEXTS, RDX_TEXT_BLOCK, RDX_TEXT_IS_BLOCKED } from 'src/app/redux/text/reducer';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { RDX_TEXTS_TEXTS } from 'src/app/redux/texts/reducer';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { transformFromAboveEnter, transformFromBelowEnter } from 'src/app/animations/animator';
@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
  animations: [
    transformFromAboveEnter,
    transformFromBelowEnter
  ]
})
export class TextPage implements OnInit, AfterViewInit {
  @select((s: IReduxState) => s.text.texts) texts;
  @select((s: IReduxState) => s.text.username) username;
  @select((s: IReduxState) => s.text.isBlocked) isBlocked;
  @select((s: IReduxState) => s.text.isFetchText) isFetchText;
  @select((s: IReduxState) => s.text.fetchTextError) fetchTextError;
  address: string;
  text: string;
  errorStateMatcher: MyErrorStateMatcher;
  textFormControl: FormControl;
  anonymous = false;
  component = 'text';
  constructor(
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private ngRedux: NgRedux<IReduxState>,
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.textFormControl = new FormControl('', [
      Validators.required
    ]);
    this.activatedRoute.paramMap.subscribe(res => {
      this.address = res.get('address');
    });
    this.ngRedux.select((s: IReduxState) => s.text.isBlocked).subscribe(res => {
      this.textFormControl = new FormControl({ value: '', disabled: res });
    });
    this.ngRedux.select((s: IReduxState) => s.text.isFetchTextError).subscribe(res => {
      if(res) {
        this.textFormControl.setErrors({ backend: true });
      }
    })
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_TEXT_IS_BLOCKED, payload: this.address, component: this.component });
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_TEXT_USERNAME, component: this.component, payload: this.address });
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_TEXT_TEXTS, component: this.component, payload: {
      repeat: true,
      reciever: this.address
    } });
  }
  ngAfterViewInit() {
  }
  send() {
    console.log('anonymous', this.anonymous);
    if(!this.textFormControl.hasError('required')) {
      this.ngRedux.dispatch<IAction<any>>({
        type: RDX_TEXT_FETCH_TEXT,
        component: 'texts',
        payload: {
          reciever: this.address,
          text: this.text,
          anonymous: this.anonymous
        }
      });
    }
  }
  async block() {
    const alert = await this.alertCtrl.create({
      message: 'Would you like to block this person?',
      buttons: [
        {
          text: 'yes',
          handler: () => this.ngRedux.dispatch({ type: RDX_TEXT_BLOCK, component: this.component, payload: this.address })
        },
        {
          text: 'no'
        }
      ]
    });
    await alert.present();
  }

}
