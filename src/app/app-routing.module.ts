import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },  { path: 'login-usuario', loadChildren: './pages/login-usuario/login-usuario.module#LoginUsuarioPageModule' },

  // { path: 'list-loja', loadChildren: './pages/list-loja/list-loja.module#ListLojaPageModule' },
  // { path: 'add-usuarios', loadChildren: './pages/add-usuarios/add-usuarios.module#AddUsuariosPageModule' },
  // { path: 'add-usuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  // { path: 'list-usuario', loadChildren: './pages/list-usuario/list-usuario.module#ListUsuarioPageModule' },
  // { path: 'mapa-loja', loadChildren: './pages/mapa-loja/mapa-loja.module#MapaLojaPageModule' },

  // { path: 'add-loja', loadChildren: './loja/add-loja/add-loja.module#AddLojaPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
