import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextsPageRoutingModule } from './texts-routing.module';

import { TextsPage } from './texts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextsPageRoutingModule
  ],
  declarations: [TextsPage]
})
export class TextsPageModule {}
