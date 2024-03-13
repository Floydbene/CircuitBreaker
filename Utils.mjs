{
  /* Utils.mjs
Author  :   Floyd Benedikter
Content :   Utility functions for class CircuitBreaker.mjs
            reset       -> awaits cooldown period before setting state to halfopen
            attemptTask -> attempts task form halfopen state
                              if successful: closes circuit if succesfull
                              if unsuccessful: resets cooldown period
            doTask      -> Tries given task of CircuitBreaker and keeps track of # failed attempts
                              if failed attempts exceeds given threshhold: calls reset function to open circuit
*/
}

export function reset() {
  setTimeout(() => {
    this.state = 'halfopen';
    console.log(`State changed to: ${this.state}`);
  }, this.coolDown);
}

export function attemptTask() {
  try {
    this.task();
    this.strikes = 0;
    this.state = 'closed';
    console.log('Task successful; state reset to closed.');
  } catch (error) {
    this.strikes += 1;
    console.error(`CircuitError: ${error.message}`);
    console.error(`CircuitError: error in halfopen state: resetting to open.`);
    this.state = 'open';
    this.reset();
    throw new Error(error.message);
  }
}

export function doTask() {
  try {
    this.task();
    console.log('Circuit: Task successful;');
  } catch (error) {
    this.strikes += 1;
    console.error(`CircuitError: ${error.message}`);
    if (this.strikes >= this.threshhold) {
      console.error(
        `CircuitError: Maximum number of strikes reached (${this.threshhold})`
      );
      this.state = 'open';
      this.reset();
    } else {
      console.error(
        `CircuitError: function failed - (${this.strikes} out of ${this.threshhold} attempts used)`
      );
    }
    throw new Error(`CircuitError: ${error.message}`);
  }
}
