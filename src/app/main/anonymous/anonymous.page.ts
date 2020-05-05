import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IRegisterReducer } from 'src/app/redux/register/reducer';
import { IReduxState } from 'src/app/redux/combiner';
import { RDX_ANONYMOUS_TEXTS } from 'src/app/redux/anonymous/reducer';
import { transformFromAboveEnter } from 'src/app/animations/animator';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.page.html',
  styleUrls: ['./anonymous.page.scss'],
  animations: [
    transformFromAboveEnter
  ]
})
export class AnonymousPage implements OnInit {
  @select((s: IReduxState) => s.anonymous.texts) texts;
  constructor(
    private ngRedux: NgRedux<IReduxState>
  ) { }

  ngOnInit() {
    this.ngRedux.select((s: IReduxState) => s.router).subscribe(res => {
      if (res === '/main/anonymous') {
        this.ngRedux.dispatch({ type: RDX_ANONYMOUS_TEXTS, component: 'anonymous' });
      }
    });
  }

}
