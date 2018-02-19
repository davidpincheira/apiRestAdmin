import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { FaseService } from '../../services/fase.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
  fases: Array<any> = [];
  showForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _showService: ShowService,
    private _faseService: FaseService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }

    this.getFases();

    this.showForm = this._fb.group({
      id: 0,
      nombre: ['', [Validators.required]],
      votos: ['', [Validators.required]],
      idfase: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._showService.getShowById(this.id)
          .subscribe(sh => this.showForm.setValue(sh)
                   , error => this.errorMessage = error);
    }
    
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

  save(){
    debugger;
    if(!this.showForm.valid){
      this.submitted = true;
      return;
    }

    if(this.showForm.value.id == 0){
      this._showService.saveShow(this.showForm.value)
          .subscribe(shId => { this._router.navigate(['shows', {id: shId}]);
          }, error => this.errorMessage = error )
          console.log(this.showForm.value.id)
        }
        else{
          this._showService.updateShow(this.showForm.value)
          .subscribe(shId => { this._router.navigate(['shows', {id: shId}]);
          }, error => this.errorMessage = error )
        }

  }


  cancel(){
    this._router.navigate(["shows", {id: this.id}]);
  }
  
  get nombre() { return this.showForm.get('nombre'); }  
  get votos() { return this.showForm.get('votos'); }  
  get idfase() { return this.showForm.get('idfase'); }  
  
}
