import { Component, OnInit } from '@angular/core';
import { LojaService } from 'src/app/services/loja.service';

@Component({
  selector: 'app-list-loja',
  templateUrl: './list-loja.page.html',
  styleUrls: ['./list-loja.page.scss'],
})
export class ListLojaPage implements OnInit {

  protected lojas$: any;

  constructor(
    private lojaService: LojaService
  ) {
  }

  ngOnInit() {
    this.lojas$ = this.lojaService.getAll();
  }


}
