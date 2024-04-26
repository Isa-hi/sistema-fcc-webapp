import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/alumnos.service';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit{
  public rol: string = '';

  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // This.data.rol es el JSON que traigo del otro lado
      this.rol = this.data.rol;
      console.log("Rol: ", this.rol);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete: false});
  }

  public eliminarUser(){
    if(this.rol == 'administrador'){
      this.administradoresService.eliminarAdmin(this.data.id).subscribe(
        (response)=>{
          console.log("Admin eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
          alert("Error al eliminar el administrador");
          this.dialogRef.close({isDelete: false});
        }
      )
    } else if (this.rol == 'maestro'){
      this.maestrosService.eliminarMaestro(this.data.id).subscribe(
        (response)=>{
          console.log("Maestro eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
          alert("Error al eliminar el maestro");
          this.dialogRef.close({isDelete: false});
        }
      )
    } else if (this.rol == 'alumno'){
      this.alumnosService.eliminarAlumno(this.data.id).subscribe(
        (response)=>{
          console.log("Alumno eliminado: ", response);
          this.dialogRef.close({isDelete: true});
        }, (error)=>{
          alert("Error al eliminar el alumno");
          this.dialogRef.close({isDelete: false});
        }
      )
    }
  }


}
