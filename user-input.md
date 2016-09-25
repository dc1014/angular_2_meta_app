# User Input

User input triggers DOM events. We listen to those events with event bindings that funnel updated values back into components and modules. 

Very simple syntax - surround DOM event name in parenthesis and assign a quoted template statement to it. Example, click handler...

`<button (click)="onClickMe()">Click me!</button>`

This signifies the button's click event as the target of the binding...calling the `onClickMe` method of the component...the text on the right is referred to as the *template statement*. 

Beware the template statement's *execution context*. The identifiers appearing within a statemnet belong to a specific context object...usually the component...and in this case it is...


```
@Component({
  selector: 'click-me',
  template: `
    <button (click)="onClickMe()">Click me!</button>
    {{clickMessage}}
  `
})

export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
``` 

And so we get to put that in the app module's declarations, and viola, we can include it in in our app component. 

## Getting User Input from the $event object 

Another event we can listen to is the "keyup event" of an input box, and replay what values are entered. 

e.g.

```
template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>
`
```

Angular makes an event object available in the `$event` variable, which is passed to the `onKey` methods. The data is in there...let's get it out...

```
export class KeyUpComponent_v1 {
  values = '';

  //without strong typing 
  onKey(event: any) { 
    this.values += event.target.value + ' | ';
  }

}
```
