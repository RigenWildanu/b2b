import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfoPage } from './rfo.page';

describe('RfoPage', () => {
  let component: RfoPage;
  let fixture: ComponentFixture<RfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
