/**
 * Created by aafanasiev on 08.06.2017.
 */
import {Component, OnInit} from "@angular/core";
import {PostsService} from "../posts.service";
import {Post} from "../post";
import {ellipsed} from "../../_pipes/ellipsed";
@Component({
  selector: "post-administration",
  template:`
        <table id="PostAdministration">
          <thead>
          <tr>
            <td></td>
            <td>name</td>
            <td>Short description</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
            <tr *ngFor="let post of posts">
              <td><md-checkbox ngModel="post.selected"></md-checkbox></td>
              <td>{{post.title}}</td>
              <td>{{post.body|ellipsed}}</td>
              <td><a [routerLink]="['/posts/edit',1]">Edit</a></td>
              <td><a href="#">Delete</a></td>
            </tr>
          </tbody>
        </table>`,
  styles:[`
    *{ font-size:15px;}
   `],
  providers: [PostsService],

  }
)
export class PostAdministrationComponent implements OnInit{
  posts:Array<Post>;
  ngOnInit(): void {

  }

  constructor(_postsService:PostsService){
    _postsService.getAll().then((value)=>{
       this.posts = value;
     })
       //.then((posts)=>{
      // this.posts = posts;
     //});
  }




}
