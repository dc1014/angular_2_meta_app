# Architecture Overview 

## What's the Point

* Compose HTML templates with *Angularized* markup
* Writing component classes to manage said templates
* Adding application logic in services (hooray)
* Boxing components and services into modules 
* Then you **boostrap the root module** like a boss 

Then, Angular takes the wheel.

Here's a pic of what's in the box:
![Image of Angular Architecture](https://angular.io/resources/images/devguide/architecture/overview2.png)

Clearly, there are 8 main parts:

* Modules - Bundled components and their associated services for the purpose of code hiding 
* Components - Elements which govern how they setup dependencies (dependency injection via the constructor), fetch (ngOnInit, services) and display (templates) data, and call other services via `methods()`.
* Templates - Governs how data is displayed in a component 
* Metadata - an object whose properties describe the module, sort of like a namespace (?), it includes the style (url), the template (url), the selector (<element>), in addition to the providers (services!)
* Data Binding - Determine how you want data to flow between the Angular Component and the DOM. Interpolation 
* Directives
* Services
* Dependency Injection 

## Modules

Angular modules == NgModules

Every app has a root module, conventionally named `AppModule`.

Apps then have *feature modules*, each dedicated to an application domain, workflow, or set of capabilities. 

An Angular module is a class with an `@NgModule` decorator. 

The metadata goes in the decorator. Examples of important properties include:

* `declarations` - the *view classes* that belong to this module. Three kinds - components, directives, and pipes.
* `exports` - the subset of declarations that should be visisble and usable in the component templates of other modules 
* `imports` - other modules whose exported classes are needed by component templates declared in *this* module.
* `bootstrap` - the main application view, aka root component, that hosts all other app views. 

An example root module:

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Export is not necessary.

It's a good idea to bootstrap the root module in a `main.ts`, where you can specify platform details...

```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Angular modules have nothing to do with JavaScript modules, but they are complemenatry. 

### Libraries 

The native JavaScript modules with the `@angular` prefix. Install via npm and import them. 

## Components 

This is equivalent to a *view*. Some examples:

* app root with nav links
* lists of things
* thing editor 

Components have properties, and can be data or methods which sets attributes on properties. 

Example:

```
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
}
```

Angular messes with the dom, and you can take advantage of lifecycle hooks, such as `ngOnInit()`

## Templates 

Form that tells angular how to render the component. Makes sense for it to be an HTML file:

```
<h2>Hero List</h2>
<p><i>Pick a hero from the list</i></p>
<ul>
  <li *ngFor="let hero of heroes" (click)="selectHero(hero)">
    {{hero.name}}
  </li>
</ul>
<hero-detail *ngIf="selectedHero" [hero]="selectedHero"></hero-detail>
```

Includes structural directives, properties, events, and bidirectional data binding, in addition to other components

Nesting component's creates a child...grandchild...relationship.

## Metadata

Tells angular how to process a class. Uses the `@Component` decorator: 

```
@Component({
  selector:    'hero-list',
  templateUrl: 'app/hero-list.component.html',
  providers:   [ HeroService ]
})
export class HeroListComponent implements OnInit {
/* . . . */
}
```

* `selector`: CSS selector that tells Angular to create and insert an instance of the component where it finds the matching name. 

* `templateUrl` - address of component's HTML template

* `directives` - array of components or directives that this template requires. For example, nested components must go here.

* `providers` - array of dependency injection providers for services that the component requiers. 

This is the metadata. `@Injectable`, `@Input`, `@Output` are other metadata decorators. 

## Data Binding 

Coordinates parts of a template with parts of a component. Four forms...

```
<li>{{hero.name}}</li>
<hero-detail [hero]="selectedHero"></hero-detail>
<li (click)="selectHero(hero)"></li>
```

1. Interpolation - from component to DOM {{}}

2. Property Binding - from component to DOM. passes value of `selectedHero` to the hero property of the `HeroDetailComponent`.

3. Event Binding. from DOM to component. Calls the matching event method on (event)

4. Two Way Data Binding - `ngModel` directive. [()]. This allows properties to flow from the component and allows changes back into the component.

Processes all data binding onces per JS event cycle, from the root to the deepest leaves. 

Data binding is not only used for template/component data passing, but also for communication between parent and child components. 

## Directives 

