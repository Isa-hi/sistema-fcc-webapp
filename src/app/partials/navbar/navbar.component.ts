import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  //Decorador: Le paso el dato por medio de otro componente
  @Input() tipo:string = ""; //Transmite entre componentes hijos al padre
  @Input() rol:string = "";
  
  public token:string = "";
  public editar:boolean = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    public activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    console.log("Nav bar component ROL: ", this.rol);
    this.token = this.facadeService.getSessionToken();

    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
    }
      
  }

  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        console.log("Entró");
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }

  public goRegistro(){
    this.router.navigate(["registro-usuarios"]);
  }

  public clickNavLink(link: string){
    this.router.navigate([link]);
    setTimeout(() => {
      this.activarLink(link);
    }, 100);
  }
  public activarLink(link: string){
    if(link == "alumnos"){
      $("#principal").removeClass("active");
      $("#maestro").removeClass("active");
      $("#alumno").addClass("active");
    }else if(link == "maestros"){
      $("#principal").removeClass("active");
      $("#alumno").removeClass("active");
      $("#maestro").addClass("active");
    }else if(link == "home"){
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").addClass("active");
    }else if(link == "graficas"){
      $("#alumno").removeClass("active");
      $("#maestro").removeClass("active");
      $("#principal").removeClass("active");
      $("#graficas").addClass("active");
    }
  }

}
