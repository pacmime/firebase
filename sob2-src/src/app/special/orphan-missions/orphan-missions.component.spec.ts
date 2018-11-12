import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanMissionsComponent } from './orphan-missions.component';

describe('OrphanMissionsComponent', () => {
  let component: OrphanMissionsComponent;
  let fixture: ComponentFixture<OrphanMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphanMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphanMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
