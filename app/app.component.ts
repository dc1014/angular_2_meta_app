import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

// now we bind the RouterLink directive to a string that tells the router where to nav to
// it's a one-time binding to our route path, since its not dynamic

// routerLinkActive directive adds a class to HMTL nav element

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}
