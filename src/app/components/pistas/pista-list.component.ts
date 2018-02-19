import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-pista-list',
  templateUrl: './pista-list.component.html'
})
export class PistaListComponent implements OnInit {
  pistas: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _pistaService : PistaService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getPistas();
  }

  getPistas(){
    this._pistaService.getPistas().subscribe(
        data => this.pistas = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['pistas/add']);
  }
  edit(id){
    this._router.navigate(['pistas/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete pista with Id: " + id);
    if(ans){
      this._pistaService.deletePista(id)
          .subscribe( data=> {
            var index = this.pistas.findIndex(x=>x.id == id);
            this.pistas.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
