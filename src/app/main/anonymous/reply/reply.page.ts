import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { NgRedux, select } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { RDX_ANONYMOUS_FETCH_REPLY, RDX_ANONYMOUS_FETCH_BLOCK } from 'src/app/redux/anonymous/reducer';
import { RDX_TEXT_BLOCK } from 'src/app/redux/text/reducer';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {
  @select((s: IReduxState) => s.anonymous.isFetchReply) isFetchReply;
  index: number;
  errorStateMatcher: MyErrorStateMatcher;
  messageFormControl: FormControl;
  text: string;
  constructor(
    private alertCntrl: AlertController,
    private ngRedux: NgRedux<IReduxState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.messageFormControl = new FormControl('', [
      Validators.required
    ]);
    this.activatedRoute.paramMap.subscribe(res => {
      this.index = parseInt(res.get('index'));
    });
  }
  send() {
    if (!this.messageFormControl.hasError('required')) {
      this.ngRedux.dispatch<IAction<any>>({ type: RDX_ANONYMOUS_FETCH_REPLY, component: 'reply', payload: {
        index: this.index,
        text: this.text
      }});
    }
  }
  async block() {
    const alert = await this.alertCntrl.create({
      message: 'Would you like to block this person?',
      buttons: [
        {
          text: 'YES',
          handler: () => this.ngRedux.dispatch({ type: RDX_ANONYMOUS_FETCH_BLOCK, component: 'reply', payload: this.index })
        },
        {
          text: 'NO'
        }
      ]
    });
    await alert.present();
  }

}
