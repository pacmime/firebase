import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebagComponent } from './sidebag.component';

describe('SidebagComponent', () => {
  let component: SidebagComponent;
  let fixture: ComponentFixture<SidebagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
