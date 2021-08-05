{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

        const BOTTOMFLOOR = 0; // bottom floor
        const TOPFLOOR = floors.length - 1; // top floor

        var interiorRequestsDict = {}; // interior requests dictionary

        // initialize interior request dictionry to all zero status.
        for (var x = 0; x < TOPFLOOR+1; x++) {
            // property name is x, or the number of the floor
            // value of each object starts as zero
            interiorRequestsDict[x] = 0;
        }


        // ----------> EVENT VARIABLE GENERATION <----------

        function dummyFunction( elevator, interiorRequestsDict ) {

          // invoke elevator function
          elevator.on("passing_floor", function(floorNum, direction) {
              console.log('printing floorNum in dummyFunction',floorNum)
          });

          // sample interior requests
          elevator.on("floor_button_pressed", function(floorNum) {
            // note interior request floorNum
            interiorFloorNumReq = floorNum
            // Maybe tell the elevator to go to that floor?
            console.log('interiorFloorNumReq: ',interiorFloorNumReq)
          });

          // add interiorFloorNumReq to requisite position in interiorRequestsDict
          // javascript objects are accessed by keys which are strings.
          // convert current floor number request to a string
          // interiorFloorNumberString variable
          var interiorFloorNumberString = interiorFloorNumReq.toString()

          // access the value at key interiorFloorNumberString, set to "1" (on)
          interiorRequestsDict[interiorFloorNumberString] = 1;

          // log to console to ensure was created correctly
          console.log('interiorRequestsDict: ',interiorRequestsDict)

        }

        // move the elevator up and down
        elevator.on("idle", function() {
            elevator.goToFloor(TOPFLOOR);
            // invoke dummyFunction
            dummyFunction(elevator,interiorRequestsDict)
            elevator.goToFloor(BOTTOMFLOOR);
            // invoke dummyFunction
            dummyFunction(elevator,interiorRequestsDict)
        });




    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
