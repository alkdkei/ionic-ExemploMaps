import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLojaPage } from './add-loja.page';

describe('AddLojaPage', () => {
  let component: AddLojaPage;
  let fixture: ComponentFixture<AddLojaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLojaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLojaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
