import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Post
} from './post';
//import {
//	SearchComponent
//} from '../search/search.component';
import {
	PostsService
} from './posts.service';
/**
 * We're loading this component asynchronously We are using some magic with
 * es6-promise-loader that will wrap the module with a Promise see
 * https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'posts-list',
  providers:[PostsService],
  styles: [`
  	.Post{ 
  		padding: 20px 0;
  	}
 	.Post__title{
 		font-size: 20px;
 	} 	
  `],
  template: `
  	<search></search>
    <div class="Post" *ngFor="let post of posts">
      <div class="Post__title">{{post.title}}</div>
      <div class="Post__body">{{post.body}}</div>
      <!--<post-editor></post-editor>-->
    </div>
    <router-outlet></router-outlet>
  `
})
export class PostsComponent implements OnInit {
  posts:Array<Post>;
  constructor(private _postService:PostsService){}
  public ngOnInit(){
 	  this._postService.getAll().then((posts)=>{
 	  	this.posts = posts;
 	  }); 
   }
  }