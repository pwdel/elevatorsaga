{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        // ----------> EVENT VARIABLE GENERATION <----------

        function dummyFunction(elevator) {
            // invoke elevator function
            console.log("hello world.")
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
