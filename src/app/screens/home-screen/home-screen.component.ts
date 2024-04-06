import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  public rol:string = "";
  public token:string = "";
  public router: Router;

  constructor(
    private facadeService: FacadeService
  ){}

  ngOnInit(): void {
    //Validar si se ha iniciado sesión
    this.token = this.facadeService.getSessionToken();
    console.log("Token:", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }


      this.rol = this.facadeService.getUserGroup();
      console.log("Rol:", this.rol);
  }

}
