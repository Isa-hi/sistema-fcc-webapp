import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FacadeService } from './facade.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService

  ) { }

  // Esquema para las materias sirve para atrapar los datos de las materias
  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre_materia': '',
      'seccion': '',
      'dias': [],
      'hora_inicio': '',
      'hora_fin': '',
      'salon': '',
      'programa_educativo': '',
    }
  }

  public validarMateria(data: any, editar: boolean){
    console.log("Validando materia... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nrc"])){
       error["nrc"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["nombre_materia"])){
       error["nombre_materia"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["seccion"])){
       error["seccion"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["dias"])){
       error["dias"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["hora_inicio"])){
       error["hora_inicio"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["hora_fin"])){
       error["hora_fin"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["salon"])){
       error["salon"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["programa_educativo"])){
       error["programa_educativo"] = this.errorService.required;
     }
    if(!this.validatorService.required(data["dias"])){
      error["dias"] = this.errorService.required;
    }
    //console.log("Error: ", error)
    return error;
  }

  //Servicio para registrar una materia
  public registrarMateria(data: any): Observable <any>{
    console.log("Registrando materia... ", data);
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }

  //Servicio para obtener la lista de materias
  public obtenerMaterias(): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {headers: headers});
  }

  //Servicio para obtener una materia por ID
  public obtenerMateriaByID(id: any): Observable <any>{
    return this.http.get<any>(`${environment.url_api}/materias/?id=${id}`,httpOptions);
  }

  //Servicio para actualizar una materia
  public actualizarMateria(data: any): Observable <any>{
    console.log("Actualizando materia... ", data);
    //var headers = new HttpHeaders({'Content-type': 'application/json'})
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, httpOptions );
  }

  //Servicio para eliminar una materia
  public eliminarMateria(id: any): Observable <any>{
    console.log("Eliminando materia... ", id);
    return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${id}`, httpOptions);
  }

}