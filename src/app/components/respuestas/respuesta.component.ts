import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaService } from '../../services/respuesta.service';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html'
})
export class RespuestaComponent implements OnInit {
  preguntas: Array<any> = [];
  respuestaForm: FormGroup;
  title: string = "Agregar";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(
    private _fb: FormBuilder, 
    private _avRoute: ActivatedRoute,
    private _respuestaService: RespuestaService,
    private _preguntaService: PreguntaService,
    private _router: Router) { 
      if(this._avRoute.snapshot.params["id"]){
        this.id = parseInt( this._avRoute.snapshot.params["id"]);
        console.log(this.id);
          this.title = 'Edit';
    }
    this.getPreguntas();
    this.respuestaForm = this._fb.group({
      id: 0,
      descripcion: ['', [Validators.required]],
      puntaje: ['', [Validators.required]],
      respuesta_correcta: ['', [Validators.required]],
      idpregunta: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._respuestaService.getRespuestaById(this.id)
          .subscribe(resp => this.respuestaForm.setValue(resp)
                   , error => this.errorMessage = error);
    }
    
  }

  getPreguntas(){
    this._preguntaService.getPreguntas().subscribe(
        data => this.preguntas = data,
        error => { 
          debugger;
          this.errorMessage = error
        }
    )
  }

  save(){
    debugger;
    if(!this.respuestaForm.valid){
      this.submitted = true;
      return;
    }

    if(this.respuestaForm.value.id == 0){
      this._respuestaService.saveRespuesta(this.respuestaForm.value)
          .subscribe(resId => { this._router.navigate(['respuestas', {id: resId}]);
          }, error => this.errorMessage = error )
          console.log(this.respuestaForm.value.id)
        }
        else{
          this._respuestaService.updateRespuesta(this.respuestaForm.value)
          .subscribe(resId => { this._router.navigate(['respuestas', {id: resId}]);
          }, error => this.errorMessage = error )
        }

  }

  cancel(){
    this._router.navigate(["respuestas", {id: this.id}]);
  }
  
  get descripcion() { return this.respuestaForm.get('descripcion'); }  
  get puntaje() { return this.respuestaForm.get('puntaje'); }  
  get respuesta_correcta() { return this.respuestaForm.get('respuesta_correcta'); }  
  get idpregunta() { return this.respuestaForm.get('idpregunta'); } 
  
}
