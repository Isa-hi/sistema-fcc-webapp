import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  public username:string ="";
  public password:string = "";
  public type:string = "password";
  public errors:any = {};
  //Funciones de cajón | Constructor y ngOnInit
  constructor(
    private router: Router, //N A V E G A C I Ó N
    private facadeService: FacadeService
  ){
  }
  //Es lo que va a cargar al iniciar el DOM
  ngOnInit(): void {
      
  }

  public login(){
    //Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    } 
    //Si pasa la validación ir a la página de home
    this.facadeService.login(this.username, this.password).subscribe(
      (response)=>{
        this.facadeService.saveUserData(response);
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo iniciar sesión");
      }
    );

    return true;
  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]); //N A V E G A C I Ó N
  }

  public showPassword(){
    if(this.type == "password"){
      //Muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      //Oculta la contraseña
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

}
