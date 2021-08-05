{
    init: function(elevators, floors) {

      elevator.on("idle", function() {
          // invoking idle
          console.log(" --> idle loop function <-- ")
          // check and switch principal scan direction if reached either top or bottom
          scanDirection = scanDirectionSetter(TOPFLOOR, BOTTOMFLOOR, elevator)
          // elevator.destinationQueue and elevator.checkDestinationQueue()
          queueSetter(TOPFLOOR, BOTTOMFLOOR, scanDirection, elevator)

    },

        update: function(dt, elevators, floors) {

        }
}
