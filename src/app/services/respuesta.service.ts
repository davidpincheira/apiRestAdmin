import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RespuestaService {
    baseUrl: string = 'http://localhost:3000/respuestas'

    constructor(private http: Http) { }

    getRespuestas(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                //.map(res => res.json(), err => {console.log("error" + err); })
                .catch(this._errorHandler);
    }

    getRespuestaById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    saveRespuesta(respuesta){
      return this.http.post(this.baseUrl +   '/', respuesta)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deleteRespuesta(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updateRespuesta(respuesta){
      return this.http.put(this.baseUrl +   '/' + respuesta.id, respuesta)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
