import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRequestsComponent } from './verify-requests.component';

describe('VerifyRequestsComponent', () => {
  let component: VerifyRequestsComponent;
  let fixture: ComponentFixture<VerifyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
