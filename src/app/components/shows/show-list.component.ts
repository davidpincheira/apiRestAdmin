import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html'
})
export class ShowListComponent implements OnInit {
  shows: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _showService : ShowService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getShows();
  }

  getShows(){
    this._showService.getShows().subscribe(
        data => this.shows = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['shows/add']);
  }
  edit(id){
    this._router.navigate(['shows/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete show with Id: " + id);
    if(ans){
      this._showService.deleteShow(id)
          .subscribe( data=> {
            var index = this.shows.findIndex(x=>x.id == id);
            this.shows.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
