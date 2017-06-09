/**
 * Created by aafanasiev on 04.06.2017.
 */
import {MdButtonModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdInputModule],
  exports: [MdButtonModule, MdCheckboxModule, MdInputModule],
})

export class AppMaterialModule{}
