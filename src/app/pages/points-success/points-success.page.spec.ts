import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSuccessPage } from './points-success.page';

describe('PointsSuccessPage', () => {
  let component: PointsSuccessPage;
  let fixture: ComponentFixture<PointsSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
