import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSuccessPagePage } from './points-success-page.page';

describe('PointsSuccessPagePage', () => {
  let component: PointsSuccessPagePage;
  let fixture: ComponentFixture<PointsSuccessPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSuccessPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSuccessPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
