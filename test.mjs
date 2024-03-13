import CircuitBreaker from './CircuitBreaker.mjs';

function functionThatCouldFail() {
  if (Math.random() < 0.5) {
    throw Error('Backend not available');
  }
}

function client() {
  const circuitBreaker = new CircuitBreaker(functionThatCouldFail);
  let i = 0;
  function tryFxn() {
    try {
      circuitBreaker.fire();
      console.log('fired successfully');
    } catch (error) {
      console.log(error);
    }
    if (i < 10) {
      i++;
      setTimeout(() => {
        tryFxn();
      }, 2000);
    }
  }
  tryFxn();
}

client();
