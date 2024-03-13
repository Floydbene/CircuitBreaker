{
  /* CircuitBreaker.mjs
Author: Floyd Benedikter
Input: 
      task                    -> A function to attempt
      (optional) threshhold   -> Integer $ of times the function will fail before opening the circuit
                                 Default: 3
      (optional) cooldown     -> Integer # of seconds the the breaker will stay in the halfopen state
                                 Default:3
*/
}

import { attemptTask, doTask, reset } from './Utils.mjs';
class CircuitBreaker {
  constructor(task, threshhold = 3, coolDown = 3000) {
    if (typeof task == 'function') {
      console.log('this check works');
    }
    // Task for Circuitbraker to attempt
    this.task = task;
    //  # errors allowed until circuitbreaker opens
    this.threshhold = threshhold;
    // Current count of failed attempts
    this.strikes = 0;
    // Initial state
    this.state = 'closed';
    // Time  (in MS) for state to transfer from open to Half Open
    this.coolDown = coolDown;

    this.doTask = doTask.bind(this);
    this.reset = reset.bind(this);
    this.attemptTask = attemptTask.bind(this);
  }

  fire() {
    switch (this.state) {
      case 'closed':
        this.doTask();
        break;
      case 'halfopen':
        this.attemptTask();
        break;
      case 'open':
        throw new Error(
          `Circuit is open: please wait ${this.coolDown / 1000} seconds`
        );
    }
  }
}

export default CircuitBreaker;
