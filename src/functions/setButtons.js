/**
 * @module        setButtons
 * @file          setbutton.js
 * @fileoverview  contains the subroutine to set the buttons states.
 * 
 * @exports setButtons as default
 * @exports setDelayButtons
 */

import { ACTION,CALLER_DELAY }   from "../objects/Constants";
import InitialState from "../objects/State";

const Options = {
  state : InitialState
};

/**
 * @function    setDelayButtons
 * @description sets the delay buttons depending on the range allowed.
 * 
 * @param {InitialState} state state.
 * 
 * @returns {void}
 * 
 * @processing this subroutine is enabling or disabling the buttons used to
 * raise and drop the delay. When the delay reaches the minumum allowed the only
 * RAISE DELAY button is enabled. When the delay reaches the maximum allowed
 * only the DROP DELAY button is enabled. Otherwise, both buttons are enabled.
 * This subroutine DOES NOT CONSIDER if a round is running or not.
 */
const setDelayButtons = (state = InitialState) => {
  const isDisabled  = state.isDisabled;
  const Delay       = state.round.delayCalls;

  switch (true) {
    case (Delay <= CALLER_DELAY.min):
      isDisabled.dropDelay  = true;
      isDisabled.raiseDelay = false;
      break;

    case (Delay >= CALLER_DELAY.max):
      isDisabled.dropDelay  = false;
      isDisabled.raiseDelay = true;
      break;
  
    default:
      isDisabled.dropDelay  = false;
      isDisabled.raiseDelay = false;
      break;
  }
};

/**
 * @function    setButtons
 * @description sets the buttons 'disabled' property.
 * 
 * @param {Options} options options={ state: InitialState }.
 * 
 * @returns {Promise<void>} voided Promise object.
 * 
 * @throws Unknown LastAction value; LastAction = ' + LastAction
 * 
 * @processing depending on the last action posed by the user, buttons are
 * enabled or disabled. The entire set of buttons is settled each time this
 * subroutine is used.
 */
const setButtons = async (options = Options) => {
  return new Promise (resolve => {

    const { state } = options;
  
    const LastAction  = state.lastAction;
    const isDisabled  = state.isDisabled;
      
    switch (LastAction) {
      case ACTION.cancel:
      case ACTION.reset:
        setDelayButtons(state);
        isDisabled.cancel     = true;
        isDisabled.endRound   = true;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.reset      = true;
        break;
  
      case ACTION.end :
        setDelayButtons(state);
        isDisabled.cancel     = false;
        isDisabled.endRound   = true;
        isDisabled.go         = true;
        isDisabled.pause      = true;
        isDisabled.reset      = false;
        break;
  
      case ACTION.go:
        isDisabled.cancel     = false;
        isDisabled.dropDelay  = true;
        isDisabled.endRound   = false;
        isDisabled.go         = true;
        isDisabled.pause      = false;
        isDisabled.raiseDelay = true;
        isDisabled.reset      = true;
        break;
  
      case ACTION.idle:
        setDelayButtons(state);
        isDisabled.cancel     = true;
        isDisabled.endRound   = true;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.reset      = true;
      
        break;
      
      case ACTION.pause:
        setDelayButtons(state);
        isDisabled.cancel     = false;
        isDisabled.endRound   = false;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.reset      = true;
        break;
      
      //If reached, constant LastAction contains an unknown value
      default:
        throw new Error('Unknown LastAction value; LastAction = ' + LastAction + ' in setButtons()');
    }

    resolve();
  });

};

export {
  setButtons as default,
  setDelayButtons
};