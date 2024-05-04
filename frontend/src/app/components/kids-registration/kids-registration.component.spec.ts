import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsRegistrationComponent } from './kids-registration.component';

describe('KidsRegistrationComponent', () => {
  let component: KidsRegistrationComponent;
  let fixture: ComponentFixture<KidsRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KidsRegistrationComponent]
    });
    fixture = TestBed.createComponent(KidsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
