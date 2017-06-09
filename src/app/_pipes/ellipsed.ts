/**
 * Created by aafanasiev on 08.06.2017.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:'ellipsed'
})
export class ellipsed implements PipeTransform{
  transform(value: any, ...args: any[]) {
    if( value ){
      if( value.length > 200 ){
        value = value.splice(0,200);
        value=value+'...';
        value=value+' <a href="www.google.com">Google</a>';
      }
    }
    return value;
  }


}
