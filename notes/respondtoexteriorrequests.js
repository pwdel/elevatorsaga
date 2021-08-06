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

        // setup blank interior requests dictionary.
        var interiorRequestsDict = {}; // interior requests dictionary

        // initialize interior request dictionry to all zero status.
        for (var x = 0; x < TOPFLOOR+1; x++) {
            // property name is x, or the number of the floor
            // value of each object starts as zero
            interiorRequestsDict[x] = 0;
        }

        // set initial scanDirection: UP/DOWN string
        var scanDirection = 'UP';
        console.log("Setting initial scanDirection to: ",scanDirection)

        // ----------> EVENT VARIABLE GENERATION <----------

        // ***** TESTING EVENT VARIABLES *****

        // getting the current floor
        var currentFloorNow = elevator.currentFloor();
        console.log('currentFloorNow is: ',currentFloorNow)

        // ----------> HELPER FUNCTION DECLARATIONS <----------

        // ******** destinationChecker Function ********
        // destinationChecker()  // checks if destination was hit on last move, sets value 0 into key
        function destinationChecker(elevator){
            // retrieve elevator destinationQueue.
            elevator.checkDestinationQueue();

            // set variable name, don't use actual queue
            var currentDestinationQueue = elevator.destinationQueue;

            // go through each element in the previousDestinationQueue, if exists
            // print previousDestinationQueue if defined
            if (typeof previousDestinationQueue != "undefined") {
                // previousDestinationQueue found
                console.log("previousDestinationQueue found, value is: ",previousDestinationQueue)
                // check each element of previousDestinationQueue against queueNow
                for (let y of previousDestinationQueue) {
                    // checking individual previousDestinationQueue array value
                    var prevQueueValue = previousDestinationQueue[y];
                    // if prevQueueValue is defined
                    if (typeof prevQueueValue != "undefined") {
                        // prevQueueValue found
                        console.log("prevQueueValue found, value is: ",prevQueueValue)
                        console.log("checking if prevQueueValue is in currentDestinationQueue")
                        // and if prevQueueValue included in currentDestinationQueue, do nothing.
                        if ( currentDestinationQueue.includes(prevQueueValue) ) {
                            console.log("currentDestinationQueue includes: ",prevQueueValue)
                        }
                        // if prevQueueValue not included in currentDestinaionQueue
                        else {
                            console.log("currentDestinationQueue does not include: ",prevQueueValue)
                            console.log("remove: ",prevQueueValue,"from interiorRequestsDict")
                            return prevQueueValue;
                        } // end checking if destinationQueue included prevQueueValue
                    } // end make sure prevQuevalue exists
                } // end iterate through previousDestinationQueue
            } // end make sure previousDestinationQueue exists

            // set as previous destination queue
            previousDestinationQueue = elevator.destinationQueue;
            // update destination queue again based upon elevator movement
            elevator.checkDestinationQueue();

        } // end destinationChecker(elevator)

        // ******** interiorRequestsSetter Function ********
        // interiorRequestsSetter()  // checks if request was made interior to elevator, sets interorRequestDict to on position
        function interiorRequestsSetter(elevator, interiorRequestsDict){
            console.log("interiorRequestSetter activated.")
            // to check interiorRequestDict on input
            // console.log("input interiorRequestsDict is: ",interiorRequestsDict)
            // sample interior requests
            elevator.on("floor_button_pressed", function(floorNum) {
                // note interior request floorNum
                interiorFloorNumReq = floorNum
                // Maybe tell the elevator to go to that floor?
                console.log('interiorFloorNumReq: ',interiorFloorNumReq)

                // add interiorFloorNumReq to requisite position in interiorRequestsDict
                // javascript objects are accessed by keys which are strings.
                // convert current floor number request to a string
                // interiorFloorNumberString variable
                var interiorFloorNumberString = interiorFloorNumReq.toString()

                // access the value at key interiorFloorNumberString, set to "1" (on)
                interiorRequestsDict[interiorFloorNumberString] = 1;

                // log to console to ensure was created correctly
                // console.log('ending interiorRequestsDict is: ',interiorRequestsDict)
            });

            console.log('output interiorRequestsDict is: ',interiorRequestsDict)
            // return interiorRequestDict
            return interiorRequestsDict;

        } // end interiorRequestsSetter() function

        // ******** requestsDictionaryWorker Function ********
        function requestsDictionaryWorker(elevator, interiorRequestsDict){
            // invoke message
            console.log("requestsDictionaryWorker activated.");

            // invoking non-linked interiorRequestsSetter
            console.log("invoking interiorRequestsSetter");
            interiorRequestsDict = interiorRequestsSetter(elevator, interiorRequestsDict);

            // invoking non-linked destinationChecker
            console.log("invoking destinationChecker");
            // grab return value
            var queueValueToRemove = destinationChecker(elevator);
            // print queueValueToRemove
            console.log("queueValueToRemove: ",queueValueToRemove);

            // set overall dictionary
            var overallRequestsDict = interiorRequestsDict;
            // turn off any floor requests, "queueValueToRemove" on interiorRequestsDict based upon value from destinationChecker
            overallRequestsDict[queueValueToRemove] = 0;
            // print new result of overallRequestsDict
            console.log("updated overallRequestsDict is now: ",overallRequestsDict)

            // return, output of function
            return overallRequestsDict;
        } // end of requestsDictionaryWorker()

        // ******** requestsDictTranslator Function ********
        function requestsDictTranslator(elevator,interiorRequestsDict){
            // take interiorRequestsDict and turn into array
            var floorRequestValues = Object.values(interiorRequestsDict);
            // print floorRequestValues to console to inspect
            console.log("unordered floorRequestValues: ",floorRequestValues);
            // return to exterior of function
            return floorRequestValues;
        } // end of requestsDictTranslator function


        // ******** scanDirectionOrderSetter() Function ********
        function scanDirectionOrderSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator, interiorRequestsDict){
            // input TOPFLOOR, BOTTOMFLOOR, scanDirection, interiorRequestsDict
            console.log("scanDirectionOrderSetter invoked.")
            // get CURRENTFLOOR (currentFloorNow), NEXTFLOOR
            // getting the current floor
            var currentFloorNow = elevator.currentFloor();
            console.log('currentFloorNow is: ',currentFloorNow)

            // getting the passing floor, right prior to hitting the floor
            // note - other functionality must happen within this function to access floorNumPass
            elevator.on("passing_floor", function(floorNum, direction) {
                // set floorNum to floorNumPass to distinguish that we extracted variable
                var floorNumPass = floorNum;
                // log to console
                console.log('printing floorNumPass in scanDirectionSetter',floorNumPass)

                // 1. if scanDirection is UP
                if (scanDirection == 'UP') {
                    // 1.1 if (CURRENTFLOOR < NEXTFLOOR) AND (NEXTFLOOR < TOPFLOOR)
                    if (currentFloorNow < floorNumPass && floorNumPass < TOPFLOOR) {
                        console.log("CONDITION: currentFloorNow < floorNumPass && floorNumPass < TOPFLOOR")
                        // AND if interiorRequestsDict has a 1 for NEXTFLOOR
                        if ( interiorRequestsDict[floorNumPass] == 1 ) {
                            // put NEXTFLOOR into elevator.queue.
                            elevator.destinationQueue = [floorNumPass];
                            elevator.checkDestinationQueue();
                            // after done, set interiorRequestsDict value at key NEXTFLOOR to 0.
                            interiorRequestsDict[floorNumPass] = 0;
                        } // end condition interiorRequestsDict[floorNumPass] == 1


                    } else if (floorNumPass == TOPFLOOR) {
                        console.log("floorNumPass == TOPFLOOR")
                        // this statement can be ignored if we're using the scanDirectionSetter() function
                        // put TOPFLOOR into elevator.queue.
                        // switch principal scan direction
                        // don't worry about interiorRequestsDict
                    } // end conditional for whether CURRENTFLOOR < NEXTFLOOR && NEXTFLOOR < TOPFLOOR or NEXTFLOOR == TOPFLOOR

                } else if (scanDirection == 'DOWN') {
                    // 2. if scanDirecion is DOWN
                    // 2.1 if (currentFloorNow > floorNumPass) AND (floorNumPass > BOTTOMFLOOR)
                    if (currentFloorNow > floorNumPass && floorNumPass > BOTTOMFLOOR) {
                        console.log("CONDITION: currentFloorNow > floorNumPass && floorNumPass > BOTTOMFLOOR")
                        // AND if interiorRequestsDict has a 1 for NEXTFLOOR
                        if ( interiorRequestsDict[floorNumPass] == 1 ) {
                            // put NEXTFLOOR into elevator.queue.
                            elevator.destinationQueue = [floorNumPass];
                            elevator.checkDestinationQueue();
                            // after done, set interiorRequestsDict value at key NEXTFLOOR to 0.
                            interiorRequestsDict[floorNumPass] = 0;
                        } // end condition interiorRequestsDict[floorNumPass] == 1
                    } else if (floorNumPass == BOTTOMFLOOR) {
                        console.log("CONDITION: floorNumPass == BOTTOMFLOOR")
                        // 2.2 if (floorNumPass == TOPFLOOR)
                        // put BOTTOMFLOOR into elevator.queue.
                        // switch principal scan direction
                        // don't worry about interiorRequestsDict
                    } // end conditional for currentFloorNow > floorNumPass && floorNumPass > BOTTOMFLOOR or floorNumPass == BOTTOMFLOOR

                } // end conditional for whether scandirection up or down

            }); // end function for elevator.on("passing_floor", ~)


          // ~~~ END OF scanDirectionOrderSetter() FUNCTION BELOW ~~~
        } // end scanDirectionOrderSetter() function




        // ----------> MAIN FUNCTION DECLARATIONS <----------

        // ******** Principal Destination Queue Setting Function ********
        // function to move elevator up and down using destinationQueue
        // scanDirection shows the dominant scan direction at the present time
        queueSetter = function(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator, interiorRequestsDict){
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

            // invoking requetsDictonaryWorker
            console.log("invoking requetsDictonaryWorker")
            var interiorRequestsDict = requestsDictionaryWorker(elevator, interiorRequestsDict)
            // result of requetsDictonaryWorker
            console.log("result of requetsDictonaryWorker, interiorRequestsDict", interiorRequestsDict);
            // take interiorRequestsDict, order it and put in elevator queue.
            var queueSetup = requestsDictTranslator(elevator,interiorRequestsDict)
            console.log("queueSetup input: ",queueSetup)

            // set elevator.destinationQueue to next floor taking into account scan direction
            scanDirectionOrderSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator, interiorRequestsDict)

            // send queueSetup to elevator as array
            // must be defined before adding to elevator
            /*
            if (typeof queueSetup != "undefined") {
                elevator.destinationQueue = [queueSetup];
                console.log("elevator.destinationQueue is: ",elevator.destinationQueue)
                elevator.checkDestinationQueue();
            } // end check if queueSetup valid
            */


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
            queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator,interiorRequestsDict)

        });

    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
