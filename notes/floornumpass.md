### There is a problem with your code: ReferenceError: floorNumPass is not defined

Basically, when attempting to invoke floorNumPass, we now get a reference error, for some reason.

```
// floorNumDetect gives you the number of the floor recently passed (but not stopped at)
// note - this does not give the last floor
console.log('floorNumPass, outside of function is: ',floorNumPass)
```

The challenge is to be able to invoke this floorNumPass inside another function.

#### Function Invocation in Javascript

```
function myFunction(a, b) {
  return a * b;
}
myFunction(10, 2);           // Will return 20
```

Creating a dummy function, which fires when the elevator moves up and down:

```
{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        // ----------> EVENT VARIABLE GENERATION <----------

        function dummyFunction(elevator) {
            // invoke elevator function
            elevator.on("passing_floor", function(floorNum, direction) {
                console.log('printing floorNum in dummyFunction',floorNum)
            });
        }

        // move the elevator up and down
        elevator.on("idle", function() {
            elevator.goToFloor(4);
            elevator.goToFloor(0);         
        });

        // invoke dummyFunction
        dummyFunction(elevator)


    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
```

The above function prints out the floornumber as the floor is passed, which shows that passing the elevator objet into a function can allow a floornumberpassed function to be invoked.

Given this, we can use the same technique to obtain the floorNumPass variable inside of other functions by using "elevator" as an input to said variable.
