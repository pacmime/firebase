import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamuraiTacticsComponent } from './samurai-tactics.component';

describe('SamuraiTacticsComponent', () => {
  let component: SamuraiTacticsComponent;
  let fixture: ComponentFixture<SamuraiTacticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamuraiTacticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamuraiTacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
