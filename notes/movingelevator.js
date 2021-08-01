{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        console.log('starting program...')
        console.log('input elevators: ',elevators)
        console.log('input floors: ',floors)

        // Find maximum number of floors, topFloor - NUMFLOORS / TOPFLOOR (for general solution)
        // by convention, start at floor 0 - BOTTOMFLOOR = 0
        const BOTTOMFLOOR = 0;
        // since index starts at 0, topfloor number will be top-1
        const TOPFLOOR = floors.length - 1;

        // Log top and bottom floor
        console.log('the TOPFLOOR is: ',TOPFLOOR)
        console.log('the BOTTOMFLOOR is: ',BOTTOMFLOOR)

        // set initial scanDirection: UP/DOWN string
        var scanDirection = 'UP';
        console.log("Setting initial scanDirection to: ",scanDirection)


        // ----------> EVENT VARIABLE GENERATION <----------

        // Generate floorNum, prior to elevator passing floor
        // check floor we are just about to pass
        // this gets triggered just previous to a floor being passed, in case stop is needed
        floorNumDetect = elevator.on("passing_floor", function(floorNum, direction) {
            // assign variable
            var floorNumPass = floorNum;
            // print the passing floor
            console.log('event detected inside function...floorNumPass: ',floorNumPass)
            // print the direction
            // console.log('direction: ',direction)
            return floorNumPass
        });


        // getting the current floor
        var currentFloorNow = elevator.currentFloor();
        console.log('currentFloorNow is: ',currentFloorNow)



        // ***** TESTING EVENT VARIABLES *****

        // attempt to detect floorNum to be able to print to console outside of function
        // floorNumDetect gives you an object representing the function with a number of empty properties
        console.log('floorNumDetect, outside of function is: ',floorNumDetect)

        // floorNumDetect gives you the number of the floor recently passed (but not stopped at)
        // note - this does not give the last floor
        console.log('floorNumPass, outside of function is: ',floorNumPass)




        // ----------> FUNCTION DECLARATIONS <----------

        // ******** Principal Destination Queue Setting Function ********
        // function to move elevator up and down using destinationQueue
        // scanDirection shows the dominant scan direction at the present time
        queueSetter = function(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator){
            // notify function used
            console.log("queueSetter invoked.")
            // if scanDirection is up, destination queue shows TOPFLOOR next
            if (scanDirection == "UP") {
                console.log('scanDirection is UP')
                // set destinationQueue to TOPFLOOR
                elevator.destinationQueue = [TOPFLOOR];
                // explicitly modified destinationqueue, therefore need to check it.
                elevator.checkDestinationQueue();
                // console
                console.log('resetting destinationQueue: ',elevator.destinationQueue)
            } else if (scanDirection == "DOWN") {
                console.log('scanDirection is DOWN')
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
        scandirectionSetter = function(TOPFLOOR, BOTTOMFLOOR, floorNumPass){
            // notify function used
            console.log("scandirectionSetter invoked.")
            // Note - floorNumPass does not give the top/bottom floor, it only gives the second to last.
            // the logic is such that you don't, "pass" those floors
            // print the registered passing floor this function reads
            console.log('passingFloorNum inside scandirectionSetter: ',floorNumPass)
            // if we reached right prior to TOPFLOOR, re-set scanDirection
            // note, we can't measure TOPFLOOR directly
            if ( floorNumPass == TOPFLOOR-1) {
                // reset scan direction to down
                scanDirection = "DOWN"
                console.log('scanDirection set to: ',scanDirection)
            // if we reached right prior to BOTTOMFLOOR, re-set ScanDirection
            // note, we can't measure BOTTOMFLOOR directly
            } else if ( floorNumPass == BOTTOMFLOOR+1) {
                // reset scan direction to up
                scanDirection = "UP"
                console.log('scanDirection set to: ',scanDirection)
            } else {} // pass
            // return the scandirection after reset
            return scanDirection;
        }


        // ----------> MAIN ROUTINE <----------
        // Loop between scanDirection and queueSetter

        // Whenever the elevator is idle (has no more queued destinations) ...
        // this is the equivalent of a loop function for the elevator,
        // this is the, "default" which happens on update
        elevator.on("idle", function() {
            // invoking idle
            console.log(" --> idle loop function <-- ")
            // check and switch principal scan direction if reached either top or bottom
            scanDirection = scandirectionSetter(TOPFLOOR, BOTTOMFLOOR, floorNumPass)
            // elevator.destinationQueue and elevator.checkDestinationQueue()
            queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)

        });

    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
