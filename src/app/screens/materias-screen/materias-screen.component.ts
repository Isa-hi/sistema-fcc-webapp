import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit {
  public name_user: string = '';
  public rol: string = '';
  public displayedColumns: string[];

  

  data = [
    {
      nrc: '1234',
      nombre_materia: 'Math',
      seccion: 'A',
      dias: ['Monday', 'Wednesday'],
      hora_inicio: '09:00',
      hora_fin: '10:00',
      salon: '101',
      programa_educativo: 'Computer Science',
    },
    {
      nrc: '5678',
      nombre_materia: 'Physics',
      seccion: 'B',
      dias: ['Tuesday', 'Thursday'],
      hora_inicio: '10:00',
      hora_fin: '11:00',
      salon: '102',
      programa_educativo: 'Physics',
    }// More objects for more rows...
  ];
 dataSource = new MatTableDataSource(this.data);
  
    constructor(
      private faceService: FacadeService
    ) { }
  
    ngOnInit(): void {
      this.name_user = this.faceService.getUserCompleteName();
      this.rol = this.faceService.getUserGroup();

      if(this.rol == 'administrador'){
        this.displayedColumns = ['nrc', 'nombre_materia', 'seccion', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'programa_educativo', 'editar', 'eliminar'];
      } else if (this.rol == 'maestro'){
        this.displayedColumns = ['nrc', 'nombre_materia', 'seccion', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'programa_educativo'];
      }

      console.log("rol", this.rol, "data: ", this.dataSource);

    }

}
