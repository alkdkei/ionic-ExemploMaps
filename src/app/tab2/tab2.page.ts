import { Component } from '@angular/core';
import { LojaService } from '../loja/loja.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private lojas$:any;
  
  constructor(
    private lojaService:LojaService
  ) {
    this.lojas$ = this.lojaService.getAll();
  }

}
