import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FaseService } from '../../services/fase.service';

@Component({
  selector: 'app-fase-list',
  templateUrl: './fase-list.component.html'
})
export class FaseListComponent implements OnInit {
  fases: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _faseService : FaseService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getFases();
  }

  getFases(){
    this._faseService.getFases().subscribe(
        data => this.fases = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['fases/add']);
  }
  edit(id){
    this._router.navigate(['fases/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete fase with Id: " + id);
    if(ans){
      this._faseService.deleteFase(id)
          .subscribe( data=> {
            var index = this.fases.findIndex(x=>x.id == id);
            this.fases.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
