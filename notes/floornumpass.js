{
    init: function(elevators, floors) {

        // ----------> SETUP and CREATE VARIABLES <----------

        var elevator = elevators[0]; // Let's use the first elevator

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


        // floorNumDetect gives you the number of the floor recently passed (but not stopped at)
        // note - this does not give the last floor
        console.log('floorNumPass, outside of function is: ',floorNumPass)


    },

        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
