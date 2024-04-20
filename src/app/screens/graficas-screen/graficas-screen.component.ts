import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {
  //Agregar chart-js-plugin-datalabels
  // Variables
  public total_users: any = {};
  // Histograma
  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data : [89, 34, 43, 54, 28, 74, 93],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive: false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  // Bar Chart
  barChartData = {
    labels: ['Desarrollo Web', 'Minería de datos', 'Redes', 'Móviles', 'Inteligencia Artificial'],
    datasets: [
      {
        data : [89, 34, 43, 54, 28],
        label: 'Registro de materias',
        backgroundColor: [
          //Random colors
          '#FF6633',
          '#FFB399',
          '#FF33FF',
          '#FFFF99',
          '#00B3E6'
        ]
      }
    ]
  }
  barChartOption = {
    responsive: false
  }
  barChartPlugins = [ DatalabelsPlugin ];

  // Pie Chart
  pieChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data : [89, 34, 43],
        label: 'Registro de usuarios',
        backgroundColor: [
          //Random colors
          '#FF6633',
          '#FFB399',
          '#FF33FF'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive: false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  // Doughnut Chart
  doughnutChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data : [89, 34, 43],
        label: 'Registro de usuarios',
        backgroundColor: [
          //Random colors
          '#FF6633',
          '#FFB399',
          '#FF33FF'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive: false
  }
  doughnutChartPlugins = [ DatalabelsPlugin ];


  constructor(
    private administradoresService: AdministradoresService,
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
    console.log("Data: ", this.doughnutChartData);
  }

  public obtenerTotalUsers(){
    this.administradoresService.getTotalUsuarios().subscribe(
      (response) => {
        this.total_users = response;
        console.log("Total users: ", this.total_users);
      }, (error) => {
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    )
  }

}
