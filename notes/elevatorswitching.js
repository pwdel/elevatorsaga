{
    init: function(elevators, floors) {

        // get the length of elevators
        const ELEVATORSLEN = elevators.length
        console.log("ELEVATORSLEN is: ",ELEVATORSLEN)

        // do a for each through elevators
        elevators.forEach(myFunction);

        // call dummy function
        function myFunction(elevators, floors) {
            var elevator = elevators;
            console.log("current elevator is...",elevator);

            // Whenever the current elevator is idle (has no more queued destinations) ...
            elevator.on("idle", function() {
                // let's go to all the floors (or did we forget one?)
                elevator.goToFloor(0);
                elevator.goToFloor(1);
            });


        } // end dummy function



    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
