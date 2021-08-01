### Creating a Main Loop to Switch Between "scandirectionSetter()" and "queueSetter()"

Starting out with just a blank slate:

```
{
    init: function(elevators, floors) {

      // code goes here

    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
```
* If we create a while loop with the condition, "true" - then the program never executes.  E.g. the following placed in, "init" crashes the browser:

```
while (true) {
    // code block to be executed
    console.log('hello world')
}
```

* If we create a one time, "hello world" console log within init, it happens once and that's it.

* However if we put a, "hello world" console log within the, "update" function, it runs as a loop:

```
update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
    console.log("hello world")
}
```

Indefinitely printing out, "hello world" as long as the function runs.

However, if we try to invoke our sub-functions, "scandirectionSetter()" and "queueSetter()" within this, "update:" section, there is a ReferenceError since these functions are not a part of that section of the code.

Instead, we might think of the elevator idle function as a way to create a loop.  E.g. the following functionality always goes to just the top and bottom floor, skipping all other floors.

```
{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Find maximum number of floors, topFloor - NUMFLOORS / TOPFLOOR (for general solution)
        // by convention, start at floor 0 - BOTTOMFLOOR = 0
        const BOTTOMFLOOR = 0;
        // since index starts at 0, topfloor number will be top-1
        const TOPFLOOR = floors.length - 1;


        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            // let's go to all the floors (or did we forget one?)
            elevator.goToFloor(BOTTOMFLOOR);
            elevator.goToFloor(TOPFLOOR);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
```

After testing this, we see that the, elevator.on("idle", function()) is essentially a loop function.
