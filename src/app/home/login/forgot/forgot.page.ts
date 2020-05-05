import { Component, OnInit } from '@angular/core';
import { transformFromBelowEnter } from 'src/app/animations/animator';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { NgRedux, select } from '@angular-redux/store';
import { RDX_FORGOT_FETCH } from 'src/app/redux/forgot/reducer';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  animations: [
    transformFromBelowEnter
  ]
})
export class ForgotPage implements OnInit {
  @select((s: IReduxState) => s.forgot.isFetch) isFetch;
  email: string;
  errorStateMatcher: MyErrorStateMatcher;
  emailFormControl: FormControl;
  constructor(
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }
  submit() {
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_FORGOT_FETCH, payload: this.email, component: 'forgot' });
  }

}
