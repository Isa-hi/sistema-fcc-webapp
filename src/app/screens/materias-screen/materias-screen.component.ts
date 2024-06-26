import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit {
  public name_user: string = '';
  public rol: string = '';
  public displayedColumns: string[];
  public data: any[] = [];
  public dataSource;
  
    constructor(
      private faceService: FacadeService,
      private materiasService: MateriasService,
      private router: Router,
      public dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
      this.name_user = this.faceService.getUserCompleteName();
      this.rol = this.faceService.getUserGroup();

      if(this.rol == 'administrador'){
        this.displayedColumns = ['nrc', 'nombre_materia', 'seccion', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'programa_educativo', 'editar', 'eliminar'];
      } else if (this.rol == 'maestro'){
        this.displayedColumns = ['nrc', 'nombre_materia', 'seccion', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'programa_educativo'];
      }

      this.obtenerListaMaterias();

      console.log("rol", this.rol, "data: ", this.dataSource);

    }

    // Funciton that gets the list from the BD using the service
    public obtenerListaMaterias(){
      console.log("Obteniendo lista de materias...");
      this.materiasService.obtenerMaterias().subscribe(
        (response) => {
          console.log("Lista de materias: ", response);
          this.data = response.map(materia => {
            // Replace single quotes with double quotes and parse the string into an array
            if (typeof materia.dias === 'string') {
              materia.dias = JSON.parse(materia.dias.replace(/'/g, '"'));
            }
            return materia;
          });
          this.dataSource = new MatTableDataSource(this.data);
          //this.initPaginator();
        },
        (error) => {
          console.log("Error al obtener materias: ", error);
        }
      );
    }

    // Function to edit a materia
    public goEditarMateria(id: number){
      this.router.navigate(['registro-materia/' + id]);
    }

    // Function to delete a materia
    public EliminarMateria(id: number){

      // Open the modal to confirm the delete
      const dialogRef = this.dialog.open(EliminarUserModalComponent, {
        width: '400px',
        height: '328px',
        data: {rol: 'materia', id: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        //Result returns true if the user wants to delete the materia
        if(result.isDelete){
          console.log("Materia a eliminar: ", id);
          //Reload the page
          window.location.reload();
        } else {
          alert ("No se elimino la materia");
        }
      });
      
    }
}
