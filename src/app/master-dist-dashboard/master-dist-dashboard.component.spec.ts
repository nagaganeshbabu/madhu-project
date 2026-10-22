import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDistDashboardComponent } from './master-dist-dashboard.component';

describe('MasterDistDashboardComponent', () => {
  let component: MasterDistDashboardComponent;
  let fixture: ComponentFixture<MasterDistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDistDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterDistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
