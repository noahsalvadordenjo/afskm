import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextsPage } from './texts.page';

const routes: Routes = [
  {
    path: '',
    component: TextsPage
  },
  {
    path: 'text/:address',
    loadChildren: () => import('./text/text.module').then( m => m.TextPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextsPageRoutingModule {}
