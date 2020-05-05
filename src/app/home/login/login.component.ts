import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { transformFromAboveEnter, transformFromBelowEnter, transformToLeftLeave, transformToRightLeave, sizeEnter, opacityLeave } from 'src/app/animations/animator';
import { RDX_LOGIN_ANIMATION_IS_LOGIN_TRUE } from 'src/app/redux/login-animation/reducer';
import { RDX_LOGIN_FETCH } from 'src/app/redux/login/reducer';
import { SubscriptionLike, Subscribable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    transformFromBelowEnter,
    transformFromAboveEnter,
    transformToLeftLeave,
    transformToRightLeave,
    sizeEnter,
    opacityLeave
  ]
})
export class LoginComponent implements OnInit {
  @select((s: IReduxState) => s.loginAnimation.isLogin) isLogin;
  errorStateMatcher: ErrorStateMatcher;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  email: string;
  password: string;
  loginErrorSub: SubscriptionLike;
  routeAwaySub: SubscriptionLike;
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required
    ]);
    this.loginErrorSub = this.ngRedux.select((s: IReduxState) => s.login.isLoginError).subscribe(res => {
      if(res) {
        this.emailFormControl.setErrors({ backend: true });
        this.passwordFormControl.setErrors({ backend: true });
      }
    });
    this.routeAwaySub = this.ngRedux.select((s: IReduxState) => s.loginAnimation.isRouteAway).subscribe(res => {
      if(res) {
        this.router.navigate(['/main/texts']);
      }
    })
  }
  login() {
    this.ngRedux.dispatch<IAction<any>>({ 
      type: RDX_LOGIN_FETCH,
      component: 'login',
      payload: {
        email: this.email,
        password: this.password,
      }
    });
  }
}
