import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountSetupComponent} from './account-setup/account-setup.component';


const appRoutes: Routes = [
  {
    path: 'accountSetup',
    component: AccountSetupComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
