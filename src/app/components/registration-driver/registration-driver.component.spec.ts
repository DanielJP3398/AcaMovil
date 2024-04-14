import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDriverComponent } from './registration-driver.component';

describe('RegistrationDriverComponent', () => {
  let component: RegistrationDriverComponent;
  let fixture: ComponentFixture<RegistrationDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
