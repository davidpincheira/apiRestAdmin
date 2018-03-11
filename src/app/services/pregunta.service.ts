import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PreguntaService {
    baseUrl: string = 'http://localhost:3000/preguntas'

    constructor(private http: Http) { }

    getPreguntas(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                //.map(res => res.json(), err => {console.log("error" + err); })
                .catch(this._errorHandler);
    }

    getPreguntaById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    savePregunta(pregunta){
      return this.http.post(this.baseUrl +   '/', pregunta)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deletePregunta(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updatePregunta(pregunta){
      return this.http.put(this.baseUrl +   '/' + pregunta.id, pregunta)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
