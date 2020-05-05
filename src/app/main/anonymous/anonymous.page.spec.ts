import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnonymousPage } from './anonymous.page';

describe('AnonymousPage', () => {
  let component: AnonymousPage;
  let fixture: ComponentFixture<AnonymousPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonymousPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnonymousPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
