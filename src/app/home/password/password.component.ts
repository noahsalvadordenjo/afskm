import { Component, OnInit, OnDestroy } from '@angular/core';
import { transformFromAboveEnter, transformFromBelowEnter, opacityLeave } from 'src/app/animations/animator';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { select, NgRedux } from '@angular-redux/store';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { SubscriptionLike } from 'rxjs';
import { RDX_REGISTER_FETCH_PASSWORD_ERROR, RDX_REGISTER_FETCH_PASSWORD } from 'src/app/redux/register/reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  animations: [
    transformFromBelowEnter,
    opacityLeave
  ]
})
export class PasswordComponent implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.register.isFetchPassword) isFetchPassword;
  @select((s: IReduxState) => s.registerAnimation.isPasswordFormField) isPasswordFormField;
  @select((s: IReduxState) => s.register.fetchPasswordError) fetchPasswordError;
  passwordFormControl: FormControl;
  errorStateMatcher: MyErrorStateMatcher;
  password: string;
  isPasswordErrorSub: SubscriptionLike;
  isRouteAwaySub: SubscriptionLike;
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);
    this.isPasswordErrorSub = this.ngRedux.select((s: IReduxState) => s.register.isFetchPasswordError).subscribe(res => {
      if (res) {
        this.passwordFormControl.setErrors({ backend: true });
      }
    });
    this.isRouteAwaySub = this.ngRedux.select((s: IReduxState) => s.register.isRouteAway).subscribe(res => {
      if (res) {
        this.router.navigate(['/main/texts']);
      }
    })
  }
  submit() {
    if(!this.passwordFormControl.hasError('required') && !this.passwordFormControl.hasError('backend')) {
      this.ngRedux.dispatch<IAction<any>>({
        type: RDX_REGISTER_FETCH_PASSWORD,
        component: 'password',
        payload: this.password
      });
    }
  }
  ngOnDestroy() {
    this.isPasswordErrorSub.unsubscribe();
  }

}
