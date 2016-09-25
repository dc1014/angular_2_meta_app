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

So every input is concatenated with a pipe inserted between. 

But we used the `any` type for `$event` variable. No more strong typing! 

Instead, we have a very convenient `KeyboardEvent` type...which is great. 

And now, we have to cast HTML DOM objects to values...but now the method is "too aware of tempalte details and has too little separation of concerns"

I suppose it means that onKey is assuming stuff about how things will be rendered or whatever? 

## Get user input from a template reference varaiable

So we can actually discard the `$event` variable using *template reference variables*. 

Said vars grant direct access to elements. Preceeded with a # character. 

Example, which implements same user keystroke capture...via loop-back component...

```
@Component({
  selector: 'loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```

So, the magic is that by using the template reference variable of box, and knowing keyup must be initialized to "0", and that it is available from the `.value` property, we get it for free. It does not even bind to the component. 

Why? Because Angular only updates bindings (and therefore the screen) in response to async events...we have to bind to the number "0", to have this work. 

So, how could we capture the keyups in the previous example using a template reference variable? By accessing it in the onKey method...?


Actually, we create the reference variable, and then set the prop name we want on it inside the event binding target.

## Key event filtering (with key.enter)

But what if we just want to capture input after a certain event has happened, say, pressing enter? 

Then we provide the event binding statement the key we want to focus on...

```
@Component({
  selector: 'key-up3',
  template: `
    <input #box (keyup.enter)="values=box.value">
    <p>{{values}}</p>
  `
})
export class KeyUpComponent_v3 {
  values = '';
}
```

Simply creating the data on the component makes it available for binding in the template. 

## On blur 

The above example won't capture input if the user clicks away. Only while the **focus** is inside the input box, can the enter keyup event trigger the event binding target. 

The input box's `blur`, event, can handle this. 

## Summary Example

A list you can add things to! 

The point is to implement blur, keyup on enter, and a click button to add something. 

So let's do it. 

Notice the syntax differences on blur vs keyup.enter and button click. But importantly, they can all reference the template reference variable. 

What does this promote? 

1. Use template variables to refer to elements. This beats having to use CSS. 

2. Pass values, not elements. We could have passed the DOM element to the function...which violated separation of concerns. Here, the component and its function are not aware of the DOM or HTML. 

3. Keep template statements simple. Notice that blur was completed in two lines. 

Consider this, the blur case is an example which *requires* a second statement, since the component has no way to clear the box (it is unaware of the DOM!). Avoid JavaScript in the HTML. 

But, there is another way using NgModel in the Forms chapter...


