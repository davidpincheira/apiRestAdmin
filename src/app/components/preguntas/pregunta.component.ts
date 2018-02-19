import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';
import { PistaService } from 'app/services/pista.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html'
})
export class PreguntaComponent implements OnInit {

  pistas: Array<any> = [];
  preguntaForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _preguntaService: PreguntaService,
    private _pistaService: PistaService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
        }
    this.getPistas();
    this.preguntaForm = this._fb.group({
      id: 0,
      pregunta: ['', [Validators.required]],
      puntos_inicial: ['', [Validators.required]],
      cant_lecturas_max: ['', [Validators.required]],
      puntaje_actual: ['', [Validators.required]],
      descuento_lectura: ['', [Validators.required]],
      cant_lectura_actual: ['', [Validators.required]],
      idpista: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._preguntaService.getPreguntaById(this.id)
          .subscribe(resp => this.preguntaForm.setValue(resp)
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

  save(){
    debugger;
    if(!this.preguntaForm.valid){
      this.submitted = true;
      return;
    }

    if(this.preguntaForm.value.id == 0){
      this._preguntaService.savePregunta(this.preguntaForm.value)
          .subscribe(preId => { this._router.navigate(['preguntas', {id: preId}]);
          }, error => this.errorMessage = error )
          console.log(this.preguntaForm.value.id)
        }
        else{
          this._preguntaService.updatePregunta(this.preguntaForm.value)
          .subscribe(preId => { this._router.navigate(['preguntas', {id: preId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["preguntas", {id: this.id}]);
  }
  
  get pregunta() { return this.preguntaForm.get('pregunta'); }  
  get puntos_inicial() { return this.preguntaForm.get('puntos_inicial'); }  
  get cant_lecturas_max() { return this.preguntaForm.get('cant_lecturas_max'); }  
  get descuento_lectura() { return this.preguntaForm.get('descuento_lectura'); } 
  get cant_lectura_actual() { return this.preguntaForm.get('cant_lectura_actual'); } 
  get puntaje_actual() { return this.preguntaForm.get('puntaje_actual'); } 
  get idpista() { return this.preguntaForm.get('idpista'); } 
  
}
