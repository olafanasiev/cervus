import { Component, Output } from '@angular/core';
import { PostsService } from '../+posts/posts.service';

@Component({
	selector:'search',
	template:`
	<md-input-container>
		<input typeText mdInput [(value)]="text" (change)="search(text)" placeholder="What are you searching for ?"/>
	</md-input-container>
	`,
	styles:[
		`
		*{
			font-size: 11px;
		 }
		`
	]
})
export class SearchComponent{
	@Output()
	$searchFinished;
	text = "";
	constructor(private _postService:PostsService){
		
	}
	
	search(tte){
		console.log(tte);
		console.log(this.text);
		
	}
	
}