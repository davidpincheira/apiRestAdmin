import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PistaService {
    baseUrl: string = 'http://localhost:3000/pistas'

    constructor(private http: Http) { }

    getPistas(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                //.map(res => res.json(), err => {console.log("error" + err); })
                .catch(this._errorHandler);
    }

    getPistaById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    savePista(pista){
      return this.http.post(this.baseUrl +   '/', pista)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deletePista(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updatePista(pista){
      return this.http.put(this.baseUrl +   '/' + pista.id, pista)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
