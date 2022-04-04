import { Injectable } from '@angular/core';
import { Login } from "../interfaces/login";
import { Response} from "../interfaces/response";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

 

export class LoginService {
   
  
   
  
  private URL = "http://localhost:8000";
  constructor(private http: HttpClient) { }

    headers =  new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  setlogin(login:Login){
    const path = `${this.URL}/login`;
    return  this.http.post<Response>(path,login,{headers:this.headers});
  }
}
