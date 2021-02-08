import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraptionComponent } from './contraption.component';

describe('ContraptionComponent', () => {
  let component: ContraptionComponent;
  let fixture: ComponentFixture<ContraptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContraptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
