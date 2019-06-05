import { Component, OnInit } from '@angular/core';
import { Loja } from '../loja';

@Component({
  selector: 'app-add-loja',
  templateUrl: './add-loja.page.html',
  styleUrls: ['./add-loja.page.scss'],
})
export class AddLojaPage implements OnInit {

  private loja: Loja;

  constructor() { }

  ngOnInit() {
    this.loja = new Loja;
  }

}
