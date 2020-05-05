import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/error/error-state-matcher';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { Observable, SubscriptionLike } from 'rxjs';
import { List } from 'immutable';
import { INumberPrefix } from 'src/app/redux/phonenumber-prefix/interfaces';
import { RDX_REGISTER_FETCH_PHONENUMBER } from 'src/app/redux/register/reducer';
import { RDX_PHONENUMBER_PREFIX_RESET, RDX_PHONENUMBER_PREFIX_SELECTED_PHONENUMBER_PREFIX_SET } from 'src/app/redux/phonenumber-prefix/reducer';
import { transformFromBelowEnter } from 'src/app/animations/animator';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss'],
  animations: [
    transformFromBelowEnter
  ]
})
export class PhonenumberComponent implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.phonenumberPrefix.phonenumberPrefixes) phonenumberPrefixes: Observable<List<INumberPrefix>>;
  @select((s: IReduxState) => s.phonenumberPrefix.selectedPhonenumberPrefix) selectedPhonenumberPrefix: Observable<INumberPrefix>;
  @select((s: IReduxState) => s.registerAnimation.isVerificationCode) isVerificationCode;
  @select((s: IReduxState) => s.registerAnimation.isPhonenumberFormField) isPhonenumberFormField;
  @select((s: IReduxState) => s.register.fetchPhonenumberError) fetchPhonenumberError;
  phonenumberFormControl: FormControl;
  errorStateMatcher: MyErrorStateMatcher;
  phonenumber: number;
  component = 'phonenumber';
  isPhonenumberErrorSub: SubscriptionLike;
  constructor(
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.phonenumberFormControl = new FormControl('', [
      Validators.required
    ]);
    this.errorStateMatcher = new MyErrorStateMatcher();
    this.isPhonenumberErrorSub = this.ngRedux.select((s: IReduxState) => s.register.isFetchPhonenumberError).subscribe(res => {
      if (res) {
        this.phonenumberFormControl.setErrors({ backend: true });
      }
    }) 
  }
  submit() {
    this.ngRedux.dispatch<IAction<any>>({
      type: RDX_REGISTER_FETCH_PHONENUMBER,
      component: this.component,
      payload: this.phonenumber
    }); 
  }
  prefix(pf) {
    this.ngRedux.dispatch<IAction<any>>({
      type: RDX_PHONENUMBER_PREFIX_SELECTED_PHONENUMBER_PREFIX_SET,
      component: this.component,
      payload: pf
    });
  }
  ngOnDestroy() {
    this.isPhonenumberErrorSub.unsubscribe();
  }

}
