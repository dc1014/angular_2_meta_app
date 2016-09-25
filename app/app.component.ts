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
    <click-me></click-me>
    <br>
    <h2>Keyup1</h2>
    <key-up1></key-up1>
    <h2>Keyup2</h2>
    <key-up2></key-up2>
    <h2>Keyup3</h2>
    <key-up3></key-up3>
    <h2>Keyup4</h2>
    <key-up4></key-up4>
    <br>
    <h2>Loopback</h2>
    <loop-back></loop-back>
    <little-tour></little-tour>

  `,
  styleUrls: ['app/app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
}
