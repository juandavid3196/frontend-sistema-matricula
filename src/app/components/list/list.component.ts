import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  estudiantes : any[] = [];
  filterPost = '';

  constructor(private _estudanteService :StudentService,
              private toastr : ToastrService,
              private router : Router) {

   }

  ngOnInit(): void {
    this.checkToken();
    this.getEstudiantes();
  }

  checkToken(){
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  getEstudiantes(){
    this._estudanteService.getAllEstudiante().subscribe(data => {
      this.estudiantes = data;
    });
  }

  deleteEstudiante(id:string){
    this._estudanteService.deleteEstudiante(id).subscribe((data) => {
      this.toastr.error("El estudiante fue eliminado con exito" , "Estudiante eliminado",{
        positionClass : 'toast-top-right'
      });
      this.getEstudiantes();
    });
  }
}
