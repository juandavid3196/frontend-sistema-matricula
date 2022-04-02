import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  estudiantes: any[] = [];

  constructor(private _estudanteService :StudentService,
              private toastr : ToastrService) {

   }

  ngOnInit(): void {
    this.getEstudiantes();
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
    });
  }
}
