import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    const resultPost = [];
    for(const estudiante of value){
      if(estudiante.student.name.toLowerCase().indexOf(arg.toLowerCase())> -1 ||
      estudiante.student.grade.toString().indexOf(arg.toString()) > -1){
        resultPost.push(estudiante);
      }
    }
    return resultPost;
  }

}
