import { Component, OnInit } from '@angular/core';
import { LojaService } from 'src/app/services/loja.service';

@Component({
  selector: 'app-list-loja',
  templateUrl: './list-loja.page.html',
  styleUrls: ['./list-loja.page.scss'],
})
export class ListLojaPage implements OnInit {
  
  private lojas: any;
  
  constructor(
    private lojaService: LojaService
    ) {
      this.lojas = this.lojaService.getAll();
    }
    
    
      ngOnInit() {
      }


}
