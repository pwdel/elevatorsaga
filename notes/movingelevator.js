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



        // ----------> EVENT VARIABLE GENERATION <----------

        // Generate floorNum, prior to elevator passing floor
        // check floor we are just about to pass
        // this gets triggered just previous to a floor being passed, in case stop is needed
        var floorNumDetect = elevator.on("passing_floor", function(floorNum, direction) {
            // assign variable
            floorNumPass = floorNum;
            // print the passing floor
            console.log('event detected...passingFloorNum: ',floorNumPass)
            // print the direction
            console.log('direction: ',direction)
        });


        // attempt to detect floorNum to be able to print to console

        // console.log('floorNumDetect object property names : ',Object.keys(floorNumDetect))
        console.log('floorNumDetect.currentFloor : ',floorNumDetect.currentFloor[0])




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
        scandirectionSetter = function(TOPFLOOR, BOTTOMFLOOR, elevator, floorNumPass){

            // print the registered passing floor this function reads
            console.log('passingFloorNum: ',floorNumPass)

            // if we reached the TOPFLOOR, re-set scanDirection
            if ( floorNumPass == TOPFLOOR) {
                // reset scan direction to down
                scanDirection = "DOWN"
                console.log('scanDirection set to: ',scanDirection)
            } else if ( floorNumPass == BOTTOMFLOOR) {
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
