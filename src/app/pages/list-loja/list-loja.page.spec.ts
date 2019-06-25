import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLojaPage } from './list-loja.page';

describe('ListLojaPage', () => {
  let component: ListLojaPage;
  let fixture: ComponentFixture<ListLojaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLojaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLojaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
