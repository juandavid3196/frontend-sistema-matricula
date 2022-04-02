import { Injectable } from '@angular/core';
import { Login } from "../interfaces/login";
import { Response} from "../interfaces/response";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "";
  constructor(private http: HttpClient) { }

  setlogin(login:Login){
    const path = `${this.URL}/auth`;
    return  this.http.post<Response>(path,login);
  }
}
