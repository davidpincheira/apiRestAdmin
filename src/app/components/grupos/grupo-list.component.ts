import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html'
})
export class GrupoListComponent implements OnInit {
  grupos: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _grupoService : GrupoService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getGrupos();
  }

  getGrupos(){
    this._grupoService.getGrupos().subscribe(
        data => this.grupos = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['grupos/add']);
  }
  edit(id){
    this._router.navigate(['grupos/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete grupo with Id: " + id);
    if(ans){
      this._grupoService.deleteGrupo(id)
          .subscribe( data=> {
            var index = this.grupos.findIndex(x=>x.id == id);
            this.grupos.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
