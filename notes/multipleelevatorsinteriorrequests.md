### Integrating the Following (Setup)

* [movingelevatorwithhelpers.js](/notes/movingelevatorwithhelpers.js)
* [elevatorswitching.js](/notes/elevatorswitching.js)

into:

* [multipleelevatorsinteriorrequests.js](/notes/multipleelevatorsinteriorrequests.js)
* [multipleelevatorsinteriorrequests.md](/notes/multipleelevatorsinteriorrequests.md)

### TOPFLOOR Not Calculating

The first problem we run into is TOPFLOOR not calculating. This was handled by adding the appropriate variables into the function call, (elevators, floors):

```
elevators.forEach(eachElevatorFunction(elevators, floors));
```
### Usercode error on update TypeError: elevator.currentFloor is not a function

After the above problem is solved, we get another error:

```
Usercode error on update TypeError: elevator.currentFloor is not a function
```
This is likely from the "testing variables section" which is not really needed.

```
// getting the current floor
var currentFloorNow = elevator.currentFloor();
console.log('currentFloorNow is: ',currentFloorNow)
```
So we can take this out.  After taking this out, we no longer get the error.

### Usercode error on update TypeError: elevator.on is not a function

We get the above error, pointing to the below code line.

```
elevator.on("idle", function() {
    // invoking idle
    console.log(" --> idle loop function <-- ")
    // check and switch principal scan direction if reached either top or bottom
    scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)
    // elevator.destinationQueue and elevator.checkDestinationQueue()
    queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator,interiorRequestsDict)
```

elevator.on is a critical code and it's unclear why this would not work.

Looking closer at the console output, we see:

> input elevators:  (2) [{…}, {…}]

This seems to show that "elevators" is showing up as 2 distinct objects within the function, rather than one. So when we set "var elevator = elevators" we are really setting elevators two objects rather than one distinct object at a time.

The command, "forEach" is supposed to be for arrays however if we run:

> console.log("elevators typeof is: ",typeof(elevators))

> elevators typeof is:  object
