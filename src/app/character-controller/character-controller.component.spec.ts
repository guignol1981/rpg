import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterControllerComponent } from './character-controller.component';

describe('CharacterControllerComponent', () => {
  let component: CharacterControllerComponent;
  let fixture: ComponentFixture<CharacterControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
