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
        path: 'listLojas',
        children: [
          {
            path: '',
            loadChildren: '../pages/list-loja/list-loja.module#ListLojaPageModule'
          }
        ]
      },
      {
        path: 'listUsuarios',
        children: [
          {
            path: '',
            loadChildren: '../pages/list-usuario/list-usuario.module#ListUsuarioPageModule'
          }
        ]
      },
      {
        path: 'addUsuario',
        children: [
          {
            path: '',
            loadChildren: '../pages/add-usuario/add-usuario.module#AddUsuarioPageModule'
          }
        ]
      },
      {
        path: 'addLoja',
        children: [
          {
            path: '',
            loadChildren: '../pages/add-loja/add-loja.module#AddLojaPageModule'
          }
        ]
      },
      {
        path: 'loginUsuario',
        children: [
          {
            path: '',
            loadChildren: '../pages/login-usuario/login-usuario.module#LoginUsuarioPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/mapaLojas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/mapaLojas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
