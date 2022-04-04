import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    createLogin : FormGroup;
    submitted =  false;

  constructor(private fb : FormBuilder,
    private _loginService:LoginService,
    private router: Router,
    private toastr : ToastrService
    ) {

      this.createLogin = this.fb.group({
        
        user: ['',Validators.required],
        password : ['',Validators.required], });
     
     }


  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(){
    if (localStorage.getItem('token')) {
        this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  verificarLogin(){
    this.submitted = true;
    console.log(this.createLogin);
    if(this.createLogin.invalid){
      return;
    }
    
    const login = {
        username: this.createLogin.value.user,
        password: this.createLogin.value.password
    };
    console.log(login);
    this._loginService.setlogin(login).subscribe(data => {
      if(data.status){
        localStorage.setItem('token',data.token);
        this.toastr.success("Inicio de sesion exitoso" , "Bienvenido",{
          positionClass : 'toast-top-right'
          });
        this.router.navigate(['/list']);
      }else {
        this.toastr.error("Usuario o contraseña incorrectos" , "Error",{
          positionClass : 'toast-top-right'
          });
          this.router.navigate(['/auth']);
      }
    });
  }
}
