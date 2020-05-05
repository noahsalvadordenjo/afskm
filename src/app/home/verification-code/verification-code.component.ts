import { Component, OnInit } from '@angular/core';
import { transformFromAboveEnter } from 'src/app/animations/animator';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RDX_REGISTER_FETCH_VERIFCATION_CODE } from 'src/app/redux/register/reducer';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  animations: [
    transformFromAboveEnter
  ]
})
export class VerificationCodeComponent implements OnInit {
  @select((s: IReduxState) => s.registerAnimation.isVerificationCode) isVerificationCode;
  @select((s: IReduxState) => s.register.fetchPhonenumberError) fetchPhonenumberError;
  @select((s: IReduxState) => s.register.fetchVerificationCodeError) fetchVerificationCodeError;
  verificationCodeFormControl: FormControl;
  errorStateMatcher: ErrorStateMatcher;
  verification: string;
  constructor(private ngRedux: NgRedux<IReduxState>) { }

  ngOnInit() {
    this.verificationCodeFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  submit() {
    this.ngRedux.dispatch<IAction<any>>({ 
      type: RDX_REGISTER_FETCH_VERIFCATION_CODE, 
      component: 'verification',
      payload: this.verification
    });
  }

}
