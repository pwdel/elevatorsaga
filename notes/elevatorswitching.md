### Attempting to Loop with Simple Functionality

Starting out, we can attempt a simple looping function to attempt to access each elevator as a variable.

```
// get the length of elevators
const ELEVATORSLEN = elevators.length
console.log("ELEVATORSLEN is: ",ELEVATORSLEN)

// loop through elevators and log each one
for (var i = 0; i < ELEVATORSLEN-1; i++) {
    // each elevator at index i
    var elevator = elevators[i];
    console.log("found elevator: ",i,"with identifier ",elevator);

    // Whenever the current elevator is idle (has no more queued destinations) ...
    elevator.on("idle", function() {
        // let's go to all the floors (or did we forget one?)
        elevator.goToFloor(0);
        elevator.goToFloor(1);
    });

} // end ELEVATORSLEN loop
```

* However, since the elevator.on("idle"~) functionality is event-based, the first elevator accessed gets stuck in an infinite loop, not exiting as the elevator is always, "idle." at rest state after reaching a floor.
* One idea is to create an, "escape" function which calls the elevators out of their idle loop, giving the main function a chance to back out and send the same command to another elevator.
* Another idea is to use, ["promises,"](https://www.w3schools.com/js/js_promise.asp) which are asynchronous objects in javascript which suggest a future action.
* Something within javascript scoping which prevents the function from being read properly.

### Scope Method

The following type of logic:

```
for(var i = 0; i < elevators.length; ++i) {
    elevator[i].on("floor_button_pressed",
         function(floorNum){ elevator[i].goToFloor(floornum)});
}
```
> When this anonymous function is invoked, it looks up the value of the 'i' identifier, which will have changed it's value to elevators.length by the end of the loop.

```
for(var i = 0; i < elevators.length; ++i) {
    (function(i){
        elevator[i].on("floor_button_pressed",
            function(floorNum){ elevator[i].goToFloor(floornum)});
    })(i);
}

```
> Whereas the above, creates a new scope, which ensures that 'i' has the value that was passed in.

However we could also use [forEach](https://www.w3schools.com/jsref/jsref_foreach.asp) which is specific to arrays:

```
elevators.forEach(function(elevator, elevatorNumber) {...});
```
Example:

```
const fruits = ["apple", "orange", "cherry"];
fruits.forEach(myFunction);

function myFunction(item, index) {
  text += index + ": " + item + "<br>";
}

```
The following works:

* [elevatorswitching.js](/notes/elevatorswitching.js)

So from here, the next challenge is to integrate this with the overall previously created working version 03.
