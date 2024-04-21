import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  
    constructor(
      private location : Location,
    ) { }
  
    ngOnInit(): void {
    }

    public regresar(){
      this.location.back();
    }

    public registrar(){
      //Lógica para registrar una materia
    }
}
