import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-respuesta-list',
  templateUrl: './respuesta-list.component.html'
})
export class RespuestaListComponent implements OnInit {
  respuestas: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _respuestaService : RespuestaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getRespuestas();
  }

  getRespuestas(){
    this._respuestaService.getRespuestas().subscribe(
        data => this.respuestas = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['respuestas/add']);
  }
  edit(id){
    this._router.navigate(['respuestas/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete respuesta with Id: " + id);
    if(ans){
      this._respuestaService.deleteRespuesta(id)
          .subscribe( data=> {
            var index = this.respuestas.findIndex(x=>x.id == id);
            this.respuestas.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
