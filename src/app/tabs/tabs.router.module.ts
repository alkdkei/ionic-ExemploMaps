import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'mapaLojas',
        children: [
          {
            path: '',
            loadChildren: '../pages/mapa-loja/mapa-loja.module#MapaLojaPageModule'
          }
        ]
      },
      {
        path: 'listalojas',
        children: [
          {
            path: '',
            loadChildren: '../pages/list-loja/list-loja.module#ListLojaPageModule'
          }
        ]
      },
      {
        path: 'usuario',
        children: [
          {
            path: '',
            loadChildren: '../pages/list-usuario/list-usuario.module#ListUsuarioPageModule'
          }
        ]
      },
      {
        path: 'addLoja',
        children: [
          {
            path: '',
            loadChildren: '../loja/add-loja/add-loja.module#AddLojaPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
