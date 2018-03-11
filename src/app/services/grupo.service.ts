import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GrupoService {
    baseUrl: string = 'http://localhost:3000/grupos'

    constructor(private http: Http) { }

    getGrupos(){
      return this.http.get(this.baseUrl)
                .map((response: Response) =>response.json())
                //.map(res => res.json(), err => {console.log("error" + err); })
                .catch(this._errorHandler);
    }

    getGrupoById(id){
      return this.http.get(this.baseUrl +"/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    saveGrupo(grupo){
      return this.http.post(this.baseUrl +   '/', grupo)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    deleteGrupo(id){
      return this.http.delete(this.baseUrl + "/" + id)
                .map((response:Response) =>  response.json())
                .catch(this._errorHandler)
    }

    updateGrupo(grupo){
      return this.http.put(this.baseUrl +   '/' + grupo.id, grupo)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    _errorHandler(error:Response){debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
