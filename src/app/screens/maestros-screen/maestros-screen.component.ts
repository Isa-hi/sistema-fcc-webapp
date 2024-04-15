import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-maestros-screen',
  templateUrl: './maestros-screen.component.html',
  styleUrls: ['./maestros-screen.component.scss']
})
export class MaestrosScreenComponent implements OnInit{
  public name_user: string = '';
  public rol: string = '';
  public token: string = '';
  public lista_maestros: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['id_trabajador', 'nombre', 'email', 'fecha_nacimiento', 'rfc', 'telefono', 'cubiculo', 'area_investigacion', 'materias' ,'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private maestrosService: MaestrosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();

    //Validar que se haya iniciado sesión
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ''){
      console.log("No se ha iniciado sesión");
      this.router.navigate(['']);
    }

    //Obtener maestros
    this.obtenerMaestros();
  }

  //Para paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener maestros
  public obtenerMaestros(){
    this.maestrosService.obtenerListaMaestros().subscribe(
      (response) => {
        this.lista_maestros = response;
        console.log("Lista de maestros: ", this.lista_maestros);
        if(this.lista_maestros.length > 0){
          //Agregar datos del nombre e email
          this.lista_maestros.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_maestros);

          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);
        }
      }, (error) => {
          console.log("Error al obtener maestros: ", error);
      }
    );
  }

  //Funcion para editar un maestro
  public goEditar(idUser: number){
    this.router.navigate(['registro-usuarios/maestro/'+ idUser]);
  }

  //Función para eliminar un maestro
  public delete(idUser: number){
    //Función que abre el modal de confirmación
    const dialogRef = this.dialog.open(EliminarUserModalComponent, {
      data: {id: idUser, rol: 'maestro'},
      height: '288px',
      width: '328px',
    });

    // Logica para eliminar el maestro
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Maestro a eliminar: ", idUser);
        //Recargar pagina
        window.location.reload();
      } else {
        alert ("No se elimino el maestro");
      }
    });
  }


}

//Interfaz para la tabla
export interface DatosUsuario {
  id_trabajador: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string;
  rfc: string;
  telefono: string;
  cubiculo: string;
  area_investigacion: string;
  //Areglo de materias
  materias: any[];
}
