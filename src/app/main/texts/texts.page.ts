import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IReduxState, IAction } from 'src/app/redux/combiner';
import { Observable } from 'rxjs';
import { ITexts } from 'src/app/redux/interfaces';
import { List } from 'immutable';
import { RDX_TEXTS_TEXTS_TEXTS, RDX_TEXTS_TEXTS } from 'src/app/redux/texts/reducer';
import { transformFromAboveEnter, transformFromAboveState } from 'src/app/animations/animator';
import { RDX_TEXT_ANIMATION_RESET } from 'src/app/redux/texts-animation/reducer';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.page.html',
  styleUrls: ['./texts.page.scss'],
  animations: [
    transformFromAboveState,
    transformFromAboveEnter
  ]
})
export class TextsPage implements OnInit, OnDestroy {
  @select((s: IReduxState) => s.texts.texts) texts: Observable<List<ITexts>>;
  @select((s: IReduxState) => s.textAnimation.isTexts) isTexts;
  constructor(private ngRedux: NgRedux<IReduxState>) { }
  ngOnInit() {
    this.ngRedux.select((s: IReduxState) => s.router).subscribe(res => {
      if (res === '/main/texts') {
        this.ngRedux.dispatch<IAction<any>>({
          type: RDX_TEXTS_TEXTS,
          component: 'texts',
        });
      } else {
        this.ngRedux.dispatch<IAction<any>>({
          type: RDX_TEXT_ANIMATION_RESET,
          component: 'texts'
        });
      }
    });
  }
  ngOnDestroy() {
  }

}
