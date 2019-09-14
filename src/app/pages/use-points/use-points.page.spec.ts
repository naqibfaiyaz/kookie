import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePointsPage } from './use-points.page';

describe('UsePointsPage', () => {
  let component: UsePointsPage;
  let fixture: ComponentFixture<UsePointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsePointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
