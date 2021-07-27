{
  init: function(elevators, floors) {
    // use elevator
    var elevator = elevators[0]; // Let's use the first elevator

    // by convention, start at floor 0 - BOTTOMFLOOR = 0
    const BOTTOMFLOOR = 0;
    // since index starts at 0, topfloor number will be top-1
    const TOPFLOOR = floors.length - 1;

    // pop top floor into, "schedule" destinationQueue and start elevator immediately, don't wait for lower floor passenger
    

    // Find maximum number of floors, topFloor - NUMFLOORS / TOPFLOOR (for general solution)

    // Estimate passenger quantity, or at least if there are any passengers with loadFactor > 0

    // if there are passengers, proceed, if not idle() until allRequests has floor along path

    // Check exterior requests prior to each passing_floor with floor_button_pressed - exteriorRequests

    // Check continuously, interior requests: getPressedFloors - interiorRequests

    // combine interiorRequests and exteriorRequests into allRequests, order allRequests sequentially relative to current position and SCAN direction

    // update "schedule" destinationQueue based upon allRequests and currentFloor

    // Move elevator toward topFloor -> goToFloor in topFloor direction

    // At each floorNum reached, if currentFloor === one_of_the( allRequests ), reload passengers

    // NOTE --- do not use, "stop" - this is used for a different purpose, not for stopping at floors

    // Once reached TopFloor, insert bottom floor [0] into scheduling queue - destinationQueue.

    // repeat the above pattern in reverse until reaching BOTTOMFLOOR

    // Repeat pattern back to TOPFLOOR


  }

}
