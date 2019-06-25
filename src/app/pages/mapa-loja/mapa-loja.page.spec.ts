import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLojaPage } from './mapa-loja.page';

describe('MapaLojaPage', () => {
  let component: MapaLojaPage;
  let fixture: ComponentFixture<MapaLojaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLojaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLojaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
