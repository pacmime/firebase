import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamblerTricksComponent } from './gambler-tricks.component';

describe('GamblerTricksComponent', () => {
  let component: GamblerTricksComponent;
  let fixture: ComponentFixture<GamblerTricksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamblerTricksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamblerTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
