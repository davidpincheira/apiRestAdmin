import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PremioService } from '../../services/premio.service';

@Component({
  selector: 'app-premio-list',
  templateUrl: './premio-list.component.html'
})
export class PremioListComponent implements OnInit {
  premios: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _premioService : PremioService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getPremios();
  }

  getPremios(){
    this._premioService.getPremios().subscribe(
        data => this.premios = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['premios/add']);
  }
  edit(id){
    this._router.navigate(['premios/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete premio with Id: " + id);
    if(ans){
      this._premioService.deletePremio(id)
          .subscribe( data=> {
            var index = this.premios.findIndex(x=>x.id == id);
            this.premios.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
