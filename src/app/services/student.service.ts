import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from "../interfaces/student";
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL ='';
  constructor(private http: HttpClient) { 

  }

  getAllEstudiante(){
    const path = `${this.URL}/all`;
    return this.http.get<Student[]>(path);
  }

  //url + {id}
  getEstudiante(id:string){
    const path = `${this.URL}/all/${id}`;
    return this.http.get<Student>(path);
  }

  setEstudiante(student:Student) {
    const path = `${this.URL}/create`;
    return this.http.post(path,student);
  }

  deleteEstudiante(id :string){
    const path = `${this.URL}/delete/${id}`;
    return this.http.delete(path);
  }
  //url/${id}
 
  //url/${id}
  updateEstudiante(student:Student,id:string){
    const path = `${this.URL}/update/${id}`;
    return this.http.put(path,student);
  }
}
