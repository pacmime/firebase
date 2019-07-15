import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagikComponent } from './magik.component';

describe('MagikComponent', () => {
  let component: MagikComponent;
  let fixture: ComponentFixture<MagikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
