import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import {LoginComponent} from "./login/login.component";

export const ROUTES: Routes = [
  { path: '',      loadChildren: './+posts#PostsModule' },
  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
