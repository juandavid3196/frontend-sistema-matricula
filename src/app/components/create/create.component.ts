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
  estado = 'Agregar';
  
  constructor(private fb : FormBuilder,
     private _estudanteService:StudentService,
     private router: Router,
     private toastr : ToastrService,
     private aRoute : ActivatedRoute
     ) {

    this.createStudent = this.fb.group({
        cedula : ['',Validators.required],
        nombre : ['',Validators.required],
        fechaNacimiento : ['',Validators.required],
        email : ['', [Validators.required,Validators.email]], 
        direccion : ['',Validators.required],
        telefono : ['',[Validators.required, Validators.maxLength(10)]],
        grado : ['', Validators.required],
        grupo : ['', Validators.required],
        Acedula : ['',Validators.required],
        Anombre : ['',Validators.required],
        AfechaNacimiento : ['',Validators.required],
        Aemail : ['', [Validators.required,Validators.email]],
        Adireccion : ['',Validators.required],
        Atelefono : ['',[Validators.required, Validators.maxLength(10)]],

    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
      this.checkToken();
      if(this.id != null){
      this.getIdEstudiante();
      }
  }

  checkToken(){
    if (!localStorage.getItem('token')) {

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
    
     const enrollment = {
     date: this.generarFecha(),
     student :{  
     _id:this.createStudent.value.cedula,
     name: this.createStudent.value.nombre,
     phone: this.createStudent.value.telefono,
     email : this.createStudent.value.email,
     address : this.createStudent.value.direccion,
     birthday: this.createStudent.value.fechaNacimiento,
     attendant: {
        _id: this.createStudent.value.Acedula,
        name: this.createStudent.value.Anombre,
        phone : this.createStudent.value.Atelefono,
        email : this.createStudent.value.Aemail,
        address: this.createStudent.value.Adireccion,
        birthday : this.createStudent.value.AfechaNacimiento,
        
         },
    grade : this.createStudent.value.grado,
    group : this.createStudent.value.grupo
      }
    };
    console.log(enrollment);
    this._estudanteService.setEstudiante(enrollment).subscribe( (e) =>{
      this.toastr.success("El estudiante fue registrado con exito" , "Estudiante registrado",{
        positionClass : 'toast-top-right'
      });
      this.router.navigate(['/list']);
    });

 }


 editarEstudiante(id:string){
  const enrollment = {
    date: this.generarFecha(),
    student :{  
    _id:this.createStudent.value.cedula,
    name: this.createStudent.value.nombre,
    phone: this.createStudent.value.telefono,
    email : this.createStudent.value.email,
    address : this.createStudent.value.direccion,
    birthday: this.createStudent.value.fechaNacimiento,
    attendant: {
       _id: this.createStudent.value.Acedula,
       name: this.createStudent.value.Anombre,
       phone : this.createStudent.value.Atelefono,
       email : this.createStudent.value.Aemail,
       address: this.createStudent.value.Adireccion,
       birthday : this.createStudent.value.AfechaNacimiento,
       
        },
   grade : this.createStudent.value.grado,
   group : this.createStudent.value.grupo
     }
   };
  

    this._estudanteService.updateEstudiante(enrollment,id).subscribe((data) => {
      this.toastr.success("El estudiante fue editado con exito" , "Registro editado",{
      positionClass : 'toast-top-right' 
      });
      this.router.navigate(['/list']);
    });
 }

 getIdEstudiante(){
   this.titulo = 'Editar Estudiante';
   this.estado = 'Editar';
   if(this.id !== null){
    this._estudanteService.getEstudiante(this.id).subscribe(data=>{
        this.createStudent.setValue({
          cedula: data.student._id,
          nombre: data.student.name,
          fechaNacimiento: data.student.birthday,
          email: data.student.email,
          direccion: data.student.address,
          telefono: data.student.phone,
          grado: data.student.grade,
          grupo: data.student.group,
          Acedula: data.student.attendant._id,
          Anombre: data.student.attendant.name,
          AfechaNacimiento: data.student.attendant.birthday,
          Aemail: data.student.attendant.email,
          Adireccion: data.student.attendant.address,
          Atelefono: data.student.attendant.phone
        });
      });
    }
  }

    generarFecha() {
      let d  = new Date();
      let dia = d.getDay();
      let mes = d.getMonth();
      let ano = d.getFullYear();
      let fecha = `${ano}-${mes}-${dia}`;
      return fecha;
    }


 
}
