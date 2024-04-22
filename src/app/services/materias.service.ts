import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,

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
}