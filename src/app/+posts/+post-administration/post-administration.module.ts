/**
 * Created by aafanasiev on 26.05.2017.
 */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './post-administration.routes';
import { ellipsed } from '../../_pipes/ellipsed';
import {AppMaterialModule} from "../../app.material.module";
import {PostAdministrationComponent} from "./post-administration.component";
@NgModule({
  declarations: [
    PostAdministrationComponent,
    ellipsed
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class PostAdministrationModule {
  public static routes = routes;
}
