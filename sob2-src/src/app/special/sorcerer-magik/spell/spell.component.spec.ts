import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementalMagikSpellComponent } from './spell.component';

describe('ElementalMagikSpellComponent', () => {
  let component: ElementalMagikSpellComponent;
  let fixture: ComponentFixture<ElementalMagikSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementalMagikSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementalMagikSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
