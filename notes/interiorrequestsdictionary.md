### Interior Requests Dictionary

The build file for this is [interiorrequestsdictionary.js](/notes/interiorrequestsdictionary.js).

The logic behind the dictionary as opposed to an array for interior requests is that an array creates a linear string of requests regardless of when they came in, when in reality a floor may need to be visited merely once and then cleared.

### Javascript Dictionaries

Javascript does not actually have dictionaries as in python, but rather it has [javascript objects](https://www.w3schools.com/js/js_objects.asp).

Example declaration:

```
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

In our scenario, we would like a dictionary to represent all pending interior requests which have not yet been cleared from the queue.

```
const interiorRequests = {
  0: 0,
  1: 1,
  2: 2,
  3: 3
};
```

Of course, there could be a dynamic number of interior requests which occur, and it would be necessary to build an interiorRequests object to fit the number of floors that actually exist, e.g. for the keys to fit the numbers of the floors.

While it is [possible to dynamically create keys](https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object), unlike with Python, [the key names must be interpreted as strings](https://stackoverflow.com/questions/3633362/is-there-any-way-to-use-a-numeric-type-as-an-object-key).

To dynamically create a list of all floors, we need a for loop which loops through an object.  That can be done [as shown](https://stackoverflow.com/questions/2383484/how-to-create-a-dynamic-object-in-a-loop):

```
...
const TOPFLOOR = floors.length - 1; // top floor

var interiorRequestsDict = {};

for (var x = 0; x < TOPFLOOR+1; x++) {
    // property name is x, or the number of the floor
    // value of each object starts as zero
    interiorRequestsDict[x] = 0;
}

// log to console to ensure was created correctly
console.log('interiorRequestsDict: ',interiorRequestsDict)
...
```

The above dynamically initializes a dict object, as shown in the console:

```
interiorRequestsDict:  {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
```

Of course this needs to happen inside of a function, so we build a dummy function example to ensure that it works.  After initializing an interorRequestsDict to zero at the top of the file, the following is added to the dummyFunction:

```
function dummyFunction( elevator, interiorRequestsDict ) {
    // invoke elevator function
    elevator.on("passing_floor", function(floorNum, direction) {
        console.log('printing floorNum in dummyFunction',floorNum)
    });
    // log to console to ensure was created correctly
    console.log('interiorRequestsDict: ',interiorRequestsDict)

}
```
...which if called within an idle loop below prints out the interiorRequestsDict with values all corresponding to zero.

The next trick is getting that dict to fill with actual values from the interiorRequests array.  We had successfully built this array as discussed in [interiorsignalstop.md](/notes/interiorsignalstop.md) previously:

```
//interior requests
elevator.on("floor_button_pressed", function(floorNum) {
  // note interior request floorNum
  interiorFloorNumReq = floorNum
  // Maybe tell the elevator to go to that floor?
  console.log('interiorFloorNumReq: ',interiorFloorNumReq)
});
```

So now it's a matter of extracting the value, interiorFloorNumReq, and adding it into our dictionary, and then deleting it if the request was satisfied by the elevator stopping at a given floor.

Starting out, we can figure out how to extract a value and add it to the interiorRequestsDict:

```
function dummyFunction( elevator, interiorRequestsDict ) {

  // invoke elevator function
  elevator.on("passing_floor", function(floorNum, direction) {
      console.log('printing floorNum in dummyFunction',floorNum)
  });

  // sample interior requests
  elevator.on("floor_button_pressed", function(floorNum) {
    // note interior request floorNum
    interiorFloorNumReq = floorNum
    // Maybe tell the elevator to go to that floor?
    console.log('interiorFloorNumReq: ',interiorFloorNumReq)
  });

  // add interiorFloorNumReq to requisite position in interiorRequestsDict
  // javascript objects are accessed by keys which are strings.

  // convert current floor number request to a string
  // interiorFloorNumberString variable
  var interiorFloorNumberString = interiorFloorNumReq.toString()

  // access the value at key interiorFloorNumberString, set to "1" (on)
  interiorRequestsDict[interiorFloorNumberString] = 1;

  // log to console to ensure was created correctly
  console.log('interiorRequestsDict: ',interiorRequestsDict)

}

```

Once the above is successfully added to the function, we then get a dictionary logged to our console showing the requests:

```
interiorRequestsDict:  {0: 1, 1: 1, 2: 1, 3: 0, 4: 0}
```

Of course, these requests are never closed, even if the elevator stops at the floor in question. So to close these requests, we would set the dictionary key value back to zero in the case that a given floor is reached. We are assuming that no passenger would ever request a floor that they are already on.

To run a for loop on an object, we have to use, ["for in"](https://www.w3schools.com/jsref/jsref_forin.asp).  Our object is, "interiorRequestsDict"

We have to be able to tell whether we are actually stopping at the floor, not just, "at" the floor. Otherwise, if we use "currentFloorNow" to just close out any request, all requests will be closed as we pass those floors.

But what event tells us that we are at a floor precisely?  The elevator idle function and the elevator queue seem to have some sources of information:

> elevator.on("idle", function() { elevator.goToFloor(0); });

* "Listen for the "idle" event issued by the elevator, when the task queue has been emptied and the elevator is doing nothing. In this example we tell it to move to floor 0."

> elevator.destinationQueue = [];
> elevator.checkDestinationQueue();

* the destinationQueue must be manually loaded, it is an array we can check to see if we had already added an instruction from the interiorrequestdictionary, before adding to the interiorRequestsDictdictionary again possibly.
* We could also potentially check the interorRequestsDict to see if the elevator API, "removed" an item from the array, and if so, take off of interiorRequestsDictionary

So what's the logic?

```
// check each value of destinationQueue, Vn

// check each value of previous destinationQueue, Vp

// if a given Vp is not in Vn

// this means the floor was reached, and has been removed from the queue.

// find that value in interiorrequestdictionary and set to 0

```

Translating the above into code, we use a, "for / of" loop to loop through an iterable as follows:

```
// destination queue example
elevator.destinationQueue = [1,2,3,4];
elevator.checkDestinationQueue();

currentDestinationQueue = elevator.destinationQueue;

// go through each element in the currentDestinationQueue
for (let x of currentDestinationQueue) {
  console.log( currentDestinationQueue[x] );
}

// update destination queue again based upon elevator movement
elevator.checkDestinationQueue();

```

The above code, implemented at [destinationQueueCheck.js](/notes/destinationQueueCheck.js) prints out the following:

```
hello world.
2
3
4
```
Of course the task at hand is not simply to print out, but to check the currentQueue and compare to the previousQueue.

```
// checking the current queue and comparing to previous queue

...

// destination queue example
elevator.destinationQueue = [1,2,3,4];
elevator.checkDestinationQueue();

// set variable name, don't use actual queue
currentDestinationQueue = elevator.destinationQueue;

// go through each element in the currentDestinationQueue
for (let x of currentDestinationQueue) {
  // put array value into variable
  let queueNow = currentDestinationQueue[x];
  // log to console
  console.log( queueNow );
  // print previous destination queue
  console.log(previousDestinationQueue)
}

// set as previous destination queue
previousDestinationQueue = elevator.destinationQueue;

// update destination queue again based upon elevator movement
elevator.checkDestinationQueue();

...

```
After running the above, we get the following printout:

> currentDestinationQueue does not include:  0
> remove:  0 from interiorRequestsDict
> currentDestinationQueue includes:  1
> currentDestinationQueue includes:  2
> currentDestinationQueue includes:  3
> currentDestinationQueue includes:  4

Basically the logic is finding that 0, from the previous destinationQueue, is not included in our current destinationQueue, and therefore interiorRequestsDict could be set to value 0 at key 0.

Expanding upon this logic, we can build a final function which gets plugged back into [interiorrequestsdictionary.js](/notes/interiorrequestsdictionary.js).

The general logic of the interiorrequestsdictionary.js file is as follows:

```
...

// invoke elevator function

// sample interior requests

// add interiorFloorNumReq to requisite position in interiorRequestsDict
// javascript objects are accessed by keys which are strings.

// convert current floor number request to a string
// interiorFloorNumberString variable

// access the value at key interiorFloorNumberString, set to "1" (on)

// log to console to ensure was created correctly

// zero out dictionary value by key if a particular floor was visited
// since the last time queue was modified.


```

The last line in that logic could be served by, "destinationQueueCheck," which could hypothetically be its own function. The output of destinationQueueCheck(elevator) could be

Our overall main architecture:

1. scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)

2. queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)
      |_ requestsDictionary()
      |   |_ interiorRequestsSetter() // looks at interior requests and enters value 1 into key
      |   |_ destinationChecker()  // checks if destination was hit on last move, sets value 0 into key
      |_ scanDirectionPointer() // based upon scan direction, sets either TOPFLOOR or BOTTOMFLOOR to 1 and other to 0
      |_ requestsDictTranslator() // translates dict to array output, sets queue
          |_ scanDirectionOrderSetter() // based upon the scan direction and current position, order the queue

The various functions below 2.) queueSetter are helper functions which can be arranged in the IDE above the queueSetter() function.

Discussion on building this functionality can be continued at [movingelevatorwithhelpers.md](/notes/movingelevatorwithhelpers.md) with the build file at [movingelevatorwithhelpers.js](/notes/movingelevatorwithhelpers.js).
