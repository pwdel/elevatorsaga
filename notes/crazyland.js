{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Find maximum number of floors, topFloor - NUMFLOORS / TOPFLOOR (for general solution)
        // by convention, start at floor 0 - BOTTOMFLOOR = 0
        const BOTTOMFLOOR = 0;
        // since index starts at 0, topfloor number will be top-1
        const TOPFLOOR = floors.length - 1;

        // Log top and bottom floor
        console.log('the TOPFLOOR is: ',TOPFLOOR)
        console.log('the BOTTOMFLOOR is: ',BOTTOMFLOOR)

        // pop top floor into, "schedule" destinationQueue and start elevator immediately,
        // don't wait for lower floor passenger
        elevator.destinationQueue = [TOPFLOOR];
        elevator.checkDestinationQueue();
        console.log('destinationQueue: ',elevator.destinationQueue)

        // Estimate passenger quantity, or at least if there are any passengers with loadFactor > 0
        // elevatorloadfactor is a function
        console.log('loadFactor: ',elevator.loadFactor())

        // Check continuously, interior requests: getPressedFloors - interiorRequests - elevator.getPressedFloors()
        //interior requests
        elevator.on("floor_button_pressed", function(floorNum) {
          // Maybe tell the elevator to go to that floor?
          console.log('interiorRequests to floorNum: ',floorNum)
        });
        // array of pressed getPressedFloors
        console.log('exteriorRequests',elevator.getPressedFloors())

        // Check exterior requests prior to each passing_floor with floor_button_pressed - exteriorRequests
        floors.forEach(function(floor){
            floor.on("up_button_pressed", function() {
                console.log('exteriorRequest UP on floorNum: ', floor.floorNum());
            });
            floor.on("down_button_pressed", function() {
                console.log('exteriorRequest DOWN on floorNum:', floor.floorNum());
            });
        });


        // Check current floor numbers and direction
        elevator.on("passing_floor", function(floorNum, direction) {
          // print the passing floor
          console.log('passing floorNum: ',floorNum)
          // print the direction
          console.log('direction: ',direction)
          });



        // combine interiorRequests and exteriorRequests into allRequests, order allRequests sequentially relative to current position and SCAN direction

        // update "schedule" destinationQueue based upon allRequests and currentFloor
        // schedule might need a helper function


        // Move elevator toward topFloor -> goToFloor in topFloor direction
        // move elevator might need some kind of helper function


        // At each floorNum reached, if currentFloor === one_of_the( allRequests ), reload passengers
        // skip floors not currently on requests / schedule

        // NOTE --- do not use, "stop" - this is used for a different purpose, not for stopping at floors

        // Once reached TopFloor, insert bottom floor [0] into scheduling queue - destinationQueue.

        // repeat the above pattern in reverse until reaching BOTTOMFLOOR

        // Repeat pattern back to TOPFLOOR

    },

    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
