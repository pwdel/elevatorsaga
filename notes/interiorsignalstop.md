### Quick Overview

Before getting too far into the code, a review of the overall CSCAN algorithm is warranted to help keep things organized:

![](img/overall_CSCAN_scheduler_diagram.png)

What we have accomplished thus far, is:

* The capability to move the elevator up and down with opposing signal functions, essentially, "check if reached top, middle or bottom," (although really we just checked to see if we are on either the TOP or the BOTTOM).
* The capability to switch directions at top or bottom.

What we need next is,

* "check if stop at next floor," and
* "stop at next floor if needed."

Basically this means adding to the scheduling cue, or rather within javascript terms, this means, "pushing" a value to the front of the scheduling queue array in the event of a signal interruption from either inside or outside of the elevator.  These notes will focus on the inside of the elevator.

### Registering Inside the Elevator Signals

Previously within [crazyland.js](/notes/crazyland.js) we were able to check interior requests with:

```
// Check continuously, interior requests: getPressedFloors - interiorRequests - elevator.getPressedFloors()
//interior requests
elevator.on("floor_button_pressed", function(floorNum) {
  // Maybe tell the elevator to go to that floor?
  console.log('interiorRequests to floorNum: ',floorNum)
});
```

We fund that we are able to indeed display interior floor requests to console with the following dummy function invoked:

```
function dummyFunction(elevator) {
    // invoke elevator function
    // Check continuously, interior requests: getPressedFloors - interiorRequests - elevator.getPressedFloors()
    //interior requests
    elevator.on("floor_button_pressed", function(floorNum) {
      // note interior request floorNum
      interiorFloorNumReq = floorNum
      // Maybe tell the elevator to go to that floor?
      console.log('interiorFloorNumReq: ',interiorFloorNumReq)
    });
}
```

So where does the decision making process for interior requests take place?

* Existing Function
* New Function

Currently, under our, "microcontroller architecture" type paradigm, we have the following functions:

* scanDirectionSetter(~) <-> queueSetter(~)

Where basically these two functions just talk back and fourth to one another.

Logically, the queueSetter should be where the interiorRequests go, with this particular function invoking a helper function to make decision on whether to stop at the next floor, once a, "passing floor" signal is received.  The logic could look something like this:

```
if ( currentFloorNow == TOPFLOOR ) {
    // reset scan direction to down
    // we stop here no matter what so don't worry about interior signals
} else if ( currentFloorNow == BOTTOMFLOOR ) {
    // reset scan direction to up
    // we stop here no matter what so don't worry about interior signals    
} else {
    // we're on a middle floor, do a new if/else function
    if ( floorNumPass == interiorFloorNumReq ) {
      // if we're passing (about to stop at) a requested floor, push in schedule
      queuePusher( interiorFloorNumReq, elevator ) // new function to push to queue
    }
  } // done with all possible conditions
```

Basically, we create a new function whose only purpose is to push an interruptFloor into the queue.  Hypothetically this same function may also be able to push exterior requested floors into the queue, but somehow those may need to be subservient to elevator load logic (e.g. if we're full, don't worry about exterior requests).  This can be treated as a, "later on problem to solve."

### queuePusher( interiorFloorNumReq, elevator ) // new function to push to queue

So prior to creating a full function, let's just create a simple queue pusher function in the IDE.

This logic was built within, "queuePusher.js" as a dummy function

```
...

// push interiorFloorNumReq to queue, regardless of any other directional logic
elevator.destinationQueue = [interiorFloorNumReq];
...

```
So the above methodology simply replaces whatever the last request was with the next most recent request, so if two passengers get on, the most recent passenger's request deletes the old passenger's request. Instead we want to, ["push" the request](https://www.w3schools.com/jsref/jsref_push.asp), as follows:

```
// push interiorFloorNumReq to queue, regardless of any other directional logic
elevator.destinationQueue.push(interiorFloorNumReq);

```

This above pattern does not delete the previous requestor's request, but it also does not look to see if the request was already fullfilled - so if floor F was requested twice, it shows up in the queue as: [F,F], or if twice non-sequentially, [F,...F] which means the elevator will visit the floor needlessly.

This brings up the concept of a dictionary object which was covered in the, "requesttransformer" diagram within [the original planning notes](/notes/notes_20210724.md).

![requesttransformer](/img/requeststransformer_diagram.png)

### Building an Interior Requests Dictionary

The details of building an interior requests dictionary are written about [here](/notes/interiorrequestsdictionary.md) with the build file [here](interiorrequestsdictionary.js).




### if ( floorNumPass == interiorFloorNumReq ) in movingelevatorinteriorrequests.js
