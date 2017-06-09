/**
 * Created by aafanasiev on 26.05.2017.
 */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { routes } from './posts.routes';
import { SearchModule } from '../search/search.module';
@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    PostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchModule,
    RouterModule.forChild(routes),
],
})
export class PostsModule {
  public static routes = routes;
}
