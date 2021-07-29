{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        // Find maximum number of floors, topFloor - NUMFLOORS / TOPFLOOR (for general solution)
        // by convention, start at floor 0 - BOTTOMFLOOR = 0
        const BOTTOMFLOOR = 0;
        // since index starts at 0, topfloor number will be top-1
        const TOPFLOOR = floors.length - 1;

        // set initial scanDirection: UP/DOWN string
        var scanDirection = 'UP';

        // Log top and bottom floor
        console.log('the TOPFLOOR is: ',TOPFLOOR)
        console.log('the BOTTOMFLOOR is: ',BOTTOMFLOOR)



        // ----------> FUNCTION DECLARATIONS <----------

        // ******** Principal Destination Queue Setting Function ********
        // function to move elevator up and down using destinationQueue
        // scanDirection shows the dominant scan direction at the present time
        queueSetter = function(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator){
            // if scanDirection is up, destination queue shows TOPFLOOR next
            if (scanDirection == "UP") {
                // set destinationQueue to TOPFLOOR
                elevator.destinationQueue = [TOPFLOOR];
                // explicitly modified destinationqueue, therefore need to check it.
                elevator.checkDestinationQueue();
                // console
                console.log('resetting destinationQueue: ',elevator.destinationQueue)
            } else if (scanDirection == "DOWN") {
                // set destinationQueue to TOPFLOOR
                elevator.destinationQueue = [BOTTOMFLOOR];
                // explicitly modified destinationqueue, therefore need to check it.
                elevator.checkDestinationQueue();
                // console
                console.log('resetting destinationQueue: ',elevator.destinationQueue)
            } else {} // pass
        };

        // ******** Principal Scan Direction Setting Function ********
        // reset the dominant scan direction, scanDirection, if reached opposite floor
        scandirectionSetter = function(TOPFLOOR, BOTTOMFLOOR, elevator){

            // check floor we are just about to pass
            // this gets triggered just previous to a floor being passed, in case stop is needed
            elevator.on("passing_floor", function(floorNum, direction) {
                // print the passing floor
                console.log('passingFloorNum: ',floorNum)
                // we now have the floorNum
            });

            // if we reached the TOPFLOOR, re-set scanDirection
            if ( floorNum == TOPFLOOR) {
                // reset scan direction to down
                scanDirection = "DOWN"
                console.log('scanDirection set to: ',scanDirection)
            } else if ( floorNum == BOTTOMFLOOR) {
                // reset scan direction to up
                scanDirection = "UP"
                console.log('scanDirection set to: ',scanDirection)
            } else {} // pass
            // return the scandirection after reset
            return scanDirection;
        }


        // ----------> MAIN ROUTINE <----------

        // check and switch principal scan direction if reached either top or bottom
        scanDirection = scandirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)

        // elevator.destinationQueue and elevator.checkDestinationQueue()
        queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)


    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
