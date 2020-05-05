import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextsPage } from './texts.page';

describe('TextsPage', () => {
  let component: TextsPage;
  let fixture: ComponentFixture<TextsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
