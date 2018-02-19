import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipanteService } from '../../services/participante.service';

@Component({
  selector: 'app-participante-list',
  templateUrl: './participante-list.component.html'
})
export class ParticipanteListComponent implements OnInit {
  participantes: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _participanteService : ParticipanteService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getParticipantes();
  }

  getParticipantes(){
    this._participanteService.getParticipantes().subscribe(
        data => this.participantes = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['participantes/add']);
  }
  edit(id){
    this._router.navigate(['participantes/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete participante with Id: " + id);
    if(ans){
      this._participanteService.deleteParticipante(id)
          .subscribe( data=> {
            var index = this.participantes.findIndex(x=>x.id == id);
            this.participantes.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
