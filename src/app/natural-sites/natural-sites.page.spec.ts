import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NaturalSitesPage } from './natural-sites.page';

describe('NaturalSitesPage', () => {
  let component: NaturalSitesPage;
  let fixture: ComponentFixture<NaturalSitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturalSitesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NaturalSitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
