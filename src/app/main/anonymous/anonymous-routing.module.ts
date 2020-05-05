import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonymousPage } from './anonymous.page';

const routes: Routes = [
  {
    path: '',
    component: AnonymousPage
  },
  {
    path: 'reply/:index',
    loadChildren: () => import('./reply/reply.module').then( m => m.ReplyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonymousPageRoutingModule {}
