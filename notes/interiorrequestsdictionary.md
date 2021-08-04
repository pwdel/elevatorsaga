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

* the Queue must be manually loaded, it is an array we can check to see if we had already added an instruction from the interiorrequestdictionary, before adding to the interiorRequestsDictdictionary again possibly.
* We could also potentially check the interorRequestsDict to see if the elevator API, "removed" an item from the array, and if so, 

So what's the logic?

```
// if

```

Translating this into code:

```
...

// open the current floor variable
// naming this variable in line with naming convention from other functions "currentFloorNow"
var currentFloorNow = elevator.currentFloor();

// for currentFloorNow variable in object, interorRequestsDict
for ( currentFloorNow in interiorRequestsDict){
  // run if statement
  if (interiorRequestsDict[currentFloorNow]){

  };
}

if ( currentFloorNow = ) {
  // switch

}

interiorRequestsDict[interiorFloorNumberString] = 1;

```
