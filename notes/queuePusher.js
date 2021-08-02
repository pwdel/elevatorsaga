{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        // ----------> EVENT VARIABLE GENERATION <----------

        function dummyFunction(elevator) {
            // invoke elevator function
            // Check continuously, interior requests: getPressedFloors - interiorRequests - elevator.getPressedFloors()
            //interior requests
            elevator.on("floor_button_pressed", function(floorNum) {
                // note interior request floorNum
                interiorFloorNumReq = floorNum
                // Maybe tell the elevator to go to that floor?
                console.log('interiorFloorNumReq: ',interiorFloorNumReq)
            });

            // push interiorFloorNumReq to queue, regardless of any other directional logic
            elevator.destinationQueue = [interiorFloorNumReq];
            // print destinationQueue to console
            console.log('elevator.destinationQueue: ',elevator.destinationQueue)
            // explicitly modified destinationqueue, therefore need to check it.
            elevator.checkDestinationQueue();

        }

        // move the elevator up and down
        elevator.on("idle", function() {
            elevator.goToFloor(4);
            // invoke dummyFunction
            dummyFunction(elevator)
            // continue
            elevator.goToFloor(0);
        });




    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
