import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-pregunta-list',
  templateUrl: './pregunta-list.component.html'
})
export class PreguntaListComponent implements OnInit {
  preguntas: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _preguntaService : PreguntaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getPreguntas();
  }

  getPreguntas(){
    this._preguntaService.getPreguntas().subscribe(
        data => this.preguntas = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['preguntas/add']);
  }
  edit(id){
    this._router.navigate(['preguntas/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete pregunta with Id: " + id);
    if(ans){
      this._preguntaService.deletePregunta(id)
          .subscribe( data=> {
            var index = this.preguntas.findIndex(x=>x.id == id);
            this.preguntas.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
