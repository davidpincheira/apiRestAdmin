import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { PistaService } from '../../services/pista.service';
import { FaseService } from '../../services/fase.service';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-pista',
  templateUrl: './pista.component.html'
})
export class PistaComponent implements OnInit {
  fases: Array<any> = [];
  grupos: Array<any> = [];
  pistaForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _pistaService: PistaService,
    private _faseService: FaseService,
    private _grupoService: GrupoService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }
    this.getFases();
    this.getGrupos();
    this.pistaForm = this._fb.group({
      id: 0,
      orden: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idfase: ['', [Validators.required]],
      idgrupo: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._pistaService.getPistaById(this.id)
          .subscribe(pis => this.pistaForm.setValue(pis)
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

  getGrupos(){
    this._grupoService.getGrupos().subscribe(
        data => this.grupos = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  save(){
    debugger;
    if(!this.pistaForm.valid){
      this.submitted = true;
      return;
    }

    if(this.pistaForm.value.id == 0){
      this._pistaService.savePista(this.pistaForm.value)
          .subscribe(pisId => { this._router.navigate(['pistas', {id: pisId}]);
          }, error => this.errorMessage = error )
          console.log(this.pistaForm.value.id)
        }
        else{
          this._pistaService.updatePista(this.pistaForm.value)
          .subscribe(pisId => { this._router.navigate(['pistas', {id: pisId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["pistas", {id: this.id}]);
  }
  
  get orden() { return this.pistaForm.get('orden'); }  
  get descripcion() { return this.pistaForm.get('descripcion'); }  
  get idfase() { return this.pistaForm.get('idfase'); }  
  get idgrupo() { return this.pistaForm.get('idgrupo'); } 
  
}
