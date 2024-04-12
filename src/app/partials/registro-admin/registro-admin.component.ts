import { Component, Input, OnInit } from '@angular/core';
import { AdministradoresService } from '../../services/administradores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit{
  //Decoradores
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public admin:any ={};
  public editar:boolean =false;
  public errors:any = {};
  //Variables para atrapar el token y el id del usuario
  public token: string = "";
  public idUser: number = 0;
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    //Traemos el servicio
    private administradoresService: AdministradoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private location: Location
  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parametro en la URL
    if(this.activatedRoute.snapshot.params['id']){
      this.editar = true;
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID del usuario a editar: ", this.idUser);
      this.admin = this.datos_user;
    } else {
      this.admin = this.administradoresService.esquemaAdmin();
      this.admin.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    console.log("Datos del usuario: ", this.admin);
  }


  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Validamos que las contraseñas coincidan
    if(this.admin.password == this.admin.confirmar_password){
      //Vamos a consumir el servicio de registrar admin
      this.administradoresService.registrarAdmin(this.admin).subscribe(
        (response) => {
          alert("Usuario registrado correctamente")
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error) => {
          alert("No se pudo registrar usuario");
        }
      );
    } else {
      alert("Las contraseñas no coinciden");
      this.admin.password="";
      this.admin.confirmar_password="";
    }
    return false
  }

  public actualizar(){

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
}