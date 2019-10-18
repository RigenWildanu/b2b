import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenawaranHargaPage } from './penawaran-harga.page';

describe('PenawaranHargaPage', () => {
  let component: PenawaranHargaPage;
  let fixture: ComponentFixture<PenawaranHargaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenawaranHargaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenawaranHargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
