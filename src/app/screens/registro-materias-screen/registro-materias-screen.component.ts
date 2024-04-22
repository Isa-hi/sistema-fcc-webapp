import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { Observable } from 'rxjs';
declare var $:any;


@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent implements OnInit {
  public dias: any[] = [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miércoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sábado'},
  ];

  public programasEducativos: any[] = [
    {value: '1', nombre: 'Ingenieria en Ciencias de la Computación'},
    {value: '2', nombre: 'Licenciatura en Cienicas de la Computación'},
    {value: '3', nombre: 'Ingenieria en Tecnologías de la Información'},
  ];

  public errors: any = {};
  public editar: boolean = false;
  public materia: any = {};
  
    constructor(
      private location : Location,
      private materiasService: MateriasService,
    ) { }
  
    ngOnInit(): void {
      // Inicialize materia 
      this.materia = this.materiasService.esquemaMateria();
    }

    public regresar(){
      this.location.back();
    }

    public registrar(){
      //Lógica para registrar una materia

      //Validar los campos
      this.errors = [];
      // Sends the materia data to the service to validate
      this.errors = this.materiasService.validarMateria(this.materia, this.editar);
      if(!$.isEmptyObject(this.errors)){
        console.log("Hay errores en el form");
        return false;
      }

      this.materiasService.registrarMateria(this.materia).subscribe(
        (response) => {
          alert("Materia registrada correctamente");
          console.log("Materia registrada /registro-materias-screen.component.ts: ", response);
          this.location.back();
        }, (error: any) => {
          alert("Error al registrar la materia /registro-materias-screen.component.ts");
          console.log("Error al registrar la materia: ", error);
        }
      )
      
      //  ToDO: Send materia data to the service to register
      //console.log("Materia registrada: ", this.materia);
      return true;
    }


    public checkboxChange(event: any){
      //Lógica para checkbox
      // Event contains the checkbox day and the checked value (0 or 1, day)
      if(event[0] == true){
        // Add day to the array
        this.materia.dias.push(event[1]);
        //console.log("Dias: ", this.materia.dias);
      } else {
        // Remove day from the array
        let index = this.materia.dias.indexOf(event[1]);
        this.materia.dias.splice(index, 1);
        //console.log("Dias: ", this.materia.dias);
      }
    }
}
