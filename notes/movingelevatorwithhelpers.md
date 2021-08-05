## Objective

To pull together helper functions into the movingelevator.js file in order to build a working, semi-finalized product.

### Our Overall Main Objective

1. scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)

2. queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)
      |_ requestsDictionary()
      |   |_ interiorRequestsSetter() // looks at interior requests and enters value 1 into key
      |   |_ destinationChecker()  // checks if destination was hit on last move, sets value 0 into key
      |_ scanDirectionPointer() // based upon scan direction, sets either TOPFLOOR or BOTTOMFLOOR to 1 and other to 0
      |_ requestsDictTranslator() // translates dict to array output, sets queue
          |_ scanDirectionOrderSetter() // based upon the scan direction and current position, order the queue

### File Location


### Adding Functions

* destinationChecker(elevator) - added first as a helper function, without setting 0 value into key, just printing to console.
* 
