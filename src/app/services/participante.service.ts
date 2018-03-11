import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ParticipanteService {
    baseUrl: string = 'http://localhost:3000/participantes'

    constructor(private http: Http) { }

    getParticipantes(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    getParticipanteById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    saveParticipante(participante){
      return this.http.post(this.baseUrl +   '/', participante)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deleteParticipante(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updateParticipante(participante){
      return this.http.put(this.baseUrl +   '/' + participante.id, participante)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
/*
    getParticipantesActivos(id){
      return this.http.get(this.baseUrl + '/'+id)
      .map(res => res.json(), err => {
          console.log("error" + err);
      })
    }*/
}

