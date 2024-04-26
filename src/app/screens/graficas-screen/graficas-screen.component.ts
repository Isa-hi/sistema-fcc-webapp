import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';


@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {
  // Variables
  public total_users: any = {};
  // Histograma
  lineChartData = {
    labels: [''],
    datasets: [
      {
        data : [0],
        label: 'Registro de usuarios',
      }
    ]
  }
  lineChartOption = {
    responsive: false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  // Bar Chart
  barChartData = {
    labels: [''],
    datasets: [
      {
        data : [0],
        label: 'Registro de usuarios',
        backgroundColor: [
          //Random colors
          '#9966ff',
          '#4bc0c0',
          '#ff9f40',
          '#36a2eb',
          '#ffcd56'
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
    labels: [''],
    datasets: [
      {
        data : [0],
        label: 'Registro de usuarios',
        backgroundColor: [
          //Random colors
          '#9966ff',
          '#4bc0c0',
          '#ff9f40',
          '#36a2eb',
          '#ffcd56'
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
    labels: [''],
    datasets: [
      {
        data : [0],
        label: 'Registro de usuarios',
        backgroundColor: [
          //Random colors
          '#9966ff',
          '#4bc0c0',
          '#ff9f40',
          '#36a2eb',
          '#ffcd56'
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
        this.setLabelsToCharts(this.total_users);
        this.setUsersDataToCharts(this.total_users);
      }, (error) => {
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    )
  }

  public setUsersDataToCharts(total_users: any){
    console.log("Setting data to charts...", total_users, "This", this.total_users)
    this.pieChartData = {
        ...this.pieChartData,
        datasets: [
            {
                ...this.pieChartData.datasets[0],
                data: [total_users.Administradores, total_users.Maestros, total_users.Alumnos]
            }
        ]
    };
    this.barChartData = {
        ...this.barChartData,
        datasets: [
            {
                ...this.barChartData.datasets[0],
                data: [total_users.Administradores, total_users.Maestros, total_users.Alumnos]
            }
        ]
    };
    this.doughnutChartData = {
        ...this.doughnutChartData,
        datasets: [
            {
                ...this.doughnutChartData.datasets[0],
                data: [total_users.Administradores, total_users.Maestros, total_users.Alumnos]
            }
        ]
    };
    this.lineChartData = {
        ...this.lineChartData,
        datasets: [
            {
                ...this.lineChartData.datasets[0],
                data: [total_users.Administradores, total_users.Maestros, total_users.Alumnos]
            }
        ]
    };
  }

  public setLabelsToCharts(total_users: any){
    //Get the keys from the total_users object
    const labels = Object.keys(total_users); // labels is an array with the keys of the object total_users
    console.log("Setting labels to charts...", labels);
    this.barChartData = {
        ...this.barChartData,
        labels
    };
    this.doughnutChartData = {
        ...this.doughnutChartData,
        labels
    };
    this.pieChartData = {
        ...this.pieChartData,
        labels
    };
    this.lineChartData = {
        ...this.lineChartData,
        labels
    };
  }

}
