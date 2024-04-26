import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-editar-materia-modal',
  templateUrl: './editar-materia-modal.component.html',
  styleUrls: ['./editar-materia-modal.component.scss']
})
export class EditarMateriaModalComponent implements OnInit {
  public rol: string = '';

  constructor(
    private materiasService: MateriasService,
    private dialogRef: MatDialogRef<EditarMateriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // This.data.rol es el JSON que traigo del otro lado
      this.rol = this.data.rol;
      //console.log("Rol: ", this.rol);
  }

  public cerrar_modal_editar(){

    this.dialogRef.close({isEdit: false});
  }

  public editarMateria(){
        this.dialogRef.close({isEdit: true}); // Change editar flag to true after the user confirms edit
  }

}
