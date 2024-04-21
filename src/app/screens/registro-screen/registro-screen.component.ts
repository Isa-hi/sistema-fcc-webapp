import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/alumnos.service';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";
  //Json para los datos del usuario
  public user:any = {};

  public isUpdate:boolean = false;
  public errors:any = {};
  //Banderas para tipos de usuarios
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;
  public editar:boolean = false;
  public tipo_user:string ="";
  //Info del usuario
  public idUser:number = 0;
  public rol:string = "";


  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private alumnosService: AlumnosService,
    private maestrosService: MaestrosService
  ){}

  ngOnInit(): void {
    //Obtenemos el rol del usuario
    if(this.activatedRoute.snapshot.params['rol'] != undefined){
      this.editar = true;
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol testest: ", this.rol);
      this.user.tipo_user = this.rol; // Set the user.tipo_usuario to the rol
      if(this.rol == "maestro"){
        this.isMaestro = true;
      } else if (this.rol == "alumno"){
        this.isAlumno = true;
      }
    }
    //Obtener el id del usuario
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID del usuario a editar: ", this.idUser);
      this.obtenerUserByID();
    }
  }

  public obtenerUserByID(){
    if(this.rol == "administrador"){
      this.administradoresService.getAdminByID(this.idUser).subscribe(
        (response) => {
          console.log("Datos del administrador: ", response);
          this.user = response;
          //Agregamos los valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_user = this.rol;
          this.isAdmin = true;
        }, (error) => {
          alert("Error al obtener los datos del administrador para editar");
          console.log("Error: ", error);
        }
      )
    } else if (this.rol == 'maestro'){
      this.maestrosService.getMaestroByID(this.idUser).subscribe(
        (response) => {
          console.log("Datos del maestro: ", response);
          this.user = response;
          //Agregamos los valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_user = this.rol;
          this.isMaestro = true;
        }, (error) => {
          alert("Error al obtener los datos del maestro para editar");
        }
      )
    } else if (this.rol == 'alumno'){
      this.alumnosService.getAlumnoByID(this.idUser).subscribe(
        (response) => {
          console.log("Datos del alumno: ", response);
          this.user = response;
          //Agregamos los valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_user = this.rol;
          this.isAlumno = true;
        }, (error) => {
          alert("Error al obtener los datos del alumno para editar");
        }
      )
    }
  }

  public radioChange(event: MatRadioChange) {
    console.log("event: ", event.value);

    if(event.value == "administrador"){
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isAlumno = false;
      this.isMaestro = false;
    }else if (event.value == "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.tipo_user = "alumno"
      this.isMaestro = false;
    }else if (event.value == "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro"
    }
  }

}