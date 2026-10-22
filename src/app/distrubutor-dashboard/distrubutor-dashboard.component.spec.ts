import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrubutorDashboardComponent } from './distrubutor-dashboard.component';

describe('DistrubutorDashboardComponent', () => {
  let component: DistrubutorDashboardComponent;
  let fixture: ComponentFixture<DistrubutorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrubutorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrubutorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
