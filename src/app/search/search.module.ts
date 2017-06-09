import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { AppMaterialModule } from '../app.material.module';
@NgModule({
	declarations: [SearchComponent],
	imports:[AppMaterialModule],
	exports:[SearchComponent]
})
export class SearchModule{}