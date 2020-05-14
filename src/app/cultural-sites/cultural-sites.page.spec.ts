import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CulturalSitesPage } from './cultural-sites.page';

describe('CulturalSitesPage', () => {
  let component: CulturalSitesPage;
  let fixture: ComponentFixture<CulturalSitesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulturalSitesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CulturalSitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
