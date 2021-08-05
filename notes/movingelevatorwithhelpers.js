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

        // ***** TESTING EVENT VARIABLES *****

        // getting the current floor
        var currentFloorNow = elevator.currentFloor();
        console.log('currentFloorNow is: ',currentFloorNow)

        // ----------> HELPER FUNCTION DECLARATIONS <----------

        // ******** Principal Destination Queue Setting Function ********

        // destinationChecker()  // checks if destination was hit on last move, sets value 0 into key

        destinationChecker(elevator){
          // retrieve elevator destinationQueue.
          elevator.checkDestinationQueue();

          // set variable name, don't use actual queue
          var currentDestinationQueue = elevator.destinationQueue;

          // go through each element in the previousDestinationQueue, if exists
          // print previousDestinationQueue if defined
          if (typeof previousDestinationQueue != "undefined") {
              // check each element of previousDestinationQueue against queueNow
              for (let y of previousDestinationQueue) {
                  // checking individual previousDestinationQueue array value
                  var prevQueueValue = previousDestinationQueue[y];
                  // if prevQueueValue is defined
                  if (typeof prevQueueValue != "undefined") {
                      // and if prevQueueValue included in currentDestinationQueue, do nothing.
                      if ( currentDestinationQueue.includes(prevQueueValue) ) {
                          console.log("currentDestinationQueue includes: ",prevQueueValue)
                      }
                      // if prevQueueValue not included in currentDestinaionQueue
                      else {
                          console.log("currentDestinationQueue does not include: ",prevQueueValue)
                          console.log("remove: ",prevQueueValue,"from interiorRequestsDict")
                      } // end checking if destinationQueue included prevQueueValue
                  } // end make sure prevQuevalue exists
              } // end iterate through previousDestinationQueue
          } // end make sure previousDestinationQueue exists

          // set as previous destination queue
          previousDestinationQueue = elevator.destinationQueue;
          // update destination queue again based upon elevator movement
          elevator.checkDestinationQueue();
          // update destination queue again based upon elevator movement
          elevator.checkDestinationQueue();
        } // end destinationChecker(elevator)



        // ----------> MAIN FUNCTION DECLARATIONS <----------

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
        scanDirectionSetter = function(TOPFLOOR, BOTTOMFLOOR, elevator){
            // notify function used
            console.log("scandirectionSetter invoked.")

            // finding current floor
            // getting the current floor
            var currentFloorNow = elevator.currentFloor();
            console.log('currentFloorNow is: ',currentFloorNow)


            // Note - floorNumPass does not give the top/bottom floor, it only gives the second to last.
            // the logic is such that you don't, "pass" those floors
            // invoke elevator function to get floorNumPass
            elevator.on("passing_floor", function(floorNum, direction) {
                // set floorNum to floorNumPass to distinguish that we extracted variable
                var floorNumPass = floorNum;
                // log to console
                console.log('printing floorNumPass in scanDirectionSetter',floorNumPass)
            });

            // print the registered passing floor this function reads
            // console.log('floorNumPass inside scandirectionSetter confirm: ',floorNumPass)
            // if we reached right prior to TOPFLOOR, re-set scanDirection
            // note, we can't measure TOPFLOOR directly
            if ( currentFloorNow == TOPFLOOR ) {
                // reset scan direction to down
                scanDirection = "DOWN"
                console.log('scanDirection set to: ',scanDirection)
                // if we reached right prior to BOTTOMFLOOR, re-set ScanDirection
                // note, we can't measure BOTTOMFLOOR directly
            } else if ( currentFloorNow == BOTTOMFLOOR ) {
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
            scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)
            // elevator.destinationQueue and elevator.checkDestinationQueue()
            queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)

        });

    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
