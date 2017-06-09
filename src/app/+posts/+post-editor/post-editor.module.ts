/**
 * Created by aafanasiev on 26.05.2017.
 */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './post-editor.routes';
import { PostEditorComponent } from './post-editor.component';
import { FroalaEditorModule } from "angular2-froala-wysiwyg";
import {AppMaterialModule} from "../../app.material.module";
@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    PostEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    FroalaEditorModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class PostEditorModule {
  public static routes = routes;
}
