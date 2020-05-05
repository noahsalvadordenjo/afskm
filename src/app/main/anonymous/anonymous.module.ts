import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonymousPageRoutingModule } from './anonymous-routing.module';

import { AnonymousPage } from './anonymous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnonymousPageRoutingModule
  ],
  declarations: [AnonymousPage]
})
export class AnonymousPageModule {}
