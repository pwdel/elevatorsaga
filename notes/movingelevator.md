## Debugging movingelevator.js

### ReferenceError: floorNum is not defined

> There is a problem with your code: ReferenceError: floorNum is not defined

```
at scandirectionSetter (eval at getCodeObjFromCode (https://play.elevatorsaga.com/base.js:77:11), :57:13)
at Object.init (eval at getCodeObjFromCode (https://play.elevatorsaga.com/base.js:77:11), :74:25)
```

* [Mozilla Developer Guide on Javascript ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined)

> The JavaScript exception "variable is not defined" occurs when there is a non-existent variable referenced somewhere.

Basically, floorNum does not exist in this specified location at the bottom:

```
// reset the dominant scan direction, scanDirection, if reached opposite floor
scandirectionSetter = function(TOPFLOOR, BOTTOMFLOOR, elevator){

    // check floor we are just about to pass
    // this gets triggered just previous to a floor being passed, in case stop is needed
    elevator.on("passing_floor", function(floorNum, direction) {
        // print the passing floor
        console.log('passingFloorNum: ',floorNum)
        // we now have the floorNum
    });

    // if we reached the TOPFLOOR, re-set scanDirection
    if ( floorNum == TOPFLOOR) {
```

* We could try generating floorNum outside of the function and then passing it into the function as a variable.

This worked!  floorNum passed to console.

### Elevator Moving to the Top, Not Changing Direction

* The variable floorNum does not seem to pass into the custom function, scandirectionSetter().

If we look at the type of the variable:

```
console.log('variable generated passingFloorNum: ',typeof floorNumPass)
```

the output is, "object" - looking further, the object type appears to be an array. The way to access arrays in javascript is:

```
arr[0];
```

Going back to the original function and attempting to print to console:

```
// check floor we are just about to pass
// this gets triggered just previous to a floor being passed, in case stop is needed
elevator.on("passing_floor", function(floorNum, direction) {
    // assign variable
    floorNumPass = floorNum;
    // print the direction
    console.log('direction: ',direction)
});

console.log('passing floorNumPass : ',floorNumPass)
```
The above notes, "undefined" within the console log.

```
// attempt to detect floorNum to be able to print to console
var floorNumPass = floorNumDetect()
console.log('passing floorNumPass : ',floorNumPass)
```
The above throws an error, "floorNumDetect is not a function."

So what is it?

```
console.log('floorNumDetect type : ',typeof floorNumDetect)
```
...shows output, "object." But what are the properties of this object?

```
console.log('floorNumDetect object property names : ',floorNumDetect.getOwnPropertyNames())
```
...displays error:

> World raised code error TypeError: floorNumDetect.getOwnPropertyNames is not a function at Object.init

We can try, "keys" - by using "console.log('floorNumDetect object property names : ',Object.keys(floorNumDetect))" - we get:

```
0: "on"
1: "off"
2: "one"
3: "trigger"
4: "destinationQueue"
5: "checkDestinationQueue"
6: "goToFloor"
7: "stop"
8: "getFirstPressedFloor"
9: "getPressedFloors"
10: "currentFloor"
11: "maxPassengerCount"
12: "loadFactor"
13: "destinationDirection"
14: "goingUpIndicator"
15: "goingDownIndicator"
```
Note that the event "passingFloor" is different than, "currentFloor."

passingFloor, by definition:

> Triggered slightly before the elevator will pass a floor. A good time to decide whether to stop at that floor. Note that this event is not triggered for the destination floor. Direction is either "up" or "down".

Therefore, since we created, floorNumDetect as an object based upon the, "passingFloor" event, the, "floorNum" should correspond to having just been triggered.  However, setting a variable this way does not seem to be the main way to do this within Javascript.

[This article](https://forum.freecodecamp.org/t/update-global-var-inside-a-function/293752/4) goes through a mechanism to listen for an "event," and change a variable using something called, "getters and setters."

### Getting Proper Floor Reporting Variables

There are two main types of variables which could hypothetically be created out of the, "passing floor" function - a function with empty parameters (in the below shown as floorNumDetect), or an actual number showing the passing floors (floorNumPass).

```
// ----------> EVENT VARIABLE GENERATION <----------

// Generate floorNum, prior to elevator passing floor
// check floor we are just about to pass
// this gets triggered just previous to a floor being passed, in case stop is needed
floorNumDetect = elevator.on("passing_floor", function(floorNum, direction) {
    // assign variable
    var floorNumPass = floorNum;
    // print the passing floor
    console.log('event detected inside function...floorNumPass: ',floorNumPass)
    // print the direction
    // console.log('direction: ',direction)
    return floorNumPass
});

// ***** TESTING EVENT VARIABLES *****

// attempt to detect floorNum to be able to print to console outside of function
// floorNumDetect gives you an object representing the function with a number of empty properties
console.log('floorNumDetect, outside of function is: ',floorNumDetect)

// floorNumDetect gives you the number of the floor recently passed (but not stopped at)
// note - this does not give the last floor
console.log('floorNumPass, outside of function is: ',floorNumPass)
```

floorNumPass is really what we are looking for, however there is a problem inherent in our previous code design in that it can only detect the second to last floor on either top or bottom side, so our switching logic will need to be adjusted.

### Creating a Main Loop to Switch Between "scandirectionSetter()" and "queueSetter()"

Basically we would like to create a while loop which just runs while the program runs, or a for loop that runs for a fixed number of seconds.

Note that the actual, "currentfloor" can be detected with:

```
if(elevator.currentFloor() === 0) {
    // Do something special?
}
```
of course note that elevator would need to be passed into a function to be able to do this.

#### Breaking Down and Simplifying Problem

Side discussion on this has been continued under [these notes](/notes/mainloop.md).

#### Attempting to Add to update:{}

The below did not work because the functions are not callable within "update:"

```
update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
    // ----------> MAIN ROUTINE <----------
    // Loop between scanDirection and queueSetter


    // check and switch principal scan direction if reached either top or bottom
    scanDirection = scandirectionSetter(TOPFLOOR, BOTTOMFLOOR, floorNumPass)

    // elevator.destinationQueue and elevator.checkDestinationQueue()
    queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)

}
```
### Using floornumpass.js to Ensure Function Accesses FloorNumber

* [floornumpass.js](/notes/floornumpass.js) shows that the floor number can be extracted and accessed within a dummy function, as long as "elevator" is passed to that function.
* Utilizing this principal, we can feed elevator into [movingelevator.js](/notes/movingelevator.js).

Using the elevator as a passed object, the function is able to read floor numbers.

However, if we use only the, "floorNumPass" variable, the elevator never leaves the first floor because it's never, "passing" the first floor.

### Setting and Utilizing currentFloorNow as a Variable to Move Elevator

Adding the following into [movingelevator.js](/notes/movingelevator.js) to finalize the up and down scan movement works.

```
// finding current floor
// getting the current floor
var currentFloorNow = elevator.currentFloor();
console.log('currentFloorNow is: ',currentFloorNow)
```
