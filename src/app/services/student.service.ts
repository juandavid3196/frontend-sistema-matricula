import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Enrollment } from "../interfaces/student";
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL ='http://localhost:8000';
  constructor(private http: HttpClient) { 
  
  }

  headers =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
    
  })
  
  getAllEstudiante():Observable<any>{
    const path = `${this.URL}/enrollments/`;
    return this.http.get(path,{headers: this.headers});
  }

  //url + {id}
  getEstudiante(id:string):Observable<any>{
    const path = `${this.URL}/enrollments/${id}`;
    return this.http.get(path,{headers: this.headers});
  }

  setEstudiante(enrollment:Enrollment) {
    const path = `${this.URL}/enrollments/`;
    return this.http.post(path,enrollment,{headers: this.headers});
  }

  deleteEstudiante(id:string){
    const path = `${this.URL}/enrollments/${id}`;
    return this.http.delete(path,{headers: this.headers});
  }
  //url/${id}
 
  //url/${id}
  updateEstudiante(enrollment:Enrollment,id:string){
    const path = `${this.URL}/enrollments/${id}`;
    return this.http.patch(path,enrollment,{headers: this.headers});
  }
}
