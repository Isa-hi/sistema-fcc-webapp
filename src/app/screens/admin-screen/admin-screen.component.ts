import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { hide } from '@popperjs/core';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss']
})
export class AdminScreenComponent implements OnInit{
  public name_user: string = '';
  public lista_admins:any[] = [];

  constructor(
    public facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.obtenerAdmins();
  }

  //Obtener lista de usuarios
  public obtenerAdmins(){
    this.administradoresService.obtenerListaAdmins().subscribe(
      (response)=>{
        this.lista_admins = response;
        console.log("Lista de admins: ", this.lista_admins);
      }, (error)=>{
        alert("Error al obtener la lista de administradores");
      }
    )
      
  }

  public goEditar(idUser: number){
    this.router.navigate(["registro-usuarios/administrador/"+idUser]);
  }

  public delete(idUser: number){
    //Función que abre el modal de confirmación
    const dialogRef = this.dialog.open(EliminarUserModalComponent, {
      data: {id: idUser, rol: 'administrador'},
      height: '288px',
      width: '328px',
    });

    // Logica para eliminar el administrador
    // Qué hace el subscribe !!!
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Admin a eliminar: ", idUser);
        //Recargar pagina
        window.location.reload();
      } else {
        alert ("No se elimino el administrador");
      }
    });

  }


}
