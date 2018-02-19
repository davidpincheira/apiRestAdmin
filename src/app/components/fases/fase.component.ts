import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { FaseService } from '../../services/fase.service';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html'
})
export class FaseComponent implements OnInit {
  faseForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _faseService: FaseService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }

    this.faseForm = this._fb.group({
      id: 0,
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      url_web: ['', [Validators.required]],
      url_app: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._faseService.getFaseById(this.id)
          .subscribe(fa => this.faseForm.setValue(fa)
                   , error => this.errorMessage = error);
    }
    
  }

  save(){
    debugger;
    if(!this.faseForm.valid){
      this.submitted = true;
      return;
    }
    
    if(this.faseForm.value.id == 0){
      this._faseService.saveFase(this.faseForm.value)
          .subscribe(faId => { this._router.navigate(['fases', {id: faId}]);
          }, error => this.errorMessage = error )
          console.log(this.faseForm.value.id)
        }
        else{
          this._faseService.updateFase(this.faseForm.value)
          .subscribe(faId => { this._router.navigate(['fases', {id: faId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["fases", {id: this.id}]);
  }
  
  get nombre() { return this.faseForm.get('nombre'); }  
  get descripcion() { return this.faseForm.get('descripcion'); }  
  get url_web() { return this.faseForm.get('url_web'); }  
  get url_app() { return this.faseForm.get('url_app'); } 
  
}
