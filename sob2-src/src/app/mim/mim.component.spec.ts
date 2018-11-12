import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MimComponent } from './mim.component';

describe('MimComponent', () => {
  let component: MimComponent;
  let fixture: ComponentFixture<MimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
