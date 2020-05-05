import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { MatMenuModule } from '@angular/material/menu';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { PasswordComponent } from './password/password.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    LoginComponent,
    RegisterComponent,
    PhonenumberComponent,
    VerificationCodeComponent,
    PasswordComponent
  ]
})
export class HomePageModule {}
