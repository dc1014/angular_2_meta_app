import './rxjs-extensions';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService} from './in-memory-data.service';

import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService }         from './hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { routing } from './app.routing';
import { Logger } from './logger.service';
import { ClickMeComponent } from './click-me.component';
import { KeyUpComponent_v1, KeyUpComponent_v2, KeyUpComponent_v3, KeyUpComponent_v4, } from './keyup.component';
import { LoopbackComponent } from './loop-back.component';
import { LittleTourComponent } from './little-tour.component';

// in memory web api module replaces default HTTP client backend with in-memory web API

// also need to add update and delete methods against persistent backend

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    ClickMeComponent,
    KeyUpComponent_v1,
    KeyUpComponent_v2,
    KeyUpComponent_v3,
    KeyUpComponent_v4,
    LoopbackComponent,
    LittleTourComponent,
  ],
  providers: [
    HeroService,
    Logger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
