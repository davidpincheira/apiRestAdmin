import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html'
})
export class GrupoComponent implements OnInit {
  grupoForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _grupoService: GrupoService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }

    this.grupoForm = this._fb.group({
      id: 0,
      numero: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._grupoService.getGrupoById(this.id)
          .subscribe(gru => this.grupoForm.setValue(gru)
                   , error => this.errorMessage = error);
    }
    
  }

  save(){
    debugger;
    if(!this.grupoForm.valid){
      this.submitted = true;
      return;
    }

    if(this.grupoForm.value.id == 0){
      this._grupoService.saveGrupo(this.grupoForm.value)
          .subscribe(gruId => { this._router.navigate(['grupos', {id: gruId}]);
          }, error => this.errorMessage = error )
          console.log(this.grupoForm.value.id)
        }
        else{
          this._grupoService.updateGrupo(this.grupoForm.value)
          .subscribe(gruId => { this._router.navigate(['grupos', {id: gruId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["grupos", {id: this.id}]);
  }
  
  get numero() { return this.grupoForm.get('numero'); }  
  get descripcion() { return this.grupoForm.get('descripcion'); }  
  
}
