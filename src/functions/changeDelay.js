/**
 * @module        changeDelay
 * @file          changeDelay.js
 * @fileoverview  module updating the delay and the informations depending on it.
 * 
 * @exports changeDelay subroutine.
 */

import { CALLER_DELAY } from "../objects/Constants";
import InitialState     from "../objects/State";

/**
 * @constant Options
 * @description used to define and initialize changeDelay()'s parameters.
 */
const Options = {
  state   : InitialState,
  target  : null
};

/**
 * @async
 * @function    changeDelay
 * @description changes the delay between calls and updates all informations depending on it.
 * 
 * @param {Options} options options={ state: InitialState, target : event.target }.
 * 
 * @returns {Promise<void>} voided Promise object.
 * 
 * @throws 'Something went wrong in changeDelay() function.'.
 * 
 * @processing starts by computing the new delay. When delay goes out of range
 * the update is canceled. When reaching minimum delay allowed the drop delay
 * button is disabled. When reaching the maximum the raise delay button is
 * disabled. In all cases of raise, the drop delay button is enabled and in
 * all cases of drop, the raise delay button is enabled.
 * 
 */
const changeDelay = (options = Options) => {
  return new Promise(resolve => {
    const { state, target } = options;

    const Round       = state.round;
    const isDisabled  = state.isDisabled;

    const ActualDelay = Round.delayCalls;
    let   newDelay    = 0;

    switch(target.id) {
      case 'dropDelay':
        newDelay = ActualDelay - CALLER_DELAY.skip;

        if (newDelay <= CALLER_DELAY.min) {
          isDisabled.dropDelay = true;
        }
        
        isDisabled.raiseDelay = false;
        Round.delayCalls      = newDelay;
        
        break;

      case 'raiseDelay':
        newDelay = ActualDelay + CALLER_DELAY.skip;

        if (newDelay >= CALLER_DELAY.max) {
          isDisabled.raiseDelay = true;
        }

        isDisabled.dropDelay  = false;
        Round.delayCalls      = newDelay;
        break;
      
        // If reached, there's an error..
      default:
        throw new Error('Something went wrong in changeDelay() function.');

    }

    resolve();
  });
};

export default changeDelay;