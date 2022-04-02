import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createStudent : FormGroup;
  submitted =  false;
  id : string | null;    
  titulo = 'Registrar Estudiante';
  
  constructor(private fb : FormBuilder,
     private _estudanteService:StudentService,
     private router: Router,
     private toastr : ToastrService,
     private aRoute : ActivatedRoute
     ) {

    this.createStudent = this.fb.group({
        
        nombre : ['',Validators.required],
        apellido : ['',Validators.required],
        fechaNacimiento : ['',Validators.required],
        email : ['', [Validators.required,Validators.email]], 
        direccion : ['',Validators.required],
        telefono : ['',[Validators.required, Validators.maxLength(10)]],
        grado : ['', Validators.required],
        grupo : ['', Validators.required],
        Anombre : ['',Validators.required],
        Aapellido : ['',Validators.required],
        AfechaNacimiento : ['',Validators.required],
        Aemail : ['', [Validators.required,Validators.email]],
        Adireccion : ['',Validators.required],
        Atelefono : ['',[Validators.required, Validators.maxLength(10)]],

    });
    this.id = this.aRoute.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
      this.checkToken();
      this.getIdEstudiante();
  }

  checkToken(){
    if (localStorage.getItem('token')) {
        this.router.navigate(['/create']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  aeEstudiante(){
    this.submitted = true;

    if(this.createStudent.invalid)
    return;

    if(this.id === null){
      this.agregarEstudiante()
    } else {
      this.editarEstudiante(this.id);
    }
  }


  agregarEstudiante(){
    
     const student = {
     nombre : this.createStudent.value.nombre,
     apellido : this.createStudent.value.apellido,
     fechaNacimiento : this.createStudent.value.fechaNacimiento,
     email : this.createStudent.value.email,
     direccion : this.createStudent.value.direccion,
     telefono : this.createStudent.value.telefono,
     grado : this.createStudent.value.grado,
     grupo : this.createStudent.value.grupo,
     Anombre: this.createStudent.value.Anombre,
     Aapellido : this.createStudent.value.Aapellido,
     AfechaNacimiento : this.createStudent.value.AfechaNacimiento,
     Aemail : this.createStudent.value.Aemail,
     Adireccion : this.createStudent.value.Adireccion,
     Atelefono : this.createStudent.value.Atelefono };

    this._estudanteService.setEstudiante(student).subscribe( (e) =>{
      this.toastr.success("El estudiante fue registrado con exito" , "Estudiante registrado",{
        positionClass : 'toast-top-right'
      });
      this.router.navigate(['/list']);
    });

 }


 editarEstudiante(id:string){

  const estudiante : any = {
    nombre : this.createStudent.value.nombre,
    apellido : this.createStudent.value.apellido,
    fechaNacimiento : this.createStudent.value.fechaNacimiento,
    email : this.createStudent.value.email,
    direccion : this.createStudent.value.nombre.direccion,
    telefono : this.createStudent.value.nombre.telefono,
    grado : this.createStudent.value.grado,
    grupo : this.createStudent.value.grupo,
    Anombre : this.createStudent.value.nombre.Anombre,
    Aapellido : this.createStudent.value.Aapellido,
    AfechaNacimiento : this.createStudent.value.AfechaNacimiento,
    Aemail : this.createStudent.value.Aemail,
    Adireccion : this.createStudent.value.Adireccion,
    Atelefono : this.createStudent.value.Atelefono };

    this._estudanteService.updateEstudiante(estudiante,id).subscribe((data) => {
      this.toastr.success("El estudiante fue editado con exito" , "Estudiante editado",{
      positionClass : 'toast-top-right' 
      });
      this.router.navigate(['/list']);
    });
 }

 getIdEstudiante(){
   this.titulo = 'Registar Estudiante';

   if(this.id !== null){
    this._estudanteService.getEstudiante(this.id).subscribe(data=>{
        this.createStudent.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
          email: data.email,
          direccion: data.direccion,
          telefono: data.telefono,
          grado: data.grado,
          grupo: data.grupo,
          Anombre: data.Anombre,
          Aapellido: data.Aapellido,
          AfechaNacimiento: data.AfechaNacimiento,
          Aemail: data.Aemail,
          Adireccion: data.Adireccion,
          Atelefono: data.Atelefono
        });
      });
    }
  }

 
}
