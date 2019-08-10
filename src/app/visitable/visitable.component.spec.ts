import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitableComponent } from './visitable.component';

describe('VisitableComponent', () => {
  let component: VisitableComponent;
  let fixture: ComponentFixture<VisitableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
