/**
 * Created by aafanasiev on 04.06.2017.
 */

import { Injectable } from '@angular/core';
import { Post } from './post';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mapTo';
import {toArray} from "rxjs/operator/toArray";
import {Observable} from "rxjs/Observable";
import {toPromise} from "rxjs/operator/toPromise";
import {element} from "protractor";

@Injectable()
export class PostsService{

  public constructor(private _http:Http){

  }

  public save(post:Post):Promise<Post>{
   return this._http.put('/api/posts',post).toPromise().then(post=>{
      return new Post(post.json());
    });
}

public get(id:number):Promise<Post>{
  return this._http.get("/api/posts",id).toPromise().then(post=>{
    return new Post(post.json());
  });
}

public getAll():Promise<Array<Post>>{
      let result = new Array<Post>();

      return this._http.get("/api/posts").toPromise().then(posts=>{
        posts.json().forEach((element,index)=>{
          result.push(new Post(element));
        });
        return result;
      })

}

}
