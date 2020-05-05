import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { RDX_REGISTER_FETCH_MAIL } from 'src/app/redux/register/reducer';
import { SubscriptionLike } from 'rxjs';
import { transformFromBelowEnter } from 'src/app/animations/animator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    transformFromBelowEnter
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.register.isFetchMail) isFetchMail;
  @select((s: IReduxState) => s.register.fetchMailError) fetchMailError;
  @select((s: IReduxState) => s.registerAnimation.isEmailFormField) isEmailFormField;
  emailFormControl: FormControl;
  errorStateMatcher: MyErrorStateMatcher;
  email: string;
  fetchEmailSub: SubscriptionLike;
  sub
  constructor(
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.fetchEmailSub = this.ngRedux.select((s: IReduxState) => s.register.isFetchMailError).subscribe(res => {
      if (res) {
        this.emailFormControl.setErrors({ backend: true });
      }
    })
  }
  submit() {
    this.ngRedux.dispatch<IAction<any>>({
      type: RDX_REGISTER_FETCH_MAIL,
      payload: this.email,
      component: 'register'
    });
  }
  ngOnDestroy() {
    this.fetchEmailSub.unsubscribe();
  }

}
