import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharlistComponent } from './charlist.component';

describe('CharlistComponent', () => {
  let component: CharlistComponent;
  let fixture: ComponentFixture<CharlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
