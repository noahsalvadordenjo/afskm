import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { transformFromAboveEnter, slide, transformFromBelowEnter, sizeEnter } from '../animations/animator';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from '../redux/combiner';
import { AnimationBuilder, animate, style } from '@angular/animations';
import { SubscriptionLike, Subscribable } from 'rxjs';
import { RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE, RDX_REGISTER_ANIMATION_IS_PHONENUMBER_TRUE, RDX_REGISTER_ANIMATION_IS_PASSWORD_TRUE } from '../redux/register-animation/actions';
import { RDX_HOME_ANIMATION_IS_LOGIN_CLICKED_TRUE, RDX_HOME_IS_HOME_TRUE, RDX_HOME_ANIMATION_IS_REGISTER_CLICKED_TRUE, RDX_HOME_ANIMATION_RIGHT_ONE, RDX_HOME_ANIMATION_LEFT_ONE } from '../redux/home-animation/actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    transformFromAboveEnter,
    slide,
    transformFromBelowEnter,
    sizeEnter
  ]
})
export class HomePage implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.homeAnimation.isLogin) isLogin;
  @select((s: IReduxState) => s.homeAnimation.isRegister) isRegister;
  @select((s: IReduxState) => s.homeAnimation.loginState) loginState;
  @select((s: IReduxState) => s.homeAnimation.registerState) registerState;
  @select((s: IReduxState) => s.homeAnimation.isLoginClicked) isLoginClicked;
  @select((s: IReduxState) => s.homeAnimation.isRegisterClicked) isRegisterClicked;
  @select((s: IReduxState) => s.homeAnimation.isHome) isHome;
  @select((s: IReduxState) => s.registerAnimation.isConfirm) isConfirm;
  @select((s: IReduxState) => s.registerAnimation.isPhonenumber) isPhonenumber;
  @select((s: IReduxState) => s.registerAnimation.isPassword) isPassword;
  @select((s: IReduxState) => s.registerAnimation.isConfirmText) isConfirmText;
  @ViewChild('confirmElement', { static: false }) confirmElement: ElementRef;
  @ViewChild('phonenumberElement', { static: false }) phonenumberElement: ElementRef;
  @ViewChild('loginElement', { static: false }) loginElement: ElementRef;
  @ViewChild('registerElement', { static: false }) registerElement: ElementRef;
  @ViewChild('aschadvescher', { static: false }) aschadvescher: ElementRef;
  isEmailSlideAwaySub: SubscriptionLike;
  isConfirmSlideAwaySub: SubscriptionLike;
  isPhonenumberVerificationCodeSlideAwaySub: SubscriptionLike;
  home = 'home';
  constructor(
    private animationBuilder: AnimationBuilder,
    private ngRedux: NgRedux<IReduxState>
  ) {}
  animation = this.animationBuilder.build([
    style({
      transform: 'translateY(0)'
    }), animate(500, style({
      transform: 'translateY(100%)'
    }))
  ]);
  ngOnInit() {
    this.isEmailSlideAwaySub = this.ngRedux.select((s: IReduxState) => s.registerAnimation.isEmailSlideAway).subscribe(res => {
      if (res) {
        const registerPlayer = this.animation.create(this.registerElement.nativeElement);
        registerPlayer.play();
        registerPlayer.onDone(() => {
          this.ngRedux.dispatch<IAction<any>>({ type: RDX_REGISTER_ANIMATION_IS_CONFIRM_TRUE, component: this.home });
        });
      }
    });
    this.isConfirmSlideAwaySub = this.ngRedux.select((s: IReduxState) => s.registerAnimation.isConfirmSlideAway).subscribe(res => {
      if (res) {
        const passwordPlayer = this.animation.create(this.confirmElement.nativeElement);
        passwordPlayer.play();
        passwordPlayer.onDone(() => {
          this.ngRedux.dispatch<IAction<any>>({ type: RDX_REGISTER_ANIMATION_IS_PASSWORD_TRUE, component: this.home });
        });
      }
    });
  }
  login() {
    const animation = this.animationBuilder.build([
      style({
        transform: 'translateY(0)'
      }), animate(500, style({
        transform: 'translateY(100%)'
      }))
    ]);
    const loginPlayer = animation.create(this.aschadvescher.nativeElement);
    loginPlayer.play();
    loginPlayer.onDone(() => {
      loginPlayer.reset();
      this.ngRedux.dispatch({ type: RDX_HOME_ANIMATION_IS_LOGIN_CLICKED_TRUE });
    });
  }
  backFromLogin() {
    const animation = this.animationBuilder.build([
      style({
        transform: 'translateY(0)'
      }), animate(500, style({
        transform: 'translateY(-100%)'
      }))
    ]);
    const backPlayer = animation.create(this.loginElement.nativeElement);
    backPlayer.play();
    backPlayer.onDone(() => {
      backPlayer.reset();
      this.ngRedux.dispatch<IAction<any>>({ type: RDX_HOME_IS_HOME_TRUE, component: this.home });
    });
  }
  backFromRegister() {
    const animation = this.animationBuilder.build([
      style({
        transform: 'translateY(0)'
      }), animate(500, style({
        transform: 'translateY(-100%)'
      }))
    ]);
    const backPlayer = animation.create(this.registerElement.nativeElement);
    backPlayer.play();
    backPlayer.onDone(() => {
      backPlayer.reset();
      this.ngRedux.dispatch<IAction<any>>({ type: RDX_HOME_IS_HOME_TRUE, component: this.home });
    });
  }
  register() {
    const animation = this.animationBuilder.build([
      style({
        transform: 'translateY(0)'
      }), animate(500, style({
        transform: 'translateY(100%)'
      }))
    ]);
    const registerPlayer = animation.create(this.aschadvescher.nativeElement);
    registerPlayer.play();
    registerPlayer.onDone(() => {
      registerPlayer.reset();
      this.ngRedux.dispatch<IAction<any>>({ type: RDX_HOME_ANIMATION_IS_REGISTER_CLICKED_TRUE, component: this.home });
    });
  }
  onRight() {
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_HOME_ANIMATION_RIGHT_ONE, component: this.home });
  }
  onLeft() {
    this.ngRedux.dispatch<IAction<any>>({ type: RDX_HOME_ANIMATION_LEFT_ONE, component: this.home });
  }
  ngOnDestroy() {
    this.isEmailSlideAwaySub.unsubscribe();
    this.isConfirmSlideAwaySub.unsubscribe();
  }
}
