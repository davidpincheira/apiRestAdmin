import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PremioService {
    baseUrl: string = 'http://192.168.4.8:1331/premios'

    constructor(private http: Http) { }

    getPremios(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                .catch(this._errorHandler);
    }

    getPremioById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    savePremio(premio){
      return this.http.post(this.baseUrl +   '/', premio)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deletePremio(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updatePremio(premio){
      return this.http.put(this.baseUrl +   '/' + premio.id, premio)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
