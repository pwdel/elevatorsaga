{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        // ----------> EVENT VARIABLE GENERATION <----------

        function dummyFunction(elevator) {

            // destination queue example
            elevator.destinationQueue = [1,2,3,4];
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
                        }

                    }
                }
            }

            // set as previous destination queue
            previousDestinationQueue = elevator.destinationQueue;
            // update destination queue again based upon elevator movement
            elevator.checkDestinationQueue();
            // update destination queue again based upon elevator movement
            elevator.checkDestinationQueue();
        }

        // move the elevator up and down
        elevator.on("idle", function() {

            // invoke dummyFunction
            dummyFunction(elevator)

            elevator.goToFloor(4);

            // invoke dummyFunction
            dummyFunction(elevator)

            elevator.goToFloor(0);
        });


    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
