import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';


//participante
import { ParticipanteListComponent } from './components/participantes/participante-list.component';
import { ParticipanteComponent } from './components/participantes/participante.component';
//pregunta
import { PreguntaListComponent } from './components/preguntas/pregunta-list.component';
import { PreguntaComponent } from './components/preguntas/pregunta.component';
//pregunta
import { RespuestaListComponent } from './components/respuestas/respuesta-list.component';
import { RespuestaComponent } from './components/respuestas/respuesta.component';
//pista
import { PistaListComponent } from './components/pistas/pista-list.component';
import { PistaComponent } from './components/pistas/pista.component';
//grupo
import { GrupoListComponent } from './components/grupos/grupo-list.component';
import { GrupoComponent } from './components/grupos/grupo.component';
//show
import { ShowListComponent } from './components/shows/show-list.component';
import { ShowComponent } from './components/shows/show.component';
//fases
import { FaseListComponent } from './components/fases/fase-list.component';
import { FaseComponent } from './components/fases/fase.component';
//premios
import { PremioListComponent } from './components/premios/premio-list.component';
import { PremioComponent } from './components/premios/premio.component';

//Services
import { PreguntaService } from './services/pregunta.service';
import { ParticipanteService } from './services/participante.service';
import { RespuestaService } from './services/respuesta.service';
import { PistaService } from './services/pista.service';
import { GrupoService } from './services/grupo.service';
import { ShowService } from './services/show.service';
import { FaseService } from './services/fase.service';
import { PremioService } from './services/premio.service';

import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ParticipanteListComponent, NavComponent, OrderByPipe, SearchPipe, ParticipanteComponent, HomeComponent,
    PreguntaListComponent, PreguntaComponent, RespuestaListComponent, RespuestaComponent,
    PistaListComponent, PistaComponent, GrupoListComponent, GrupoComponent, FaseListComponent, FaseComponent,PremioListComponent, PremioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: 'full' },
      { path: "home", component: HomeComponent },
      
      { path: "participantes", component: ParticipanteListComponent },
      { path: "participantes/add", component: ParticipanteComponent },
      { path: "participantes/edit/:id", component: ParticipanteComponent },

      { path: "preguntas", component: PreguntaListComponent },
      { path: "preguntas/add", component: PreguntaComponent },
      { path: "preguntas/edit/:id", component: PreguntaComponent },

      { path: "respuestas", component: RespuestaListComponent },
      { path: "respuestas/add", component: RespuestaComponent },
      { path: "respuestas/edit/:id", component: RespuestaComponent },

      { path: "pistas", component: PistaListComponent },
      { path: "pistas/add", component: PistaComponent },
      { path: "pistas/edit/:id", component: PistaComponent },

      { path: "grupos", component: GrupoListComponent },
      { path: "grupos/add", component: GrupoComponent },
      { path: "grupos/edit/:id", component: GrupoComponent },

      { path: "fases", component: FaseListComponent },
      { path: "fases/add", component: FaseComponent },
      { path: "fases/edit/:id", component: FaseComponent },

      { path: "premios", component: PremioListComponent },
      { path: "premios/add", component: PremioComponent },
      { path: "premios/edit/:id", component: PremioComponent },

      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [ParticipanteService,PreguntaService, RespuestaService,
             PistaService, GrupoService, FaseService, PremioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
