import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTravelComponent } from './information-travel.component';

describe('InformationTravelComponent', () => {
  let component: InformationTravelComponent;
  let fixture: ComponentFixture<InformationTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTravelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
