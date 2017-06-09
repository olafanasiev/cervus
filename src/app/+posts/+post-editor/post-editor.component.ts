/**
 * Created by aafanasiev on 26.05.2017.
 */
import {
  Component,
  OnInit,
} from '@angular/core';
import {PostsService} from "../posts.service";
import {Post} from "../post";
import {Router} from "@angular/router";

@Component({
  selector: 'post-editor',
  providers:[PostsService],
  styles: [
    `.PostEditor{ 
      width: 1266px;
      margin: 0 auto;
    }`
  ],
  template: `
    <div class="PostEditor">
      <h1>Edit {{post.title}}</h1>
      <div class="PostEditor__title">
        <md-input-container>
        <input type="text" placeholder="Please input title" mdInput [(ngModel)]="post.title"/>
        </md-input-container>
      </div>
      <div class="PostEditor__description">
        <div [froalaEditor] [(ngModel)]="post.body"></div>
      </div>
      <div>
        <button (click)="save()" md-raised-button>Save</button>
      </div>
    </div>
    <router-outlet></router-outlet>`
})

export class PostEditorComponent implements OnInit {
  post:Post;
  id: number;
  constructor(private _postsService:PostsService, private router:Router){}
  ngOnInit(): void {
    this.post = new Post({"title": "", "body": "", "id": "0"});
    this._postsService.get(this.id).then(post => this.post = post);
  }

  save(){
   this._postsService.save(this.post).then(()=>{
     this.router.navigate(['posts'])
   });
  }
}

