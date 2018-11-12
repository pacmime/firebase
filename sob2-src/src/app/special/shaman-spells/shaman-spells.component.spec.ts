import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShamanSpellsComponent } from './shaman-spells.component';

describe('ShamanSpellsComponent', () => {
  let component: ShamanSpellsComponent;
  let fixture: ComponentFixture<ShamanSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShamanSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShamanSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
