## Objective

To pull together helper functions into the movingelevator.js file in order to build a working, semi-finalized product.

### Our Overall Main Objective

1. scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)

2. queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)
      |_ requestsDictionaryWorker()
      |   |_ interiorRequestsSetter() // looks at interior requests and enters value 1 into key
      |   |_ destinationChecker()  // checks if destination was hit on last move, sets value 0 into key
      |   |_ scanDirectionPointer() // from scan direction sets either TOPFLOOR or BOTTOMFLOOR in dict to 1 and other to |
      |_ requestsDictTranslator() // translates dict to array output, sets queue
      |_ scanDirectionOrderSetter() // based upon the scan direction and current position, order the queue

Note:

* Queue is its own object (array), part of elevator, and does not need to be passed between functions.
* requestsDictioanry is an object we created and needs to be passed between functions.
* scanDirection is an object/value we created and needs to be passed between functions.
* TOPFLOOR/BOTTOMFLOOR were extracted at the start, but are values/objects we need to pass between functions.

### File Location


### Adding Functions and Testing Console Output

* destinationChecker(elevator) - added first as a helper function, without setting 0 value into key, just printing to console. This function was added with no return value, called within queueSetter AFTER the scan direction function was set. Switching destinations showed up successfully on the console.
* interiorRequestsSetter() - started out by initializing interiorRequestsDict at top of file, and filled in with floors in a for loop. Next, interiorRequestsDict must be an input to queueSetter(), so set that. Finally, invoked interiorRequestsSetter(elevator, interiorRequestsDict) inside queueSetter() and values printed to console as expected.  
* scanDirectionPointer() - might not be needed, if we ignore top and bottom floors.

### Linking Functions Together

* requestsDictionaryWorker() - should take into account the results of interiorRequestsSetter(), destinationChecker() and scanDirectionPointer(), and output a dictionary which is a logical product of all interiorRequests (set to 1), destinations reached (set back to 0 at each step). NOTE - for now, we could ignore the top and bottom requests.

* The output of requestsDictionaryWorker() should be a, "overallRequestsDict" which gets inputted into the requestsDictTranslator(), and then re-arranged into the queue.
* The output of interiorRequestsSetter() could be a dict, interiorRequestsDict which can only turn requests ON, but not off.  This can over-write overallRequestsDict, assuming we turn back around and feed that back into interiorRequestsSetter() on the next go-around, which it should, because all interiorRequestsSetter() can do is turn one value on at one time, given the previous initial state of interiorRequestsDict.
* the output of destinationChecker() could be just a value, which instructs requestsDictionaryWorker() where to turn off the specific key/value of overallRequestsDict in that specific step. NOTE - starting out, the value, "queueValueToRemove" only seems to output the BOTTOMFLOOR starting out, and skips the TOPFLOOR, before any other internal values are fed in, and the reason for this is unclear. After linking and including requests for multiple floors and the actual queue setter, we can observe whether the other floor visit requests are being detected.

NOTE - destinationChecker() may not return a value on every go-through, because a requested floor on the queue may not always be cleared. Hence, we need to be able to respond to "undefined" through an if statement.
NOTE -

* requestsDictionaryWorker() takes the overallRequestsDict which was created from interiorRequestsDict and turns off the value instructed by destinationChecker(). Finally, it outputs overallRequestsDict.
* We have to remember to reset the global interiorRequestsDict to overallRequestsDict as well, within the parent function.

If all of the logic makes sense, then the dictionary should simply be a transient list of what requests have been posted and cleared at the present go-around.

### Elevator Not Leaving First Floor

After the above is completed, except for scanDirectionOrderSetter() and we would have expected the elevator to move, it goes nowhere.

The input to the elevator is:

> queueSetup input:  (3) [0, 0, 0]

So, basically it's trapped on an infinite loop on the first floor, because there are no interior requests, and because it's not receiving any passengers, because it's infinitely stuck on a, "queue" order, no one enters to change any of the requests.

We have to slightly tweak our algorithm so that the queue only receives the next logical command, rather than an order of commands.  This can be completed within: scanDirectionOrderSetter()

scanDirectionOrderSetter() should have the following logic:

```
// input TOPFLOOR, BOTTOMFLOOR, scanDirection, interiorRequestsDict

// 1. if scanDirection is UP

// look at CURRENTFLOOR, NEXTFLOOR

// 1.1 if (CURRENTFLOOR < NEXTFLOOR) AND (NEXTFLOOR < TOPFLOOR)

// AND if interiorRequestsDict has a 1 for NEXTFLOOR

// put NEXTFLOOR into elevator.queue.

// after done, set interiorRequestsDict value at key NEXTFLOOR to 0.

// 1.2 if (NEXTFLOOR == TOPFLOOR)

// put TOPFLOOR into elevator.queue.

// switch principal scan direction

// don't worry about interiorRequestsDict

// 2. if scanDirecion is DOWN

// look at CURRENTFLOOR, NEXTFLOOR

// 2.1 if (CURRENTFLOOR > NEXTFLOOR) AND (NEXTFLOOR > BOTTOMFLOOR)

// AND if interiorRequestsDict has a 1 for NEXTFLOOR

// put NEXTFLOOR into elevator.queue.

// after done, set interiorRequestsDict value at key NEXTFLOOR to 0.

// 2.2 if (NEXTFLOOR == TOPFLOOR)

// put BOTTOMFLOOR into elevator.queue.

// switch principal scan direction

// don't worry about interiorRequestsDict

```

### Translating Dictionary to Queue

* requestsDictTranslator() takes the results of requestsDictionaryWorker(), overallRequestsDict and our scanDirection, and creates a completely new queue array that the elevator must follow, ordered based upon the elevator's current position, with recently visited floors cleared.
* We don't have to pay attention to what overallRequestsDict says about the TOPFLOOR and BOTTOMFLOOR, we can use the overall scan direction to over-ride this function...we're going to hit either the top or bottom eventually so it doesn't matter if someone requested it.

### Turn ScanDirectionSetter within QueueSetter Into Function
