import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { PremioService } from '../../services/premio.service';
import { PistaService } from 'app/services/pista.service';
import { GrupoService } from 'app/services/grupo.service';


@Component({
  selector: 'app-premio',
  templateUrl: './premio.component.html'
})
export class PremioComponent implements OnInit {
  pistas: Array<any> = [];
  grupos: Array<any> = [];
  premioForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _pistaService: PistaService,
    private _grupoService: GrupoService,
    private _premioService: PremioService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }

    this.getPistas();
    this.getGrupos();

    this.premioForm = this._fb.group({
      id: 0,
      nombre: ['', [Validators.required]],
      idgrupo: ['', [Validators.required]],
      idpista: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._premioService.getPremioById(this.id)
          .subscribe(fa => this.premioForm.setValue(fa)
                   , error => this.errorMessage = error);
    }
    
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
    if(!this.premioForm.valid){
      this.submitted = true;
      return;
    }

    if(this.premioForm.value.id == 0){
      this._premioService.savePremio(this.premioForm.value)
          .subscribe(preId => { this._router.navigate(['premios', {id: preId}]);
          }, error => this.errorMessage = error )
          console.log(this.premioForm.value.id)
        }
        else{
          this._premioService.updatePremio(this.premioForm.value)
          .subscribe(preId => { this._router.navigate(['premios', {id: preId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["premios", {id: this.id}]);
  }
  
  get nombre() { return this.premioForm.get('nombre'); }  
  get descripcion() { return this.premioForm.get('descripcion'); }  
  get foto() { return this.premioForm.get('foto'); } 
  get entregado() { return this.premioForm.get('entregado'); }  
  get idgrupo() { return this.premioForm.get('idgrupo'); } 
  get idpista() { return this.premioForm.get('idpista'); } 
  
}
