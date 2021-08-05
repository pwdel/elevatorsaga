## Objective

To pull together helper functions into the movingelevator.js file in order to build a working, semi-finalized product.

### Our Overall Main Objective

1. scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)

2. queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)
      |_ requestsDictionaryWorker()
      |   |_ interiorRequestsSetter() // looks at interior requests and enters value 1 into key
      |   |_ destinationChecker()  // checks if destination was hit on last move, sets value 0 into key
      |   |_ scanDirectionPointer() // from scan direction sets either TOPFLOOR or BOTTOMFLOOR in dict to 1 and other to 0
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
* requestsDictionaryWorker() - should take into account the results of interiorRequestsSetter(), destinationChecker() and scanDirectionPointer(), and output a dictionary which is a logical product of all interiorRequests (set to 1), destinations reached (set back to 0 at each step). NOTE - for now, we could ignore the top and bottom requests.

* requestsDictTranslator() takes the results of requestsDictionaryWorker() and our scanDirection, and creates a completely new queue array that the elevator must follow, ordered based upon the elevator's current position, with recently visited floors cleared.

### Linking Functions Together


### Turn ScanDirectionSetter within QueueSetter Into Function
