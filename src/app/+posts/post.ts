/**
 * Created by aafanasiev on 27.05.2017.
 */
export class Post{
  id:number;
  title:string;
  body:string;
  selected?:boolean;
  tags?:Array<String>;

  constructor(json:any,tags?:Array<String>){
    this.id = json.id
    this.title = json.title;
    this.body = json.body;
    this.selected = false;
    this.tags = tags;
  }
}
