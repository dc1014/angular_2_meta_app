# Forms 

Angular forms are for data entry, surprise. That means validation, controls, changes, and errors are handled here. 

Thus, we will:

1. Build a component with a form in its template 
2. use two-way data binding via ([ngModel]) syntax for reading and writing values to input controls 
3. track the change state and validity of form controls using `ngModel` in combination with a form
4. provide strong visual feedback using special CSS classes that track the state of the controls 
5. display validation errors to users and enable/disable form controls. 
6. use template reference variables for sharing information among various HTML elements...

Here we go.

## Template Driven Forms 

There are other ways to create forms then those described here, but this is what you get for now. 

So, surprise, we're going to make a hero form. Here's the game plan:

1. Create a model (we already have one so let's amend it)
2. Create the "component that controls the form"
3. Create a template with the initial form layout
4. Bind data properties to each form input control with the `ngModel` two-way data binding syntax. 
5. Add the `name` attribute to each form input control
6. Add custom CSS to provide visual feedback
7. Show and hide validation error blurps
8. Handle form submission with `ngSumbmit` how exciting wow
9. Disable the form's submit button until the form am become valid

## Setup 

So now the class uses a constructor instead of directly exporting an object. 

The TypeScript compiler generates a public field for each `public` constructor parameter and assigns the parameter's value to that field automatically when we create new heroes. 

Note the optional `?` type.

So now we get:

```
let myHero =  new Hero(42, 'SkyDog',
                       'Fetch any object at any distance',
                       'Leslie Rollover');
console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"

```
## Create a Form Component 

Okay cool. So now that we can make heroes with this new public interface, we gonna make `hero-form.compoent.ts` file. 

So what's with the new `moduleId` thing in the component? 

"The moduleId: module.id property sets the base for module-relative loading of the templateUrl."

Ok, cool not sure what that entails. 
 
Also we mocked out a bunch of choices but it's cool. 

Hey look, some diagnostic function. Seems interesting...

```
import { Component } from '@angular/core';
import { Hero }    from './hero';
@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
```

So now we need to revise the app module to include the forms module, and also import/declare the hero form component. 

We also need to revise the app component to include the form. 

Still need the html for it. Notice that it:

1. goes inside a container div
2. has a h1 header inside div
3. uses the form element
4. creates divs per label/input group 
5. note use of `required` HTML attribute 
6. creates submit button which does not call a function yet 
6. has bootstrap css on the stuff which was installed via npm, and references `node_modules`

## Adding Powers with *ngFor 

So we have an array of powers, and we want someone to select from the list. Good thing there is a `select` element which we can bind our options to, using `*ngFor`

Here's the idea:

```
<div class="form-group">
  <label for="power">Hero Power</label>
  <select class="form-control" id="power" required>
    <option *ngFor="let p of powers" [value]="p">{{p}}</option>
  </select>
</div>

```

Notice that `powers` refers to the array we created in the component, and we interpolate what that power is. But what about the `[value]="p"` line? 

### Two way data binding 

Notice that the default info doesn't populate, because we haven't bound the `Hero` to it yet. 

We could use prpoerty binding, and listen to events for user input. But what if we need both at the same time?

Enter `[(ngModel)]`.

```
<input type="text"  class="form-control" id="name"
       required
       [(ngModel)]="model.name" name="name">
  TODO: remove this: {{model.name}}
```

The last bit is diagnostics, but the point is that the `ngModel` call references the prop we want to work with, and gives it a `name` attribute which must be unique. 

Some other notes

* Each input element has an id property that is used by the label element's for attribute to match the label to it's input control.
* Each input element has a name property that is required by Angular Forms to register the control with the form.


### Inside the `[(ngModel)]`

Notice we use the one way prop binding with `[]`, which goes from model to view.

And notice that `()` is for event binding, from view to the model. The target prop is what goes in the `()`.

So we throw them together. The following is actually equivalent...

```
<input type="text" class="form-control" id="name"
       required
       [ngModel]="model.name" name="name"
       (ngModelChange)="model.name = $event" >
  TODO: remove this: {{model.name}}
```

But what's going on with that event binding? Well `ngModelChange` is certainly not an `<input>` element event. It's actually an event prop of `ngModel` directive. In other words, [(x)] implies `x` directive with `x` input prop and `xChange` output prop. 

Also notice that `$event` object comes from a DOM Event usually. `ngModelChange` prop doesnt produce a DOM event, it's an Angular `EventEmitter` prop that returns input box value when it fires events. So we gave it the `name` prop. 

We should split the binding if we have to do somethign special, such as debounce or throttle keystrokes. 

### Track Change-state and Validity 

So we want to know about the state of controls on our form.

`ngModel` thankfully provides all these issues, if user tocuhes the control, if values changed, if the value becomes invalid.

`ngModel` not only tracks state, it updates control with special Angular css classes that reflect state. Let's leverage these:

```
State Class if true Class if false
Control has been visited  ng-touched  ng-untouched
Control's value has changed ng-dirty  ng-pristine
Control's value is valid  ng-valid  ng-invalid
```

To demonstrate, consider a template ref var named `#spy`

```
<input type="text" class="form-control" id="name"
  required
  [(ngModel)]="model.name" name="name"
  #spy >
<br>TODO: remove this: {{spy.className}}
```
Great, that `ng-valid | ng-invalid` pair are really useful. Want to send a strong visual signal for these, so we add custom css. 

Notice this:

```
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

### Show and Hide Validation Error Messages

So, right now the form doesn't tell you exactly what's wrong. Take advantage of the `ng-invalid` class to reveal a helpful message.

To achieve this,

1. we use a template ref var
2. the "is required" message in a nearby div which will display iff the control is invalid 

```
<label for="name">Name</label>
<input type="text" class="form-control" id="name"
       required
       [(ngModel)]="model.name" name="name"
       #name="ngModel" >
<div [hidden]="name.valid || name.pristine" 
     class="alert alert-danger">
  Name is required
</div>
```

Why do we say `#name="ngModel"`? Because `ngModel` directive has an `exportAs` prop named `ngModel`. We say that `[hidden]` only applies when `.valid` is true, or `name.pristine` is true.

Alternatively, we can not hide on the `pristine` state, so we don't show the error until the component has been touched. 

### Add a hero and reset the form 

So, we need to rig the `submit` button to add a hero and bind the component method to the click event, i.e.

```
<button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
```

and our method

```
newHero() {
  this.model = new Hero(42, '', '');
}
```

So notice that the form clears after hitting the new hero button. 

BUT! We did not restore the pristine state of the control. Why? Because Angular cannot distinguish between replacing entire hero and clearing the `name` prop. Makes no assumptions. leaves in current state. 

We need to reset form controls with a "trick". We add an `active` flag and set it to `true`. When we add a new hero, `active` is set to `false` and immediately back to true with a quick `setTimeout`. 

Then, we bind the form element to the active flag, `<form>*ngIf="active">

This has the effect of removing the form from the DOM, and then adding it back with pristine state.

### Submit the form with `ngSubmit`

So, how do we control the submission process of this form? 

Right now, it does nothing but trigger a form submit, because of `type="submit"`.

So, we can give the form itself a directive of `NgSubmit` and bind it to the component's `submit()` method...

We also gave a template ref var `#heroForm` and initialized it with `ngForm`.

`heroForm` now references `NgForm` as a whole. 

What is `NgForm`? It's attached to `<form>` tags automagically. Holds controls, attributes, and monitors props. Has a valid prop which is true iff every contained control is valid...

 Which means we get to reference the `.form.valid` prop on it to disable the submit button. 

`<button type="submit" class="btn btn-default" [disabled]="!heroForm.form.valid">Submit</button>
`

pretty cool.

### Toggle two form regions 

Now, let's hide the data entry part and show something else. We can hide our form, and bind the hidden prop to the submitted prop...

So when we set the div's `[hidden]` prop to the submitted state, the form disappears after submission. 

Now, we can add to the template to show what was submitted instead...

```
<div [hidden]="!submitted">
  <h2>You submitted the following:</h2>
  <div class="row">
    <div class="col-xs-3">Name</div>
    <div class="col-xs-9  pull-left">{{ model.name }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Alter Ego</div>
    <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
  </div>
  <div class="row">
    <div class="col-xs-3">Power</div>
    <div class="col-xs-9 pull-left">{{ model.power }}</div>
  </div>
  <br>
  <button class="btn btn-default" (click)="submitted=false">Edit</button>
</div>
```
