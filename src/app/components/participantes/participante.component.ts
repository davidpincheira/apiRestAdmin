import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipanteService } from '../../services/participante.service';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html'
})
export class ParticipanteComponent implements OnInit {
  grupos: Array<any> = [];
  participanteForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _participanteService: ParticipanteService,
    private _grupoService: GrupoService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }

    this.getGrupos();

    this.participanteForm = this._fb.group({
      id: 0,
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      puntaje: ['', [Validators.required]],
      idgrupo: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._participanteService.getParticipanteById(this.id)
          .subscribe(p => this.participanteForm.setValue(p)
                   , error => this.errorMessage = error);
    }
    
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
    if(!this.participanteForm.valid){
      this.submitted = true;
      return;
    }

    if(this.participanteForm.value.id == 0){
      this._participanteService.saveParticipante(this.participanteForm.value)
          .subscribe(pId => { this._router.navigate(['participantes', {id: pId}]);
          }, error => this.errorMessage = error )
          console.log(this.participanteForm.value.id)
        }
        else{
          this._participanteService.updateParticipante(this.participanteForm.value)
          .subscribe(pId => { this._router.navigate(['participantes', {id: pId}]);
          }, error => this.errorMessage = error )
        }

  }


  cancel(){
    this._router.navigate(["participantes", {id: this.id}]);
  }
  
  get nombre() { return this.participanteForm.get('nombre'); }  
  get apellido() { return this.participanteForm.get('apellido'); }  
  get usuario() { return this.participanteForm.get('usuario'); }  
  get puntaje() { return this.participanteForm.get('puntaje'); }  
  get idgrupo() { return this.participanteForm.get('idgrupo'); }  

  
}
