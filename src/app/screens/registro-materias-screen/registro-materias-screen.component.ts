import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
      private activatedRoute: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      // Inicialize materia 
      this.materia = this.materiasService.esquemaMateria();

      // Get the materia id from the URL
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        this.editar = true;
        this.materia.id = this.activatedRoute.snapshot.params['id'];
        console.log("ID de la materia a editar: ", this.materia.id);
        this.obtenerMateriaByID();
      }
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

      // Send materia data to the service to register
      this.materiasService.registrarMateria(this.materia).subscribe(
        (response) => {
          alert("Materia registrada correctamente");
          console.log("Materia registrada: ", response);
          this.location.back();
        }, (error: any) => {
          alert("Error al registrar la materia /registro-materias-screen.component.ts");
          console.log("Error al registrar la materia: ", error);
        }
      )
      return true;
    }


    public checkboxChange(event: any){
      //Lógica para checkbox
      // Event contains the checkbox day and the checked value (0 or 1, day)
      if(event[0] == true){
        // Add day to the array
        this.materia.dias.push(event[1]);
      } else {
        // Remove day from the array
        let index = this.materia.dias.indexOf(event[1]);
        this.materia.dias.splice(index, 1);
      }
    }

    public obtenerMateriaByID(){
      console.log("Obteniendo datos de la materia...", this.materia.id);
      this.materiasService.obtenerMateriaByID(this.materia.id).subscribe(
        (response) => {
          console.log("Datos de la materia: ", response);
          this.materia = response;
          // Parse the string into an array
          if (typeof this.materia.dias === 'string') {
            this.materia.dias = JSON.parse(this.materia.dias.replace(/'/g, '"'));
          }
          console.log("Array de dias: ", this.materia.dias);
        }, (error) => {
          alert("Error al obtener los datos de la materia para editar");
          console.log("Error: ", error);
        }
      )
    }
}
