/**
 * @module        setButtons
 * @file          setbutton.js
 * @fileoverview  contains the subroutine to set the buttons states.
 * 
 * @exports setButtons
 */

import { ROUND_STATUS } from "../objects/Constants";
import InitialState     from "../objects/State";

const Options = {
  state : InitialState
}
/**
 * @method      setButtons
 * @description sets the buttons 'disabled' property.
 * 
 * @param state state.
 * 
 * @returns {void}
 * 
 * @processing depending on the status of the round, buttons are enabled or
 * disabled. When the round is active, it is impossible to change the delay
 * between the calls, 
 */
const setButtons = (options = Options) => {
  const { state } = options;

  let   roundStatus = state.round.status;
  const isDisabled  = state.isDisabled;
    
  switch (roundStatus) {
    case ROUND_STATUS.active:
      isDisabled.cancel     = false;
      isDisabled.dropDelay  = true;
      isDisabled.endRound   = false;
      isDisabled.go         = true;
      isDisabled.pause      = false;
      isDisabled.raiseDelay = true;
      break;
  
    case ROUND_STATUS.paused:
      isDisabled.pause  = true;
      isDisabled.go     = false;
      break;
    case ROUND_STATUS.noRound:
      isDisabled.cancel     = true;
      isDisabled.pause      = true;
      isDisabled.endRound   = true;
      isDisabled.dropDelay  = false;
      isDisabled.raiseDelay = false;
      isDisabled.reset      = true;
      isDisabled.go         = false;
    
      break;
    
    default:
      break;
  }
};

  export default setButtons;