/**
 * @module        setButtons
 * @file          setbutton.js
 * @fileoverview  contains the subroutine to set the buttons states.
 * 
 * @exports setButtons()
 */

import { ACTION }   from "../objects/Constants";
import InitialState from "../objects/State";

const Options = {
  state : InitialState
};

/**
 * @function    setButtons
 * @description sets the buttons 'disabled' property.
 * 
 * @param {Options} options options={ state: InitialState }.
 * 
 * @returns {Promise<void>}
 * 
 * @processing depending on the last action posed by the user, buttons are
 * enabled or disabled. The entire set of buttons is settled each time this
 * function (sub) is used.
 */
const setButtons = async (options = Options) => {
  return new Promise (resolve => {

    const { state } = options;
  
    const LastAction  = state.lastAction;
    const isDisabled  = state.isDisabled;
      
    switch (LastAction) {
      case ACTION.reset:
      case ACTION.cancel:
        isDisabled.cancel     = true;
        isDisabled.dropDelay  = false;
        isDisabled.endRound   = true;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.raiseDelay = false;
        isDisabled.reset      = true;
        break;
  
      case ACTION.end :
        isDisabled.cancel     = false;
        isDisabled.dropDelay  = true;
        isDisabled.endRound   = true;
        isDisabled.go         = true;
        isDisabled.pause      = true;
        isDisabled.raiseDelay = true;
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
        isDisabled.cancel     = true;
        isDisabled.dropDelay  = false;
        isDisabled.endRound   = true;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.raiseDelay = false;
        isDisabled.reset      = true;
      
        break;
      
      case ACTION.pause:
        isDisabled.cancel     = false;
        isDisabled.dropDelay  = false;
        isDisabled.endRound   = false;
        isDisabled.go         = false;
        isDisabled.pause      = true;
        isDisabled.raiseDelay = false;
        isDisabled.reset      = true;
        break;
      
  
      default:
        break;
    }

    resolve();
  });

};

export default setButtons;